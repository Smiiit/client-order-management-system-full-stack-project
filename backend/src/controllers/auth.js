const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const { validationResult } = require("express-validator");
const {
  createAccessToken,
  createRefreshToken,
  revokeRefreshToken,
} = require("../utils/token");

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    const existing = await pool.query(
      "SELECT id FROM sys_users WHERE email=$1",
      [email]
    );
    if (existing.rowCount)
      return res.status(400).json({ message: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const result = await pool.query(
      `INSERT INTO sys_users (name, email, password, is_active, created_date) VALUES ($1,$2,$3,$4,now()) RETURNING id, name, email`,
      [name, email, hashed, true]
    );

    const user = result.rows[0];
    const accessToken = createAccessToken({
      userId: user.id,
      email: user.email,
    });
    const refreshToken = await createRefreshToken(user.id);

    res.status(201).json({ user, accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and get password for verification
    const authResult = await pool.query(
      "SELECT id, password, is_active FROM sys_users WHERE email=$1",
      [email]
    );

    if (!authResult.rowCount)
      return res.status(400).json({ message: "Invalid credentials" });

    const authUser = authResult.rows[0];

    if (!authUser.is_active)
      return res.status(403).json({ message: "Account disabled" });

    const match = await bcrypt.compare(password, authUser.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Fetch complete user data from view
    const userResult = await pool.query(
      "SELECT * FROM vw_user_with_roles WHERE user_id=$1",
      [authUser.id]
    );

    if (!userResult.rowCount)
      return res.status(500).json({ message: "User data not found" });

    const user = userResult.rows[0];

    const accessToken = createAccessToken({
      userId: user.user_id,
      email: user.email,
    });
    const refreshToken = await createRefreshToken(user.user_id);

    res.json({
      user, // ✅ Complete user data from view with roles
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ message: "Refresh token required" });

    // check in DB
    const db = await pool.query(
      "SELECT * FROM sys_refresh_tokens WHERE token=$1 AND revoked=false",
      [refreshToken]
    );
    if (!db.rowCount)
      return res
        .status(403)
        .json({ message: "Refresh token invalid or revoked" });

    const jwt = require("jsonwebtoken");
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, payload) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });
        const newAccess = createAccessToken({ userId: payload.userId });
        res.json({ accessToken: newAccess });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ message: "Refresh token required" });
    await revokeRefreshToken(refreshToken);
    res.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, refresh, logout };

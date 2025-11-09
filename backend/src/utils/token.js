const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  });
};

const createRefreshToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  });
  // store refresh token in DB with expiry
  const decoded = jwt.decode(token);
  const expiresAt = new Date(decoded.exp * 1000);
  await pool.query(
    `INSERT INTO sys_refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)`,
    [userId, token, expiresAt]
  );
  return token;
};

const revokeRefreshToken = async (token) => {
  await pool.query(
    `UPDATE sys_refresh_tokens SET revoked = true WHERE token = $1`,
    [token]
  );
};

module.exports = { createAccessToken, createRefreshToken, revokeRefreshToken };

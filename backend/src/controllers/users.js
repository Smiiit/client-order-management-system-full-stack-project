const poolUsers = require("../config/db");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // hashing done here or reuse auth.register; for admin-created users you may hash here
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const result = await poolUsers.query(
      `INSERT INTO sys_users (name,email,password,created_date,created_by) VALUES ($1,$2,$3,now(),$4) RETURNING id,name,email,is_active,created_date`,
      [name, email, hashed, req.user ? req.user.email : "system"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const listUsers = async (req, res) => {
  try {
    const result = await poolUsers.query(
      "SELECT id,name,email,is_active,created_date,updated_date FROM sys_users WHERE is_deleted=false"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await poolUsers.query(
      "SELECT id,name,email,is_active,created_date,updated_date FROM sys_users WHERE id=$1 AND is_deleted=false",
      [id]
    );
    if (!result.rowCount)
      return res.status(404).json({ message: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, is_active } = req.body;

    const result = await poolUsers.query(
      `UPDATE sys_users 
      SET name=$1, email=$2, is_active=$3, updated_date=now(), updated_by=$4
      WHERE id=$5 
      RETURNING id,name,email,is_active,updated_date`,
      [name, email, is_active, req.user.id, id] // ✅ Use ID not email
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "User not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await poolUsers.query(
      `UPDATE sys_users SET is_deleted=true, updated_date=now(), deleted_by=$1 WHERE id=$2 RETURNING id`,
      [req.user ? req.user.email : "system", id]
    );
    if (!result.rowCount)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User soft-deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createUser, listUsers, getUser, updateUser, deleteUser };

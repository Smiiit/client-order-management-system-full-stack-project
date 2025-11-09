const pool = require("../config/db");

const createClient = async (req, res) => {
  try {
    const { name, email, address, contact, is_active } = req.body;

    const result = await pool.query(
      `INSERT INTO clients (name, email, address, contact, is_active, created_date, created_by) 
       VALUES ($1, $2, $3, $4, $5, now(), $6)
       RETURNING id, name, email, address, contact, is_active, created_date`,
      [name, email, address, contact, is_active ?? true, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const listClients = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, address, contact, is_active, created_date, updated_date 
       FROM clients WHERE is_deleted = false ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id, name, email, address, contact, is_active, created_date, updated_date 
       FROM clients WHERE id=$1 AND is_deleted=false`,
      [id]
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "Client not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, contact, is_active } = req.body;

    const result = await pool.query(
      `UPDATE clients 
       SET name=$1, email=$2, address=$3, contact=$4, is_active=$5, updated_date=now(), updated_by=$6
       WHERE id=$7 AND is_deleted=false
       RETURNING id, name, email, address, contact, is_active, updated_date`,
      [name, email, address, contact, is_active, req.user.id, id]
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "Client not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE clients 
       SET is_deleted=true, deleted_by=$1, updated_date=now()
       WHERE id=$2 RETURNING id`,
      [req.user.id, id]
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "Client not found" });

    res.json({ message: "Client deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createClient,
  listClients,
  getClient,
  updateClient,
  deleteClient,
};

const pool = require("../config/db");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, is_active } = req.body;

    const result = await pool.query(
      `INSERT INTO products (name, description, price, stock, is_active, created_date, created_by)
       VALUES ($1, $2, $3, $4, $5, now(), $6)
       RETURNING id, name, description, price, stock, is_active, created_date`,
      [name, description, price, stock, is_active ?? true, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const listProducts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, description, price, stock, is_active, created_date, updated_date
       FROM products WHERE is_deleted = false ORDER BY id DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, name, description, price, stock, is_active, created_date, updated_date
       FROM products WHERE id=$1 AND is_deleted=false`,
      [id]
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "Product not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, is_active } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name=$1, description=$2, price=$3, stock=$4, is_active=$5,
           updated_date=now(), updated_by=$6
       WHERE id=$7 AND is_deleted=false
       RETURNING id, name, description, price, stock, is_active, updated_date`,
      [name, description, price, stock, is_active, req.user.id, id]
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "Product not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE products
       SET is_deleted=true, deleted_by=$1, updated_date=now()
       WHERE id=$2 RETURNING id`,
      [req.user.id, id]
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

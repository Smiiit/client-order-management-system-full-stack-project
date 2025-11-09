const pool = require("../config/db");

const createOrderComment = async (req, res) => {
  try {
    const { order_id, comments, is_active } = req.body;

    const result = await pool.query(
      `INSERT INTO order_comments (order_id, comments, is_active, created_date, created_by)
       VALUES ($1, $2, $3, now(), $4)
       RETURNING id, order_id, comments, is_active, created_date`,
      [order_id, comments, is_active ?? true, req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const listOrderComments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, order_id, comments, is_active, created_date, updated_date
       FROM order_comments WHERE is_deleted=false ORDER BY id DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrderComment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, order_id, comments, is_active, created_date, updated_date
       FROM order_comments WHERE id=$1 AND is_deleted=false`,
      [id]
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "Comment not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateOrderComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comments, is_active } = req.body;

    const result = await pool.query(
      `UPDATE order_comments
       SET comments=$1, is_active=$2, updated_date=now(), updated_by=$3
       WHERE id=$4 AND is_deleted=false
       RETURNING id, order_id, comments, is_active, updated_date`,
      [comments, is_active, req.user.id, id]
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "Comment not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOrderComment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE order_comments
       SET is_deleted=true, deleted_by=$1, updated_date=now()
       WHERE id=$2 RETURNING id`,
      [req.user.id, id]
    );

    if (!result.rowCount)
      return res.status(404).json({ message: "Comment not found" });

    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrderComment,
  listOrderComments,
  getOrderComment,
  updateOrderComment,
  deleteOrderComment,
};

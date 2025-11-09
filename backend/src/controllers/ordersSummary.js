const db = require("../config/db");

exports.getOrdersSummary = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM view_orders_summary");
    res.json(result.rows);
  } catch (err) {
    console.error("Failed to load order summary:", err);
    res.status(500).json({ error: "Server error" });
  }
};

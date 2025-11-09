const db = require("../config/db");

exports.createOrder = async (req, res) => {
  const { client_id, products, comment, payments, created_by } = req.body;

  if (!client_id || !products || products.length === 0) {
    return res.status(400).json({ error: "Client and products are required" });
  }

  const clientCheck = await db.query("SELECT id FROM clients WHERE id=$1", [
    client_id,
  ]);
  if (clientCheck.rows.length === 0) {
    return res.status(400).json({ error: "Invalid client_id" });
  }

  try {
    await db.query("BEGIN");

    // 1. Create order
    const orderResult = await db.query(
      `INSERT INTO orders (client_id, overall_price, created_by, is_active)
       VALUES ($1, 0, $2, true) RETURNING id`,
      [client_id, created_by]
    );
    const order_id = orderResult.rows[0].id;

    let totalOrderPrice = 0;

    // 2. Insert products to order_transactions
    for (let item of products) {
      const priceResult = await db.query(
        "SELECT price FROM products WHERE id=$1",
        [item.product_id]
      );

      if (priceResult.rows.length === 0) {
        throw new Error(`Product not found with id ${item.product_id}`);
      }

      const unit_price = priceResult.rows[0].price;
      const total_price = unit_price * item.quantity;
      totalOrderPrice += total_price;

      await db.query(
        `INSERT INTO order_transactions (order_id, product_id, product_quantity, unit_price, total_price, created_by, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, true)`,
        [
          order_id,
          item.product_id,
          item.quantity,
          unit_price,
          total_price,
          created_by,
        ]
      );
    }

    // 3. Update overall price in Orders
    await db.query(`UPDATE orders SET overall_price=$1 WHERE id=$2`, [
      totalOrderPrice,
      order_id,
    ]);

    // 4. Insert comment
    if (comment && comment.trim() !== "") {
      await db.query(
        `INSERT INTO order_comments (order_id, comments, created_by, is_active)
         VALUES ($1, $2, $3, true)`,
        [order_id, comment, created_by]
      );
    }

    // 5. Insert payments
    if (payments && payments.length > 0) {
      for (let pay of payments) {
        await db.query(
          `INSERT INTO order_payments (order_id, payment_mode, amount, created_by, is_active)
           VALUES ($1, $2, $3, $4, true)`,
          [order_id, pay.payment_mode, pay.amount, created_by]
        );
      }
    }

    await db.query("COMMIT");

    return res.status(201).json({
      message: "Order created successfully",
      order_id,
      total_amount: totalOrderPrice,
    });
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Order creation failed:", error);
    return res.status(500).json({ error: error.message });
  }
};

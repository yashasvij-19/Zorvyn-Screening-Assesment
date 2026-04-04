const db = require("../db/database");

const getSummary = (req, res) => {
  const totalIncome = db
    .prepare(
      `SELECT COALESCE(SUM(amount),0) as total FROM records WHERE type = 'income' AND deleted_at is NULL`,
    )
    .get();
  const totalExpense = db
    .prepare(
      `SELECT COALESCE(SUM(amount),0) as total FROM records WHERE type = 'expense' AND deleted_at is NULL`,
    )
    .get();
  const netBalance = totalIncome.total - totalExpense.total;

  res.json({
    totalIncome: totalIncome.total,
    totalExpense: totalExpense.total,
    netBalance,
  });
};

const getByCategory = (req, res) => {
  const categories = db.prepare('SELECT category, type, SUM(amount) as total, COUNT(*) as count FROM records WHERE deleted_at IS NULL GROUP BY category, type ORDER BY total DESC').all()
  res.json(categories)
}

const getMonthlyTrend = (req, res) => {
  const trends = db
    .prepare(
      `SELECT strftime( '%Y-%m', date ) as month, 
    SUM( CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
    SUM( CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses
    FROM records
    WHERE deleted_at IS NULL
    GROUP BY month
    ORDER BY month ASC`,
    )
    .all();
  res.json(trends);
};

const getRecentActivity = (req, res) => {
  const recent = db
    .prepare(
      `SELECT * FROM records WHERE deleted_at is NULL ORDER BY created_at DESC LIMIT 5`,
    )
    .all();
  res.json(recent);
};

module.exports = {
  getSummary,
  getByCategory,
  getMonthlyTrend,
  getRecentActivity,
};

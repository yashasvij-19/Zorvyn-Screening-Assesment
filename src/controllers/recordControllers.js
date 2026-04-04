const db = require("../db/database");

const createRecord = (req, res) => {
  const { amount, type, category, date, notes } = req.body;

  if (!amount || !type || !category || !date) {
    return res
      .status(400)
      .json({ message: "Amount,type,category and date are required" });
  }

  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({ message: "Type must be income or expense" });
  }

  const result = db
    .prepare(
      "INSERT INTO records (amount,type,category,date,notes) VALUES (?,?,?,?,?)",
    )
    .run(amount, type, category, date, notes || null);

  res.status(201).json({
    message: "Record created successfully",
    recordId: result.lastInsertRowid,
  });
};

const getAllRecords = (req, res) => {
  const { type, category, date, search } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM records WHERE deleted_at IS NULL";
  const params = [];

  if (type) {
    query += " AND type = ?";
    params.push(type);
  }

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }

  if (date) {
    query += " AND date = ?";
    params.push(date);
  }

  if (search) {
  query += ' AND (notes LIKE ? OR category LIKE ?)'
  const searchTerm = `%${search}%`
  params.push(searchTerm)
  params.push(searchTerm)
}

  query += ' ORDER BY date DESC LIMIT ? OFFSET ?'
  params.push(limit)
  params.push(offset)

  const records = db.prepare(query).all(...params);
  res.json(records);
};

const getRecordById = (req, res) => {
  const { id } = req.params;

  const record = db
    .prepare("SELECT * FROM records WHERE id = ? AND deleted_at is NULL")
    .get(id);

  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }
  res.json(record);
};

const updateRecord = (req, res) => {
  const { id } = req.params;
  const { amount, type, category, date, notes } = req.body;

  const record = db
    .prepare("SELECT * FROM records WHERE id = ? AND deleted_at is NULL")
    .get(id);
  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }

  db.prepare(
    `UPDATE records SET amount=COALESCE(?,amount), type=COALESCE(?,type), category=COALESCE(?,category), date=COALESCE(?,date), notes=COALESCE(?,notes) WHERE id = ?`,
  ).run(
    amount || null,
    type || null,
    category || null,
    date || null,
    notes || null,
    id,
  );

  res.json({ message: "Record updated successfully" });
};

const deleteRecord = (req, res) => {
  const { id } = req.params;

  const record = db
    .prepare("SELECT * FROM records WHERE id = ? AND deleted_at is NULL")
    .get(id);
  if (!record) {
    return res.status(404).json({ message: "Record not found" });
  }

  db.prepare(
    "UPDATE records SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?",
  ).run(id);

  res.json({ message: "Record deleted successfully" });
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
};

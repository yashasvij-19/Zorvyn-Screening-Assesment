const db = require('../db/database')

const getAllUsers = (req,res) => {
    const users= db.prepare('SELECT id,name,email,role,status,created_at FROM users').all()
    res.json(users)
}

const updateRole = (req,res) => {
  const { id } = req.params
  const { role } = req.body

  if(!['admin','analyst','viewer'].includes(role)){
    return res.status(400).json({message:"Invalid role"})
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id)
  if(!user){return res.status(404).json({message:"User not found"})}

  db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role,id)
  res.json({message:"Role updated successfully"})
}

const updateStatus = (req,res) => {
    const {id} = req.params
    const {status} = req.body

    if(!['active','inactive'].includes(status)){
        return res.status(400).json({message:"Invalid status"})
    }

    const user = db.prepare('SELECT* FROM users WHERE id = ?').get(id)
    if(!user){return res.status(404).json({message:"User not found"})}

    db.prepare('UPDATE users SET status = ? WHERE id = ?').run(status,id)
    res.json({message:"Status updated successfully"})
}

module.exports = {getAllUsers, updateRole, updateStatus}
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const db = require ('../db/database')

const login = (req,res) => {
    const {email,password} = req.body

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)

    if(!user){
        return res.status(404).json({message:'User not found'})
    }

    const validPassword = bcrypt.compareSync(password,user.password)

    if(!password){
        return res.status(401).json({message:'Invalid password'})
    }

    const token = jwt.sign(
        {id:user.id, role:user.role, name:user.name},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )

    res.json({
        message:"Login successful",
        token,
        user: {id:user.id, name:user.name, email:user.email, role:user.role}
    })
}

module.exports = {login}
const express = require ('express')
const router = express.Router()
const {login,register} = require("../controllers/authControllers") 
const { validateRegister, validateLogin} = require('../middleware/validate')

router.post('/login',validateLogin,login)
router.post('/register',validateRegister,register)


module.exports = router
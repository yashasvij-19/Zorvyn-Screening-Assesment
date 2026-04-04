const express = require("express")
const router = express.Router()
const {authenticate,authorize} = require('../middleware/auth')
const {getAllUsers, updateRole, updateStatus} = require('../controllers/userController')


router.get('/',authenticate,authorize('admin'),getAllUsers)
router.patch('/:id/role',authenticate,authorize('admin'),updateRole)
router.patch('/:id/status',authenticate,authorize('admin'),updateStatus)

module.exports = router
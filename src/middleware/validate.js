const {body, validationResult} = require('express-validator')

const handleValidationErrors = (req,res) => {
const errors = validationResult(req)
if(!errors.isEmpty()){
return res.status(400).json({
    message:"Validation failed",
    errors: errors.array().map(err=>({
        field:err.path,
        message:err.msg
    }))
})
} 
next()
}

const validateRegister = [
body('name').notEmpty().withMessage('This field is required'),
body('email').isEmail().withMessage('Valid email is required'),
body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters'),
body('role').optional().isIn(['admin', 'analyst', 'viewer']).withMessage('Role must be admin, analyst or viewer'),
handleValidationErrors
]


const validateLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
]


const validateRecord = [
body('amount').isFloat({gt:0}).withMessage('Amount must be a positive number'),
body('type').isIn(['income','expense']).withMessage('Type must be income or expense'),
body('category').notEmpty().withMessage('Category is required'),
body('date').isDate().withMessage('Valid date is required'),
handleValidationErrors
]

module.exports = { validateRegister, validateLogin, validateRecord }
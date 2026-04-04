const express = require('express')
const router = express.Router()
const {authenticate,authorize} = require('../middleware/auth')
const {createRecord,getAllRecords,getRecordById,updateRecord,deleteRecord} = require('../controllers/recordControllers')
const { validateRecord } = require('../middleware/validate')



router.get("/",authenticate,authorize('admin','analyst','viewer'),getAllRecords)
router.get("/:id",authenticate,authorize('admin','analyst','viewer'),getRecordById)
router.post("/",authenticate,authorize('admin','analyst'),validateRecord,createRecord)
router.put("/:id",authenticate,authorize('admin','analyst'),updateRecord)
router.delete("/:id",authenticate,authorize('admin'),deleteRecord)


module.exports = router
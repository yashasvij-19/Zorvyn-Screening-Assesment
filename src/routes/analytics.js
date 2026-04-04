const express = require('express')
const router = express.Router()
const {authenticate,authorize} = require('../middleware/auth')
const { getSummary, getByCategory, getMonthlyTrend, getRecentActivity } = require('../controllers/analyticsController')


router.get('/summary',authenticate,authorize('admin','analyst'),getSummary)
router.get('/by-category',authenticate,authorize('admin','analyst'),getByCategory)
router.get('/monthly-trend',authenticate,authorize('admin','analyst'),getMonthlyTrend)
router.get('/recent-activity',authenticate,authorize('admin','analyst','viewer'),getRecentActivity)


module.exports = router
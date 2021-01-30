const express = require('express')

const homeRouter = express.Router()
const Conditions = require('./../model/conditions.Model')
const { home , validate, validate2} = require('./../controller/home.Controller')(Conditions)

homeRouter.route('/').get(home)
homeRouter.route('/validate-rule').post(validate)

module.exports = homeRouter
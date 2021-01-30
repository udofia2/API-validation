require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const AppError = require('./middleware/appError.Middleware')

const app = express()
require('./database')()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/', require('./routes/home.route'))

app.all('*', (req, res, next) => {

  next(new AppError(`SORRY!!!, Can't find ${req.originalUrl} on this server, please return to POST request /validate-rule.`, 400))

})

app.use(require('./controller/error.Controller'))

process.on('unhandledRejection', err => {
  console.log(`${err.name} : ${err.message}`)
})

app.listen(process.env.PORT, () => console.log(`server connected on http://localhost:${process.env.PORT}`))
const express = require('express')
const app = express()
const status = require('http-status')
const cors = require('cors')
const ErrorHandler = require('./middlewares/ErrorHandler')
const sequelize = require('./configs/database')
const { rootAPI } = require('./controllers/root/root.controller')

//configurations
require('dotenv').config()
app.use(cors())


// - routes -

//main route
app.get(`/${process.env.API_VERSION_1}`, async (req,res, next) => {
  try {
    res.status(status.OK).json({
      msg:"Server Running Successfuly",
      version:process.env.API_VERSION_1
    })
  } catch (error) {
    next(error)
  }
})

//global error handler
app.use(ErrorHandler)

//if request url doesn't exsist
app.get('*',  (req,res) => {

  //TODO(mert):here must be define error handler
  res.status(status.NOT_FOUND).json({
    message:status[status.NOT_FOUND],
    status:status.NOT_FOUND,
  })
})

//database connection
sequelize.authenticate()
  .then(() => console.log("Connecting..."))
  .catch(error => console.error("Someting Went Wrong During Database Connection: ", error))
  .finally(() => {
    console.log('Done !')
    //listen defined port
    app.listen(process.env.API_PORT, rootAPI)
  })



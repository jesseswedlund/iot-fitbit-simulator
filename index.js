const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const axios = require('axios')
const PORT = process.env.PORT || 8080
const app = express()

module.exports = app

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
//if (process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  app.use('/api', require('./api'))

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  )
}

const makeFitbitCall = async () => {
  try {
    const { data } = await axios.get("fitbit API") //add credentials
    return data
  } catch(error) {
    console.log(error)
  }
}

const sendMessage = async () => {
  try {
    const message = await makeFitbitCall()
    console.log(message)
    //await axios.post("IoTHubEndpoint", message)
  } catch(error) {
      console.log(error)
  } 
}

async function bootApp() {
  await createApp()
  await startListening()
  //const startCalls = setInterval(SendMessage, 5000)
  //SendMessage()
}

bootApp()
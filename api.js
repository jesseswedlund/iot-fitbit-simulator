const router = require('express').Router()
//const { apiKey } = require("./secrets.js")

//auth middleware
async function checkApiKey(req, res, next) {
  try {
    const key = process.env.apiKey || apiKey
    if (req.headers.apikey === key) {
      console.log("Access Granted")
      next()
    }
    else {
      console.log(req.headers.apikey)
      res.status(401).send("Access Denied!")
    }
  } catch (error) {
    next(error)
  }
}

router.get('/', async (req, res, next) => {
  try {  
    res.json("Hello World")
  } catch (err) {
    next(err)
  }
})

module.exports = router
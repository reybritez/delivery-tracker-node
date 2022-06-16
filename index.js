const express = require('express')
const path = require('path')
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post("/api", (req, res) => {
    console.log(req.body)
    res.status(200).end()})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
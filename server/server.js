const path = require('path')

const publicPath = path.join(__dirname, '../public')

const express = require('express')
const port = process.env.PORT || 3000

var app = express()

//will let you see the static index.html file
app.use(express.static(publicPath))

app.listen(port, (req,res)=>{
  console.log(`Listening on port ${port}`)
})

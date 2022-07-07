const express = require('express')
const path = require('path')


const indexRoutes = require('./routes/index')

const app = express()
//port numer
const port = process.env.PORT||3003

// app.use(express.json)
// app.use(express.urlencoded({
//     extends:false
// }))

app.use(express.static(path.join(__dirname,"public")))

app.set("views",path.join(__dirname,"views"))
app.set("view engine","pug")


app.use('/',indexRoutes)


app.listen(port,(req,res)=>{
    console.log("server is working at "+ port)
})

module.exports = app
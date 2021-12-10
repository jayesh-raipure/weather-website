const path = require('path')
const express = require('express')
const hbs = require("hbs")

// import from utils
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Set handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Jayesh Raipure"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Jayesh Raipure"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message:  "Help message",
        name: "Jayesh Raipure"
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        message:  "Help article not found",
        name: "Jayesh Raipure"
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send(
            {
                error: "Address needs to be provided"
            }
        )
    }
    const address = req.query.address

    // call geocode api to get lat-long
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: data,
                location,
                addrsss: address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send(
            {
                error: "Search parameter needs to be provided"
            }
        )
    }
    res.send({
        products: []
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        message:  "Page not found",
        name: "Jayesh Raipure"
    })
})

app.listen(port, () => {
    console.log("Server started on port "+port);
})
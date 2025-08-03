const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')
//setup handlebars engine and views locaiton
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather application',
        value: 1
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'this is the about page',
        value: 2
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        value: 3
    })
})

app.get('/products', (req, res) => {
    if (!req.query.searchTerm) {
        return res.send({
            error: 'please provide a search term'
        })
    }
    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide a location'
        })
    }
    geocode(req.query.address, (error, { longtitude, latitude, countryName } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longtitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                countryName,
                address: req.query.address,
            })

        })



    })
})


app.get('/help/*', (req, res) => {
    res.render('404-page', {
        errorMessage: 'this article is not found'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        errorMessage: 'Error 404, page not found'
    })
})



app.listen(3000, () => {
    console.log('server running on port 3000')
})


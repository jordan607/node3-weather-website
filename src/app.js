const path = require('path')
const express = require('express')
const hbs = require('hbs')
let weather = require('./utils/forecast')
let geocode = require('./utils/geocode')

const app = express()

//Defines path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to setup
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title : 'Weather Today',
        name: 'vishal sepaia'
    }) 
}) 

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About',
        name : 'vishal sepaia'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        contact : 'weatherforyou@xyz.com',
        title : 'Help',
        name : 'vishal sepaia'
    })
})

app.get('/weather',(req,res) => {
    var location =req.query.address 
    if(!location){
        return res.send({
            error: 'you must provide an address'
        })
    }

    weather(location, (error,data) =>{
      if(error) return res.send({ error })
      geocode(location, (error,{place_name, longitude, latitude} = {}) =>{
        if(error) return res.send(error)
        res.send({
            Address_searched : req.query.address,
            forecast : data,
            Coordinates_for_location : place_name,
            Longitude : longitude,
            Latitude : latitude
        })
          
      })
      
    })
})



app.get('/help/*', (req, res) => {
    res.render('error',{
            message: 'Help article not found',
            name: 'Vishal Sepaia'
        })
})

app.get('*', (req,res) =>{
    res.render('error',{
        message: 'Page not found',
        name : 'Vishal Sepaia'
    })
})

app.listen(3000, () => {
    console.log('server started')
})

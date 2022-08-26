const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const weather = require('../utils/weather')

const app = express()
const port = process.env.PORT || 3000


// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and views loc
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// setup static dir to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name : 'Rakshit Pandey'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{ 
        name : 'Rakshit Pandey',
        title : 'About'     
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg: 'This app is made only for learning purpose. For weather update, i have used Weatherstack API and for location Geolocation API.',    
        title: 'Help', 
        name : 'Rakshit Pandey'         
    })
})

app.get('/weather' , (req, res) => {
    if (!req.query.address){
        return res.send({
            error : "Address is required...duh!"
        })
    }

    if (req.query.current === 'false') {
        geocode(req.query.address , (error, {latitude,longitude,location}={}) => {
            if (error){
                return res.send({
                    weather : error
                })
            }
            // console.log(data)
            weather(latitude,longitude,(error, forecastData) => {
                if (error){
                    return res.send({
                        weather : error
                    })
                }
                
                res.send({
                    location : location,
                    weather : forecastData.temperature,
                    feelsLike : forecastData.feelsLike,
                    humidity : forecastData.humidity,
                    localTime : forecastData.localTime,
                    address : req.query.address
                })
            })    
        })
    } else if (req.query.current === 'true') {
        const [ latitude, longitude ] = req.query.address.split(',')
        console.log(req.query.address.split(','))
        weather(latitude,longitude,(error, forecastData) => {
            if (error){
                return res.send({
                    weather : error
                })
            }
            
            res.send({
                location : `<a href=https://google.com/maps?q=${latitude},${longitude} target=_blank>Location</a>`,
                weather : forecastData.temperature,
                feelsLike : forecastData.feelsLike,
                humidity : forecastData.humidity,
                localTime : forecastData.localTime,
                address : req.query.address
            })
        })                 
    }

    

    
})

// app.get('/products',(req,res) => {
//     if (!req.query.search){
//         return res.send({
//             error : "You must pass a search term"
//         })
//     }
//     res.send({
//         products : []
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMsg : "Help article not found",
        name : 'Rakshit Pandey',
        title : "PLEH"  
    })
})
 
app.get('/*',(req,res)=>{
    res.render('error',{
        errorMsg : "Page not found",
        name : 'Rakshit Pandey',
        title : '404'  
    })
})
 


// console.log(path.join(__dirname,'../public'))

app.listen(port, () => {
    console.log('server is up on port 3000')
})
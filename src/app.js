const path = require('path')
const express = require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//defining paths

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setting up handlebars and views location
app.set('view engine', 'hbs')
app.set('views',(viewsPath))
hbs.registerPartials(partialsPath)

//setting static directory to serve static assets
app.use(express.static(publicDirectoryPath))


app.get('',(req, res)=>{
    res.render('index',{
        title: "Weather",
        name: "Didier Hategekimana"
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: "About me",
        name: "Didier Hategekimana"
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: "Help center",
        message: "This is a helpful message",
        name: 'Didier Hategekimana'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error : "You must provide the address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{

        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
        
                forecast: forecastData,
                location,
                address: req.query.address
            })
    
          })

})
})

// app.get('/products',(req, res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products:[]
//     })
// })

app.get('help/*', (req, res)=>{
    res.render('errors', {
        title:"404",
        errorMessage: 'Help article not Found',
        name: "Didier Hategekimana"
    })
})

app.get('/*',(req, res)=>{
    res.render('errors',{
        title:"404",
        errorMessage: "Page not found",
        name: "Didier Hategekimana"
    })
})

app.listen(port, ()=>{
    console.log('server is up on port '+ port)
})
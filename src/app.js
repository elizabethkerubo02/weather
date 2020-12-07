const path = require('path');
const express = require('express');//library and express is a function call to store express application
const hbs = require('hbs');
// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');

const app =  express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve

app.use(express.static(publicDirectoryPath));


app.get('', (req,res)=> {
    res.render('index', {
        title: 'weather app',
        name:'elizabeth kerubo'
    });
});

app.get('/help', (req,res)=> {
    res.render('help' ,{
        helpText:'do you need any help',
        title: 'Help page',
        name:'Elizabeth Kerubo'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name:'lizzie victra'
    });
});

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address!'
        });

    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if(error){
            return require.send({error });

        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error})

            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

        })
    })
    // res.send({
    //     forecast:' It is raining',
    //     location: 'Kirinyaga',
    //     address:req.query.address
    // });
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name:'elizabeth Kerubo',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Elizabeth Kerubo',
        errorMessage:'Page not found'
    });
    

})


app.listen(port,() => {
    console.log('server is up on port ' + port);
});
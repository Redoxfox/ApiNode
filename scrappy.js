const express= require('express')
const app = express()
const mysql = require('mysql')
const puppeteer = require('puppeteer');
const myconnection = require('express-myconnection')
//const { route } = require('./routes')
const routes = require('./routes')
const connetionString= require('./config')

app.set('port', process.env.PORT || 9000)
app.listen(app.get('port'), ()=>{
    console.log('server running on port',app.get('port'))
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json())
const dbOptions = connetionString.dbOptions()
app.use(myconnection(mysql,dbOptions,'single'))
app.get('/',(req,res)=>{
    res.send('Hola mundo')
})
app.use('/api',routes)




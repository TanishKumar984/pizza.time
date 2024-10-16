require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');

const PORT = process.env.PORT || 5500

const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('express-flash');

const { Session } = require('inspector');
const { collection } = require('./app/models/menu');
const MongoDbStore = require('connect-mongo');

mongoose.connect('mongodb://localhost:27017/pizza', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection successful');
});

connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});



let mongoStore = MongoDbStore.create({
    mongoUrl: 'mongodb://localhost:27017/pizza',
    collectionName: 'sessions'
});
 

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}
    // cookie: {maxAge: 1000*15}
}))

app.use(flash())

app.use(express.static('public'))
app.use(express.json())

app.use((req,res,next)=> {
    res.locals.session = req.session
    next()
})

app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app)



app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})
const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const app = express()
// MongoDB
const db = require('./config/db')
db()
// Router
const homeRouter = require('./routes/home.route')
const blogRouter = require('./routes/blog.route')

// Urlencoded
app.use(express.urlencoded())
app.use(express.json())

// Server
const port = 8000

// Static
app.use(express.static(path.join(__dirname,'public')));


// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'res' , 'views'));

app.use('/about', blogRouter)
app.use('/blog', blogRouter)
app.use('/', homeRouter)

app.listen(port, () => {
    console.log(`Server listen ${port}`)
});

const homecontroller = require('../app/http/controllers/homecontroller')
const authcontroller = require('../app/http/controllers/authcontroller')
const cartcontroller = require('../app/http/controllers/customers/cartcontroller.js')

function initRoutes(app) {
    app.get('/', homecontroller().index)

    app.get('/cart',cartcontroller().index)
    
    app.get('/login',authcontroller().login)
    
    app.get('/register',authcontroller().register)

    app.post('/update-cart',cartcontroller().update)
    
    
}

module.exports = initRoutes
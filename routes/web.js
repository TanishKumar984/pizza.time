
const homecontroller = require('../app/http/controllers/homecontroller')
const authcontroller = require('../app/http/controllers/authcontroller')
const cartcontroller = require('../app/http/controllers/customers/cartcontroller.js')
const guest = require('../app/http/middleware/guest')
function initRoutes(app) {
    app.get('/', homecontroller().index)

    app.get('/cart',cartcontroller().index)
    
    app.get('/login',guest, authcontroller().login)
    app.post('/login',authcontroller().postLogin)
    
    app.get('/register',guest, authcontroller().register)
    app.post('/register',authcontroller().postRegister)
    app.post('/logout',authcontroller().logout)

    app.post('/update-cart',cartcontroller().update)
    
    
}

module.exports = initRoutes
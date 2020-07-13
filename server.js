if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require ('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

/*  ---------------------------------------------  */
/*                      Routers                    */
/*  ---------------------------------------------  */

const homeRouter = require('./routes/home')


/*  ---------------------------------------------  */
/*            App Use And Set Methods              */
/*  ---------------------------------------------  */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views') );
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static ('public') );
app.use( ('/'), homeRouter );



/*  ---------------------------------------------  */
/*                      Mongo DB                   */
/*  ---------------------------------------------  */

console.log('process.env.DATABASE_URL ' + process.env.DATABASE_URL)
const mongoose = require ('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open',()  => console.log('Connected Mongo'))

/*  ---------------------------------------------  */
/*                  listening Port                 */
/*  ---------------------------------------------  */

app.listen(process.env.PORT || 3000);

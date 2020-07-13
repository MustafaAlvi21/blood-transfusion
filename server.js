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

const mongoose = require ('mongoose');
mongoose.connect(process.env.DATABASW_URL, { useNewUrlParser: true} );
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Mongoose Connected '))

/*  ---------------------------------------------  */
/*                  listening Port                 */
/*  ---------------------------------------------  */

app.listen(process.env.PORT || 3000);
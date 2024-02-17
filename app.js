const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const categoryRoute = require('./routes/category-route');
const connectDatabase = require('./database/connect-database');
const setGlobalVar = require('./middlewares/set-global-var-middleware');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.set('port', 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("layout", { layout: "template/master" });

// Middleware
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(setGlobalVar);

// Route

app.get('/', (req, res) => {
  res.render('category/index');
});

app.use('/categories', categoryRoute);


const start = async () => {
  try {
    await connectDatabase();

    app.listen(app.get('port'), ()=>{
      console.log('Server is listening on port : ' + app.get('port'));
    })
  } catch (error) {
    console.log(error);
  }
}

start();
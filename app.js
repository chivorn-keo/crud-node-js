const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const dashboardRoute = require('./routes/dashboard-route');
const categoryRoute = require('./routes/category-route');
const postRoute = require('./routes/post-route');
const connectDatabase = require('./database/connect-database');
const setGlobalVar = require('./middlewares/set-global-var-middleware');
const methodOverride = require('method-override');
const expressEjsExtend = require('express-ejs-extend');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

app.set('port', 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('ejs', expressEjsExtend);

// Middleware
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(setGlobalVar);

// Route
app.use('/', dashboardRoute);
app.use('/categories', categoryRoute);
app.use('/posts', postRoute);


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
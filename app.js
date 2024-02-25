const dashboardRoute = require('./routes/dashboard-route');
const categoryRoute = require('./routes/category-route');
const postRoute = require('./routes/post-route');
const authRoute = require('./routes/auth-route');

const setGlobalVarMiddleware = require('./middlewares/set-global-var-middleware');
const errorHandlerMiddleware = require('./middlewares/error-handler-middleware');
const authMiddleware = require('./middlewares/auth-middleware');

const connectDatabase = require('./database/connect-database');

const path = require('path');
const express = require('express');
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
  cookie: { maxAge: process.env.SESSION_LIFE_TIME * 60000 },
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(setGlobalVarMiddleware);

// Route
app.use('/auth', authRoute);
app.use('/', authMiddleware, dashboardRoute);
app.use('/categories', authMiddleware, categoryRoute);
app.use('/posts', authMiddleware, postRoute);
app.use(errorHandlerMiddleware);


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
const express = require('express');
//require('dotenv').config();
const path = require('path');
const app = express();
const connectDB = require('./db/db');
// const excel = require('./export/index');


const exphbs = require('express-handlebars');
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'layout' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use('/user', require('./routes/user'));
app.use('/task', require('./routes/task'));

app.get('/', (req, res) => {
  res.render('display');
});

app.use('/export/userexcel', require('./routes/userexcel'));
app.use('/export/taskexcel', require('./routes/taskexcel'));

app.listen(3000, () => console.log('server started'));

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret12',
}));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('BD connect !');
    }
})

const studentsRouter = require('./routes/students');
const classesRouter = require('./routes/classes');

app.get("/", (req, res) => {
    res.status(200).send('<h1>Hello World !</h1>');
});

app.use('/classes', classesRouter);
app.use('/students', studentsRouter);

app.listen(4500, () => {
    console.log('Server is running on http://127.0.0.1:4500');
});
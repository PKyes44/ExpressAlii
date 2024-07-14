const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = 3000;

// __dirname : app.js가 있는 경로
app.set("views", __dirname + `/views`);
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

// 정적 파일
app.use(express.static('public'));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// cookie
app.use(cookieParser());

// session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    cookie : {
        httpOnly: true,
        secure: false,
    },
}));

// 라우팅 파일 선언
const controller = require("./router/controller")(app);

const server = app.listen(port, function() {
    console.log(`Example app listening on ${port}`);
})

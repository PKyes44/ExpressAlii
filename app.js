const express = require('express');
const ejs = require('ejs');

const app = express();
const port = 3000;

// __dirname : app.js가 있는 경로
app.set("views", __dirname + `/views`);
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

app.use(express.static('public'));

// 라우팅 파일 선언
const controller = require("./router/controller")(app);

const server = app.listen(port, function() {
    console.log(`Example app listening on ${port}`);
})

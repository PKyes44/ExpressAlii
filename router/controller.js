module.exports = function(app) {
    const db = require('./../db');

    app.get('/', function(req, res) {
        db.getMembers((rows) => {
            console.log(rows);
            res.render(`index.html`, {
                rows: rows,
            });
        });
    }); 
    app.post('/', function(req, res) {
        if (req.session.loginMemberData != undefined) {
            const response = {
                code : 200,
                message: req.session.loginMemberData,
            }
            res.status(200).json(response);
        } else {
            const response = {
                code : 500,
                message: "Cannot find login session",
            }
            res.status(500).json(response);
        }

    })

    app.get('/shop', function(req, res) {
        res.render(`sell_item.html`);
    })

    app.get('/login', function(req,res) {
        res.render(`login.html`);
    })
    app.post('/process_login', function(req, res) {
        console.log("Successfully process login enter");
        console.log(`req : ${req}`);
        console.log(`body : ${JSON.stringify(req.body)}`)
        console.log(`id : ${req.body.id}\npassword : ${req.body.password}`);

        db.loginCheck(
            {
                id: req.body.id,
                password: req.body.password
            }, (rows) => {
            console.log(rows);
            if (rows.length != 0) {
                console.log("Successfully response ready");

                const response = {
                    code: 200,
                    message: "Successfully login"
                }

                req.session.loginMemberData = req.body.id;
                                
                res.status(200).json(response);
            } else {
                console.log("Faild response ready");

                const response = {
                    code: 500,
                    message: "Cannot find ID & password",
                }
                
                res.status(500).json(response);
            }
        })
    })

    app.get('/regist', function(req,res) {
        res.render('regist.html');
    })
    app.post('/process_regist',function(req, res) {
        console.log("Successfully process regist enter");
        console.log(`req : ${req}`);
        console.log(`body : ${req.body}`)
        console.log(`id : ${req.body.id}\npassword : ${req.body.password}`);

        db.getIds((rows) => {
            console.log(rows);
            var isDuplicate = false;
            for (index in rows) {
                if (rows[index]['id'] == req.body.id) {
                    isDuplicate = true;
                }
            }
            console.log(`isDuplicate : ${isDuplicate}`);
            if (isDuplicate) {
                const response = {
                    code: 500,
                    message: 'ID is duplicate',
                }

                console.log("ID is duplicate");
                res.status(500).json(response);
            } else {
                console.log(req.body);
                db.createMember({
                    id: req.body.id,
                    password: req.body.password,
                });
                
                const response = {
                    code: 200,
                    message: 'Create ID Completed',
                }

                console.log("Create ID Completed");
                res.status(200).json(response);
            }
        });
    }); 

    app.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect('/');
    }); 

    app.post('/process_item_sell', function(req,res) {
        console.log(req.body);
    })
}
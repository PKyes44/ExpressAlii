module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render(`index.html`);
    }); 

    app.get('/shop', function(req, res) {
        res.render(`shop.html`);
    })
}
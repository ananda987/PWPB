var mysql = require('mysql')
// membuat koneksi
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "market_nona_xiirpl2"
})

db.connect(function (error) {
    if (error) throw error;
    console.log('connect')

})

module.exports = db;
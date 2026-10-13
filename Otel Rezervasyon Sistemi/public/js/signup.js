const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require("cors");
// Express uygulaması oluştur
const app = express();
app.use(cors());
// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL bağlantısı
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'ilkveritabanım',
});

// MySQL'e bağlan
db.connect((err) => {
    if (err) {
        console.error('Database bağlantı hatası:', err);
        return;
    }
    console.log('Database bağlandı!');
});

// Kullanıcı kaydı route
app.post('/register', (req, res) => {
    const {musteriKimlik, name, surname, email,iletisimNumarasi, password } = req.body;

    const query = 'INSERT INTO musteri (musteriKimlik,isim, soyisim, eposta,iletisimNumarasi, sifre) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [musteriKimlik,name, surname, email,iletisimNumarasi, password], (err, result) => {
        if (err) {
            console.error('Hata:', err);
            return res.status(500).send('Kayıt işlemi başarısız.');
        }
        res.send('Kayıt başarıyla tamamlandı!');
    });
});


// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`);
});

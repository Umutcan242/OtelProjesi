const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// MySQL Bağlantısı
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "ilkveritabanım",
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Bağlantısı Başarılı!");
});

// Giriş Yap API'si
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    
     // Kullanıcıyı veritabanında arayın (yönetici tablosu ve müşteri tablosu)
     const queryAdmin = "SELECT * FROM yonetici WHERE eposta = ?";
     const queryCustomer = "SELECT * FROM musteri WHERE eposta = ?";
 
     // İlk önce yönetici tablosunda kontrol et
     db.query(queryAdmin, [email], (err, result) => {
         if (err) return res.status(500).json({ error: "Database error" });
 
         if (result.length > 0) {
             // Yönetici bulundu
             const user = result[0];
 
             // Şifreyi kontrol et
             if (password === user.sifre) {  // Şifreyi bcrypt yerine doğrudan karşılaştırıyoruz
                 return res.json({ message: "Admin giriş başarılı!", redirect:"adminpage.html", user: { id: user.id, email: user.eposta } });
             } else {
            return res.status(401).json({ error: "Invalid email or password" });
             }
         }
 
         // Eğer yönetici tablosunda bulamazsak, müşteri tablosunda ara
         db.query(queryCustomer, [email], (err, result) => {
             if (err) return res.status(500).json({ error: "Database error" });
 
             if (result.length > 0) {
                 // Müşteri bulundu
                 const user = result[0];
 
                 // Şifreyi kontrol et
                 if (password === user.sifre) {  // Şifreyi bcrypt yerine doğrudan karşılaştırıyoruz
                     return res.json({ message: "Customer giriş başarılı!",redirect:"index.html" ,user: { id: user.id, email: user.eposta } });
                 } else {
                     return res.status(401).json({ error: "Invalid email or password" });
                 }
             } else {
                 return res.status(401).json({ error: "Invalid email or password" });
             }
         });
     });
 });
 app.post("/register", (req, res) => {
    const {musteriKimlik, name, surname, email,iletisimNumarasi, password } = req.body;

    const query = 'INSERT INTO musteri (musteriKimlik,isim, soyisim, eposta, iletisimNumarasi, sifre) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [musteriKimlik, name, surname, email, iletisimNumarasi, password], (err, result) => {
        if (err) {
            console.error('Hata:', err);
            return res.status(500).send('Kayıt işlemi başarısız.');
        }
        res.send('Kayıt başarıyla tamamlandı!');
    });
});


// Sunucuyu Başlat
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`);
});

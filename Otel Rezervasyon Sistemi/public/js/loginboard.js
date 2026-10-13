document.getElementById("onloginPnl").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();


    // Page content genişliğini ayarla
    document.querySelector(".pagecontent").style.width = "calc(100% - 350px)";
    document.querySelector(".account-options").style.width = "calc(100% - 350px)";
    
    // Login board görünür yap
    document.querySelector(".loginBoard").style.opacity = "1";
    document.querySelector(".loginBoard").style.visibility = "visible"; // Geçiş için opacity ve visibility kullanıldı

    // Nav item'ların görünürlüğünü gizle
    document.querySelectorAll(".nav-links .nav-item").forEach(item => {
        item.style.opacity = "0"; // Opaklık 0, gizli yapar
        item.style.pointerEvents = "none"; // Tıklanamaz hale getirme
    });
});

document.getElementById("closeloginPnl").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Page content genişliğini eski haline getir
    document.querySelector(".pagecontent").style.width = "100%";
    document.querySelector(".account-options").style.width = "100%";
    
    // Login board'ı gizle
    document.querySelector(".loginBoard").style.opacity = "0";
    document.querySelector(".loginBoard").style.visibility = "hidden"; // Geçiş için opacity ve visibility kullanıldı

    // Nav item'ların görünürlüğünü tekrar aç
    document.querySelectorAll(".nav-links .nav-item").forEach(item => {
        item.style.opacity = "1"; // Opaklık 1, görünür yapar
        item.style.pointerEvents = "auto"; // Tıklanabilir hale getir
    });
});


document.getElementById("my-account-btn").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if(window.innerWidth <= 1024){
    
            // Page content genişliğini eski haline getir
    document.querySelector(".pagecontent").style.width = "100%";
    document.querySelector(".account-options").style.width = "100%";
    
    // Login board'ı gizle
    document.querySelector(".loginBoard").style.opacity = "0";
    document.querySelector(".loginBoard").style.visibility = "hidden"; // Geçiş için opacity ve visibility kullanıldı

    // Nav item'ların görünürlüğünü tekrar aç
    document.querySelectorAll(".nav-links .nav-item").forEach(item => {
        item.style.opacity = "1"; // Opaklık 1, görünür yapar
        item.style.pointerEvents = "auto"; // Tıklanabilir hale getir
    });
    // Menü butonuna tıklanmış gibi davran
    document.querySelector(".menubar-btn").click();

    // Bu, menü açma/kapama işlevini tetikler.

    }

    document.querySelector(".account-options ").style.display = "block";
    document.querySelector(".pagecontent").style.display = "none";
    document.querySelector(".my-rezervation").style.display = "none";

    document.querySelector(".my-account").style.display = "block";

});

document.getElementById("my-reservations-btn").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(window.innerWidth <= 1024){
            // Page content genişliğini eski haline getir
    document.querySelector(".pagecontent").style.width = "100%";
    document.querySelector(".account-options").style.width = "100%";
    
    // Login board'ı gizle
    document.querySelector(".loginBoard").style.opacity = "0";
    document.querySelector(".loginBoard").style.visibility = "hidden"; // Geçiş için opacity ve visibility kullanıldı

    // Nav item'ların görünürlüğünü tekrar aç
    document.querySelectorAll(".nav-links .nav-item").forEach(item => {
        item.style.opacity = "1"; // Opaklık 1, görünür yapar
        item.style.pointerEvents = "auto"; // Tıklanabilir hale getir
    });

        // Menü butonuna tıklanmış gibi davran
    document.querySelector(".menubar-btn").click();

    // Bu, menü açma/kapama işlevini tetikler.

    }
    document.querySelector(".account-options").style.display = "block";
    document.querySelector(".pagecontent").style.display = "none";
    document.querySelector(".my-rezervation").style.display = "block";

    document.querySelector(".my-account").style.display = "none";

});


document.querySelector('.menubar-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Varsayılan davranışı engelleme (isteğe bağlı)
    event.stopPropagation(); // Olayın başka yere yayılmasını engelleme (isteğe bağlı)
  
    var navItems = document.querySelectorAll(".nav-links .nav-item"); // Tüm nav-item öğelerini al
    var navLinks = document.querySelector(".nav-links");
    const navbar = document.querySelector("nav");
    const onLoginItem = document.getElementById("onloginPnl");
  
    // Menü açma ve kapama işlemi
    if (navLinks.style.display === "block") {
      navLinks.style.display = "none";  // Menü kapanacak
      navLinks.style.height = "";       // Menü yüksekliğini eski haline getir
      navLinks.style.padding = "";
      navbar.style.backgroundColor = ""; // Navbar arka plan rengini sıfırla
  
      // Her nav-item için stil sıfırlama
      navItems.forEach(function(item) {
        item.style.display = "none";   // Öğeleri gizle
        item.style.margin = "";        // Margin sıfırlanır
        item.style.backgroundColor = ""; // Arka plan rengini sıfırlanır
        item.style.color = "";         // Metin rengini sıfırlanır
        item.style.borderRadius = "";  // Border-radius sıfırlanır
      });
    } else {
      navLinks.style.display = "block";  // Menü açılacak
      navLinks.style.width = "100%";
      navLinks.style.height = "100vh";   // Menü yüksekliğini tam ekran yap
      navLinks.style.padding = "20px";
      navLinks.style.backgroundColor = "#212121"; // Menü arka plan rengini koyu gri yap
      navbar.style.backgroundColor = "#212121";  // Navbar arka planını koyu gri yap
  
      // Her nav-item için stil uygulama
      navItems.forEach(function(item) {
        item.style.display = "block";   // Öğeleri alt alta yerleştir
        item.style.width = "100%";      // Her öğenin genişliğini 100% yap
        item.style.backgroundColor = "#212121"; // Arka plan rengini koyu gri yap
        item.style.margin = "5px 0px"; // Her öğe arasında boşluk bırak
        item.style.textAlign = "left"; // Öğeleri sola hizala
        item.style.color = "#fff";     // Metin rengini beyaz yap
        item.style.borderBottom = "1px solid #fff"; // Öğeler arasında beyaz bir alt kenarlık ekle
      });
      onLoginItem.style.borderBottom = "none";
      onLoginItem.style.width = "100px";
    }
  });
  
  // Sayfa boyutu değiştiğinde menüyü eski haline getir
  window.addEventListener('resize', function() {
    var navLinks = document.querySelector(".nav-links");
    var navItems = document.querySelectorAll(".nav-links .nav-item");
    const navbar = document.querySelector("nav");
  
    // Ekran genişliği 1024px ve üstünde ise menü ve stil sıfırlanacak
    if (window.innerWidth > 1024) {
      navLinks.style.display = "";  // Menü açılacak
      navLinks.style.width = "";
      navLinks.style.height = "";       // Menü yüksekliğini sıfırlanacak
      navLinks.style.padding = "";
      navLinks.style.backgroundColor = ""; // Menü arka plan rengini koyu gri yap
      navbar.style.backgroundColor = ""; // Navbar arka plan rengini sıfırlanacak
  
      // Menü öğelerinin stilini sıfırlama
      navItems.forEach(function(item) {
        item.style.display = "flex";   // Öğeleri alt alta yerleştir
        item.style.width = "";      // Her öğenin genişliğini 100% yap
        item.style.backgroundColor = ""; // Arka plan rengini koyu gri yap
        item.style.margin = ""; // Her öğe arasında boşluk bırak
        item.style.textAlign = ""; // Öğeleri sola hizala
        item.style.color = "#fff";     // Metin rengini beyaz yap
        item.style.borderBottom = "none"; // Öğeler arasında beyaz bir alt kenarlık ekle
      });
    }
  });
  


  document.querySelectorAll(".select-btn").forEach(function(button) {
    button.addEventListener("click", function(event) {
        const targetURL = `./rooms.html?`; // Burada URL'yi dinamik yapabilirsiniz.
        console.log("Hedef URL:", targetURL);

        window.location.href = targetURL;
    });
});

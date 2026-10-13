document.addEventListener("scroll", function () {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 50) { // 50px aşağı kaydırıldığında
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const sliderContent = document.querySelector('.slider-content');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentIndex = 0;
let slidesToShow = 3; // Başlangıçta masaüstü için varsayılan sütun sayısı
const totalSlides = slides.length;
let maxIndex;
let autoSlideInterval;

// Slider'ı güncelle
function updateSlider() {
  const offset = -currentIndex * (100 / slidesToShow);
  sliderContent.style.transform = `translateX(${offset}%)`;
}

// Ekran boyutuna göre sütun sayısını ayarla
function updateSlidesToShow() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 600) {
    slidesToShow = 1; // Mobilde 1 sütun
  } else if (screenWidth <= 768) {
    slidesToShow = 2; // Tablet için 2 sütun
  } else {
    slidesToShow = 3; // Masaüstü için 3 sütun
  }

  maxIndex = totalSlides - slidesToShow; // Maksimum kaydırma sınırı
  currentIndex = Math.min(currentIndex, maxIndex); // Aktif indeksi sınırla
  updateSlider(); // Slider'ı güncelle
}

// Otomatik kaydırma başlat
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % (maxIndex + 1);
    updateSlider();
  }, 3000); // Her 3 saniyede bir kaydır
}

// Otomatik kaydırmayı durdur
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Kullanıcı etkileşimi durumunda sıfırla ve başlat
function resetAndStartSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Buton olayları
prevBtn.addEventListener('click', () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
  updateSlider();
  resetAndStartSlide();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % (maxIndex + 1);
  updateSlider();
  resetAndStartSlide();
});

// Sayfa boyutu değiştiğinde sütun sayısını güncelle
window.addEventListener('resize', updateSlidesToShow);

// İlk başlatma
updateSlidesToShow();
startAutoSlide();


const calendarDaysContainer = document.getElementById("calendar-days");
const calendarMonthElement = document.getElementById("calendar-month");
const calendarContainer = document.getElementById("calendar-container");
const selectedDateElement = document.getElementById("selectedDate");
let lastSelectedDate = "--.--.--"; // Varsayılan giriş tarihi

const outcalendarDaysContainer = document.getElementById("out-calendar-days");
const outcalendarMonthElement = document.getElementById("out-calendar-month");
const outcalendarContainer = document.getElementById("outcalendar-container");
const outselectedDateElement = document.getElementById("outselectedDate");
let outlastSelectedDate = "--.--.--"; // Varsayılan çıkış tarihi

let selectedEntryDate = null; // Giriş tarihi
let selectedExitDate = null; // Çıkış tarihi

// İlk açılış için tarih seçiciyi gizle
calendarContainer.style.display = "none";
outcalendarContainer.style.display = "none";

// Giriş tarihi seçmek için açılır
document.querySelector(".signDate").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if(calendarContainer.style.display == "block"){
    calendarContainer.style.display = "none";
    outcalendarContainer.style.display = "none";
    document.querySelector(".members .users").style.display="none";
  }
  else{
    calendarContainer.style.display = "block";
    outcalendarContainer.style.display = "none";
    document.querySelector(".members .users").style.display="none";
  }

});

// Çıkış tarihi seçmek için açılır
document.querySelector(".outDate").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if(outcalendarContainer.style.display == "block"){
    outcalendarContainer.style.display = "none";
    calendarContainer.style.display = "none";
    document.querySelector(".members .users").style.display="none";
  }else{
    outcalendarContainer.style.display = "block";
    calendarContainer.style.display = "none";
    document.querySelector(".members .users").style.display="none";
  }

});

// Giriş tarih takvimini kapatma
document.querySelector(".signcalendar-button-close").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  calendarContainer.style.display = "none";
  selectedDateElement.textContent = lastSelectedDate;
});

// Çıkış tarih takvimini kapatma
document.querySelector(".outcalendar-button-close").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  outcalendarContainer.style.display = "none";
  outselectedDateElement.textContent = outlastSelectedDate;
});

// Giriş tarihi seçimi
// Giriş tarihi seçimi
function handleDateSelection(date) {
  event.preventDefault();
  event.stopPropagation();

  const [year, month, day] = date.split("-");
  const formattedDate = `${day}/${month}/${year}`;
  const entryDate = new Date(year, month - 1, day); // Giriş tarihini oluştur

  // Çıkış tarihi varsa kontrol et
  if (selectedExitDate && entryDate >= selectedExitDate) {
    alert("Giriş tarihi, çıkış tarihinden en az bir gün önce olmalıdır!");
    return;
  }

  lastSelectedDate = formattedDate; // Son seçilen tarihi kaydet
  selectedEntryDate = entryDate; // Giriş tarihini sakla
  selectedDateElement.textContent = formattedDate; // Görüntü güncelle
  calendarContainer.style.display = "none";
}

// Çıkış tarihi seçimi
function outhandleDateSelection(date) {
  event.preventDefault();
  event.stopPropagation();

  const [year, month, day] = date.split("-");
  const formattedDate = `${day}/${month}/${year}`;
  const exitDate = new Date(year, month - 1, day); // Çıkış tarihini oluştur

  // Tarih kontrolü
  if (selectedEntryDate && exitDate <= selectedEntryDate) {
    alert("Çıkış tarihi, giriş tarihinden en az bir gün sonra olmalıdır!");
    return;
  }

  outlastSelectedDate = formattedDate; // Son seçilen çıkış tarihini kaydet
  selectedExitDate = exitDate; // Çıkış tarihini sakla
  outselectedDateElement.textContent = formattedDate; // Görüntü güncelle
  outcalendarContainer.style.display = "none";
}

const monthNames = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

let currentYear = 2024;
let currentMonth = 10; // Kasım (0 tabanlı)

// Bugünün tarihi
const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDate = today.getDate();

// Takvim günlerini yükleme fonksiyonu (Giriş)
function loadCalendarDays(year, month) {
  calendarDaysContainer.innerHTML = ""; // Önceki günleri temizle

  const firstDay = new Date(year, month, 1).getDay(); // Haftanın günü
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Ayın toplam günü

  const offset = (firstDay === 0 ? 6 : firstDay - 1); // Pazartesi başlangıcı için
  for (let i = 0; i < offset; i++) {
    const emptyDiv = document.createElement("div");
    calendarDaysContainer.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayButton = document.createElement("button");
    dayButton.classList.add("day");
    dayButton.textContent = day;
    const formattedDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    dayButton.setAttribute("data-date", formattedDate);

    const isPastDate =
      year < todayYear ||
      (year === todayYear && month < todayMonth) ||
      (year === todayYear && month === todayMonth && day < todayDate);

    if (isPastDate) {
      dayButton.disabled = true;
      dayButton.classList.add("disabled");
    } else {
      dayButton.addEventListener("click", () => {
        handleDateSelection(formattedDate);
      });
    }

    calendarDaysContainer.appendChild(dayButton);
  }

  calendarMonthElement.textContent = `${monthNames[month]} ${year}`;
}

// Takvim günlerini yükleme fonksiyonu (Çıkış)
function outloadCalendarDays(year, month) {
  outcalendarDaysContainer.innerHTML = ""; // Önceki günleri temizle

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const offset = (firstDay === 0 ? 6 : firstDay - 1);
  for (let i = 0; i < offset; i++) {
    const emptyDiv = document.createElement("div");
    outcalendarDaysContainer.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayButton = document.createElement("button");
    dayButton.classList.add("day");
    dayButton.textContent = day;
    const formattedDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    dayButton.setAttribute("data-date", formattedDate);

    const isPastDate =
      year < todayYear ||
      (year === todayYear && month < todayMonth) ||
      (year === todayYear && month === todayMonth && day < todayDate);

    if (isPastDate) {
      dayButton.disabled = true;
      dayButton.classList.add("disabled");
    } else {
      dayButton.addEventListener("click", () => {
        outhandleDateSelection(formattedDate);
      });
    }

    outcalendarDaysContainer.appendChild(dayButton);
  }

  outcalendarMonthElement.textContent = `${monthNames[month]} ${year}`;
}

// Takvimleri başlat
loadCalendarDays(currentYear, currentMonth);
outloadCalendarDays(currentYear, currentMonth);

// Global değişkenler

// Ay navigasyon düğmeleri
document.getElementById("prev-month").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  loadCalendarDays(currentYear, currentMonth);
});

document.getElementById("next-month").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  currentMonth++;
  if (currentMonth > 11) { // Ay 0-11 arasında olmalı
    currentMonth = 0;
    currentYear++;
  }
  loadCalendarDays(currentYear, currentMonth);
});

document.getElementById("out-prev-month").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  outloadCalendarDays(currentYear, currentMonth);
});

document.getElementById("out-next-month").addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  currentMonth++;
  if (currentMonth > 11) { // Ay 0-11 arasında olmalı
    currentMonth = 0;
    currentYear++;
  }
  outloadCalendarDays(currentYear, currentMonth);
});



document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const adultValue = document.querySelector(".adult-value");
  const childValue = document.querySelector(".child-value");
  const roomValue = document.querySelector(".room-value");
  const strongElement = document.querySelector(".rezerveOptions .value-users");

  const btnLessAdult = document.querySelector(".less-adult");
  const btnAddAdult = document.querySelector(".add-adult");
  const btnLessChild = document.querySelector(".less-child");
  const btnAddChild = document.querySelector(".child-adult");
  const btnLessRoom = document.querySelector(".less-room");
  const btnAddRoom = document.querySelector(".room-adult");
  const resetBtn = document.querySelector(".reset-btn");
  const applyBtn = document.querySelector(".apply-btn");
  const container = document.querySelector(".users"); // Konteyner
  const liElement = document.querySelector(".members"); // Liste elemanı

  // Minimum and Maximum Values
  const minAdult = 1, maxAdult = 5;
  const minChild = 0, maxChild = 5;
  const minRoom = 1, maxRoom = 5;

  // Update Strong Element
  const updateStrong = () => {
    const adults = parseInt(adultValue.textContent);
    const children = parseInt(childValue.textContent);
    const rooms = parseInt(roomValue.textContent);
    strongElement.textContent = `${adults} Yetişkin, ${children} Çocuk, ${rooms} Oda.`;
  };

  // Increment or Decrement Functions
  const increment = (valueElement, maxValue) => {
    const currentValue = parseInt(valueElement.textContent);
    if (currentValue < maxValue) {
      valueElement.textContent = currentValue + 1;
    }
  };

  const decrement = (valueElement, minValue) => {
    const currentValue = parseInt(valueElement.textContent);
    if (currentValue > minValue) {
      valueElement.textContent = currentValue - 1;
    }
  };

  // Reset Function
  const resetValues = () => {
    event.preventDefault();
    event.stopPropagation();
    adultValue.textContent = minAdult;
    childValue.textContent = minChild;
    roomValue.textContent = minRoom;
  };

  // Toggle Container Visibility
  const toggleContainer = () => {
    if (container.style.display === "block") {
      container.style.display = "none";
      document.getElementById("outcalendar-container").style.display="none";
      document.getElementById("calendar-container").style.display="none";
    } else {
      container.style.display = "block";
      document.getElementById("outcalendar-container").style.display="none";
      document.getElementById("calendar-container").style.display="none";
    }
  };

  // Apply Function
  const applyValues = () => {
    event.preventDefault();
    event.stopPropagation();
    updateStrong(); // Seçimleri güncelle
    container.style.display = "none"; // Konteyneri kapat
    
  };

  // Event Listeners for Buttons
  btnAddAdult.addEventListener("click", () => {
    event.preventDefault();
    event.stopPropagation();
    increment(adultValue, maxAdult);
  
  });
  btnLessAdult.addEventListener("click", () => {
    event.preventDefault();
    event.stopPropagation();
    decrement(adultValue, minAdult);

  });

  btnAddChild.addEventListener("click", () => {
    event.preventDefault();
    event.stopPropagation();
    increment(childValue, maxChild);
   
  });
  btnLessChild.addEventListener("click", () => {
    event.preventDefault();
    event.stopPropagation();
    decrement(childValue, minChild);

  });

  btnAddRoom.addEventListener("click", () => {
    event.preventDefault();
    event.stopPropagation();
    increment(roomValue, maxRoom);
 
  });
  btnLessRoom.addEventListener("click", () => {
    event.preventDefault();
    event.stopPropagation();
    decrement(roomValue, minRoom);

  });

  resetBtn.addEventListener("click", resetValues);
  applyBtn.addEventListener("click", applyValues);

  // Toggle container when li is clicked
  liElement.addEventListener("click", toggleContainer);

  // Initialize
  container.style.display = "none"; // Başlangıçta gizli
  resetValues();
});



document.querySelector('.search-btn').addEventListener('click', function () {
  const girişTarihi = document.getElementById('selectedDate').textContent.trim();
  const çıkışTarihi = document.getElementById('outselectedDate').textContent.trim();
  const yetişkinSayısı = document.querySelector('.adult-value').textContent.trim();
  const çocukSayısı = document.querySelector('.child-value').textContent.trim();
  const odaSayısı = document.querySelector('.room-value').textContent.trim();

  if (girişTarihi === '--.--.--' || çıkışTarihi === '--.--.--') {
      alert('Lütfen giriş ve çıkış tarihlerini seçiniz!');
  } else {
      // URL parametreleri oluştur
      const params = new URLSearchParams({
          girişTarihi: girişTarihi,
          çıkışTarihi: çıkışTarihi,
          yetişkinSayısı: yetişkinSayısı,
          çocukSayısı: çocukSayısı,
          odaSayısı: odaSayısı
      }).toString();

      // Hedef sayfaya yönlendirme
      window.location.href = `./rezervationSearch.html?${params}`;
  }
});








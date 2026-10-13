
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const girişTarihi = params.get('girişTarihi');
  const çıkışTarihi = params.get('çıkışTarihi');
  const yetişkinSayısı = params.get('yetişkinSayısı');
  const çocukSayısı = params.get('çocukSayısı');
  const odaSayısı = params.get('odaSayısı');

  // Alınan bilgileri kullan
  console.log('Giriş Tarihi:', girişTarihi);
  console.log('Çıkış Tarihi:', çıkışTarihi);
  console.log('Yetişkin Sayısı:', yetişkinSayısı);
  console.log('Çocuk Sayısı:', çocukSayısı);
  console.log('Oda Sayısı:', odaSayısı);

  // Bilgileri sayfa üzerinde gösterme (örnek)
  document.getElementById('selectedDate').textContent = girişTarihi || 'Belirtilmemiş';
  document.getElementById('outselectedDate').textContent = çıkışTarihi || 'Belirtilmemiş';
  document.querySelector('.adult-value').textContent = yetişkinSayısı || '0';
  document.querySelector('.child-value').textContent = çocukSayısı || '0';
  document.querySelector('.room-value').textContent = odaSayısı || '0';
  document.querySelector('.search-btn').click();
});






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
  const btnLessRoom = document.querySelector(".less-room");
  const btnAddRoom = document.querySelector(".room-adult");
  const strongElement = document.querySelector(".rezerveOptions .value-users");

  const btnLessAdult = document.querySelector(".less-adult");
  const btnAddAdult = document.querySelector(".add-adult");
  const btnLessChild = document.querySelector(".less-child");
  const btnAddChild = document.querySelector(".child-adult");

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



// Örnek sabit oda verisi
const roomsData = [
  {
    id: 1,
    type: 'Standart Oda',
    size: '12 m²',
    beds: 2,
    features: ['Wi-Fi', 'Akıllı TV', 'Ücretsiz Otopark', 'Mini Bar', 'Klima'],
    image: './image/beach-3.jpeg',
    price:'500',
  },
  {
    id: 2,
    type: 'Lüks Daire',
    size: '24 m²',
    beds: 2,
    features: ['Spa', 'Wi-Fi', 'Akıllı TV', 'Ücretsiz Otopark', 'Mini Bar', 'Klima'],
    image: './image/beac5.jpeg',
    price:'500',
  },
  {
    id: 3,
    type: 'Aile Süiti',
    size: '35 m²',
    beds: 3,
    features: ['Balkon', 'Wi-Fi', 'Ücretsiz Otopark', 'Mini Bar', 'Klima'],
    image: './image/beach-4.jpg',
    price:'500',
  },
];



document.querySelector('.search-btn').addEventListener('click', function () {
  const girişTarihi = document.getElementById('selectedDate').textContent.trim();
  const çıkışTarihi = document.getElementById('outselectedDate').textContent.trim();

  if (girişTarihi === '--.--.--' || çıkışTarihi === '--.--.--') {
    alert('Lütfen giriş ve çıkış tarihlerini seçiniz!');
  } else {
    console.log("Odalar aranıyor");
    // Örnek: Odaların müsaitlik durumu
    const roomsSection = document.querySelector('.rooms');
    roomsSection.innerHTML = ''; // Mevcut odaları temizle
    
    roomsData.forEach((room, index) => {
      const roomHTML = `
        <section class="rooms${index % 2 === 0 ? '1' : '2'}">
          <div class="container">
            <div class="header">
              <h1>${room.type}</h1>
              <hr>
            </div>
            <div class="left">
              <img src="${room.image}" alt="${room.type}" />
            </div>
            <div class="right">
              <ul class="room-features">
                <li><i class="fa-solid fa-ruler-combined"></i><span>${room.size}</span></li>
                <li><i class="fa-solid fa-bed"></i><span>${room.beds} Yatak Odası</span></li>
                ${room.features.map((feature) => `<li><i class="fa-solid fa-check"></i><span>${feature}</span></li>`).join('')}
              </ul>
              <div class="room-footer">
                <div class="price">
                  <span>Fiyat: <strong>₺500 / Gece</strong></span>
                </div>
                <div class="rezerveBtn">
                  <a href="#" 
                    class="reserve-btn" 
                    data-room-type="${room.type}" 
                    data-price="${room.price}" 
                    data-img="${room.image}"
                    data-features="">
                    Rezerve Et
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
      roomsSection.innerHTML += roomHTML;
    });
  }
});

// Event delegation kullanarak rezerve butonlarına tıklama işlemi ekleme
document.querySelector('.rooms').addEventListener('click', function(event) {
  if (event.target && event.target.classList.contains('reserve-btn')) {
    event.preventDefault();
    
    const girişTarihi = document.getElementById('selectedDate').textContent.trim();
    const çıkışTarihi = document.getElementById('outselectedDate').textContent.trim();
    const yetişkinSayısı = document.querySelector('.adult-value').textContent.trim();
    const çocukSayısı = document.querySelector('.child-value').textContent.trim();
    const odaSayısı = document.querySelector('.room-value').textContent.trim();

    // Parametreleri al
    const params = new URLSearchParams({
      girişTarihi: girişTarihi,
      çıkışTarihi: çıkışTarihi,
      yetişkinSayısı: yetişkinSayısı,
      çocukSayısı: çocukSayısı,
      odaSayısı: odaSayısı,
      roomHeader: event.target.dataset.roomType,
      firstPrice: event.target.dataset.price,
      roomImg: event.target.dataset.img
    }).toString();

    // Yönlendirme yap
    const targetURL = `./addrezervation.html?${params}`;
    console.log("Hedef URL:", targetURL);

    window.location.href = targetURL;
  }
});

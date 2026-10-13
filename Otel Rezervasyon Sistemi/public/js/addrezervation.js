document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const girişTarihi = params.get('girişTarihi');
  const çıkışTarihi = params.get('çıkışTarihi');
  const yetişkinSayısı = params.get('yetişkinSayısı');
  const çocukSayısı = params.get('çocukSayısı');
  const odaSayısı = params.get('odaSayısı');
  const firstPrice=params.get('firstPrice');
  const roomImg=params.get('roomImg');
  const roomHeader=params.get('roomHeader');

  // Alınan bilgileri kullan
  console.log('Giriş Tarihi:', girişTarihi);
  console.log('Çıkış Tarihi:', çıkışTarihi);
  console.log('Yetişkin Sayısı:', yetişkinSayısı);
  console.log('Çocuk Sayısı:', çocukSayısı);
  console.log('Oda Sayısı:', odaSayısı);
  console.log('fİYAT:', firstPrice);
  console.log('ROOM HEADER:', roomHeader);

  setPrice(parseFloat(firstPrice));




// Giriş ve çıkış tarihlerini kontrol ve dönüştürme
if (!girişTarihi || !çıkışTarihi || girişTarihi === "--.--.--" || çıkışTarihi === "--.--.--") {
  console.log("Tarihler boş olamaz!");
  
  visitDay = 1; // Hesaplanan gün sayısını kaydet
}
else{
  const girişDate = new Date(girişTarihi.split('/').reverse().join('-')); // 'dd.mm.yyyy' -> 'yyyy-mm-dd'
const çıkışDate = new Date(çıkışTarihi.split('/').reverse().join('-')); // 'dd.mm.yyyy' -> 'yyyy-mm-dd'

// Gün farkını hesaplama
const timeDifference = çıkışDate - girişDate;
let stayDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Milisaniyeden gün farkına

// Gün farkı geçersizse veya negatifse kontrol
if (isNaN(stayDays) || stayDays <= 0) {
  console.log("Geçersiz tarih farkı veya çıkış tarihi giriş tarihinden önce olamaz!");

  stayDays = 1; // Varsayılan olarak 1 gün atanabilir
}

visitDay = stayDays; // Hesaplanan gün sayısını kaydet
console.log("Gün Sayısı:", visitDay);

}





  // Bilgileri sayfa üzerinde gösterme (örnek)
  document.getElementById('selectedDate').textContent = girişTarihi || 'Belirtilmemiş';
  document.getElementById('outselectedDate').textContent = çıkışTarihi || 'Belirtilmemiş';
  document.getElementById('roomImg').src = roomImg || 'default-image.jpg';

  document.querySelector('.OdaName').textContent = roomHeader || 'Belirtilmemiş';
  document.querySelector('.adult-value').textContent = yetişkinSayısı || '0';
  document.querySelector('.child-value').textContent = çocukSayısı || '0';
  document.querySelector(".total-price").textContent=firstPrice||'0'; // Add this element for total price
 

 
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
  updatePrice2();
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
  updatePrice2();
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


let visitDay;

let fPrice;
function setPrice(Price) {
  fPrice = Price;  // 'fPrice' değişkenine 'Price' değerini atama
}

function updatePrice2() {
  const priceElement = document.querySelector(".total-price");
  const girişTarihi = document.getElementById("selectedDate").textContent.trim();
  const çıkışTarihi = document.getElementById("outselectedDate").textContent.trim();

  // Giriş ve çıkış tarihlerini Date objesine dönüştürme
  const girişDate = new Date(girişTarihi.split('/').reverse().join('-')); // 'dd.mm.yyyy' -> 'yyyy-mm-dd'
  const çıkışDate = new Date(çıkışTarihi.split('/').reverse().join('-')); // 'dd.mm.yyyy' -> 'yyyy-mm-dd'

  if (isNaN(girişDate) || isNaN(çıkışDate)) {
    priceElement.textContent = "₺0"; // Tarihler geçerli değilse fiyat sıfır
    return;
  }

  // Gün farkını hesaplama
  const timeDifference = çıkışDate - girişDate;
  const stayDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Milisaniyeden gün farkına

  if (stayDays <= 0) {
    alert("Çıkış tarihi giriş tarihinden önce veya aynı olamaz!");
    priceElement.textContent = "₺0"; // Hatalı durum için sıfır fiyat
    return;
  }
  const adultValue = document.querySelector(".adult-value");
  const childValue = document.querySelector(".child-value");
  const roomValue = document.querySelector(".room-value");
  const adults = parseInt(adultValue.textContent);
  const children = parseInt(childValue.textContent);
  const rooms = parseInt(roomValue.textContent);


      // Price per adult and child
      const pricePerAdult = 100; // Price per adult
      const pricePerChild = 50; // Price per child
    

  visitDay=stayDays;
  console.log(visitDay);
  // Toplam fiyatı hesapla
  const totalPrice =(((fPrice)* (rooms)*(visitDay) + ((adults-1) * pricePerAdult) + (children * pricePerChild)));
  priceElement.textContent = `₺${totalPrice}`; // Toplam fiyatı güncelle
}




document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const adultValue = document.querySelector(".adult-value");
    const childValue = document.querySelector(".child-value");
    const roomValue = document.querySelector(".room-value");
    const strongElement = document.querySelector(".rezerveOptions .value-users");
    const priceElement = document.querySelector(".total-price"); // Add this element for total price
  
 
    const btnLessRoom = document.querySelector(".less-room");
    const btnAddRoom = document.querySelector(".room-adult");


    const btnLessAdult = document.querySelector(".less-adult");
    const btnAddAdult = document.querySelector(".add-adult");
    const btnLessChild = document.querySelector(".less-child");
    const btnAddChild = document.querySelector(".child-adult");
    const resetBtn = document.querySelector(".reset-btn");
    const applyBtn = document.querySelector(".apply-btn");
    const container = document.querySelector(".users"); // Container for adults/children selection
    const liElement = document.querySelector(".members"); // List element for toggle
  
    // Minimum and Maximum Values
    const minAdult = 1, maxAdult = 5;
    const minChild = 0, maxChild = 5;
    const minRoom = 1, maxRoom = 3;
  
    // Price per adult and child
    const pricePerAdult = 100; // Price per adult
    const pricePerChild = 50; // Price per child
  
    // Function to update the strong element text
    const updateStrong = () => {
      const adults = parseInt(adultValue.textContent);
      const children = parseInt(childValue.textContent);
      const rooms = parseInt(roomValue.textContent);
      strongElement.textContent = `${adults} Yetişkin, ${children} Çocuk, ${rooms} Oda.`;
    };
  
    // Function to update total price based on adults and children
    const updatePrice = () => {
      const adults = parseInt(adultValue.textContent);
      const children = parseInt(childValue.textContent);
      const rooms = parseInt(roomValue.textContent);

   
        const totalPrice =(((fPrice)* (rooms)*(visitDay) + ((adults-1) * pricePerAdult) + (children * pricePerChild)));
        priceElement.textContent = ` ₺${totalPrice}`; // Update total price display
      

    };
  
    // Increment and decrement functions
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
  
    // Reset function
    const resetValues = () => {
      adultValue.textContent = minAdult;
      childValue.textContent = minChild;
      updatePrice(); // Reset price as well
    };
  
    // Toggle container visibility function
    const toggleContainer = () => {
      if (container.style.display === "block") {
        container.style.display = "none";
        document.getElementById("outcalendar-container").style.display = "none";
        document.getElementById("calendar-container").style.display = "none";
      } else {
        container.style.display = "block";
        document.getElementById("outcalendar-container").style.display = "none";
        document.getElementById("calendar-container").style.display = "none";
      }
    };
  
    // Apply function
    const applyValues = () => {
      event.preventDefault();
      event.stopPropagation();
      updateStrong(); // Update the user info display
      updatePrice(); // Update the price display
      container.style.display = "none"; // Hide the container
    };
  
    // Event Listeners for Buttons
    btnAddAdult.addEventListener("click", () => {
      event.preventDefault();
      event.stopPropagation();
      increment(adultValue, maxAdult);
      updatePrice(); // Update price when adding adult
    });
  
    btnLessAdult.addEventListener("click", () => {
      event.preventDefault();
      event.stopPropagation();
      decrement(adultValue, minAdult);
      updatePrice(); // Update price when removing adult
    });
  
    btnAddChild.addEventListener("click", () => {
      event.preventDefault();
      event.stopPropagation();
      increment(childValue, maxChild);
      updatePrice(); // Update price when adding child
    });
  
    btnLessChild.addEventListener("click", () => {
      event.preventDefault();
      event.stopPropagation();
      decrement(childValue, minChild);
      updatePrice(); // Update price when removing child
    });

    btnAddRoom.addEventListener("click", () => {
      event.preventDefault();
      event.stopPropagation();
      increment(roomValue, maxRoom);
      updatePrice(); // Update price when removing child
   
    });
    btnLessRoom.addEventListener("click", () => {
      event.preventDefault();
      event.stopPropagation();
      decrement(roomValue, minRoom);
      updatePrice(); // Update price when removing child
  
    });
  
    resetBtn.addEventListener("click", resetValues);
    applyBtn.addEventListener("click", applyValues);
  
    // Toggle container when li is clicked
    liElement.addEventListener("click", toggleContainer);
  
    // Initialize
    container.style.display = "none"; // Hide container by default
    resetValues(); // Initialize values and price
  });
  








  document.querySelector(".rezerveBtn").addEventListener("click", function (e) {
    const girişTarihi = document.getElementById('selectedDate').textContent.trim();
    const çıkışTarihi = document.getElementById('outselectedDate').textContent.trim();
    const yetişkinSayısı = document.querySelector('.adult-value').textContent.trim();
    const çocukSayısı = document.querySelector('.child-value').textContent.trim();
  
    // Check if the dates are selected
    if (girişTarihi === '--.--.--' || çıkışTarihi === '--.--.--') {
      alert('Lütfen giriş ve çıkış tarihlerini seçiniz!');
    } else {
        // Show the success block
        document.getElementById("reservationSuccess").style.display = "block";

        // Hide the success block after 3 seconds and redirect to homepage
        setTimeout(function () {
        document.getElementById("reservationSuccess").style.display = "none";
        window.location.href = "./index.html";
        }, 3000); // 3000 milliseconds (3 seconds)
    }
  });
  
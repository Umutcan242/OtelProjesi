document.querySelectorAll('.reserve-btn').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
  
      // Parametreleri al
      const params = new URLSearchParams({
        roomHeader: this.dataset.roomType,
        firstPrice: this.dataset.price,
        roomImg: this.dataset.img
      }).toString();
  
      // Yönlendirme yap
      const targetURL = `./addrezervation.html?${params}`;
      console.log("Hedef URL:", targetURL);
  
      window.location.href = targetURL;
    });
  });
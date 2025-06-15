export default function choiseLocation() {
  const btnChoise = document.querySelector('.location__shop');
  const locationShopName = document.querySelector('.location__shop-name');
  const locationShopChoise = document.querySelectorAll(".location__sublink");

  const savedLocation = localStorage.getItem('selectedLocation');
  if (savedLocation) {
    locationShopName.textContent = savedLocation;
  }

  btnChoise.addEventListener('click', function (e) {
    e.preventDefault()
    btnChoise.classList.toggle("location__shop--active")
  });

   locationShopChoise.forEach(element => {
    element.addEventListener('click', function (event) {
      event.stopPropagation();
      const selectedText = element.textContent;
      locationShopName.textContent = selectedText;
      localStorage.setItem('selectedLocation', selectedText); // сохранить в localStorage
      btnChoise.classList.remove("location__shop--active");
    });
  });

  document.addEventListener('click', function (event) {
    if (!btnChoise.contains(event.target)) {
      btnChoise.classList.remove("location__shop--active");
    }
  });
}
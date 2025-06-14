export default function choiseLocation() {
  const btnChoise = document.querySelector('.location__shop');
  const locationShopName = document.querySelector('.location__shop-name');
  const locationShopChoise = document.querySelectorAll(".location__sublink");
  btnChoise.addEventListener('click', function () {
    btnChoise.classList.toggle("location__shop--active")
  });

  locationShopChoise.forEach(element => {
    element.addEventListener('click', function () {
      btnChoise.classList.toggle("location__shop--active")
      locationShopName.textContent = element.textContent
    });
  });
}
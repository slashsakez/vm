document.addEventListener("DOMContentLoaded", function () {
  new Splide("#image-carousel", {
    rewind: true,
  }).mount();
  document.querySelector(".login-btn").addEventListener("click", function () {
    window.location.href = "login.html";
  });
});

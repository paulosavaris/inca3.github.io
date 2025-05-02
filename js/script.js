document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu-principal");

  toggleButton.addEventListener("click", function () {
    menu.classList.toggle("active");
  });
});

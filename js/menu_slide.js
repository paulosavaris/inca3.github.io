
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menu-toggle");
    const slide = document.getElementById("menu-slide");

    toggle.addEventListener("change", function () {
      if (this.checked) {
        slide.style.left = "0px";
      } else {
        slide.style.left = "-340px";
      }
    });
  });


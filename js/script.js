const btnMobile = document.getElementById('btn-mobile');
const menu = document.querySelector('nav ul');

btnMobile.addEventListener('click', () => {
  menu.classList.toggle('active');
});

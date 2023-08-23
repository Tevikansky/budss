const menu = document.querySelector(".mobile-menu");
const mMenuToggle = document.querySelector(".header-mobile-menu");
// const nav = document.querySelector("nav");
// const menuList = document.querySelector('.nav-mobile__list')
const btn = document.querySelectorAll('.modal-btn')
const modal = document.querySelector('.modal')
const btnM = document.querySelectorAll('.close-modal')
const form = document.querySelector('form')
const success = document.querySelector('.modal-success')
let modalDialog;

const openMenu = () => {
  menu.classList.add("open");
  mMenuToggle.classList.add("open");
  document.querySelector('body').style= "overflow: hidden"
};

const closeMenu = () => {
  menu.classList.remove("open");
  mMenuToggle.classList.remove("open");
  document.querySelector('body').style= "overflow: scroll"
};

mMenuToggle.addEventListener("click", (event) => {
  menu.classList.contains('open') ? closeMenu() : openMenu();
});

btn.forEach((event) => {
event.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.toggle("open");
  modalDialog = modal.querySelector(".modal-wrapper");
  modal.addEventListener("click", (event) => {
    btnM.forEach(btn => {
      if (!event.composedPath().includes(modalDialog) || event.composedPath().includes(btn)) {
        modal.classList.remove("open")
        form.classList.remove("success")
        success.classList.remove("success")
      }
    })
    
  });
});
}

)


document.addEventListener('keyup', (event) => {
  if (event.key == "Escape" && modal.classList.contains("open")) {
    modal.classList.toggle("open");
    form.classList.remove("success")
    success.classList.remove("success")
  }
});
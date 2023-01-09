// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('darkMode'); 

const darkModeToggle = document.querySelector('#toggleDark');
const toggle = document.getElementById('toggleDark');

toggle.addEventListener('click', function(){
  this.classList.toggle('bi-moon');
});

const enableDarkMode = () => {
  // 1. Add the class to the body

  document.body.classList.add('darkmode');

  // 2. Update darkMode in localStorage
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('darkmode');
  document.getElementById("projects").body.classList.remove('darkmode');


  // 2. Update darkMode in localStorage 
  localStorage.setItem('darkMode', null);

}
 
// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their darkMode setting
  darkMode = localStorage.getItem('darkMode'); 
  
  // if it not current enabled, enable it
  if (darkMode !== 'enabled') {
    enableDarkMode();
  // if it has been enabled, turn it off  
  } else {  
    disableDarkMode(); 

  }
});
//card swiper
// var carouselWidth = $(".carousel-inner")[0].scrollWidth;
// var cardWidth = $(".carousel-item").width();
// var scrollPosition = 0;
// $(".carousel-control-next").on("click", function () {
//   if (scrollPosition < (carouselWidth - cardWidth * 4)) { //check if you can go any further
//     scrollPosition += cardWidth;  //update scroll position
//     $(".carousel-inner").animate({ scrollLeft: scrollPosition },600); //scroll left
//   }
// });
// $(".carousel-control-prev").on("click", function () {
//   if (scrollPosition > 0) {
//     scrollPosition -= cardWidth;
//     $(".carousel-inner").animate(
//       { scrollLeft: scrollPosition },
//       600
//     );
//   }
// });
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});
//tag-cloud

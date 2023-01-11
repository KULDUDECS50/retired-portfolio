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
//particles
// particlesJS("particles-js", { "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true }); var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function () { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
//tag-cloud
class FibonacciSphere {
  #points;

  get points() {
      return this.#points;
  }

  constructor(N) {
      this.#points = [];

      const goldenAngle = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < N; i++) {
          const y = 1 - (i / (N - 1)) * 2;
          const radius = Math.sqrt(1 - y ** 2);
          const a = goldenAngle * i;
          const x = Math.cos(a) * radius;
          const z = Math.sin(a) * radius;

          this.#points.push([x, y, z]);
      }
  }
}


class TagsCloud {
  #root;
  #size;
  #sphere;
  #tags;
  #rotationAxis;
  #rotationAngle;
  #rotationSpeed;
  #frameRequestId;

  constructor(root) {
      this.#root = root;
      this.#size = this.#root.offsetWidth;
      this.#tags = root.querySelectorAll('.tag');
      this.#sphere = new FibonacciSphere(this.#tags.length);
      this.#rotationAxis = [1, 0, 0];
      this.#rotationAngle = 0;
      this.#rotationSpeed = 0;

      this.#updatePositions();
      this.#initEventListeners();
      this.#root.classList.add('-loaded');
  }

  #initEventListeners() {
      window.addEventListener('resize', this.#updatePositions.bind(this));
      document.addEventListener('mousemove', this.#onMouseMove.bind(this));
  }

  #updatePositions() {
      const sin = Math.sin(this.#rotationAngle);
      const cos = Math.cos(this.#rotationAngle);
      const ux = this.#rotationAxis[0];
      const uy = this.#rotationAxis[1];
      const uz = this.#rotationAxis[2];

      const rotationMatrix = [
          [
              cos + (ux ** 2) * (1 - cos),
              ux * uy * (1 - cos) - uz * sin,
              ux * uz * (1 - cos) + uy * sin,
          ],
          [
              uy * ux * (1 - cos) + uz * sin,
              cos + (uy ** 2) * (1 - cos),
              uy * uz * (1 - cos) - ux * sin,
          ],
          [
              uz * ux * (1 - cos) - uy * sin,
              uz * uy * (1 - cos) + ux * sin,
              cos + (uz ** 2) * (1 - cos)
          ]
      ];

      const N = this.#tags.length;

      for (let i = 0; i < N; i++) {
          const x = this.#sphere.points[i][0];
          const y = this.#sphere.points[i][1];
          const z = this.#sphere.points[i][2];

          const transformedX =
                rotationMatrix[0][0] * x
          + rotationMatrix[0][1] * y
          + rotationMatrix[0][2] * z;
          const transformedY =
                rotationMatrix[1][0] * x
          + rotationMatrix[1][1] * y
          + rotationMatrix[1][2] * z;
          const transformedZ =
                rotationMatrix[2][0] * x
          + rotationMatrix[2][1] * y
          + rotationMatrix[2][2] * z;

          const translateX = this.#size * transformedX / 2;
          const translateY = this.#size * transformedY / 2;
          const scale = (transformedZ + 2) / 3;
          const transform =
                `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;
          const opacity = (transformedZ + 1.5) / 2.5;

          this.#tags[i].style.transform = transform;
          this.#tags[i].style.opacity = opacity;
      }
  }

  #onMouseMove(e) {
      const rootRect = this.#root.getBoundingClientRect();
      const deltaX = e.clientX - (rootRect.left + this.#root.offsetWidth / 2);
      const deltaY = e.clientY - (rootRect.top + this.#root.offsetHeight / 2);
      const a = Math.atan2(deltaX, deltaY) - Math.PI / 2;
      const axis = [Math.sin(a), Math.cos(a), 0];
      const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const speed = delta / Math.max(window.innerHeight, window.innerWidth) / 10;

      this.#rotationAxis = axis;
      this.#rotationSpeed = speed;
  }

  #update() {
      this.#rotationAngle += this.#rotationSpeed;

      this.#updatePositions();
  }

  start() {
      this.#update();

      this.#frameRequestId = requestAnimationFrame(this.start.bind(this));
  }

  stop() {
      cancelAnimationFrame(this.#frameRequestId);
  }
}


function main() {
  {
      const root = document.querySelector('.tags-cloud');
      const cloud = new TagsCloud(root);

      cloud.start();
  }

  {
      const cursor = document.getElementById('cursor');
      const isActivated = false;

      document.addEventListener('mousemove', (e) => {
          if (!isActivated) {
              cursor.classList.add('-activated');
          }

          cursor.style.transform =
              `translateX(${e.clientX}px) translateY(${e.clientY}px)`;
      });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  main();
});

const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.getElementById("light-sun");
const moonIcon = document.getElementById("dark-moon");

// Apply saved theme
let currentTheme = localStorage.getItem("theme") || "light";
applyTheme(currentTheme);

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    sunIcon.classList.add("active");
    moonIcon.classList.remove("active");
  } else {
    document.body.classList.remove("dark-mode");
    moonIcon.classList.add("active");
    sunIcon.classList.remove("active");
  }
}

// Toggle on click
themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
  applyTheme(currentTheme);
});

function setActive(navId) {
  document.querySelectorAll(".navbar p").forEach((el) => el.classList.remove("active"));
  document.getElementById(navId).classList.add("active");
}

// Select all sections and nav links
const sections = document.querySelectorAll(".content");
const navLinks = document.querySelectorAll(".nav-link");

// Create an observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (entry.isIntersecting) {
        // Remove .active from all
        navLinks.forEach((link) => link.classList.remove("active"));
        // Add .active to the current one
        navLink.classList.add("active");
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach((section) => observer.observe(section));

// Mobile Menu toggle
const menuIcon = document.getElementById('menu-icon');
const exitMenu = document.getElementById('exit-menu');
const navbar = document.querySelector('.navbar');
if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.remove('active');
    navbar.classList.add('active');
    exitMenu.classList.add('active');
  });
}
if (exitMenu) {
  exitMenu.addEventListener('click', () => {
    menuIcon.classList.add('active');
    navbar.classList.remove('active');
    exitMenu.classList.remove('active');
  });
}

const blob = document.querySelector("#blobPath");
const shape1 = "M50.4,-65.1C59.7,-52.3,57.7,-31.1,61.1,-10.9C64.5,9.2,73.3,28.3,69.4,44.9C65.6,61.4,49.1,75.5,31.7,77.7C14.3,79.9,-3.9,70.3,-16.7,59.7C-29.6,49.1,-37,37.4,-46.1,25C-55.2,12.6,-65.9,-0.5,-66.5,-14.2C-67,-27.9,-57.3,-42.4,-44.6,-54.5C-31.8,-66.7,-15.9,-76.6,2.3,-79.4C20.6,-82.2,41.1,-77.8,50.4,-65.1Z";
const shape2 = "M43.7,-51.5C58.1,-40,72.2,-27.6,73.6,-13.8C75,0,63.8,15.2,54,30.2C44.1,45.3,35.8,60.2,22.7,67.1C9.6,74,-8.2,72.7,-26.1,67.9C-44,63.1,-62,54.6,-73.8,39.9C-85.7,25.1,-91.3,4,-86.6,-14.1C-82,-32.1,-67.1,-47.2,-51,-58.4C-34.8,-69.5,-17.4,-76.8,-1.4,-75.1C14.7,-73.5,29.3,-62.9,43.7,-51.5Z";
function animateBlob() {
  gsap.to(blob, {
    duration: 5,
    attr: { d: shape2 },
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to(blob, {
        duration: 5,
        delay: 0,
        attr: { d: shape1 },
        ease: "power1.inOut",
        delay: 0,
        onComplete: animateBlob
      });
    }
  });
}
animateBlob();

const slider = document.getElementById('projectSlider');
const slides = slider.querySelectorAll('.project-container');
const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');
const indicators = document.getElementById('indicators');

let index = 0;
const visible = 3;
const pages = Math.max(1, slides.length - visible + 1);

// Build dots
for (let i = 0; i < pages; i++) {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => goTo(i));
  indicators.appendChild(dot);
}

function updateUI() {
  // update dots
  [...indicators.children].forEach((dot, i) => {
    dot.setAttribute('aria-selected', i === index);
    dot.disabled = i === index;
  });
}

function goTo(i) {
  index = Math.max(0, Math.min(i, pages - 1));
  const slideWidth = slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap || 0);
  slider.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
  updateUI();
}

prev.addEventListener('click', () => goTo(index - 1));
next.addEventListener('click', () => goTo(index + 1));

updateUI();
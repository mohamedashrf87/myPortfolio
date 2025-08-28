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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        // 🔹 Update hash in the URL (without page jump)
        history.replaceState(null, null, `#${id}`);

        // 🔹 Update nav link active class
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
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
const shape1 = "M38.8,-67.3C49.8,-60.9,57.8,-49.4,64.4,-37.4C71,-25.3,76.2,-12.7,77.9,1C79.6,14.6,77.9,29.3,71.1,41.1C64.4,52.9,52.6,61.8,39.9,65.3C27.2,68.7,13.6,66.6,0.4,65.9C-12.8,65.2,-25.7,66,-37.1,61.9C-48.6,57.7,-58.6,48.7,-65.5,37.6C-72.4,26.4,-76.2,13.2,-76.8,-0.4C-77.5,-14,-75.1,-28,-67.7,-38.3C-60.4,-48.6,-48,-55.3,-35.9,-61C-23.8,-66.8,-11.9,-71.7,1,-73.4C13.9,-75.2,27.9,-73.8,38.8,-67.3Z";
const shape2 = "M31.8,-54.2C42.4,-49,52.9,-42.8,62.4,-33.6C71.8,-24.4,80.3,-12.2,79.3,-0.6C78.3,11.1,68,22.2,59.9,33.7C51.7,45.3,45.9,57.3,36.3,68C26.7,78.8,13.3,88.2,1.4,85.8C-10.5,83.3,-21,69,-30.9,58.4C-40.8,47.8,-50,41,-59,31.9C-68.1,22.8,-76.9,11.4,-80.9,-2.3C-84.9,-16,-84.1,-32,-75.5,-41.9C-66.9,-51.7,-50.5,-55.4,-36.6,-58.6C-22.7,-61.9,-11.4,-64.8,-0.4,-64.1C10.6,-63.5,21.2,-59.3,31.8,-54.2Z";
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
const sliderStyle = getComputedStyle(slider);
const visible = parseInt(sliderStyle.getPropertyValue('--visible')) || 1;

const pages = Math.max(1, slides.length - visible + 1);

for (let i = 0; i < pages; i++) {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => goTo(i));
  indicators.appendChild(dot);
}

function updateUI() {
  [...indicators.children].forEach((dot, i) => {
    dot.setAttribute('aria-selected', i === index);
    dot.disabled = i === index;
  });
}

let isProgrammaticScroll = false;

function goTo(i) {
  index = Math.max(0, Math.min(i, pages - 1));
  const slideWidth = slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap || 0);
  isProgrammaticScroll = true;
  slider.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
  updateUI();
  setTimeout(() => {
    isProgrammaticScroll = false;
  }, 500);
}

slider.addEventListener('scroll', () => {
  if (isProgrammaticScroll) return;
  const slideWidth = slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap || 0);
  const scrolledIndex = Math.round(slider.scrollLeft / slideWidth);
  if (scrolledIndex !== index) {
    index = scrolledIndex;
    updateUI();
  }
});

prev.addEventListener('click', () => goTo(index - 1));
next.addEventListener('click', () => goTo(index + 1));

updateUI();
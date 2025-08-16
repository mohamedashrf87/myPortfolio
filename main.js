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

const navMap = {
  navigateHome: "home",
  navigateAbout: "about",
  navigateProjects: "projects",
  navigateContact: "contact"
};

Object.entries(navMap).forEach(([navId, sectionId]) => {
  document.getElementById(navId).onclick = () => {
    scrollToSectionById(sectionId);
  };
});

document.getElementById("about-me-btn").addEventListener("click", () => {
  scrollToNextSection();
});

document.getElementById("contact-btn").addEventListener("click", () => {
  scrollToSectionById("contact");
});

document.getElementById("projects-btn").addEventListener("click", () => {
  scrollToSectionById("projects");
});

function scrollToNextSection() {
  const sections = [...document.querySelectorAll(".snap-wrapper > section")];
  const currentIndex = sections.findIndex(sec => {
    const rect = sec.getBoundingClientRect();
    return rect.top >= -1 && rect.top < window.innerHeight / 2;
  });

  const nextSection = sections[currentIndex + 1];
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToSectionById(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        const navId = Object.keys(navMap).find(key => navMap[key] === sectionId);

        if (navId) {
          setActive(navId);
        }
      }
    });
  },
  {
    threshold: 0.5,
  }
);

Object.values(navMap).forEach((sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) observer.observe(section);
});

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
        delay: 1,
        attr: { d: shape1 },
        ease: "power1.inOut",
        delay: 1,
        onComplete: animateBlob
      });
    }
  });
}
animateBlob();
const body = document.body;

const header = document.getElementById("siteHeader");
const scrollProgress = document.getElementById("scrollProgress");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");

const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");

const typingText = document.getElementById("typingText");

const roles = [
  "Spring Boot",
  "REST APIs",
  "Java Backend",
  "Real-Time Monitoring",
  "MySQL",
  "MongoDB",
  "Full Stack Development",
  "AI/ML Applications",
  "IoT Systems",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 45 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 1200;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 350;
  }

  setTimeout(typeRole, typingSpeed);
}

typeRole();

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;

  if (scrollTop > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (scrollTop > 520) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", updateScrollUI);
updateScrollUI();

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
  body.classList.toggle("menu-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    body.classList.remove("menu-open");
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  body.classList.add("light-theme");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  const isLight = body.classList.contains("light-theme");

  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");

  themeToggle.innerHTML = isLight
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.13,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("section[id]");

const activeSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const sectionId = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0.01,
  }
);

sections.forEach((section) => activeSectionObserver.observe(section));

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;

    cursor.style.left = `${clientX}px`;
    cursor.style.top = `${clientY}px`;

    cursorDot.style.left = `${clientX}px`;
    cursorDot.style.top = `${clientY}px`;
  });

  const hoverItems = document.querySelectorAll(
    "a, button, .skill-card, .project-card, .identity-card, .timeline-content"
  );

  hoverItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });
}

const magneticItems = document.querySelectorAll(".magnetic");

magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    item.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0, 0)";
  });
});

const projectCards = document.querySelectorAll(".project-card, .skill-card, .identity-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -6;
    const rotateY = ((x - rect.width / 2) / rect.width) * 6;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

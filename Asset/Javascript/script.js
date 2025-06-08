class Particle {
  constructor(x, y, size, color, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = speed;
    this.directionX = Math.random() * 2 - 1;
    this.directionY = Math.random() * 2 - 1;
  }

  update() {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;

    if (this.x > window.innerWidth || this.x < 0) {
      this.directionX *= -1;
    }
    if (this.y > window.innerHeight || this.y < 0) {
      this.directionY *= -1;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let canvas, ctx, particles;

function initParticles() {
  canvas = document.getElementById("background");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particles = [];
  const numParticles = 100;

  for (let i = 0; i < numParticles; i++) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = document.body.classList.contains('dark-mode') ? "#ffffff" : "#000000";
    const speed = Math.random() * 0.5 + 1;

    particles.push(new Particle(x, y, size, color, speed));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw(ctx);
  });

  requestAnimationFrame(animate);
}

function updateParticleColors(isDarkMode) {
  const color = isDarkMode ? "#ffffff" : "#000000";
  particles.forEach(particle => {
    particle.color = color;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  animate();
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
window.updateParticleColors = updateParticleColors;

// Skills
AOS.init({
  once: true,
  duration: 800,
  easing: "ease-in-out",
  delay: 0,
  offset: 0,
  mirror: false,
  anchorPlacement: "top-bottom",
});

document.addEventListener('DOMContentLoaded', function() {
  const skillsButton = document.getElementById('skillsButton');
  const toolsButton = document.getElementById('toolsButton');
  const skillsSection = document.getElementById('skillsSection');
  const toolsSection = document.getElementById("toolsSection");

  skillsButton.addEventListener('click', function() {
    skillsSection.classList.add('active');
    toolsSection.classList.remove('active');
    skillsButton.classList.add('active');
    toolsButton.classList.remove('active');
  });

  toolsButton.addEventListener('click', function() {
    toolsSection.classList.add('active');
    skillsSection.classList.remove('active');
    toolsButton.classList.add('active');
    skillsButton.classList.remove('active');
  });

  // Photography fan and grid layout
  const fanContainer = document.querySelector('.fan-cards__container');
  if (fanContainer) {
    let isGridLayout = false;

    // Handle click on any card
    fanContainer.addEventListener('click', function(e) {
      // Only toggle if clicking directly on a card or its image
      if (e.target.closest('.fan-cards__card')) {
        isGridLayout = !isGridLayout;
        fanContainer.classList.toggle('grid-layout');
        
        // If switching to grid layout, remove fan-active class
        if (isGridLayout) {
          fanContainer.classList.remove('fan-active');
        }
      }
    });

    // Desktop: fan on hover (only when not in grid layout)
    fanContainer.addEventListener('mouseenter', function() {
      if (!isGridLayout) {
        fanContainer.classList.add('fan-active');
      }
    });

    fanContainer.addEventListener('mouseleave', function() {
      if (!isGridLayout) {
        fanContainer.classList.remove('fan-active');
      }
    });
  }
});

document
  .getElementById("educationButton")
  .addEventListener("click", function() {
      document.getElementById("educationTimeline").classList.add("active");
      document.getElementById("certificatesTimeline").classList.remove("active");
      this.classList.add("active");
      document.getElementById("certificatesButton").classList.remove("active");
  });

document
  .getElementById("certificatesButton")
  .addEventListener("click", function() {
      document.getElementById("certificatesTimeline").classList.add("active");
      document.getElementById("educationTimeline").classList.remove("active");
      this.classList.add("active");
      document.getElementById("educationButton").classList.remove("active");
  });

const timelineItems = document.querySelectorAll(
  ".timeline__item-header button"
);

timelineItems.forEach((item) => {
  item.addEventListener("click", function() {
      const body = document.getElementById(this.getAttribute("aria-controls"));
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !expanded);
      body.classList.toggle("timeline__item-body--expanded");
      body.setAttribute("aria-hidden", expanded);
  });
});

let currentSlide = 0;

function moveSlide(step) {
  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;

  currentSlide = (currentSlide + step + totalSlides) % totalSlides;

  const carousel = document.querySelector(".carousel");
  const slideWidth = slides[0].clientWidth;
  carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function openURL() {
  var url = "Asset/file.pdf";
  window.open(url, "_blank");
}
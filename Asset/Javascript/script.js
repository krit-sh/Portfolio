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

  // Update particle position
  update() {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;

    if (this.x > window.innerWidth + this.size) {
      this.x = -this.size;
    } else if (this.x < -this.size) {
      this.x = window.innerWidth + this.size;
    }
    if (this.y > window.innerHeight + this.size) {
      this.y = -this.size;
    } else if (this.y < -this.size) {
      this.y = window.innerHeight + this.size;
    }
  }

  // Draw the particle on the canvas
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Function to generate random number within a range
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Initialize canvas and particles
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 100;

// Create particles
for (let i = 0; i < numParticles; i++) {
  const size = randomRange(1, 4);
  const x = randomRange(0, canvas.width);
  const y = randomRange(0, canvas.height);
  const color = "#000000";
  const speed = randomRange(0.5, 1.5);

  particles.push(new Particle(x, y, size, color, speed));
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw(ctx);
  });

  requestAnimationFrame(animate);
}

// Start animation
animate();
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

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

// timeline
// class CollapsibleTimeline {
//   constructor(el) {
//     this.el = document.querySelector(el);

//     this.init();
//   }
//   init() {
//     this.el?.addEventListener("click", this.itemAction.bind(this));
//   }
//   animateItemAction(button, ctrld, contentHeight, shouldCollapse) {
//     const expandedClass = "timeline__item-body--expanded";
//     const animOptions = {
//       duration: 300,
//       easing: "cubic-bezier(0.65,0,0.35,1)",
//     };

//     if (shouldCollapse) {
//       button.ariaExpanded = "false";
//       ctrld.ariaHidden = "true";
//       ctrld.classList.remove(expandedClass);
//       animOptions.duration *= 2;
//       this.animation = ctrld.animate(
//         [
//           { height: `${contentHeight}px` },
//           { height: `${contentHeight}px` },
//           { height: "0px" },
//         ],
//         animOptions
//       );
//     } else {
//       button.ariaExpanded = "true";
//       ctrld.ariaHidden = "false";
//       ctrld.classList.add(expandedClass);
//       this.animation = ctrld.animate(
//         [{ height: "0px" }, { height: `${contentHeight}px` }],
//         animOptions
//       );
//     }
//   }
//   itemAction(e) {
//     const { target } = e;
//     const action = target?.getAttribute("data-action");
//     const item = target?.getAttribute("data-item");

//     if (action) {
//       const targetExpanded = action === "expand" ? "false" : "true";
//       const buttons = Array.from(
//         this.el?.querySelectorAll(`[aria-expanded="${targetExpanded}"]`)
//       );
//       const wasExpanded = action === "collapse";

//       for (let button of buttons) {
//         const buttonID = button.getAttribute("data-item");
//         const ctrld = this.el?.querySelector(`#item${buttonID}-ctrld`);
//         const contentHeight = ctrld.firstElementChild?.offsetHeight;

//         this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
//       }
//     } else if (item) {
//       const button = this.el?.querySelector(`[data-item="${item}"]`);
//       const expanded = button?.getAttribute("aria-expanded");

//       if (!expanded) return;

//       const wasExpanded = expanded === "true";
//       const ctrld = this.el?.querySelector(`#item${item}-ctrld`);
//       const contentHeight = ctrld.firstElementChild?.offsetHeight;

//       this.animateItemAction(button, ctrld, contentHeight, wasExpanded);
//     }
//   }
// }

// const timelineItems = document.querySelectorAll(".timeline__item");

// timelineItems.forEach((item) => {
//   const arrow = item.querySelector(".timeline__arrow");
//   const content = item.querySelector(".timeline__item-body");

//   arrow.addEventListener("click", () => {
//     item.classList.toggle("timeline__item--expanded");
//     content.classList.toggle("timeline__item-body--expanded");
//   });
// });

document
  .getElementById("educationButton")
  .addEventListener("click", function () {
    document.getElementById("educationTimeline").classList.add("active");
    document.getElementById("certificatesTimeline").classList.remove("active");
    this.classList.add("active");
    document.getElementById("certificatesButton").classList.remove("active");
  });

document
  .getElementById("certificatesButton")
  .addEventListener("click", function () {
    document.getElementById("certificatesTimeline").classList.add("active");
    document.getElementById("educationTimeline").classList.remove("active");
    this.classList.add("active");
    document.getElementById("educationButton").classList.remove("active");
  });

const timelineItems = document.querySelectorAll(
  ".timeline__item-header button"
);

timelineItems.forEach((item) => {
  item.addEventListener("click", function () {
    const body = document.getElementById(this.getAttribute("aria-controls"));
    const expanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !expanded);
    body.classList.toggle("timeline__item-body--expanded");
    body.setAttribute("aria-hidden", expanded);
  });
});

const contactButton = document.getElementById("contact-button");
const contactForm = document.getElementById("contact-form");

contactButton.addEventListener("click", (e) => {
  e.stopPropagation();
  contactForm.style.display =
    contactForm.style.display === "block" ? "none" : "block";
  contactButton.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (e.target !== contactButton && !contactForm.contains(e.target)) {
    contactForm.style.display = "none";
    contactButton.classList.remove("open");
  }
});

contactForm.addEventListener("click", (e) => {
  e.stopPropagation();
});

function thanks() {
  alert("Thank you for your message!");
}

function reset() {
  document.querySelector(".form1").reset();
}

document
  .getElementById("contact-button")
  .addEventListener("click", function () {
    var contactFormWrapper = document.getElementById("contact-form-wrapper");
    if (
      contactFormWrapper.style.display === "none" ||
      contactFormWrapper.style.display === ""
    ) {
      contactFormWrapper.style.display = "block";
    } else {
      contactFormWrapper.style.display = "none";
    }
  });

function sendMail() {
  let parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
  };
  emailjs
    .send("service_082v5qy", "template_fwto5zt", parms)
    .then(alert("Email sent!!"));
}
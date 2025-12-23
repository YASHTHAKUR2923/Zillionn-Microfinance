// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.getElementById("navbar")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Hide/show navbar on scroll (optional enhancement)
  if (currentScroll > lastScroll && currentScroll > 500) {
    navbar.style.transform = "translateY(-100%)"
  } else {
    navbar.style.transform = "translateY(0)"
  }

  lastScroll = currentScroll
})

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const mobileToggle = document.getElementById("mobileToggle")
const navLinks = document.getElementById("navLinks")

mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active")
  const icon = mobileToggle.querySelector("i")

  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-times")
  } else {
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
})

// Close mobile menu when clicking on a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
    const icon = mobileToggle.querySelector("i")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  })
})

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ===================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===================================

const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe animated elements
document.querySelectorAll("[data-animate]").forEach((el) => {
  observer.observe(el)
})

// ===================================
// SIP CALCULATOR
// ===================================

// ===================================
// CALCULATOR (SAFE CHECK)
// ===================================

// ===================================
// ANIMATED COUNTERS (Statistics)
// ===================================

const statNumbers = document.querySelectorAll(".stat-number");
let hasAnimated = false;

const animateCounters = () => {
  if (hasAnimated) return;

  statNumbers.forEach((stat) => {
    const target = Number.parseFloat(stat.dataset.target);
    const suffix = stat.dataset.suffix || "";
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;

      if (current < target) {
        stat.textContent = Math.floor(current * 10) / 10 + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target + suffix;
      }
    };

    updateCounter();
  });

  document.querySelectorAll(".progress-fill-stat").forEach((bar) => {
    const progress = bar.dataset.progress;
    setTimeout(() => {
      bar.style.width = `${progress}%`;
    }, 200);
  });

  hasAnimated = true;
};

// Trigger on scroll
const statsSection = document.querySelector(".statistics");

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) animateCounters();
      });
    },
    { threshold: 0.5 }
  );

  statsObserver.observe(statsSection);
}


// ===================================
// TESTIMONIALS SLIDER
// ===================================

const testimonialsTrack = document.getElementById("testimonialsTrack")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const sliderDotsContainer = document.getElementById("sliderDots")

const testimonialCards = document.querySelectorAll(".testimonial-card")
let currentIndex = 0

// Create dots
testimonialCards.forEach((_, index) => {
  const dot = document.createElement("div")
  dot.classList.add("slider-dot")
  if (index === 0) dot.classList.add("active")
  dot.addEventListener("click", () => goToSlide(index))
  sliderDotsContainer.appendChild(dot)
})

const dots = document.querySelectorAll(".slider-dot")

function updateSlider() {
  testimonialCards.forEach((card, index) => {
    card.classList.remove("active")
    if (index === currentIndex) {
      card.classList.add("active")
    }
  })

  testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`

  dots.forEach((dot, index) => {
    dot.classList.remove("active")
    if (index === currentIndex) {
      dot.classList.add("active")
    }
  })
}

function goToSlide(index) {
  currentIndex = index
  updateSlider()
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % testimonialCards.length
  updateSlider()
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length
  updateSlider()
}

nextBtn.addEventListener("click", nextSlide)
prevBtn.addEventListener("click", prevSlide)

// Auto-slide every 5 seconds
let autoSlideInterval = setInterval(nextSlide, 5000)

// Pause auto-slide on hover
testimonialsTrack.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval)
})

testimonialsTrack.addEventListener("mouseleave", () => {
  autoSlideInterval = setInterval(nextSlide, 5000)
})

// ===================================
// CONTACT FORM VALIDATION
// ===================================

document.addEventListener("DOMContentLoaded", () => {

  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");
  const successMessage = document.getElementById("successMessage");

  if (!contactForm) return; // safety check

  // =============================
  // VALIDATION FUNCTIONS
  // =============================

  const validateName = () => {
    const nameError = document.getElementById("nameError");
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Name must be at least 2 characters";
      nameInput.style.borderColor = "#ef4444";
      return false;
    }
    nameError.textContent = "";
    nameInput.style.borderColor = "rgba(16,185,129,0.5)";
    return true;
  };

  const validateEmail = () => {
    const emailError = document.getElementById("emailError");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(emailInput.value.trim())) {
      emailError.textContent = "Enter a valid email";
      emailInput.style.borderColor = "#ef4444";
      return false;
    }
    emailError.textContent = "";
    emailInput.style.borderColor = "rgba(16,185,129,0.5)";
    return true;
  };

  const validatePhone = () => {
    const phoneError = document.getElementById("phoneError");
    if (phoneInput.value.trim().length < 10) {
      phoneError.textContent = "Enter valid phone number";
      phoneInput.style.borderColor = "#ef4444";
      return false;
    }
    phoneError.textContent = "";
    phoneInput.style.borderColor = "rgba(16,185,129,0.5)";
    return true;
  };

  const validateMessage = () => {
    const messageError = document.getElementById("messageError");
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters";
      messageInput.style.borderColor = "#ef4444";
      return false;
    }
    messageError.textContent = "";
    messageInput.style.borderColor = "rgba(16,185,129,0.5)";
    return true;
  };

  // =============================
  // SUBMIT HANDLER (MAILTO)
  // =============================

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      validateName() &&
      validateEmail() &&
      validatePhone() &&
      validateMessage()
    ) {
      const subject = encodeURIComponent("New Consultation Request");
      const body = encodeURIComponent(
`Hello Zillionn Microfinance Team,

New enquiry received from website:

Name: ${nameInput.value}
Email: ${emailInput.value}
Phone: ${phoneInput.value}

Message:
${messageInput.value}

Regards`
      );

      // OPEN MAIL CLIENT
      window.location.href =
        `mailto:anant@zillionnmicrofinance.com?subject=${subject}&body=${body}`;

      // SUCCESS UI
      successMessage.classList.add("show");
      contactForm.reset();

      setTimeout(() => {
        successMessage.classList.remove("show");
      }, 5000);
    }
  });

});

// ===================================
// NEWSLETTER FORM
// ===================================

const newsletterForm = document.getElementById("newsletterForm")

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const emailInput = newsletterForm.querySelector('input[type="email"]')
    const email = emailInput.value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (emailRegex.test(email)) {
      // Success animation
      emailInput.style.borderColor = "rgba(16, 185, 129, 0.5)"

      // Show temporary success message
      const originalPlaceholder = emailInput.placeholder
      emailInput.placeholder = "Subscribed! ✓"
      emailInput.value = ""

      setTimeout(() => {
        emailInput.placeholder = originalPlaceholder
        emailInput.style.borderColor = "rgba(255, 255, 255, 0.1)"
      }, 3000)

      console.log("[v0] Newsletter subscription successful!")
    } else {
      emailInput.style.borderColor = "#ef4444"
      emailInput.placeholder = "Please enter a valid email"
    }
  })
}

// ===================================
// PAGE LOAD ANIMATIONS
// ===================================

window.addEventListener("load", () => {
  document.body.style.opacity = "1"
})

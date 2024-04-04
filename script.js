"use strict";

/**
 * PRELOAD
 *
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * HERO SLIDER
 */

const sliderItems = document.querySelectorAll("[record-hero-slider-item]");
const dots = document.querySelectorAll("[record-dots-hero-item]");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let currentIndex = 0;
let startX = 0;
let startY = 0;

// Show initial slide
sliderItems[currentIndex].classList.add("active");
dots[currentIndex].classList.add("activedots-hero");

const moveToSlide = (index) => {
  // Remove active class from all slides and dots
  sliderItems.forEach((item) => item.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("activedots-hero"));

  // Add active class to the selected slide and dot
  sliderItems[index].classList.add("active");
  dots[index].classList.add("activedots-hero");

  currentIndex = index;
};

// Event listeners for previous and next buttons
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
  moveToSlide(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % sliderItems.length;
  moveToSlide(currentIndex);
});

// Event listeners for dots navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    moveToSlide(index);
  });
});

// Swipe gesture detection
const touchStart = (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
};

const touchEnd = (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  const diffX = startX - endX;
  const diffY = startY - endY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // horizontal swipe
    if (diffX > 0) {
      // swipe left
      currentIndex = (currentIndex + 1) % sliderItems.length;
      moveToSlide(currentIndex);
    } else {
      // swipe right
      currentIndex =
        (currentIndex - 1 + sliderItems.length) % sliderItems.length;
      moveToSlide(currentIndex);
    }
  }
};

document.addEventListener("touchstart", touchStart);
document.addEventListener("touchend", touchEnd);

// social media pop-up

// Hero-Boga Character

// Get all tab buttons
const tabBtns = document.querySelectorAll("[tab-btn-record-button]");

// Get all tab content items
const tabContents = document.querySelectorAll("[tab-content-record-main]");

// Function to handle tab switching
const switchTab = (index) => {
  // Remove active class from all tab buttons and tab content items
  tabBtns.forEach((btn) => btn.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));

  // Add active class to the selected tab button and tab content item
  tabBtns[index].classList.add("active");
  tabContents[index].classList.add("active");
};

// Add event listeners to each tab button
tabBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    switchTab(index);
  });
});

// Initially switch to the first tab
switchTab(0);

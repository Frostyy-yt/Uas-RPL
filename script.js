
/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);

});

document.querySelectorAll("#navMenu a").forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* =========================
   TESTIMONIAL SLIDER
========================= */

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

const sliderDots =
    document.getElementById("sliderDots");

const nextButton =
    document.getElementById("nextTestimonial");

const prevButton =
    document.getElementById("prevTestimonial");

let currentTestimonial = 0;
let testimonialTimer;

function showTestimonial(index) {

    if (testimonialCards.length === 0) {
        return;
    }

    testimonialCards.forEach(function (card, i) {

        card.classList.toggle("active", i === index);

    });

    sliderDots.innerHTML = "";

    testimonialCards.forEach(function (card, i) {

        const dot = document.createElement("button");

        dot.classList.add("dot");

        dot.setAttribute(
            "aria-label",
            "Show testimonial " + (i + 1)
        );

        dot.setAttribute(
            "aria-current",
            i === index ? "true" : "false"
        );

        if (i === index) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", function () {

            currentTestimonial = i;

            showTestimonial(currentTestimonial);

            restartAutoplay();

        });

        sliderDots.appendChild(dot);

    });

}


function nextTestimonial() {

    currentTestimonial++;

    if (currentTestimonial >= testimonialCards.length) {
        currentTestimonial = 0;
    }

    showTestimonial(currentTestimonial);

}


function prevTestimonial() {

    currentTestimonial--;

    if (currentTestimonial < 0) {
        currentTestimonial = testimonialCards.length - 1;
    }

    showTestimonial(currentTestimonial);

}


function restartAutoplay() {

    clearInterval(testimonialTimer);

    testimonialTimer = setInterval(
        nextTestimonial,
        5000
    );

}


nextButton.addEventListener("click", function () {

    nextTestimonial();

    restartAutoplay();

});


prevButton.addEventListener("click", function () {

    prevTestimonial();

    restartAutoplay();

});


showTestimonial(0);

restartAutoplay();


/* =========================
   CONTACT FORM VALIDATION
========================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const question =
        document.getElementById("question").value.trim();


    const phonePattern = /^[0-9+\-\s]{9,16}$/;


    if (!name || !phone || !question) {

        formMessage.textContent =
            "Please complete all fields.";

        return;

    }


    if (!phonePattern.test(phone)) {

        formMessage.textContent =
            "Please enter a valid phone number.";

        return;

    }


    formMessage.textContent =
        "Thank you, " + name +
        "! Your message has been checked in this demo. " +
        "No message has been sent yet.";

    contactForm.reset();

});

// MOBILE NAVIGATION

const menuButton = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
});

navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});


// SCROLL ANIMATIONS

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
        function (entries, currentObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// FIERY PARTICLE ANIMATION

const particleContainer = document.getElementById("particles");

function createParticle() {
    if (
        !particleContainer ||
        document.hidden ||
        particleContainer.childElementCount > 25
    ) {
        return;
    }

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        4 + Math.random() * 4 + "s";

    particle.style.opacity =
        0.4 + Math.random() * 0.6;

    particleContainer.appendChild(particle);

    setTimeout(function () {
        particle.remove();
    }, 8500);
}

let particleTimer;

if (!prefersReducedMotion) {
    particleTimer = setInterval(createParticle, 300);
}


// 3D-STYLE PHOTO MOVEMENT

const heroVisual = document.querySelector(".hero-visual");
const fitnessImage = document.querySelector(".fitness-image");

if (
    heroVisual &&
    fitnessImage &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !prefersReducedMotion
) {
    heroVisual.addEventListener("pointermove", function (event) {
        const rect = heroVisual.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        fitnessImage.style.transform =
            `rotateY(${x * 8}deg) rotateX(${-y * 5}deg)`;
    });

    heroVisual.addEventListener("pointerleave", function () {
        fitnessImage.style.transform = "";
    });
}


// THIRUMURUGAN FITNESS - BOOKING FORM

const bookingForm = document.getElementById("booking-form");

const formMessage = document.getElementById("form-message");

bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get customer details
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    // Validate the details
    if (!name || !email || !phone || !service) {
        formMessage.textContent = "Please fill in all required fields.";
        return;
    }

    // Create a WhatsApp booking message
    const bookingMessage =
        "Hello Thirumurugan! I would like to book a fitness session.\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Service: " + service + "\n" +
        "Fitness Goals: " + (message || "Not specified");

    // IMPORTANT: Replace this with Thirumurugan's WhatsApp number.
    // Include the country code, without + or spaces.
    const whatsappNumber = "919677311204";

    if (whatsappNumber.includes("X")) {
        formMessage.textContent =
            "The form works! Add Thirumurugan's WhatsApp number in script.js to enable booking.";
        return;
    }

    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(bookingMessage);

    window.open(whatsappURL, "_blank");
});
// CURRENT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// PAUSE PARTICLE GENERATION WHEN THE PAGE CLOSES

window.addEventListener("pagehide", function () {
    if (particleTimer) {
        clearInterval(particleTimer);
    }
});
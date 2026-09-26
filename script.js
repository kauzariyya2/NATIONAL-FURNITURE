/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", function () {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList.add("hide");

    }, 1000);

});


/* =====================================================
   HEADER SCROLL
===================================================== */

const header =
    document.getElementById("header");

const scrollTop =
    document.getElementById("scrollTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

        scrollTop.classList.add("show");

    } else {

        header.classList.remove("scrolled");

        scrollTop.classList.remove("show");

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("nav");


menuToggle.addEventListener("click", function () {

    nav.classList.toggle("active");

});


/* Close menu after clicking */

document
    .querySelectorAll("#nav a")
    .forEach(link => {

        link.addEventListener("click", function () {

            nav.classList.remove("active");

        });

    });


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        nav.classList.remove("active");

    }

});


/* =====================================================
   SCROLL TOP
===================================================== */

scrollTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll(".stat h3");

let counterStarted = false;


function startCounters() {

    if (counterStarted) {
        return;
    }

    counterStarted = true;


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const duration = 1800;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            current =
                Math.floor(
                    progress * target
                );


            counter.textContent =
                current + "+";


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target + "+";

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    });

}


const statsSection =
    document.querySelector(".stats-section");


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                if (entries[0].isIntersecting) {

                    startCounters();

                    statsObserver.disconnect();

                }

            },
            {
                threshold: 0.3
            }
        );


    statsObserver.observe(statsSection);

}


/* =====================================================
   HERO PARALLAX
===================================================== */

const hero =
    document.querySelector(".hero");

const heroContent =
    document.querySelector(".hero-content");


if (hero && heroContent) {

    hero.addEventListener(
        "mousemove",
        function (e) {

            if (window.innerWidth < 700) {
                return;
            }


            const x =
                (window.innerWidth / 2 - e.clientX) / 45;

            const y =
                (window.innerHeight / 2 - e.clientY) / 45;


            heroContent.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        function () {

            heroContent.style.transform =
                "translate(0,0)";

        }
    );

}


/* =====================================================
   WHATSAPP ENQUIRY FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();


        const name =
            document.getElementById("name")
                .value.trim();


        const phone =
            document.getElementById("phone")
                .value.trim();


        const message =
            document.getElementById("message")
                .value.trim();


        if (!name || !phone || !message) {

            showToast(
                "Please fill in all fields."
            );

            return;

        }


        const whatsappNumber =
            "919605872271";


        const whatsappMessage =
            `Hello National Furniture,

Name: ${name}

Phone: ${phone}

Message:
${message}`;


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        window.open(
            whatsappURL,
            "_blank"
        );


        showToast(
            "Opening WhatsApp..."
        );


        contactForm.reset();

    }
);


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastText =
        document.getElementById("toastText");


    toastText.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("#nav a");


window.addEventListener("scroll", function () {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;


        if (
            window.scrollY >= sectionTop
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});
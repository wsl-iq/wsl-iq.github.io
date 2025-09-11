// Toggling Skill Tabs

const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContent.forEach(tabContents => {
            tabContents.classList.remove('skills-active');
        })

        target.classList.add('skills-active');

        tabs.forEach(tab => {
            tab.classList.remove('skills-active');
        })

        tab.classList.add('skills-active');
    })
})

//Mix it up Sorting

let mixerPortfolio = mixitup('.work-container', {
    selectors: {
        target: '.work-card'
    },
    animation: {
        duration: 300
    }
});


// Active link changing

const linkWork = document.querySelectorAll('.work-item');

function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}
linkWork.forEach(l => l.addEventListener('click', activeWork));

//Portfolio Popup

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('work-button')){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup() {
    document.querySelector('.portfolio-popup').classList.toggle('open');
}

document.querySelector('.portfolio-popup-close').addEventListener('click', togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
    document.querySelector('.pp-thumbnail img').src = portfolioItem.querySelector('.work-img').src;
    document.querySelector('.portfolio-popup-subtitle span').innerHTML = portfolioItem.querySelector('.work-title').innerHTML;
    document.querySelector('.portfolio-popup-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
}

//Services Popup
const modalViews = document.querySelectorAll('.services-modal');
const modelBtns = document.querySelectorAll('.services-button');
const modalCloses = document.querySelectorAll('.services-modal-close');

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modelBtns.forEach((modelBtn, i) => {
    modelBtn.addEventListener('click', () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        })
    })
})

//Swiper Testimonial

let swiper = new Swiper(".testimonials-container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    },
});

// Input Animation

const inputs = document.querySelectorAll('.input');

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add('focus');
}

function blurFunc() {
    let parent = this.parentNode;
    if(this.value == "") {
        parent.classList.remove('focus');
    }
}

inputs.forEach((input) => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFunc);
})

// Scroll Section Active Link

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', navHighlighter);

function navHighlighter() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}

// Activating Sidebar

const navMenu = document.getElementById('sidebar');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-sidebar');
    })
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-sidebar');
    })
}

// حقل التواصل عبر البريد الالكتروني و لدي ID من موقع EmailJS : ID service_7ocfbtu
// تهيئة EmailJS — ضع المفتاح العام الخاص بك هنا
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // استبدل YOUR_EMAILJS_PUBLIC_KEY بالمفتاح الحقيقي

const contactForm = document.querySelector('.contact-form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactPhone = document.getElementById('contact-phone');
const contactMessageInput = document.getElementById('contact-message');

if (contactForm) {
    // Create a message element to show feedback
    let feedbackMsg = document.createElement('div');
    feedbackMsg.style.marginTop = '10px';
    contactForm.appendChild(feedbackMsg);

    const sendEmail = (e) => {
        e.preventDefault();

        if (
            contactName.value.trim() === '' ||
            contactEmail.value.trim() === '' ||
            contactPhone.value.trim() === '' ||
            contactMessageInput.value.trim() === ''
        ) {
            feedbackMsg.classList.remove('color-blue');
            feedbackMsg.classList.add('color-red');
            feedbackMsg.textContent = 'يرجى ملء جميع الحقول 📩';
            setTimeout(() => { feedbackMsg.textContent = ''; }, 5000);
            return;
        }

        // إرسال عبر EmailJS
        // service_7ocfbtu و template_5z1m3h9 استخدم ما يناسب حسابك
        emailjs.sendForm('service_7ocfbtu', 'template_5z1m3h9', contactForm)
            .then(() => {
                feedbackMsg.classList.add('color-blue');
                feedbackMsg.classList.remove('color-red');
                feedbackMsg.textContent = 'تم إرسال الرسالة بنجاح! 📩';
                setTimeout(() => { feedbackMsg.textContent = ''; }, 5000);

                // تفريغ الحقول بعد الإرسال
                contactForm.reset();
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                feedbackMsg.classList.remove('color-blue');
                feedbackMsg.classList.add('color-red');
                feedbackMsg.textContent = 'فشل في إرسال الرسالة. حاول مرة أخرى لاحقاً 📩';
                setTimeout(() => { feedbackMsg.textContent = ''; }, 5000);
            });
    };

    contactForm.addEventListener('submit', sendEmail);
}

// Scroll Reveal Animation

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
});

sr.reveal('.home-data, .home-img, .about-data, .about-img, .services-content, .menu-content, .app-data, .app-img, .contact-data, .contact-button, .footer-content', {interval: 200})
sr.reveal('.skills-content:nth-child(1), .work-img, .testimonials-container, .footer-info', {origin: 'left'})
sr.reveal('.skills-content:nth-child(2), .work-content, .testimonials-container, .footer-info', {origin: 'right'})

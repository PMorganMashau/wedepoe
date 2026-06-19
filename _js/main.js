document.addEventListener('DOMContentLoaded', function() {

    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCaption = document.getElementById('lightbox-caption');
    var menuImages = document.querySelectorAll('#menu-grid .menu-item img');
    var currentIndex = 0;
    var visibleImages = [];

    function openLightbox(src, caption) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(function() {
            lightboxImg.src = '';
        }, 300);
    }

    if (menuImages.length > 0) {
        visibleImages = Array.from(menuImages);
        
        menuImages.forEach(function(img, index) {
            img.addEventListener('click', function() {
                currentIndex = index;
                var item = img.closest('.menu-item');
                var caption = item ? item.getAttribute('data-caption') : '';
                openLightbox(img.src, caption);
            });
        });
    }

    var closeBtn = document.querySelector('.lightbox-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightboxImg) {
        lightboxImg.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    var prevBtn = document.querySelector('.lightbox-prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (visibleImages.length === 0) return;
            currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
            var img = visibleImages[currentIndex];
            var caption = img.closest('.menu-item').getAttribute('data-caption');
            openLightbox(img.src, caption);
        });
    }

    var nextBtn = document.querySelector('.lightbox-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (visibleImages.length === 0) return;
            currentIndex = (currentIndex + 1) % visibleImages.length;
            var img = visibleImages[currentIndex];
            var caption = img.closest('.menu-item').getAttribute('data-caption');
            openLightbox(img.src, caption);
        });
    }

    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    document.querySelectorAll('.accordion-header').forEach(function(header) {
        header.addEventListener('click', function() {
            var body = header.nextElementSibling;
            var icon = header.querySelector('.accordion-icon');
            var isActive = body.classList.contains('active');

            document.querySelectorAll('.accordion-body').forEach(function(b) { b.classList.remove('active'); });
            document.querySelectorAll('.accordion-icon').forEach(function(i) { i.textContent = '+'; });

            if (!isActive) {
                body.classList.add('active');
                icon.textContent = '-';
            }
        });
    });

    document.querySelectorAll('.search-input').forEach(function(input) {
        input.addEventListener('input', function() {
            var term = input.value.toLowerCase();
            var grid = input.id === 'menu-search' ? '#menu-grid' : '#job-listings';
            document.querySelectorAll(grid + ' [data-title]').forEach(function(item) {
                var title = item.getAttribute('data-title');
                if (title.includes(term)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var filter = btn.getAttribute('data-filter');
            var parent = btn.closest('.menu-filter-tabs, .job-filter-tabs');
            
            parent.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var grid = parent.classList.contains('menu-filter-tabs') ? '#menu-grid' : '#job-listings';
            document.querySelectorAll(grid + ' [data-category]').forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    var testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        var currentTestimonial = 0;
        setInterval(function() {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }, 4000);
    }

    function validateForm(formId, errorId, successId) {
        var form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var errorDiv = document.getElementById(errorId);
            var successDiv = document.getElementById(successId);
            errorDiv.style.display = 'none';
            successDiv.style.display = 'none';
            errorDiv.textContent = '';

            var isValid = true;
            var firstInvalid = null;

            form.querySelectorAll('input, select, textarea').forEach(function(input) {
                if (!input.checkValidity()) {
                    isValid = false;
                    if (!firstInvalid) firstInvalid = input;
                    errorDiv.textContent += input.validationMessage + ' ';
                }
            });

            if (!isValid) {
                errorDiv.style.display = 'block';
                if (firstInvalid) firstInvalid.focus();
            } else {
                successDiv.textContent = 'Successfully submitted!';
                successDiv.style.display = 'block';
                form.reset();
            }
        });
    }

    validateForm('career-form', 'career-error', 'career-success');
    validateForm('contact-form', 'contact-error', 'contact-success');
    validateForm('enquiry-form', 'enquiry-error', 'enquiry-success');

});
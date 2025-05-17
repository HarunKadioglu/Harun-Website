document.addEventListener('DOMContentLoaded', function() {
    // Certificate Modal Elements
    const certificateModal = document.getElementById('certificateModal');
    const certificateModalImg = document.getElementById('certificateModalImg');
    const certificateModalContent = document.querySelector('.certificate-modal-content');
    const certificateCloseBtn = document.querySelector('.certificate-close-modal');
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    // Gallery Modal Elements
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalImg = document.getElementById('galleryModalImg');
    const modalCaption = document.getElementById('modalCaption');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Navbar Collapse Handler
    document.addEventListener('click', function(event) {
        const navbarCollapse = document.getElementById('navbarNav');
        const navbarToggler = document.querySelector('.navbar-toggler');
    
        if (navbarCollapse && 
            !navbarCollapse.contains(event.target) && 
            !navbarToggler.contains(event.target)) {
            
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            
            if (bsCollapse && navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        }
    });

    // Gallery Modal Handler
    const initGallery = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const galleryModal = document.getElementById('galleryModal');
        const galleryModalImg = document.getElementById('galleryModalImg');
        const modalCaption = document.getElementById('modalCaption');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;
        
        if (galleryItems.length > 0 && galleryModal) {
            const galleryArray = Array.from(galleryItems);
            const modal = new bootstrap.Modal(galleryModal, {
                backdrop: true,
                keyboard: true
            });

            const updateModal = (index) => {
                const img = galleryArray[index].querySelector('.gallery-image');
                const caption = galleryArray[index].querySelector('.image-caption');
                
                galleryModalImg.src = img.src;
                galleryModalImg.alt = img.alt;
                modalCaption.textContent = caption.textContent;
                currentIndex = index;
            };

            // Modal kapanma olayını dinle
            galleryModal.addEventListener('hidden.bs.modal', function () {
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
            });

            // Modal açılma olayını dinle
            galleryModal.addEventListener('show.bs.modal', function () {
                document.body.style.overflow = 'hidden';
            });

            galleryItems.forEach((item, index) => {
                item.addEventListener('click', function() {
                    updateModal(index);
                    modal.show();
                });
            });

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + galleryArray.length) % galleryArray.length;
                    updateModal(currentIndex);
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % galleryArray.length;
                    updateModal(currentIndex);
                });
            }

            document.addEventListener('keydown', (event) => {
                if (galleryModal.classList.contains('show')) {
                    if (event.key === 'ArrowLeft') {
                        prevBtn.click();
                    } else if (event.key === 'ArrowRight') {
                        nextBtn.click();
                    } else if (event.key === 'Escape') {
                        modal.hide();
                    }
                }
            });
        }
    };

    // Initialize gallery if on gallery page
    if (document.querySelector('.gallery-item')) {
        initGallery();
    }

    // Certificate Modal Handler
    const initCertificates = () => {
        const certificateItems = document.querySelectorAll('.certificate-item');

        if (certificateItems.length > 0) {
            certificateItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (certificateModal && certificateModalContent) {
                        certificateModal.style.display = "block";
                        certificateModalContent.classList.add('loading');
                    }

                    const imgSrc = this.getAttribute('data-image');
                    
                    certificateModalImg.onload = function() {
                        if (certificateModalContent) {
                            certificateModalContent.classList.remove('loading');
                        }
                    };

                    certificateModalImg.src = imgSrc;
                });
            });

            // Close button handler
            if (certificateCloseBtn) {
                certificateCloseBtn.addEventListener('click', () => {
                    if (certificateModal) {
                        certificateModal.style.display = "none";
                    }
                });
            }

            // Click outside to close
            window.addEventListener('click', (event) => {
                if (event.target === certificateModal) {
                    certificateModal.style.display = "none";
                }
            });

            // ESC key to close
            document.addEventListener('keydown', (event) => {
                if (event.key === "Escape" && certificateModal) {
                    certificateModal.style.display = "none";
                }
            });
        }
    };

    // Navigation Active State
    const initNavigation = () => {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Responsibility List Handler
    const initResponsibilityList = () => {
        document.querySelectorAll('.responsibility-container').forEach(container => {
            const list = container.querySelector('.responsibility-list');
            const btn = container.querySelector('.show-more-btn');
            
            if (list && btn) {
                if (list.children.length <= 3) {
                    btn.style.display = 'none';
                    return;
                }

                btn.addEventListener('click', function() {
                    list.classList.toggle('collapsed');
                    btn.textContent = list.classList.contains('collapsed') ? 'More' : 'Less';
                });
            }
        });
    };

    // Preloader Handler
    const initPreloader = () => {
        window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }
        });
    };

    // Smooth Scroll Handler
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    history.pushState(null, null, targetId);
                }
            });
        });
    };

    // Initialize All Functions
    const init = () => {
        initGallery();
        initCertificates();
        if (document.querySelector('.gallery-item')) {
            initGallery();
        }
        initNavigation();
        initResponsibilityList();
        initPreloader();
        initSmoothScroll();
    };

    // Start the application
    init();
});

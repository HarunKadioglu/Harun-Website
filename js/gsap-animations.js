// Sayfa yüklendiğinde çalışacak animasyonlar
document.addEventListener('DOMContentLoaded', () => {
    // Hero bölümü animasyonu
    gsap.from('.hero-title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });
  
    gsap.from('.hero-subtitle', {
      duration: 1,
      y: 30,
      opacity: 0,
      delay: 0.3,
      ease: 'power2.out'
    });
  
    // Scroll ile tetiklenen animasyonlar
    gsap.utils.toArray('.fade-in').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1
      });
    });
  });
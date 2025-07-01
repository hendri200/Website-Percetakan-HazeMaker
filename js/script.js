document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // FUNGSI BARU: Animasi Angka (Counter)
    const statsSection = document.querySelector('#story');
    const statNumbers = document.querySelectorAll('.stat-number');

    const startCounter = () => {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const increment = target / 100; // Kecepatan counter

            const updateCount = () => {
                if (count < target) {
                    count = Math.ceil(count + increment);
                    counter.innerText = count;
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target; // Pastikan angka akhir tepat
                }
            };
            updateCount();
        });
    };

    // Observer untuk menjalankan counter saat section terlihat
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter();
                    observer.unobserve(entry.target); // Hanya jalankan sekali
                }
            });
        }, {
            threshold: 0.5 // Jalankan saat 50% section terlihat
        });

        observer.observe(statsSection);
    }

    // =====================================
    // FUNGSI PENCARIAN PRODUK (BARU)
    // =====================================
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = searchInput.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                // Cek apakah judul atau deskripsi mengandung kata kunci
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block'; // Tampilkan kartu
                } else {
                    card.style.display = 'none'; // Sembunyikan kartu
                }
            });
        });
    }
});
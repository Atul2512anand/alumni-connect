document.addEventListener('DOMContentLoaded', () => {
    // 1. Binary Rain Background Effect
    const canvas = document.getElementById('binary-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const characters = '01';
    const fontSize = 14;
    const columns = width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawBinary() {
        ctx.fillStyle = 'rgba(6, 7, 10, 0.1)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00f2ff';
        ctx.font = fontSize + 'px JetBrains Mono';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawBinary, 50);

    // 2. Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. Smooth Mouse Parallax for Hero
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        document.querySelector('.hero-content').style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // 4. Typewriter Effect for Subtitle
    const subtitle = document.querySelector('.type-text');
    const text = subtitle.innerText;
    subtitle.innerText = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    // Start typewriter after a small delay
    setTimeout(typeWriter, 1000);

    // 5. Handle Resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
});

// Console Branding
console.log(
    "%c NFSU DHARWAD %c CYBER CONNECT ",
    "background: #00f2ff; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;",
    "background: #0d1117; color: #00f2ff; font-weight: bold; padding: 4px 8px; border-radius: 0 4px 4px 0;"
);
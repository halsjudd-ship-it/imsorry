// ============ FLOATING PETALS ============
const petalsContainer = document.getElementById('petals');
const petalEmojis = ['🌸', '🌷', '🌺', '💮', '🌹', '✿', '❀', '♡'];

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
    petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
    petal.style.animationDelay = Math.random() * 5 + 's';
    petal.style.opacity = Math.random() * 0.5 + 0.4;
    petalsContainer.appendChild(petal);

    // Remove after animation to prevent memory build-up
    setTimeout(() => petal.remove(), 18000);
}

// Initial petals burst
for (let i = 0; i < 18; i++) {
    setTimeout(createPetal, i * 400);
}

// Continuous petals
setInterval(createPetal, 1500);

// ============ MUSIC PLAYER ============
const playBtn = document.getElementById('playBtn');
const bgMusic = document.getElementById('bgMusic');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

let isPlaying = false;

playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
});

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        playBtn.classList.remove('playing');
    } else {
        bgMusic.play().catch(err => console.log('Autoplay blocked:', err));
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        playBtn.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

// ============ ENVELOPE & LETTER ============
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
let opened = false;

function openLetter() {
    if (opened) return;
    opened = true;
    envelope.classList.add('opened');
    setTimeout(() => {
        letter.classList.add('show');
        letter.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 600);
}

envelope.addEventListener('click', openLetter);

// Auto-open when scrolled into view
const letterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !opened) {
            setTimeout(openLetter, 800);
        }
    });
}, { threshold: 0.4 });

letterObserver.observe(document.querySelector('.letter-section'));

// ============ AUTOPLAY MUSIC ON FIRST INTERACTION ============
document.body.addEventListener('click', function startMusic() {
    if (!isPlaying) {
        bgMusic.volume = 0.5;
        bgMusic.play().then(() => {
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            playBtn.classList.add('playing');
        }).catch(() => {});
    }
    document.body.removeEventListener('click', startMusic);
}, { once: true });
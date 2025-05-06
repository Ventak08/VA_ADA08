// Инициализация AOS
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// Кастомный курсор
const cursorOuter = document.querySelector('.cursor-outer');
const cursorInner = document.querySelector('.cursor-inner');
const links = document.querySelectorAll('a');
const buttons = document.querySelectorAll('button');

document.addEventListener('mousemove', (e) => {
    cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

[...links, ...buttons].forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorOuter.style.transform = 'scale(1.5)';
        cursorInner.style.transform = 'scale(0.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursorOuter.style.transform = 'scale(1)';
        cursorInner.style.transform = 'scale(1)';
    });
});

// Анимация частиц
const createParticles = () => {
    const particles = document.querySelector('.particles');
    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--x', `${Math.random() * 100}%`);
        particle.style.setProperty('--y', `${Math.random() * 100}%`);
        particle.style.setProperty('--duration', `${Math.random() * 10 + 5}s`);
        particle.style.setProperty('--delay', `${Math.random() * 5}s`);
        particles.appendChild(particle);
    }
};

createParticles();

// Обработка записи голоса
const micButton = document.querySelector('.mic-button');
let isRecording = false;

micButton?.addEventListener('click', () => {
    isRecording = !isRecording;
    micButton.classList.toggle('recording', isRecording);
});

// Анимация загрузки
const downloadButton = document.querySelector('.download-button');
downloadButton?.addEventListener('click', (e) => {
    e.preventDefault();
    const progress = downloadButton.querySelector('.download-progress');
    progress.style.width = '0';
    
    // Имитация загрузки
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            window.location.href = downloadButton.href;
        } else {
            width += 1;
            progress.style.width = width + '%';
        }
    }, 20);
});

// Мобильное меню
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuButton.classList.toggle('active');
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация чата в демо-окне
const createChatAnimation = () => {
    const messages = document.querySelectorAll('.chat-messages .message');
    messages.forEach((message, index) => {
        message.style.animationDelay = `${index * 0.5}s`;
    });
};

createChatAnimation();

// Визуализация голоса
const visualizer = document.querySelector('.voice-visualizer');
const createVisualizer = () => {
    for(let i = 0; i < 20; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        visualizer?.appendChild(bar);
    }
};

createVisualizer();

// Анимация визуализатора
const animateVisualizer = () => {
    const bars = document.querySelectorAll('.visualizer-bar');
    bars.forEach(bar => {
        const height = Math.random() * 100;
        bar.style.height = `${height}%`;
    });
};

if (visualizer) {
    setInterval(animateVisualizer, 100);
}

// Отслеживание скролла для навигации
const nav = document.querySelector('.nav-wrapper');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('nav-hidden');
    } else {
        nav.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
});

// Эффект параллакса для фоновых элементов
const parallaxElements = document.querySelectorAll('.float-element');
window.addEventListener('mousemove', (e) => {
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Анимация градиентной сферы
const gradientSphere = document.querySelector('.gradient-sphere');
let angle = 0;

function animateGradientSphere() {
    angle += 0.5;
    const x = Math.sin(angle * Math.PI / 180) * 50;
    const y = Math.cos(angle * Math.PI / 180) * 50;
    
    if (gradientSphere) {
        gradientSphere.style.transform = `translate(${x}px, ${y}px)`;
    }
    
    requestAnimationFrame(animateGradientSphere);
}

animateGradientSphere();

// Обработка темной темы
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const toggleTheme = (e) => {
    if (e.matches) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
};

prefersDarkScheme.addListener(toggleTheme);
toggleTheme(prefersDarkScheme);

// Интерсекционы для анимаций при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});
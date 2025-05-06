// Анимация чисел в статистике
class StatisticsAnimator {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.animated = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (this.isInViewport(this.stats[0]) && !this.animated) {
                this.animateNumbers();
                this.animated = true;
            }
        });
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    animateNumbers() {
        this.stats.forEach(stat => {
            const finalValue = parseInt(stat.getAttribute('data-value'));
            let currentValue = 0;
            const increment = finalValue / 100;
            const duration = 2000;
            const stepTime = duration / 100;

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, stepTime);
        });
    }
}

// Анимация временной шкалы
class TimelineAnimator {
    constructor() {
        this.items = document.querySelectorAll('.timeline-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const dot = item.querySelector('.timeline-dot');
            const content = item.querySelector('.timeline-content');

            item.addEventListener('mouseenter', () => {
                dot.style.transform = item.classList.contains('even') 
                    ? 'translateX(-50%) scale(1.5)' 
                    : 'translateX(50%) scale(1.5)';
                content.style.transform = 'scale(1.05)';
            });

            item.addEventListener('mouseleave', () => {
                dot.style.transform = item.classList.contains('even')
                    ? 'translateX(-50%) scale(1)'
                    : 'translateX(50%) scale(1)';
                content.style.transform = 'scale(1)';
            });
        });
    }
}

// Интерактивные карточки технологий
class TechCardsInteraction {
    constructor() {
        this.cards = document.querySelectorAll('.tech-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 10;
        const angleY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
    }

    handleMouseLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
}

// Анимация карточек команды
class TeamCardsAnimator {
    constructor() {
        this.cards = document.querySelectorAll('.team-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            const avatar = card.querySelector('.team-avatar');
            const socialLinks = card.querySelector('.social-links');

            card.addEventListener('mouseenter', () => {
                avatar.style.transform = 'translateY(-10px)';
                socialLinks.style.transform = 'translateY(0)';
                socialLinks.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                avatar.style.transform = 'translateY(0)';
                socialLinks.style.transform = 'translateY(20px)';
                socialLinks.style.opacity = '0';
            });
        });
    }
}

// Интерактивный фон
class InteractiveBackground {
    constructor() {
        this.sphere = document.querySelector('.gradient-sphere');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            this.sphere.style.transform = `translate(${x * 100}px, ${y * 100}px)`;
            this.sphere.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, var(--accent), var(--primary))`;
        });
    }
}

// Инициализация всех анимаций
document.addEventListener('DOMContentLoaded', () => {
    new StatisticsAnimator();
    new TimelineAnimator();
    new TechCardsInteraction();
    new TeamCardsAnimator();
    new InteractiveBackground();

    // Инициализация AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});
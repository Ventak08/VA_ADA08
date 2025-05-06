// Управление плагинами
class PluginManager {
    constructor() {
        this.installedPlugins = new Set();
        this.plugins = [
            {
                id: 'windows-control',
                name: 'Управление окнами',
                description: 'Голосовое управление окнами Windows',
                author: 'VA ADA Team',
                version: '1.0.0',
                category: 'utility',
                badges: ['official', 'featured'],
                downloads: '5000+'
            },
            {
                id: 'smart-notes',
                name: 'Умные заметки',
                description: 'Создание и управление заметками голосом',
                author: 'VA ADA Team',
                version: '1.1.0',
                category: 'productivity',
                badges: ['official'],
                downloads: '3000+'
            },
            {
                id: 'finance-moex',
                name: 'Финансы MOEX',
                description: 'Отслеживание котировок акций и курсов валют',
                author: 'VA ADA Team',
                version: '2.0.0',
                category: 'integration',
                badges: ['official', 'new'],
                downloads: '2000+'
            },
            {
                id: 'gpt-assistant',
                name: 'GPT Ассистент',
                description: 'Интеграция с ChatGPT для умных диалогов',
                author: 'VA ADA Team',
                version: '1.0.0',
                category: 'ai',
                badges: ['featured', 'new'],
                downloads: '4000+'
            }
        ];
        
        this.initializePlugins();
        this.initializeEventListeners();
        this.initializeAOS();
    }

    initializePlugins() {
        const grid = document.querySelector('.plugins-grid');
        const template = document.getElementById('plugin-card-template');

        this.plugins.forEach(plugin => {
            const card = template.content.cloneNode(true);
            
            // Заполняем данные плагина
            card.querySelector('h3').textContent = plugin.name;
            card.querySelector('.description').textContent = plugin.description;
            card.querySelector('.author span').textContent = plugin.author;
            card.querySelector('.version span').textContent = plugin.version;
            
            // Настраиваем бейджи
            const badges = card.querySelector('.plugin-badges');
            badges.innerHTML = ''; // Очищаем шаблонные бейджи
            
            plugin.badges.forEach(badge => {
                const span = document.createElement('span');
                span.className = `badge ${badge}`;
                span.textContent = this.getBadgeText(badge);
                badges.appendChild(span);
            });
            
            // Добавляем бейдж загрузок
            const downloadsSpan = document.createElement('span');
            downloadsSpan.className = 'badge downloads';
            downloadsSpan.textContent = plugin.downloads;
            badges.appendChild(downloadsSpan);
            
            // Настраиваем карточку
            const cardElement = card.querySelector('.plugin-card');
            cardElement.dataset.category = plugin.category;
            cardElement.dataset.pluginId = plugin.id;

            grid.appendChild(card);
        });
    }

    getBadgeText(badge) {
        const texts = {
            'official': 'Официальный',
            'featured': 'Рекомендуемый',
            'new': 'Новый'
        };
        return texts[badge] || badge;
    }

    initializeEventListeners() {
        // Обработка установки плагинов
        document.querySelectorAll('.install-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleInstall(e));
        });

        // Обработка фильтров
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Поиск плагинов
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e));
            // Анимация фокуса
            searchInput.addEventListener('focus', () => {
                document.querySelector('.search-box').classList.add('focused');
            });
            searchInput.addEventListener('blur', () => {
                document.querySelector('.search-box').classList.remove('focused');
            });
        }

        // Hover эффекты для карточек
        document.querySelectorAll('.plugin-card').forEach(card => {
            this.initializeCardEffects(card);
        });
    }

    initializeCardEffects(card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    }

    async handleInstall(event) {
        const btn = event.currentTarget;
        const card = btn.closest('.plugin-card');
        const pluginId = card.dataset.pluginId;

        if (this.installedPlugins.has(pluginId)) {
            this.showNotification('Плагин уже установлен', 'info');
            return;
        }

        try {
            btn.classList.add('installing');
            btn.innerHTML = '<i class="fas fa-spinner"></i> Установка...';

            // Имитация процесса установки
            await this.installPlugin(pluginId);

            // Обновление UI после успешной установки
            btn.classList.remove('installing');
            btn.classList.add('installed');
            btn.innerHTML = '<i class="fas fa-check"></i> Установлено';
            
            this.installedPlugins.add(pluginId);
            this.showNotification('Плагин успешно установлен!', 'success');

        } catch (error) {
            btn.classList.remove('installing');
            btn.innerHTML = '<i class="fas fa-download"></i> Установить';
            this.showNotification('Ошибка установки плагина', 'error');
        }
    }

    handleFilter(event) {
        const btn = event.currentTarget;
        const category = btn.dataset.category;

        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        document.querySelectorAll('.plugin-card').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        
        document.querySelectorAll('.plugin-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    async installPlugin(pluginId) {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000); // Имитация процесса установки
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Анимация появления
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        });

        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    initializeAOS() {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new PluginManager();
});
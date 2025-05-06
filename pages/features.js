// Менеджер демонстраций
class DemoManager {
    constructor() {
        this.initQuickCommands();
        this.initVoiceInterface();
        this.initFeatureCards();
        this.initModal();
        
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Инициализация быстрых команд
    initQuickCommands() {
        const quickCommands = document.querySelectorAll('.quick-command');
        quickCommands.forEach(cmd => {
            cmd.addEventListener('click', () => {
                const command = cmd.dataset.command;
                this.simulateCommand(command);
            });
        });
    }

    // Симуляция выполнения команды
    simulateCommand(command) {
        // Добавляем сообщение пользователя
        this.addMessage(command, 'user');
        
        // Анимация обработки
        const micButton = document.querySelector('.mic-button');
        micButton.classList.add('recording');
        
        // Получаем ответ в зависимости от команды
        setTimeout(() => {
            micButton.classList.remove('recording');
            const response = this.getResponseForCommand(command);
            this.addMessage(response, 'assistant');
        }, 1500);
    }

    // Получение ответа на команду
    getResponseForCommand(command) {
        const responses = {
            'Открой браузер': 'Открываю браузер по умолчанию...',
            'Сделай заметку': 'Создаю новую заметку. Что записать?',
            'Какая погода': 'Сейчас в вашем городе +20°C, солнечно',
            'Курс доллара': 'Текущий курс USD/RUB: 89.50',
            'Расскажи анекдот': 'Колобок повесился... Хотя нет, он же круглый!',
            'default': 'Команда принята к исполнению!'
        };
        return responses[command] || responses.default;
    }

    // Добавление сообщения в чат
    addMessage(text, type) {
        const messagesContainer = document.querySelector('.chat-messages');
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        // Анимация появления
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        messagesContainer.appendChild(message);
        
        // Плавное появление
        requestAnimationFrame(() => {
            message.style.transition = 'all 0.3s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        });

        // Прокрутка к новому сообщению
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Инициализация голосового интерфейса
    initVoiceInterface() {
        const micButton = document.querySelector('.mic-button');
        const visualizer = new VoiceVisualizer();
        
        micButton.addEventListener('click', () => {
            micButton.classList.toggle('recording');
            if (micButton.classList.contains('recording')) {
                visualizer.start();
                this.addMessage('Слушаю...', 'assistant');
            } else {
                visualizer.stop();
            }
        });
    }

    // Инициализация карточек функций
    initFeatureCards() {
        const cards = document.querySelectorAll('.feature-item');
        cards.forEach(card => {
            const button = card.querySelector('.try-button');
            if (button) {
                button.addEventListener('click', () => {
                    const demo = card.dataset.demo;
                    this.showDemo(demo);
                });
            }
        });
    }

    // Инициализация модального окна
    initModal() {
        const modal = document.querySelector('.demo-modal');
        const closeBtn = modal.querySelector('.close-modal');
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Показ демонстрации
    showDemo(demo) {
        const modal = document.querySelector('.demo-modal');
        const content = modal.querySelector('.modal-body');
        
        content.innerHTML = this.getDemoContent(demo);
        modal.classList.add('active');
        
        // Инициализация интерактивных элементов демо
        this.initDemoInteraction(demo);
    }

    // Получение содержимого демонстрации
    getDemoContent(demo) {
        const demos = {
            'window-control': {
                title: 'Управление окнами',
                commands: [
                    { command: 'сверни окно', action: 'Минимизация текущего окна' },
                    { command: 'разверни окно', action: 'Развертывание окна на весь экран' },
                    { command: 'закрой окно', action: 'Закрытие активного окна' }
                ]
            },
            'notes': {
                title: 'Быстрые заметки',
                commands: [
                    { command: 'новая заметка', action: 'Создание новой заметки' },
                    { command: 'покажи заметки', action: 'Просмотр списка заметок' },
                    { command: 'удали заметку', action: 'Удаление выбранной заметки' }
                ]
            },
            'finance': {
                title: 'Финансы',
                commands: [
                    { command: 'курс доллара', action: 'Текущий курс USD/RUB' },
                    { command: 'курс евро', action: 'Текущий курс EUR/RUB' },
                    { command: 'акции газпрома', action: 'Котировки GAZP' }
                ]
            }
        };

        const demoData = demos[demo];
        if (!demoData) return '<p>Демонстрация недоступна</p>';

        return `
            <h2>${demoData.title}</h2>
            <div class="demo-interface">
                <div class="quick-commands">
                    ${demoData.commands.map(cmd => `
                        <button class="quick-command" data-command="${cmd.command}">
                            <i class="fas fa-terminal"></i>
                            ${cmd.command}
                        </button>
                    `).join('')}
                </div>
                <div class="demo-preview">
                    <div class="chat-messages">
                        <div class="message assistant">
                            Выберите команду для демонстрации
                        </div>
                    </div>
                    <div class="voice-interface">
                        <div class="voice-visualizer"></div>
                        <button class="mic-button">
                            <i class="fas fa-microphone"></i>
                            <div class="mic-ring"></div>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Инициализация интерактивных элементов демо
    initDemoInteraction(demo) {
        const modalCommands = document.querySelectorAll('.demo-modal .quick-command');
        modalCommands.forEach(cmd => {
            cmd.addEventListener('click', () => {
                const command = cmd.dataset.command;
                const messages = document.querySelector('.demo-modal .chat-messages');
                
                // Добавляем сообщение пользователя
                const userMessage = document.createElement('div');
                userMessage.className = 'message user';
                userMessage.textContent = command;
                messages.appendChild(userMessage);

                // Имитация обработки
                setTimeout(() => {
                    const response = this.getResponseForDemo(demo, command);
                    const assistantMessage = document.createElement('div');
                    assistantMessage.className = 'message assistant';
                    assistantMessage.textContent = response;
                    messages.appendChild(assistantMessage);

                    // Прокрутка к новому сообщению
                    messages.scrollTop = messages.scrollHeight;
                }, 1000);
            });
        });
    }

    // Получение ответа для демо
    getResponseForDemo(demo, command) {
        const responses = {
            'window-control': {
                'сверни окно': 'Окно свернуто',
                'разверни окно': 'Окно развернуто на весь экран',
                'закрой окно': 'Окно закрыто'
            },
            'notes': {
                'новая заметка': 'Создаю новую заметку. Что записать?',
                'покажи заметки': 'Вот список ваших заметок:\n1. Купить продукты\n2. Позвонить маме\n3. Встреча в 15:00',
                'удали заметку': 'Какую заметку удалить?'
            },
            'finance': {
                'курс доллара': 'Текущий курс USD/RUB: 89.50',
                'курс евро': 'Текущий курс EUR/RUB: 97.30',
                'акции газпрома': 'Котировки GAZP: 167.45 ₽ (+1.2%)'
            }
        };

        return responses[demo]?.[command] || 'Команда принята к исполнению!';
    }
}

// Визуализатор голоса
class VoiceVisualizer {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = null;
        this.isActive = false;
        this.init();
    }

    init() {
        const container = document.querySelector('.voice-visualizer');
        if (container) {
            container.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }
    }

    resize() {
        if (this.canvas) {
            const container = this.canvas.parentElement;
            this.canvas.width = container.clientWidth;
            this.canvas.height = container.clientHeight;
        }
    }

    start() {
        this.isActive = true;
        this.animate();
    }

    stop() {
        this.isActive = false;
    }

    animate() {
        if (!this.isActive || !this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const bars = 50;
        const barWidth = this.canvas.width / bars;

        for (let i = 0; i < bars; i++) {
            const height = Math.random() * this.canvas.height * 0.8;
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, '#2D46B9');
            gradient.addColorStop(1, '#00F0FF');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                i * barWidth,
                (this.canvas.height - height) / 2,
                barWidth - 2,
                height
            );
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new DemoManager();
});
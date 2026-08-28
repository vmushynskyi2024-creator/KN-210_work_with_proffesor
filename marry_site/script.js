document.addEventListener('DOMContentLoaded', () => {

    // 1. Бездоганно плавний скролінг Lenis
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Ініціалізація анімацій AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // 3. Динамічне підставлення імені гостя з URL-адреси
    // Приклад використання: index.html?guest=Шановні+Олег+та+Олена
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('guest');
    if (guestParam) {
        const guestElement = document.getElementById('guestName');
        if (guestElement) {
            guestElement.innerText = guestParam;
        }
    }

    // 4. Таймер зворотного відліку до 03.10.2026
    const weddingDate = new Date('October 3, 2026 12:00:00').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('mins').innerText = String(mins).padStart(2, '0');
            document.getElementById('secs').innerText = String(secs).padStart(2, '0');
        }
    }
    setInterval(updateTimer, 1000);
    updateTimer();

    // 5. Кнопка скопіювати реквізити Банки
    const copyBtn = document.getElementById('copyBankBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const iban = "UA000000000000000000000000000 (Банка Monobank)";
            navigator.clipboard.writeText(iban);
            copyBtn.querySelector('span').innerText = "Реквізити скопійовано! 📋";
            setTimeout(() => {
                copyBtn.querySelector('span').innerText = "Скопіювати реквізити Банки Monobank";
            }, 3000);
        });
    }

    // 6. Форма RSVP
    const rsvpForm = document.getElementById('rsvpForm');
    const formStatus = document.getElementById('formStatus');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.innerText = "Дякуємо! Вашу відповідь успішно збережено. ✨";
            rsvpForm.reset();
        });
    }
});
// --- ВІДПРАВКА ФОРМИ В TELEGRAM ---
const TELEGRAM_BOT_TOKEN = '8768780706:AAFqY_uu6_19Rv6vhlxBi5wlaJaaoGv1pgE';
const TELEGRAM_CHAT_ID = '1086177728';

// Знаходимо форму на сторінці
const formElement = document.querySelector('form');

if (formElement) {
    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Автоматично збираємо дані з усіх полів форми
        const nameInput = formElement.querySelector('input[type="text"]');
        const selectStatus = formElement.querySelector('select');

        const name = nameInput ? nameInput.value : 'Не вказано';
        const status = selectStatus ? selectStatus.value : 'Не вказано';

        const message = `🎉 <b>Нова відповідь на весільне запрошення!</b>\n\n👤 <b>Гість:</b> ${name}\n❓ <b>Присутність:</b> ${status}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                alert('Дякуємо! Вашу відповідь успішно надіслано ❤️');
                formElement.reset();
            } else {
                alert('Помилка відправки. Перевірте, чи ви натиснули /start у боті Telegram.');
            }
        } catch (error) {
            alert('Помилка мережі. Спробуйте ще раз.');
        }
    });
}
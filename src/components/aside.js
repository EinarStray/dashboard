export default function openAside() {
    const aside = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('.sidebar-close');
    const openBtn = document.querySelector('.open-sidebar');

    closeBtn.addEventListener('click', () => {
        aside.classList.toggle('opened');
        openBtn.classList.toggle('hidden');
    });

    openBtn.addEventListener('click', () => {
        aside.classList.toggle('opened');
        openBtn.classList.toggle('hidden');
    });
}
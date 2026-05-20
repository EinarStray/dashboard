const state = {
    selected: 'projects'
}

function init() {
    const tabs = document.querySelectorAll('.tab');
    const spaces = document.querySelectorAll('.main-space');
    const saved = localStorage.getItem('tabSelected');

    if (saved) {
        state.selected = JSON.parse(saved);
    }

    tabs.forEach(tab => {
        const isSelected = tab.dataset.state === state.selected;
        tab.classList.toggle('active', isSelected);
    })
    spaces.forEach(space => {
        const isSelected = space.dataset.state === state.selected;
        space.classList.toggle('active', isSelected);
    })
}

export default function ()
{
    const tabsContainer = document.querySelector('.tabs');
    const tabs = document.querySelectorAll('.tab');
    const spaces = document.querySelectorAll('.main-space');
    init();
    tabsContainer.addEventListener('click', (e) => {
        state.selected = e.target.closest('.tab').dataset.state;
        tabs.forEach(tab => {
            const isSelected = tab.dataset.state === state.selected;
            tab.classList.toggle('active', isSelected);
        })
        spaces.forEach(space => {
            const isSelected = space.dataset.state === state.selected;
            space.classList.toggle('active', isSelected);
        })
        localStorage.setItem('tabSelected', JSON.stringify(state.selected));
    })
}
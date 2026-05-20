import { state } from './state.js';

export function openAssignEmployee() {
    const table = document.getElementById('employees-table');
    const popup = document.querySelector('.assign-popup');

    table.addEventListener('click', (e) => {
        if (!e.target.classList.contains('assign')) return;
        popup.classList.toggle('hidden');

        const button = e.target.closest('.assign');
        const rect = button.getBoundingClientRect();
        rect.bottom + popup.clientHeight < window.innerHeight
            ? popup.style.top = `${rect.bottom}px`
            : popup.style.bottom = '4rem'

        const row = e.target.closest('tr')
        const name = row.querySelector('td[data-field = "name"]').dataset.value;
        const surname = row.querySelector('td[data-field = "surname"]').dataset.value;
        initAssignDialog(name, surname);
        renderProjDropdown();
    })
}

export function closeAssignEmployee() {
    const popup = document.querySelector('.assign-popup');
    const closeBtn = document.querySelector('.assign__buttons .cancel');

    closeBtn.addEventListener('click', () => {
        if(!closeBtn) return;
        popup.classList.toggle('hidden');
    });
}

function initAssignDialog(name, surname) {
    const title = document.querySelector('.assign-popup__title');
    title.textContent = `Assign ${name} ${surname}`;
}

function renderProjDropdown() {
    const projects = state.projects;
    const dropdown = document.getElementById('select-project');
    dropdown.innerHTML = `
    <option value="">Select a value</option>
    ${projects.map(project => `
        <option value="${project.project} (${project.company}) - Available: ${'TEST'}">
            ${project.project} (${project.company}) - Available: ${'TEST'}
        </option>
    `).join('')}
`;
}

export function openAssignDropdown() {
    const dropdown = document.getElementById('select-project');

    dropdown.addEventListener('change', (e) => {
        const value = e.target.value;
        const section = document.querySelector('.project-section');
        section.classList.remove('hidden');
    })
}
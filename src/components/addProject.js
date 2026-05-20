import { state } from './state.js';
import {setStorageData} from "./storage.js";

const STORAGE_KEY = 'projectTableData';

export function openAddMenu() {
    const add = document.getElementById('add-proj');
    const addDialog = document.querySelector('.add__project');
    const cancelBtn = document.querySelector('.add-project-buttons .cancel');

    add.addEventListener('click', () => {
        addDialog.classList.toggle('open');
    })

    cancelBtn.addEventListener('click', () => {
        addDialog.classList.toggle('open');
    })
}

function generateId() {
    return 'row_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function renderRow(data)
{
    const body = document.querySelector('#projects-table tbody');
    const newRow = body.insertRow();
    const company = newRow.insertCell(0);
    const project = newRow.insertCell(1);
    const budget = newRow.insertCell(2);
    const capacity = newRow.insertCell(3);
    const employees = newRow.insertCell(4);
    const income = newRow.insertCell(5);
    const actions = newRow.insertCell(6);

    newRow.dataset.id = data.id;
    company.textContent = data.company;
    project.textContent = data.project;
    budget.textContent = data.budget;
    capacity.textContent = data.capacity;
    income.textContent = data.income;

    const btnEmployees = document.createElement('button');
    btnEmployees.classList.add('btn', 'assign');
    btnEmployees.textContent = `Show Employees (${data.employees?.length ?? 0})`;
    employees.appendChild(btnEmployees);

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn', 'delete');
    btnDelete.textContent = 'Delete';
    actions.appendChild(btnDelete);
}

export function initTable() {
    state.projects.forEach(item => {
        renderRow(item);
    })
}

export function initTableEvent() {
    const table = document.getElementById('projects-table');

    table.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete')) return;

        const row = e.target.closest('tr');
        const id = row.dataset.id;

        let data = state.projects;
        data = data.filter(item => item.id !== id);
        setStorageData(STORAGE_KEY, data)
        row.remove();
    })
}

function getCapacity(maxCapacity) {
    return `0 / ${maxCapacity}`;
}

export function addProject() {
    const form = document.getElementById('add-project');
    const addDialog = document.querySelector('.add__project');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(form);
        let formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        const data = {
            id: generateId(),
            project: formData.get('project-name'),
            company: formData.get('company-name'),
            budget :'$' + formatter.format(formData.get('budget')),
            capacity: getCapacity(formData.get('capacity')),
            employees: []
        }

        state.projects.push(data);
        setStorageData(STORAGE_KEY, state.projects);

        renderRow(data);
        form.reset();
        addDialog.classList.toggle('open');
    })
}
import { state } from './state.js';
import {setStorageData} from "./storage.js";

const STORAGE_KEY = 'employeeTableData';

export function openAddEMenu() {
    const add = document.getElementById('add-employ');
    const addDialog = document.querySelector('.add__employee');
    const cancelBtn = document.querySelector('.add-employee-buttons .cancel');

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
    const body = document.querySelector('#employees-table tbody');
    const newRow = body.insertRow();
    const name = newRow.insertCell(0);
    const surname = newRow.insertCell(1);
    const age = newRow.insertCell(2);
    const position = newRow.insertCell(3);
    const salary = newRow.insertCell(4);
    const payment = newRow.insertCell(5);
    const project = newRow.insertCell(6);
    const income = newRow.insertCell(7);
    const actions = newRow.insertCell(8);

    newRow.dataset.id = data.id;
    name.dataset.field = 'name';
    name.dataset.value = data.name;
    name.textContent = data.name;
    surname.dataset.field = 'surname';
    surname.dataset.value = data.surname;
    surname.textContent = data.surname;
    age.textContent = data.age;
    position.textContent = data.position;
    salary.textContent = data.salary;
    payment.textContent = data.payment;
    project.textContent = data.project;
    income.textContent = data.income;

    const btnAssignments = document.createElement('button');
    btnAssignments.classList.add('btn', 'assign');
    btnAssignments.textContent = `Show Assignments (${0})`;
    project.appendChild(btnAssignments);

    actions.classList.add('actions');

    const btnAvailability = document.createElement('button');
    btnAvailability.classList.add('btn', 'available');
    btnAvailability.textContent = 'Availability';
    actions.appendChild(btnAvailability);

    const btnAssign = document.createElement('button');
    btnAssign.classList.add('btn', 'assign');
    btnAssign.textContent = 'Assign';
    actions.appendChild(btnAssign);

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn', 'delete');
    btnDelete.textContent = 'Delete';
    actions.appendChild(btnDelete);
}

export function initETable() {
    state.employees.forEach(item => {
        renderRow(item);
    })
}

export function initETableEvent() {
    const table = document.getElementById('employees-table');

    table.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete')) return;

        const row = e.target.closest('tr');
        const id = row.dataset.id;

        let data = state.employees;
        data = data.filter(item => item.id !== id);
        setStorageData(STORAGE_KEY, data)
        row.remove();
    })
}

export function addEmployee() {
    const form = document.getElementById('add-employee');
    const addDialog = document.querySelector('.add__employee');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formData = new FormData(form);
        let formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        const data = {
            id: generateId(),
            name: formData.get('name'),
            surname: formData.get('surname'),
            age: formData.get('dob'),
            position: formData.get('position'),
            salary :'$' + formatter.format(formData.get('salary'))
        }

        state.employees.push(data);
        setStorageData(STORAGE_KEY, state.employees)

        renderRow(data);
        form.reset();
        addDialog.classList.toggle('open');
    })
}
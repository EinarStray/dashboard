export function getProjectData() {
    return JSON.parse(localStorage.getItem('projectTableData')) || [];
}

export function getEmployeeData() {
    return JSON.parse(localStorage.getItem('employeeTableData')) || [];
}

export function setStorageData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
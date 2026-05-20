import tabs from "./components/tab.js";
import {addProject, initTable, initTableEvent, openAddMenu} from "./components/addProject.js";
import {addEmployee, initETable, initETableEvent, openAddEMenu} from "./components/addEmployee.js";
import openAside from "./components/aside.js";
import {openAssignEmployee, closeAssignEmployee, openAssignDropdown} from "./components/assignEmployee.js";
import {getEmployeeData, getProjectData} from "./components/storage.js";
import { state } from './components/state.js';

//Data
state.projects = getProjectData();
state.employees = getEmployeeData();

//Aside
openAside();
tabs();

//Projects
openAddMenu();
initTable();
initTableEvent();
addProject();

//Employees
openAddEMenu();
addEmployee();
initETable();
initETableEvent();

//Assign employee
openAssignEmployee();
closeAssignEmployee();
openAssignDropdown();

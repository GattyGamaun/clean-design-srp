const EmployeeService = require('./EpmloyeeService')

module.exports = class EmployeeManager {
    constructor() {
        this.employeeService = new EmployeeService
    }

    async employeesAsJson(dataSource) {
        const employees = await this.employeeService.readEmployees(dataSource);
        const result = employees.reduce(
            (collection, employee) => Object.assign(
                collection, {
                    [employee.name]: employee
                }
            ), {}
        );

        return JSON.stringify(result);
    }

    async getAllEmployeesAsHtml(dataSource) {
        const employees = await this.employeeService.readEmployees(dataSource);
        const header = '<tr><th>Employee</th><th>Position</th></tr>';
        const tableStart = `<table>${header}`;
        const tableEnd = '</table>';

        return employees.reduce(
            (table, employee) => table + '<tr>' +
                `<td>${employee.firstName} ${employee.lastName}</td>` +
                `<td>${employee.seniority} ${employee.role}</td>` +
                '</tr>',
            tableStart
        ) + tableEnd;
    }
}

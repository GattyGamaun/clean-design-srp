const EmployeeService = require('./EpmloyeeService');

module.exports = class ReportService {
    constructor(mailer) {
        this.employeeService = new EmployeeService();
        this.mailer = mailer;
    }

    async sendEmployeesReport(dataSource) {
        const employees = await this.employeeService.readEmployees(dataSource);
        const to = 'abcd@gmail.com';
        const from = 'web@gmail.com';
        const host = 'localhost';

        return this.mailer.setFrom(from)
            .addRecipient(to)
            .setSubject('Employees report')
            .setContent(await this.getAllEmployeesAsHtml(employees), 'text/html; charset=utf-8')
            .send(host);
    }

    getAllEmployeesAsHtml(employees) {
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

const EmployeeManager = require('./EmployeeManager')

module.exports = class ReportService {
    constructor(mailer) {
        this.employeeManager = new EmployeeManager();
        this.mailer = mailer;
    }

    async sendEmployeesReport(dataSource) {
        const to = 'abcd@gmail.com';
        const from = 'web@gmail.com';
        const host = 'localhost';

        return this.mailer.setFrom(from)
            .addRecipient(to)
            .setSubject('Employees report')
            .setContent(await this.employeeManager.getAllEmployeesAsHtml(dataSource), 'text/html; charset=utf-8')
            .send(host);
    }
}

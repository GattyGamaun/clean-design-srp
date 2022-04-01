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
}

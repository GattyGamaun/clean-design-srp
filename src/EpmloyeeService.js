const Employee = require("./Employee");
const EmployeeRole = require("./EmployeeRole");
const EmployeeSeniority = require("./EmployeeSeniority");
const EmployeeRepository = require("./EmployeeRepository");

module.exports = class EmployeeService {
    constructor() {
        this.cache = null;
        this.employeeRepository = new EmployeeRepository();
    }

    async readEmployees(dataSource) {
        if (this.cache === null) {
            const employeesData = await this.employeeRepository.readEmployees(dataSource);

            this.cache = employeesData.map(employeeData => new Employee(
                employeeData.FIRST_NAME,
                employeeData.LAST_NAME,
                EmployeeRole[employeeData.ROLE],
                EmployeeSeniority[employeeData.SENIORITY]
            ));
        }

        return this.cache;
    }


}

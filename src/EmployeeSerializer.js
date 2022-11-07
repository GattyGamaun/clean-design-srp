const StorageService = require('./StorageService')

module.exports = class EmployeeSerializer {
    constructor() {
        this.storageService = new StorageService();
    }

    async employeesAsJson(dataSource) {
        const employees = await this.storageService.readEmployees(dataSource);
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

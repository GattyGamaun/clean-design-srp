module.exports = class EmployeeRepository {
    async readEmployees(dataSource) {
        return await dataSource.getAllEmployees(dataSource)
    }
}

import client from "./bin/database-connection";
import employee from "common/src/employee";
class employeeFunctions {
  async employeeInsert(request: employee) {
    await client.employee.create({
      data: {
        employeeEmail: request.employeeEmail,
        firstName: request.firstName,
        lastName: request.lastName,
        salary: request.salary,
        gender: request.gender,
        type: request.type,
      },
    });
  }
}
export default employeeFunctions;

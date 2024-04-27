import client from "./bin/database-connection";
import employee from "common/src/service-requests/employee";
class employeeFunctions {
  static async employeeInsert(request: employee[]) {
    try {
      request.length;
      await client.employee.createMany({
        data: request,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async employeeDownload() {
    //fetch the data from the table
    const employeeData = await client.employee.findMany();

    //creates the header row in the csv file
    const headersEmployees = [
      "employeeEmail",
      "firstName",
      "lastName",
      "salary",
      "gender",
      "type",
    ];

    // create the rows for the csv file
    let finalEdgesString = headersEmployees.join(",") + "\n";
    employeeData.forEach((employee) => {
      const row = [
        employee.employeeEmail,
        employee.firstName,
        employee.lastName,
        employee.salary,
        employee.gender,
        employee.type,
      ];
      finalEdgesString += row.join(",") + "\n";
    });
    // use fs to write to the csv file
    return finalEdgesString;
  }
}
export default employeeFunctions;

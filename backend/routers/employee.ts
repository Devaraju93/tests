import express from "express";
import { createTRPCRouter, inferAsyncReturnType } from '@trpc/server';
import { z } from 'zod';



// export const employeeRouter = express.Router();

// 1.
// get an employee's basic details, i.e their
// emp_no
// birth_name
// first_name
// last_name
// gender
// hire_date


// const employeeDetailsRouter = createTRPCRouter({
//   getEmployeeDetails: publicProcedure.query(() => {
//     return ctx.employees.findMany({
//       select: {
//         emp_no: true,
//         birth_name: true,
//         first_name: true,
//         last_name: true,
//         gender: true,
//         hire_date: true,
//       },
//     });
//   }),
// });


const employeeSchema = z.object({
    emp_no: z.number(),
    birth_date: z.string(), 
    first_name: z.string(),
    last_name: z.string(),
    gender: z.enum(['M', 'F']),
    hire_date: z.string(), 
  });

  export const employeeRouter= createTRPCRouter().query('getEmployee', {
    input: z.number(), 
    resolve: async ({input}) => {
      const employee = await fetchEmployeeFromDatabase(input);
      return employeeSchema.parse(employee);
    },
  });
















// 2.
// get an employee's complete details, i.e their
//  - current position
//  - title history
//  - salary history
//  - department details
//  - department manager
//  when given an id

const employeeCompleteDetailsRouter = createTRPCRouter({
    getEmployeeCompleteDetails: publicProcedure.query(() => {
      return ctx.employee.findMany({
        select: {
          CurrentPosition: true,
          Title: true,
           salaryHistory: true,
          departmentDetails: true,
          departmentManager: true,
        
        },
      });
    }),
  });







function fetchEmployeeFromDatabase(input: any) {
    throw new Error("Function not implemented.");
}
// function fetchEmployeeFromDatabase(input: any) {
//     throw new Error("Function not implemented.");
// }
// function createTRPCRouter(arg0: { getEmployeeDetails: any; }) {
//     throw new Error("Function not implemented.");
// }

// function fetchEmployeeFromDatabase(input: any) {
//     throw new Error("Function not implemented.");
// }
// 3.
// get the employee who has most recently switched roles






// 4.
// make employee with the id 111877 the manager in Development department

// 5.
// employee Hideyuki Delgrande has been fired,
// - delete their record
// - delete their salary for the month of feb

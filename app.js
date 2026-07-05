import express from "express";
import employeeRouter from "#routes/employees"
import { getEmployee, getEmployees, getRandomEmployee, createEmployee } from "#db/employees";

const app = express();
export default app;

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

//Logger
app.use((request, response, next) => {
  next()
})

//Body Parsing
//go to db => employee.js and build out POST
app.use(express.json())

//USE ROUTES
app.use("/employees", employeeRouter )

//ERROR HANDLING MIDDLEWARE
//immediately after routes
app.use((error, request, response, next) => {
  response.status(500).send("Something went wrong!")
})



export default app;
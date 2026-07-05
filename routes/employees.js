import express from "express";
import {
  getEmployee,
  getEmployees,
  getRandomEmployee,
  createEmployee,
} from "#db/employees";

const router = express.Router();

//all
router.get("/", (req, res) => {
  const employees = getEmployees();
  res.send(employees);
});

//RANDOM
// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
router.get("/random", (req, res) => {
  const employee = getRandomEmployee();
  res.send(employee);
});

//SINGLE ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = getEmployee(Number(+id));

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.send(employee);
});

//POST (goes last)
router.post("/", (request, response) => {
  //error handling if there is no body
  if (!request.body) {
    return response.status(400).send("Request body is required.");
  }

  //get info from server
  //request object has body attached to it
  const { name } = request.body;

  //error handling if name isnt string
  if (typeof name !== "string") {
    return response.status(400).send("Name must be a string");
  }

  //error handling for empty string
  if (name.trim() === "") {
    return response.status(400).send("Name cannot be empty.");
  }
  if (!name) {
    return response.status(400).send("Name is required.");
  }
  const employee = createEmployee(name);
  response.status(201).send(employee); //201 = create new employee
});

export default router;

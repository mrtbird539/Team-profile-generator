const fs = require("fs");
const inquirer = require("inquirer");
const emailValidator = require("email-validator");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

let isManager = false;
let team = [];

const managerQuestions = [
    {
        name: "name",
        message: "What is the manager's name?",
    },
    {
        name: "id",
        message: "What is the manager's id?",
    },
    {
        name: "email",
        message: "What is the manager's email?",
        // validate(input) {
        //      if (emailValidator.validate(input)) {
        //          return true;
        //      } else {
        //          return "Please enter a valid email address.";
        //      }
        // },
    },
    {
        name: "officeNumber",
        message: "What is the manager's office number?",
    },
    {
        type: "list",
        name: "addRole",
        message: "Which team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add anymore team members.",
        ],
    },
]

const newMember = function () {
    if (!isManager) {
        inquirer
            .prompt(managerQuestions)
            .then((answers) => {
                team.push(answers)
                console.log(team);
                isManager = true;
            });
    }
}
newMember();

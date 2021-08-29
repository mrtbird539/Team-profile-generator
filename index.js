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
        name: "addmem",
        message: "Do you want to add more members?",
        choices: [
            "Yes",
            "No",
        ],
    },
]
const newEmpQuestions = [
    {
        name: "name",
        message: "What is the team member's name?",
    },
    {
        name: "id",
        message: "What is the team member's id?",
    },
    {
        name: "email",
        message: "What is the team member's email?",
        // validate(input) {
        //      if (emailValidator.validate(input)) {
        //          return true;
        //      } else {
        //          return "Please enter a valid email address.";
        //      }
        // },
    },
    {
        type: "list",
        name: "addRole",
        message: "What is the role of the member?",
        choices: [
            "Engineer",
            "Intern",
        ],
    },
]
const engineerQues = [
    {
        name: "github",
        message: "Enter team member's Github Account.",
    },
    {
        type: "list",
        name: "addmem",
        message: "Do you want to add more members?",
        choices: [
            "Yes",
            "No",
        ],
    },
]
const internQues = [
    {
        name: "school",
        message: "Enter the interns school.",
    },
    {
        type: "list",
        name: "addmem",
        message: "Do you want to add more members?",
        choices: [
            "Yes",
            "No",
        ],
    },
]


const newMember = function () {

    if (!isManager) {
        inquirer
            .prompt(managerQuestions)
            .then((answers) => {
                const newTeamMem = new Manager(answers.name, answers.id, answer.email, answers.officeNumber)
                team.push(newTeamMem)
                console.log(team);
                isManager = true;
                if (answers.addmem == "Yes"){
                newMember()
                }
                else {
                }
            });
    } else {
        inquirer
            .prompt(newEmpQuestions)
            .then((answers) => {
                let newEmpAns = answers
                console.log(answers);
                if (answers.addRole == "Intern") {
                    inquirer
                        .prompt(internQues)
                        .then((internAnswers) => {
                            let empAnswers = { ...newEmpAns, ...internAnswers }
                            const newTeamMem = new Intern(empAnswers.name, empAnswers.id, empAnswers.email, empAnswers.school)
                            team.push(newTeamMem);
                            console.log(newTeamMem);
                            if (empAnswers.addmem == "Yes"){
                                newMember()
                                }
                                else {
                                }
                        })

                } else if (answers.addRole == "Engineer") {
                    inquirer
                        .prompt(engineerQues)
                        .then((engAnswers) => {
                            let empAnswers = { ...newEmpAns, ...engAnswers }
                            const newTeamMem = new Engineer(empAnswers.name, empAnswers.id, empAnswers.email, empAnswers.github)
                            console.log(newTeamMem)
                            team.push(newTeamMem);
                            console.log(team);
                            if (empAnswers.addmem == "Yes"){
                                newMember()
                                }
                                else {
                                }
                        })
                } else {
                    return;
                }
            })
    }
}
newMember();

const fs = require("fs");
const inquirer = require("inquirer");
const emailValidator = require("email-validator");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
let isManager = false;

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
                let newEmpAns = answers
                const newTeamMem = new Manager(newEmpAns.name, newEmpAns.id, newEmpAns.email, newEmpAns.officeNumber)
                addTeamHtml(newTeamMem);
                isManager = true;
                if (answers.addmem == "Yes") {
                    newMember()
                }
                else {
                    htmlEnd()
                }
            });
    } else {
        inquirer
            .prompt(newEmpQuestions)
            .then((answers) => {
                let newEmpAns = answers
                if (answers.addRole == "Intern") {
                    inquirer
                        .prompt(internQues)
                        .then((internAnswers) => {
                            let empAnswers = { ...newEmpAns, ...internAnswers }
                            const newTeamMem = new Intern(empAnswers.name, empAnswers.id, empAnswers.email, empAnswers.school)
                            addTeamHtml(newTeamMem);
                            if (empAnswers.addmem == "Yes") {
                                newMember()
                            }
                            else {
                                htmlEnd();
                            }
                        })

                } else if (answers.addRole == "Engineer") {
                    inquirer
                        .prompt(engineerQues)
                        .then((engAnswers) => {
                            let empAnswers = { ...newEmpAns, ...engAnswers }
                            const newTeamMem = new Engineer(empAnswers.name, empAnswers.id, empAnswers.email, empAnswers.github)
                            addTeamHtml(newTeamMem);
                            if (empAnswers.addmem == "Yes") {
                                newMember()
                            }
                            else {
                                htmlEnd();
                            }
                        })
                }
            })
    }
}


function htmlInit() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
        crossorigin="anonymous"
      />
        <link rel="stylesheet" href="./style.css"/>
        <title>Team Profile</title>
    </head>
    <body>
        <header class="hero">
            <h1>Team Profile</h1>
         </header>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/index.html", html, function(err) {
        if (err) {
            console.error(err);
        }
    });
}

function addTeamHtml(teamMem) {
    return new Promise(function(resolve, reject) {
        const name = teamMem.getName();
        const role = teamMem.getRole();
        const id = teamMem.getId();
        const email = teamMem.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = teamMem.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <div class="card-header">
                <h5 class="text-center">${name}<h5
                <h6 class="text-center">Engineer</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item eID">ID: ${id}</li>
                <li class="list-group-item eEmail">Email Address: ${email}</li>
                <li class="list-group-item eUnique">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = teamMem.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <div class="card-header">
                <h5 class="text-center">${name}<h5
                <h6 class="text-center">Intern</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item eId">ID: ${id}</li>
                <li class="list-group-item eEmail">Email Address: ${email}</li>
                <li class="list-group-item eUnique">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officePhone = teamMem.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <div class="card-header">
                <h5 class="text-center">${name}<h5
                <h6 class="text-center">Manager</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item eId">ID: ${id}</li>
                <li class="list-group-item eEmail">Email Address: ${email}</li>
                <li class="list-group-item eUnique">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("New Team Built");
        fs.appendFile("./output/index.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}
function htmlEnd() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./output/index.html", html, function (err) {
        if (err) {
            console.error(err);
        };
    });
}


function init() {
    htmlInit();
    newMember();
}
init();
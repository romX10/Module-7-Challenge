// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
// TODO: Create an array of questions for user input
const questions = ["What is your github username?", "What is your email address?", "What is your project's name?", "Please write a short description of your project:",
"What kind of license should your project have?", "What command should be run to install dependencies?", "What command should be run to run tests?",
 "What does the user need to know about using the repo?", "What does the user need to know about contributing to the repo?"];

// TODO: Create a function to write README file
const generateREADME = ({userName, email, projectName, description, license, installCommand, testCommand, userInfo, contributeInfo}, licenseChoice) =>
`
#${projectName}

${licenseChoice}

# Description

${description}

# Table of Contents

*   [Installation](#Installation)

*   [Usage](#Usage)

*   [License](#License)

*   [Contribution](#Contribution)

*   [Tests](#Tests)

*   [Questions](#Questions)

## Installation

To install necessary dependicies, run the following command:
-------
${installCommand}
-------

## Usage

${userInfo}

## License

This project is licensed under the ${license} license.

## Contributing

${contributeInfo}

## Tests

To run tests, run the following command:
------
${testCommand}
------

## Questions

If you have any questions regarding this repo, open an issue or contact me directly at ${email}. You can find more of my work at [${userName}](https://github.com/${userName}).
`;

function init() {inquirer.prompt([
    {
        type: 'input',
        name: 'userName',
        message: questions[0],
    },
    {
        type: 'input',
        name: 'email',
        message: questions[1],
    },
    {
        type: 'input',
        name: 'projectName',
        message: questions[2],
    },
    {
        type: 'input',
        name: 'description',
        message: questions[3],
    },
    {
        type: 'list',
        name: 'license',
        message: questions[4],
        choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None']
    },
    {
        type: 'input',
        name: 'installCommand',
        message: questions[5],
    },
    {
        type: 'input',
        name: 'testCommand',
        message: questions[6],
    },
    {
        type: 'input',
        name: 'userInfo',
        message: questions[7],
    },
    {
        type: 'input',
        name: 'contributeInfo',
        message: questions[8],
    }
])
// TODO: Create a function to initialize app
.then((answers) => {
        var licenseChoice = "";
        if (answers.license === 'MIT') {
            licenseChoice = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)(https://opensource.org/licenses/MIT)";
        } 
        else if (answers.license === 'APACHE 2.0') {
            licenseChoice = "![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)(https://opensource.org/licenses/Apache-2.0)";
        }
        else if (answers.license === 'GPL 3.0'){
            licenseChoice = "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)(https://www.gnu.org/licenses/gpl-3.0)";
        }
        else if (answers.license === 'BSD 3'){
            licenseChoice = "![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)(https://opensource.org/licenses/BSD-3-Clause)";
        }
        else if (answers.license === 'None'){
            licenseChoice = "No license for this project";
        }

        const readmeContent = generateREADME(answers, licenseChoice);

        fs.writeFile("README.md", readmeContent, (error) => 
            error ? console.error(error) : console.log("README successfully generated!")
        );
        });
}
// Function call to initialize app
init();

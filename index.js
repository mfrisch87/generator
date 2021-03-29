const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');


// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'username',
        message: 'Enter your GitHub username.',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("You must enter a GitHub username.");
            }
            return true;
        }
    },

        {
            type: 'input',
            name: 'repository',
            message: 'Enter the name of your repository on GitHub.',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("You must enter the name of your GitHub repository.");
                }
                return true;
            } 
        },

        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of your project.',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("You must enter the title of your project.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description of your project.',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("You must enter a description for your project.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Explain how user would install (if necessary) for Installation Section.',
        },

        {
            type: 'list',
            name: 'license',
            message: 'Choose your license for your project.',
            // https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/licensing-a-repository
            choices: ['afl-3.0', 'apache-2.0', 'artistic-2.0', 'bsl-1.0', 'bsd-2-clause', 'bsd-3-clause', 'bsd-3-clause-clear', 'cc', 'cc0-1.0', 'cc-by-4.0', 'cc-by-sa-4.0', 'wtfpl', 'ecl-2.0', 'epl-1.0', 'epl-2.0', 'eupl-1.1', 'agpl-3.0', 'gpl', 'gpl-2.0', 'gpl-3.0', 'lgpl', 'lgpl-2.1', 'lgpl-3.0', 'isc', 'lppl-1.3c', 'ms-pl', 'mit', 'mpl-2.0', 'osl-3.0', 'postgresql', 'ofl-1.1', 'ncsa', 'unlicense', 'zlib']
            
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Explain how users can contribute to your project (if necessary).',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Provide tests for project, and explain how to test (if necessary).',
        }
];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log('ReadME successful!')
    });
}

const writeFileAsync = util.promisify(writeToFile);

// function to initialize program
function init() {
    try {
        const userResponses = inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Your responses have been logged. Calling to GitHub...");
        const userInfo = api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
        console.log("Generating your markdown")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
        writeFileAsync('ExampleREADME.md', markdown);
    }
    catch (error) {
        console.log(error);
    }

}

// function call to initialize program
init();

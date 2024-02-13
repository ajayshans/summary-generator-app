// Import dotenv to access environment variables
require('dotenv').config();
// Import OpenAI dependency from langchain npm package
const { OpenAI } = require('langchain/llms/openai');
// Import inquirer package for custom prompts
const inquirer = require('inquirer');

// Run below to test API Key is correct
// console.log(process.env.OPENAI_API_KEY);

// Instantiate new object using OpenAI class
// temperature represents variability in the words selected in a response (0 to 1). 0 high precision, less variation/creativity. 1 low precision, high variation/creativity
// model is the language model to be used. gpt-3.5-turbo model is optimised for chat and best option available
const model = new OpenAI({ 
    openAIApiKey: process.env.OPENAI_API_KEY, 
    temperature: 0,
    model: 'gpt-3.5-turbo'
  });

console.log({ model });

// Uses the instantiated OpenAI wrapper, model, and makes a call based on input from inquirer
const promptFunc = async (input) => {
    try {
        const res = await model.call(input);
        console.log(res);
    } catch (err) {
        console.error(err);
    }
};

// Initialisation function that uses inquirer to prompt the user and returns a promise. It takes the user input and passes it through the call method
const init = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Ask a coding question:',
      },
    ]).then((inquirerResponse) => {
      promptFunc(inquirerResponse.name)
    });
  };
  
// Calls the initialisation function and starts the script
init();
// dependency for inquirer npm package
var inquirer = require("inquirer");

// constructor function used to create programmers objects
function Programmer(name, location) {
  this.name = name;
  this.location = location;
  this.date = Date.now();
  
}

// creates the printInfo method and applies it to all programmer objects
Programmer.prototype.printInfo = function() {
  console.log("Name: " + this.name + "\nLocation: " + this.location +
  "\Date: " + this.date);
};

// variable we will use to count how many times our questions have been asked
var count = 0;

var askQuestion = function() {
  // if statement to ensure that our questions are only asked five times
  if (count < 5) {
    // runs inquirer and asks the user a series of questions whose replies are
    // stored within the variable answers inside of the .then statement
    inquirer.prompt([
      {
        name: "name",
        message: "What is your name?"
      }, {
        name: "location",
        message: "Where are you from?"
      }, 
    ]).then(function(answers) {
      // initializes the variable newguy to be a programmer object which will take
      // in all of the user's answers to the questions above
      var newGuy = new Programmer(
        answers.name,
        answers.location,
       
      // printInfo method is run to show that the newguy object was successfully created and filled
      newGuy.printInfo();
      // add one to count to increment our recursive loop by one
      count++;
      // run the askquestion function again so as to either end the loop or ask the questions again
      askQuestion();
    });
    // else statement which prints "all questions asked" to the console
    // when the code has been run five times
  }
  else {
    console.log("All questions asked");
  }
};

// call askquestion to run our code
askQuestion();

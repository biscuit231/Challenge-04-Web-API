var timer = document.querySelector("#timer");
var container = document.querySelector("#container");
var startQuiz = document.querySelector("#startQuiz");
var welcomeScreen = document.querySelector("#home-page");

var button = document.querySelectorAll('.option');

var score = 0;
var questionIndex = 0;

var penalty = 15;
var secondsLeft = 75;
var hold = 0;
var olCreate = document.createElement("ol");

// Questions to be asked
var questions = [ {
    question: 'Inside which HTML element do we put the JavaScript?',
    choices: ['<js>', '<script>', '<javascript>', '<scripting>'],
    answer: '<script>'
},
{
    question: 'How do you create a function in JavaScript?',
    choices: ['function myFunction()', 'function:myFunction()', 'function = myFunction()', 'myFunction()'],
    answer: 'function myFunction()'  
},

{
    question: 'Arrays in Javascript can be used to store ___?',
    choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    answer: 'all of the above'  
},

{
    question: 'How does a FOR loop start?',
    choices: ['for i = 1 to 5', 'for (i = 0; i <= 5; i++)', 'for (i = 0; i <= 5)', 'for (i <= 5; i++)'],
    answer: 'for (i = 0; i <= 5; i++)'  
},

{
    question: 'How do you round the number 11.45, to the nearest integer?',
    choices: ['Math.round(11.45)', 'round(11.45)', 'rnd(11.45)', 'Math.rnd(11.45)'],
    answer: 'Math.round(11.45)'  
},

{
    question: 'Which event occurs when the user clicks on an HTML element?',
    choices: ['onmouseover', 'onchange', 'onmouseclick', 'onclick'],
    answer: 'onclick'  
}
]

// Starts timer and quiz on button click
startQuiz.addEventListener("click", function() {
    // Clears screen
    welcomeScreen.classList.add("hide");
    hold = setInterval(function() {
            secondsLeft--;
            timer.innerHTML = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(hold);
                allDone();
                timer.innerHTML = "Time's up!";
            }
        }, 1000);
    button.forEach(option => {
    option.classList.remove('hide');
    });
    displayQuestions(questionIndex);
});

// Displays questions
function displayQuestions(questionIndex) {
    olCreate.innerHTML = '';
    welcomeScreen.classList.remove("hide");
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        welcomeScreen.innerHTML = userQuestion;
    };
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.innerHTML = newItem;
        welcomeScreen.appendChild(olCreate);
        olCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    });

};

// Compare user choices with answer
function compare(event) {
    var localE = event.target;
    if (localE.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (localE.innerHTML == questions[questionIndex].answer) {
            createDiv.innerHTML = "Correct!";
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.innerHTML = "Wrong!";
        }

    }
    // Determines what question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
    } else {
        displayQuestions(questionIndex);
    }
    welcomeScreen.appendChild(createDiv);

}

// All done will append last page
function allDone() {
    welcomeScreen.innerHTML = "";
    timer.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.innerHTML = "All Done!"

    welcomeScreen.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    welcomeScreen.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft > 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(hold);
        createP.innerHTML = "Your final score is: " + timeRemaining;

        welcomeScreen.appendChild(createP2);
    } else {
        var timeRemaining = score;
        var createP2 = document.createElement("p");
        clearInterval(hold);
        createP.innerHTML = "Your final score is: " + timeRemaining;

        welcomeScreen.appendChild(createP2);
    }



    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.innerHTML = "Enter your initials: ";

    welcomeScreen.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.innerHTML = "";

    welcomeScreen.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.innerHTML = "Submit";

    welcomeScreen.appendChild(createSubmit);

    // Capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Go to Highscores page
            window.location.replace("./Assets/HighScores/index.html");
        }
    });

};
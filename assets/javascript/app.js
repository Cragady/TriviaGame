//create array for questionsList
/*come up with storage for correct answers, maybe
turn questions list into object with answers too, or
not, as long as it works. One idea is to set them
to corresponding spots in an array with the questions.
Another option is to just put them in a correct answers
array and use an if statement checking if it's in that
array; this option may be limiting, but having the same
answer for another question later may not be the best thing
in this trivia game so it may be fine*/
/*put in a few wrong answers and the right answer
that corresponds to the quiestion*/
//create method for countdown on each question
/* //create timeout method and wrong answer method
(tell the user the correct answer)
   //create correct answer method (do this and the above
in any order)*/
/*create end page notifying of how many were 
correctly/wrongly answered*/
//create start over button that doesn't refresh page
//prettify the game, but do this last
//add clear interval with a gameEnd



var questTimeout = false;
var marchingTimer;
var passedQuestions = 0;
var secRemain = 3;
var totalTime = 0;
var correct = 0;
var incorrect = 0;
var trueAnswer = false;
var falseAnswer = false;
var gameEnd = false;
var triviaGo = {
    questionsList: [
        "What should go here?", 
        "I'll think of something", 
        "And It'll have a nice theme to it too."
    ],

    answersList: [
        "1",
        "2",
        "3"
    ],

    timerSet: function(){
        var newDiv = $("<div>");
        $("#main-area").css("display", "flex");
        $("#timer-space").text("Time left:" + secRemain);
        $("#question").text(this.questionsList[passedQuestions]);
        triviaGo.answersSet();

    },

    mainTimer: function(){
        marchingTimer = setInterval(function(){triviaGo.mainEvents();}, 1000);
    },
    
    mainEvents: function(){
        if (questTimeout === false){
            $("#main-area").css("display", "flex");
            this.statusChecker();
            this.activeQuestion();
            this.timesUp();
        }
        console.log(totalTime);
        totalTime++; 
    },

    secondaryEvents: function(){
        questTimeout = false;
        setTimeout(function(){
            triviaGo.timerSet();
            console.log("FIRE!!");
            triviaGo.mainTimer();
        }, 3000)
    },

    answersSet: function(){
        var newDiv = $("<div>");
        $("#choices-column").append(newDiv);
        newDiv.text(triviaGo.answersList[passedQuestions]);
    },

    timeoutChecker: function(){
        if (secRemain === 0){
            questTimeout = true;
        };
    },

    activeQuestion: function(){
        if (questTimeout === false){
            secRemain--;
            $("#timer-space").text("Time left: " + secRemain);
        }
    },

    guessRight: function(){
        correct++;
        $("main-area").css("display", "none");
        $("#status-update").append($("<div>"));
        $("<div>").text("You have chosen. . . wisely");

    },

    guessWrong: function(){
        incorrect++;
        $("main-area").css("display", "none");
        $("#status-update").append($("<div>"));
        $("<div>").text("You have chosen. . . poorly");

    },

    timesUp: function(){
        if (questTimeout){
            console.log("oh no!");
            console.log(totalTime);
            this.triviaEnd();
            if (gameEnd){
                $("#main-area").css("display", "none");
                return;
            };
            this.secondaryEvents();
        }
    },

    triviaEnd: function(){
        $("#main-area").css("display", "none");
        secRemain = 4;
        clearInterval(marchingTimer);
        $("#choices-column").empty();
    },

    statusChecker: function(){
        this.timeoutChecker();
        if (passedQuestions === (triviaGo.questionsList.length -1)){
            gameEnd = true;
        } else if (questTimeout){
            passedQuestions++;
        } else if (trueAnswer){
            passedQuestions++;
        } else if (falseAnswer){
            passedQuestions++;
        ;} 

    },
};

$(document).ready(function(){
    triviaGo.timerSet();
    triviaGo.mainTimer();
});
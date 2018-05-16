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
        "true1",
        "true2",
        "true3"
    ],

    arrayOfFunk: [
        "correctAnswerSet",
        "wrongAnswerSet",
        "wrongAnswerSet",
        "wrongAnswerSet"

    ],

    newDiv: $("<div>"),

    timerSet: function(){
        $("#main-area").css("display", "flex");
        $("#status-update").css("display", "none");
        $("#timer-space").text("Time left:" + secRemain);
        $("#question").text(this.questionsList[passedQuestions]);
        triviaGo.answersRandomizer();
        triviaGo.guessClicked();

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
    },

    secondaryEvents: function(){
        questTimeout = false;
        setTimeout(function(){
            triviaGo.timerSet();
            console.log("FIRE!!");
            triviaGo.mainTimer();
        }, 3000)
    },

    correctAnswerSet: function(){
        var answerSlot = $("<div>");
        var correctAnswer = answerSlot.text(triviaGo.answersList[passedQuestions]);
        $(correctAnswer).attr("id", "correct");
        $("#choices-column").append(answerSlot);
    },

    wrongAnswerSet: function(){
        var answerSlot = $("<div>");
        var incorrectAnswer = answerSlot.text("lololol");
        $(incorrectAnswer).attr("id", "incorrect");
        $("#choices-column").append(answerSlot);
    },

    answersRandomizer: function(){
        var nonRepeat = [];
        var rand = Math.round(Math.random() * 3);
        for (i = 0; i < this.arrayOfFunk.length; i++){
            while (nonRepeat.includes(rand)){
                rand = Math.round(Math.random() * 3);
                console.log(rand);
            }
            console.log(rand);
            nonRepeat.push(rand);
            var setter = this[triviaGo.arrayOfFunk[rand]]();
            setter;
            
        }
    },

    // timeoutChecker: function(){
    //     if (secRemain === 0){
    //         questTimeout = true;
    //     };
    // },

    activeQuestion: function(){
        if (questTimeout === false){
            secRemain--;
            $("#timer-space").text("Time left: " + secRemain);
        }
    },

    guessRight: function(){
        this.triviaEnd();
        correct++;
        $("#status-update").append(triviaGo.newDiv);
        triviaGo.newDiv.text("You have chosen. . . wisely");
        if (gameEnd){
            return;
        };
        this.secondaryEvents();

    },

    guessWrong: function(){
        this.triviaEnd();
        incorrect++;
        $("#status-update").append(triviaGo.newDiv);
        triviaGo.newDiv.text("You have chosen. . . poorly");
        if (gameEnd){
            return;
        };
        this.secondaryEvents();
    },

    timesUp: function(){
        if (questTimeout){
            incorrect++;
            this.triviaEnd();
            $("#status-update").append(triviaGo.newDiv);
            triviaGo.newDiv.text("Times up!");
            if (gameEnd){
                return;
            };
            this.secondaryEvents();
        }
    },

    triviaEnd: function(){
        $("#main-area").css("display", "none");
        $("#status-update").css("display", "flex");
        secRemain = 4;
        passedQuestions++;
        clearInterval(marchingTimer);
        $("#choices-column").empty();
    },

    statusChecker: function(){
        if (secRemain === 0){
            questTimeout = true;
        };
        if (passedQuestions === (triviaGo.questionsList.length -1)){
            gameEnd = true;
        };

    },

    guessClicked: function(){
        $("div").click(function(){
        var userGuess = $(this).attr("id");
            if (userGuess === "correct"){
                triviaGo.guessRight();
            } else if (userGuess === "incorrect"){
                triviaGo.guessWrong();
            }
        })
    }
};

$(document).ready(function(){
    triviaGo.timerSet();
    triviaGo.mainTimer();
});
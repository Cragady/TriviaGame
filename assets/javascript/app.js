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
var secRemain = 45;
var correct = 0;
var incorrect = 0;
var trueAnswer = false;
var falseAnswer = false;
var gameEnd = false;
var wrongAnswersArray = [];
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

    wrongArray: [
        "rando1",
        "rando2",
        "rando3",
        "rando4",
        "rando5",
        "rando6",
        "rando7",
        "rando8",
        "rando9",
        "rando10",
        "rando11",
        "rando12",
        "rando13",
        "rando14",
    ],

    newDiv: $("<div>"),

    timerSet: function(){
        $("#main-area").css("display", "flex");
        $("#status-update").css("display", "none");
        $("#timer-space").text("Time left: " + secRemain);
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
        if (gameEnd){
            setTimeout(function(){
                triviaGo.gameEndScreen();
            }, 2000);
            return;
        };
        questTimeout = false;
        setTimeout(function(){
            triviaGo.timerSet();
            triviaGo.mainTimer();
        }, 3000)
    },

    correctAnswerSet: function(){
        var answerSlot = $("<div>");
        var correctAnswer = answerSlot.text(triviaGo.answersList[passedQuestions]);
        $(correctAnswer).attr("id", "correct");
        $(correctAnswer).attr("class", "dstyles text-center py-1 my-1 mx-auto");
        $("#choices-column").append(answerSlot);
    },

    wrongAnswerSet: function(){
        var rand = Math.round(Math.random() * triviaGo.wrongArray.length);
        while (wrongAnswersArray.includes(triviaGo.wrongArray[rand])){
            rand = Math.round(Math.random() * triviaGo.wrongArray.length);
        };
        wrongAnswersArray.push(rand);
        var answerSlot = $("<div>");
        var incorrectAnswer = answerSlot.text(triviaGo.wrongArray[rand]);
        $(incorrectAnswer).attr("id", "incorrect");
        $(incorrectAnswer).attr("class", "dstyles text-center py-1 my-1 mx-auto");
        $("#choices-column").append(answerSlot);
        
    },

    answersRandomizer: function(){
        var nonRepeat = [];
        var rand = Math.round(Math.random() * 3);
        for (i = 0; i < this.arrayOfFunk.length; i++){
            while (nonRepeat.includes(rand)){
                rand = Math.round(Math.random() * 3);
            }
            nonRepeat.push(rand);
            var setter = this[triviaGo.arrayOfFunk[rand]]();
            setter;
            
        }
    },

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
        $(triviaGo.newDiv).attr("class", "bg-faded text-success mx-auto");
        triviaGo.newDiv.html("<h2>You have chosen. . . wisely</h2>");
        this.secondaryEvents();

    },

    guessWrong: function(){
        this.triviaEnd();
        incorrect++;
        $("#status-update").append(triviaGo.newDiv);
        $(triviaGo.newDiv).attr("class", "bg-faded text-danger mx-auto");
        triviaGo.newDiv.html("<h2>You have chosen. . . poorly</h2><br>" + "The correct answer is: " + triviaGo.answersList[passedQuestions - 1]);
        this.secondaryEvents();
    },

    timesUp: function(){
        if (questTimeout){
            incorrect++;
            this.triviaEnd();
            $("#status-update").append(triviaGo.newDiv);
            $(triviaGo.newDiv).attr("class", "bg-faded text-danger mx-auto");
            triviaGo.newDiv.html("<h2>Times up!</h2><br>" + "The correct answer is: " + triviaGo.answersList[passedQuestions - 1]);
            this.secondaryEvents();
        }
    },

    triviaEnd: function(){
        $("#main-area").css("display", "none");
        $("#status-update").css("display", "flex");
        secRemain = 45;
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
    },

    gameEndScreen: function(){
        this.triviaEnd();
        $("#status-update").append(triviaGo.newDiv);
        $(triviaGo.newDiv).attr("class", "bg-faded text-success mx-auto");
        triviaGo.newDiv.html("<h2> Game End </h2><br>" +
            "Number Correct:  " + correct + "<br>" +
            "Number Incorrect:  " + incorrect
        )
        this.resetButton();
    },

    resetButton: function(){
        rstbtn = $("<button>");
        $("#status-update").append(this.newDiv);
        $(this.newDiv).append(rstbtn);
        $(rstbtn).attr("class", "bg-info col-12");
        rstbtn.text("Reset");
        $(rstbtn).click(function(){
            questTimeout = false;
            passedQuestions = 0;
            correct = 0;
            incorrect = 0;
            trueAnswer = false;
            falseAnswer = false;
            gameEnd = false;
            wrongAnswersArray = [];
            triviaGo.timerSet();
            triviaGo.mainTimer();
        })
    }
};

$(document).ready(function(){
    triviaGo.timerSet();
    triviaGo.mainTimer();
});
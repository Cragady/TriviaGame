//create array for questionsList
/*come up with storage for correct answers, maybe
turn questions list into object with answers too, or
not, as long as it works*/
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
var secRemain = 3;
var totalTime = 0;

var triviaGo = {
    questionsList: [
        "What should go here?", 
        "I'll think of something", 
        "And It'll have a nice theme to it too."
    ],

    timerSet: function(){
        $("#timer-space").text("Time left:" + secRemain);
    },

    mainTimer: setInterval(function(){triviaGo.mainEvents();}, 1000),
    
    mainEvents: function(){
        console.log(totalTime);
        totalTime++;            
        if (questTimeout === false){
            triviaGo.timeoutChecker();
            triviaGo.activeQuestion();
            triviaGo.timesUp();
        }
    },

    timeoutChecker: function(){
        if (secRemain === 0){
            questTimeout = true;
        };
    },

    activeQuestion: function(){
        if (questTimeout === false){
            secRemain--;
            $("#timer-space").text("Time left:" + secRemain);
        }
    },

    timesUp: function(){
        if (questTimeout){
            console.log("oh no!");
            console.log(totalTime);
            triviaGo.triviaEnd();
        }
    },

    triviaEnd: function(){
        clearInterval(triviaGo.mainTimer);
    },
};

$(document).ready(function(){
    triviaGo.timerSet();
    triviaGo.mainTimer;
});
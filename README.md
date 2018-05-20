<h1>Brief Description</h1>

The purpose of this project is to build a simple trivia game using jquery and timers. The user is shown a question and four possible answers. The user has to pick an answer correctly before the timer runs down for the answer to count towards the total number guessed correctly.

At the end of the trivia, the user is shown the number of questions guessed correctly, and the number guessed wrong.

<h1>On Page Load</h2>

**clickMeToStart**<br>

clickMeToStart shows a button that prompts the user to start the game by clicking. Once clicked, the methods `playSong`, `timerSet`, and `mainTimer` are called to start the game. The start button then detaches after the game is started.

**timerSet**<br>
TimerSet is responsible for getting rid of the status update and showing the area that houses the questions and answers, and calling the functions that sets the list of possible answers and a `click` function that checks to see if the user is correct on the click.

**mainTimer**<br>

mainTimer sets an interval for every second that runs `mainEvents` every second. 

**mainEvents**<br>

If the timer hasn't run down, the mainEvents runs `statusChecker`, `activeQuestion`, and `timesUp` every second inside the timer.

  * `statusChecker` 
    * sets `questTimeout` to true if `secRemain` hits zero.

    * If all of the questions have been asked, gameEnd is set to true.

  * `activeQuestion`
    * Incrementally decreases `secRemain`

    * Displays `secRemain` to user

**secondaryEvents**<br>

This method shows the game over screen if gameEnd is true. If game isn't over, it checks if `questTimeout` is false, if it is, `timerSet` and `mainTimer` is called.

**correctAnswerSet**<br>

correctAnswerSet sets the correct answer somewhere in the page. Under the id "choices-column".

This method uses the array `answersList` for display and uses the variable `passedQuestions` to keep track of which correct answer to display. The id "#correct" is given to the div that's created.

**wrongAnswerSet**<br>

wrongAnswerSet sets a wrong answer in `#choices-column` and gives the created div an id of `#incorrect` 
  * *in retrospect, I should have used another convention to keep track of this. Giving multiple elements the same id is not a good convention.*

This utilizes the object of arrays `wrongObjArray` to know which wrong answers to give, and utilizes `wrongAnswersArray` to ensure the same wrong answer isn't given twice.

**answersRandomizer**<br>

This method utilizes `nonRepeat` to make sure that `wrongAnswerSet` and `correctAnswerSet` are called the correct amount of times.

`arrayOfFunk` is used to input syntax for selecting which function is called in the for loop.

**guessRight/guessWrong/timesUp**<br>

These methods keep track of the correct and incorrect answers given, and updates the user of their answer.If the user waited too long, the user is notified; If the user was wrong, it gives the user the corret answer. 

**triviaEnd**<br>

triviaEnd clears out the interval, resets `secRemain` to 30 and increases `passedQuestions` by 1. And empties the `#choices-column`.





function startQuizzClicked (quizzID) {
    
    QuizzClicked = searchQuizzClickedInMyQuizzes(quizzID);

    LoadLayoutGame();
    RenderLayoutGame(QuizzClicked);
    // console.log("titulo", QuizzClicked.title);
}

function searchQuizzClickedInMyQuizzes(quizzID) {

    quizzID = parseInt(quizzID);
    for (var i=0; i<myQuizzes.length; i++) {

        if (myQuizzes[i].id === quizzID) {
            return myQuizzes[i];
        }          
    }
}

//NAVEGAÇÃO: trocar para layout GAME
function LoadLayoutGame() {

    var myQUizzesScreen = document.querySelector(".user-quizzes");
    myQUizzesScreen.style.display = "none";

    var gameScreen = document.querySelector(".game");
    gameScreen.style.display = "initial";

}

function RenderLayoutGame(QuizzClicked) {

    var elementQuizzTitle = document.querySelector(".game h2");
    elementQuizzTitle.innerText = QuizzClicked.title;

    var elementQuizzCurrentQuestion = document.querySelector(".game .current-question");
    elementQuizzCurrentQuestion.innerText = QuizzClicked.data.questions[0]["question-title"];

    var answerCorrect = QuizzClicked.data.questions[0].answers[0];
    answersVectorShuffled = QuizzClicked.data.questions[0].answers.sort(shufflePositions);

    var elementsQuizzAnswers = document.querySelectorAll(".game .box-answer span")

    for (var i =0;i< 4; i++) {
        elementsQuizzAnswers[i].innerText = answersVectorShuffled[i];
    }

     console.log(answersVectorShuffled);

}

function shufflePositions() {
    return Math.random() - 0.5;
}
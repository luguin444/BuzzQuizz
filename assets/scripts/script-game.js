
function startQuizzClicked (quizzID) {
    
    QuizzClicked = searchQuizzClickedInMyQuizzes(quizzID);

    LoadLayoutGame();
    RenderLayoutGame();
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

function showCorrectAnswer() {

    var elementsQuizzAnswersBox = document.querySelectorAll(".game .box-answer");
    var elementsQuizzAnswers = document.querySelectorAll(".game .box-answer span");

    for(var i=0; i<4; i++) {

        var isAnswerCorrect = elementsQuizzAnswers[i].innerText === QuizzClicked.data.questions[0].answers[0];
        if(isAnswerCorrect) {
            elementsQuizzAnswersBox[i].style.background = "#95f0b8";
        } else {
            elementsQuizzAnswersBox[i].style.background = "#f5b9bb";
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

function RenderLayoutGame() {

    var elementQuizzTitle = document.querySelector(".game h2");
    elementQuizzTitle.innerText = QuizzClicked.title;

    var elementQuizzCurrentQuestion = document.querySelector(".game .current-question");
    elementQuizzCurrentQuestion.innerText = QuizzClicked.data.questions[0]["question-title"];


    var vetAuxiliar = [0,1,2,3];
    vetAuxiliar = vetAuxiliar.sort(shufflePositions);
    
    var elementsQuizzAnswers = document.querySelectorAll(".game .box-answer span");
    var elementsQuizzLinks = document.querySelectorAll(".game .box-answer img");

    for (var i =0;i< 4; i++) {

        var randomPosition = vetAuxiliar[i];
        elementsQuizzAnswers[i].innerText = QuizzClicked.data.questions[0].answers[randomPosition];
        elementsQuizzLinks[i].setAttribute("id",QuizzClicked.data.questions[0].links[randomPosition]);
    }
}

function shufflePositions() {
    return Math.random() - 0.5;
}


// console.log(vetAuxiliar)
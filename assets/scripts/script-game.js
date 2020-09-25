function startQuizzClicked (quizzID) {
    
    QuizzClicked = searchQuizzClickedInMyQuizzes(quizzID);

    LoadLayoutGame();

    currentQuestion = QuizzClicked.data.questions[currentQuestionPosition];

    RenderLayoutGame();
}

function searchQuizzClickedInMyQuizzes(quizzID) {

    quizzID = parseInt(quizzID);
    for (var i=0; i<myQuizzes.length; i++) {

        if (myQuizzes[i].id === quizzID) {
            return myQuizzes[i];
        }          
    }
}

function showCorrectAnswer(answerClicked) {

    var userAnswer = answerClicked.querySelector("span").innerText;   
    if (userAnswer === currentQuestion.answers[0]){                 //Usuario acertou ?
        myScore++;      
    }

    changeCSSBackgroundToShowAnswers();

    var isNotAlreadyLastQuestion = currentQuestionPosition < QuizzClicked.data.questions.length -1;  //true = not last question ;


    if (lockClick === false && isNotAlreadyLastQuestion ) {
        lockClick = true;
        setTimeout(changeCurrentQuestion,2000);
    }  

    else if (!isNotAlreadyLastQuestion) {
        changeScreenEndOfGame();
        calculateLevel();
        renderFinalScreen();
    }

}

function changeCurrentQuestion() {

    currentQuestionPosition++;
    currentQuestion = QuizzClicked.data.questions[currentQuestionPosition];
    RenderLayoutGame();
    removeCorrectAnwer();
    lockClick = false;
}

function calculateLevel() {

    var numberOfQuestions = currentQuestionPosition + 1;
    percentageScore = (myScore/numberOfQuestions)*100;
    percentageScore = Math.ceil(percentageScore);

    for (var i = 0; i< QuizzClicked.data.level.length; i++) {

        var minScore = QuizzClicked.data.level[i].minScore;
        var maxScore = QuizzClicked.data.level[i].maxScore
        if (percentageScore >= minScore && percentageScore<=maxScore) {
            userLevelScore = QuizzClicked.data.level[i];
        }
    }
}


//RENDER:  DESTRIBUIR O TITULO. TBM AS    PERGUNTAS, RESPOSTAS E LINKS ATUAIS NA TELA DO JOGO
function RenderLayoutGame() {

    var elementQuizzTitle = document.querySelector(".game h2");  //titulo
    elementQuizzTitle.innerText = QuizzClicked.title;

    var numQuestion =  currentQuestionPosition + 1;
    var elementQuizzCurrentQuestion = document.querySelector(".game .current-question");  //pergunta atual
    elementQuizzCurrentQuestion.innerText = numQuestion + ". " + currentQuestion["question-title"];


    var vetAuxiliar = [0,1,2,3];                                //Distribui as respostas e links de imagem
    vetAuxiliar = vetAuxiliar.sort(shufflePositions);                       
    
    var elementsQuizzAnswers = document.querySelectorAll(".game .box-answer span");
    var elementsQuizzLinks = document.querySelectorAll(".game .box-answer img");
    for (var i =0;i< 4; i++) {

        var randomPosition = vetAuxiliar[i];
        elementsQuizzAnswers[i].innerText = currentQuestion.answers[randomPosition];
        elementsQuizzLinks[i].setAttribute("src",currentQuestion.links[randomPosition]);
    }
}
//RENDER:  
function renderFinalScreen() {
    var elementQuizzTitle = document.querySelector(".result h2");
    elementQuizzTitle.innerText = QuizzClicked.title;

    var numberOfQuestions = currentQuestionPosition + 1;

    var elementScoreNumberOfQuestion = document.querySelector(".result .score :first-child");
    elementScoreNumberOfQuestion.innerText = "Você acertou " + myScore + " de " + numberOfQuestions + " perguntas!";

    var elementScoreNumberOfQuestion = document.querySelector(".result .score :last-child");
    elementScoreNumberOfQuestion.innerText = "Score: " + percentageScore + " %";

    var elementTitleLevel = document.querySelector(".result .level-title");  
    elementTitleLevel.innerText = userLevelScore.title;

    var elementDescriptionLevel = document.querySelector(".result .level-description");
    elementDescriptionLevel.innerText = userLevelScore.description;
}

//ADICIONA E REMOVE O BACKGROUND VERMELHO E VERDE DAS RESPOSTAS
function changeCSSBackgroundToShowAnswers() {

    var elementsQuizzAnswersBox = document.querySelectorAll(".game .box-answer");
    var elementsQuizzAnswers = document.querySelectorAll(".game .box-answer span");

    for(var i=0; i<4; i++) {

        var isAnswerCorrect = elementsQuizzAnswers[i].innerText === currentQuestion.answers[0];
        if(isAnswerCorrect) {
            elementsQuizzAnswersBox[i].style.background = "#95f0b8";
          
        } else {
            elementsQuizzAnswersBox[i].style.background = "#f5b9bb";
        }
    }
}
function removeCorrectAnwer() {
    var elementsQuizzAnswersBox = document.querySelectorAll(".game .box-answer");

    for(var i=0; i<4; i++) {
        elementsQuizzAnswersBox[i].style.background = "#fff"
    }

}

//FUNÇÃO AUXILIAR PARA EMBARALHAR VETOR
function shufflePositions() {
    return Math.random() - 0.5;
}

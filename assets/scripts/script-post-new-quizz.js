
//ENVIAR O NOVO QUIZZ PARA O SERVIDOR
function postNewQuizzServer() {

    if (buildObjectNewQuizz()) {
        var requestPost = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", newQuizzObject , { headers: headerObject });
        requestPost.then(processPostNewQuizz);
        requestPost.catch(PostNewQuizzError);
    } else {
        alert("Por favor, as perguntas só podem ter um ponto de interrogação e esse deve estar no final da mesma. Corrija os dados.");
    }
}
function processPostNewQuizz () {
    console.log("Parabens! Você conseguiu postar o Quizz no servidor");
    changeScreenForMyQuizzesAgain();
    loadUserQuizzes();  //novo Quizz já aparecer na tela Meus Quizzes
}
function PostNewQuizzError () {
    console.log("Deu ruim! Você não conseguiu postar o Quizz no servidor");
    newQuizzObject = {};
}

//FUNÇOES PARA CONSTRUIR MEU OBJETO NOS MOLDES DA DOCUMENTAÇÃO DO SERVIDOR
function buildObjectNewQuizz() {


    newQuizzObject.title = titleValidation();

    newQuizzObject.data = {};
    newQuizzObject.data.questions = [{}];
    newQuizzObject.data.level = [{}];

    var questionSentences = grabQuestionSentences();   //retorna todas as perguntas principais
    if (questionsFormatAreInvalid(questionSentences)) {
        newQuizzObject = {};
        return false;
    }

    var allAnswersVector = buildFieldAnswer();
    var allLinksVector = buildFieldImagesLinks();
    var cont = 0;
    var answersVectorOneQuestion = [];
    var linksVectorOneQuestion = [];
    
    
    for (var i = 0; i<numberOfQuestions; i++) {               //construindo titulo das perguntas, respostas e links

        answersVectorOneQuestion = allAnswersVector.slice(cont,cont+4);
        linksVectorOneQuestion = allLinksVector.slice(cont,cont+4);
        newQuizzObject.data.questions[i] = {"question-title": questionSentences[i], "answers": answersVectorOneQuestion, "links": linksVectorOneQuestion};
        cont += 4;
    }

    newQuizzObject.data.level = buildLevelVectorObjects();

    console.log("Aqui objeto Quizz", newQuizzObject);

    return true;    //caso só não tenha uma interrogação, enviar alert
}

function titleValidation() {

    var titleText = document.querySelector(".title-quizz").value;   //TItulo do Quizz
    titleText = titleText.trim();            //remover espaços em branco no inicio e final da string
    titleText = firstLetterToUpper(titleText);

    return titleText;
}
function grabQuestionSentences() {
    
    var inputQuestion = document.querySelectorAll(".new-question");
    var questionSentences = [];

    for(var i = 0; i< inputQuestion.length ; i++) {
        questionSentences[i] = inputQuestion[i].value.trim();
        questionSentences[i] = firstLetterToUpper(questionSentences[i]);
    }
    return  questionSentences;
}
function questionsFormatAreInvalid(questionSentences) {

    for(var i = 0; i< questionSentences.length ; i++) {

        var positionOfQuestionMark = questionSentences[i].search('\\?');

        var IsInLastPosition = positionOfQuestionMark === (questionSentences[i].length -1);

        if (positionOfQuestionMark === -1 || !IsInLastPosition)   //não tem ponto de interrogação na string || não está na ultima posição 
            return true;
    }
    return false;   //formato está certo.
}
function buildFieldAnswer() {

    var inputAnswer = document.querySelectorAll(".answers input");
    var answersVector = [];
    for(var i=0; i <inputAnswer.length; i++) {
        answersVector[i] = inputAnswer[i].value.trim();
        answersVector[i] = firstLetterToUpper(answersVector[i]);
    }
    return answersVector;
}
function buildFieldImagesLinks() {

    var inputLink = document.querySelectorAll(".images-links input");
    var linksVector = [];
    for(var i=0; i <inputLink.length; i++) {
        linksVector[i] = inputLink[i].value.trim();
    }
    return linksVector;
}
function buildLevelVectorObjects() {

    var levelObjects = [{}];

    var minPorcentage = document.querySelectorAll(".low");
    var maxPorcentage = document.querySelectorAll(".high");
    var titleLevel = document.querySelectorAll(".level-title");
    var imageLink = document.querySelectorAll(".link-image-level");
    var levelDescription = document.querySelectorAll("textarea");
  
    for (var i=0; i < numberOfLevels; i++) {

        levelObjects[i] = {"minScore": minPorcentage[i].value.trim(), "maxScore": maxPorcentage[i].value.trim(), "title": titleLevel[i].value.trim(), "link": imageLink[i].value.trim(), "description": levelDescription[i].value.trim()};
    }
    return levelObjects;
}
function firstLetterToUpper(text) {

    text = text.toLowerCase();
    var firstLetter = text.charAt(0).toUpperCase();
    text = firstLetter + text.slice(1);  //slice(vai da posição 1 até o final)
    return text;
}


//Adicionar niveis e perguntas no Quizz
function addNewQuestion() {

    numberOfQuestions++;

    var newBlockOfQuestion = CreateHTMLBlockQuestion();

    var listOfQuestionElement = document.querySelector(".building-quizz ul");
    listOfQuestionElement.appendChild(newBlockOfQuestion);
}
function addNewLevel() {

    numberOfLevels++;

    var newBlockofLevel = CreateHTMLBlockLevel();

    var listOfLevelElement = document.querySelector(".building-quizz .list-levels");
    listOfLevelElement.appendChild(newBlockofLevel);

}

//RENDERS 
function CreateHTMLBlockQuestion() {

    var newQuestion = document.createElement("li");

    newQuestion.classList.add("question-container");

        /*Caso queira ver essa estrutura, tem uma identada no arquivo HTML*/
    
    newQuestion.innerHTML = "<h2>Pergunta " + numberOfQuestions + "</h2>";
    newQuestion.innerHTML += "<input type='text' placeholder='Digite a pergunta' class='new-question'></input>";
    newQuestion.innerHTML += "<div class='container-answers'><div class='answers'><input type='text' placeholder='Digite a resposta certa' class = 'correct-answer'><input type='text' placeholder='Digite a resposta errada1' class = 'wrong-answer'><input type='text' placeholder='Digite a resposta errada2' class = 'wrong-answer'><input type='text' placeholder='Digite a resposta errada3' class = 'wrong-answer'></div><div class='images-links'><input type='text' placeholder='Link para imagem correta' class='correct-link'><input type='text' placeholder='Link para imagem errada1' class='wrong-link'><input type='text' placeholder='Link para imagem errada2' class='wrong-link'><input type='text' placeholder='Link para imagem errada3' class='wrong-link'></div></div>";
  
    return newQuestion;
}
function CreateHTMLBlockLevel() {

    var newLevel = document.createElement("li");
    newLevel.classList.add("level-container");

        /*Caso queira ver essa estrutura, tem uma identada no arquivo HTML*/
     newLevel.innerHTML = "<h2>Nível " + numberOfLevels + "</h2><div class='container-percentage'><input type='text' placeholder=' % Minima de acerto do nível' class='low'><input type='text' placeholder=' % Máxima de acerto do nível' class='high'></div><input type='text' placeholder='Título do nível' class='level-title'><input type='text' placeholder='LInk da imagem do nível' class='link-image-level'><textarea cols='30' rows='3' placeholder='Descrição do nível'></textarea>"

    return newLevel;
}
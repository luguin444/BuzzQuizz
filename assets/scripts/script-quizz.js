
function loadUserQuizzes () {

    headerObject = {"User-Token": token};
    var request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", { headers: headerObject } );
    request.then(teste);
    request.catch(requestQuizzesError);
}

function teste (response) {
    console.log("Rolou de bucar os quizzes no servidor");
    console.log(response);
}

function requestQuizzesError () {
    console.log("Não rolou de bucar os quizzes no servidor");
}


function createNewQuizz() {
    changeForNewQuizzScreen ();
}

function changeForNewQuizzScreen () {
    var myQUizzesScreen = document.querySelector(".user-quizzes");
    myQUizzesScreen.style.display = "none";

    var newQuizzesScreen = document.querySelector(".new-quizzes");
    newQuizzesScreen.style.display = "initial";
}

function postNewQuizzServer() {

    if (buildObjectNewQuizz()) {
        console.log(currentQUizz);
    }

}

function buildObjectNewQuizz() {

    var inputTitle = document.querySelector(".title-quizz");
    currentQUizz.title = inputTitle.value;

    var inputQuestion = document.querySelector(".new-question").value;    /*maybe use querySelectorAll*/

    var answersVector = buildFieldAnswer();

    var ImageLinkVector = buildFieldImagesLinks();

    var levelObject = buildLevelObject();
      
    currentQUizz.data = {};
    currentQUizz.data.questions = {};
    currentQUizz.data.questions =  {"question-title": inputQuestion, "answers": answersVector, "links": ImageLinkVector};
    currentQUizz.data.level = levelObject;

    return true;
}
function buildFieldAnswer() {

    var inputAnswer = document.querySelector(".correct-answer");
    var answersVector = [];
    answersVector[0] =  inputAnswer.value;
    inputAnswer = document.querySelectorAll(".wrong-answer");
    for(var i=0; i <3; i++) {
        answersVector[i+1] = inputAnswer[i].value;
    }
    return answersVector;
}
function buildFieldImagesLinks() {

    var inputLink = document.querySelector(".correct-link");
    var linksVector = [];
    linksVector[0] =  inputLink.value;
    inputLink = document.querySelectorAll(".wrong-link");
    for(var i=0; i <3; i++) {
        linksVector[i+1] = inputLink[i].value;
    }
    return linksVector;
}
function buildLevelObject() {

    var levelObject = {};

    var minPorcentage = document.querySelector(".low").value;
    var maxPorcentage = document.querySelector(".high").value;
    var titleLevel = document.querySelector(".level-title").value;
    var imageLink = document.querySelector(".link-image-level").value;
    var levelDescription = document.querySelector("textarea").value;

    levelObject.minScore = minPorcentage;
    levelObject.maxScore = maxPorcentage;
    levelObject.title = titleLevel;
    levelObject.link = imageLink;
    levelObject.desciption = levelDescription;

    return levelObject;
}


function addNewQuestion() {

    numberOfQuestions++;

    var newBlockofQuestion = CreateHTMLBlockQuestion();

    var listOfQuestionElement = document.querySelector(".building-quizz ul");

    listOfQuestionElement.appendChild(newBlockofQuestion);
}

function addNewLevel() {

    numberOfLevels++;

    var newBlockofLevel = CreateHTMLBlockLevel();

    var listOfLevelElement = document.querySelector(".building-quizz .list-levels");

    listOfLevelElement.appendChild(newBlockofLevel);

}

//  RENDERS

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

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
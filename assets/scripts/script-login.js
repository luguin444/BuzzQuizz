var userEmail;    //luguin
var userPassword; //8998
var token;  //token retornado do servidor
var headerObject = {};  //obejto header enviado para o servidor

var newQuizzObject = {};  //Objeto do novo Quizz
var numberOfQuestions = 1;  //numero de perguntas do novo quizz
var numberOfLevels = 1;    //numero de niveis do novo Quizz

var myQuizzes = [];
var QuizzClicked = {};  //quizz escolhido para jogar
var currentQuestion = {};
var currentQuestionPosition = 0;
var lockClick = false;
var myScore = 0;
var percentageScore = null;
var userLevelScore = {};

function validateDataWithServer () {
    
    if (checkIfFIeldsAreBlanck ()) {

        disableButtonLogin();

        data = {email: userEmail, password: userPassword};

        var requestPostUser = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users",data);
        requestPostUser.then(enterUserAccount);
        requestPostUser.catch(RegisterUserError);
    }
}
function enterUserAccount (response) {
    token = response.data["token"];
    changeScreenForMyQuizzes();
    loadUserQuizzes ();
}
function RegisterUserError() {
    alert("Senha ou email inválido. Favor tentar novamente.");
    enableButtonLogin();
}

function checkIfFIeldsAreBlanck () {

    var inputLogin = document.querySelector(".email");
    var inputPassword = document.querySelector(".password");
    
    var EmptyLogin = (inputLogin.value === "");
    var EmptyPassword = (inputPassword.value === "");

    if (EmptyLogin || EmptyPassword)  {
        alert("Por favor, preencha os campos de email e senha.");
        return false;
    }

    userEmail = inputLogin.value;
    userPassword = inputPassword.value;
    return true;      
}


function disableButtonLogin() {
    var button = document.querySelector(".login .container button");
    button.disabled = true;
}
function enableButtonLogin() {

    var button = document.querySelector(".login .container button");
    button.disabled = false;
}


// NAVEGAÇÃO: MUDANÇAS DE TELA
function changeScreenForMyQuizzes() {
    var loginScreen = document.querySelector(".login");
    loginScreen.style.display = "none";

    var myQuizzesScreen = document.querySelector(".user-quizzes");
    myQuizzesScreen.style.display = "initial"
}
function changeForNewQuizzScreen () {
    var myQUizzesScreen = document.querySelector(".user-quizzes");
    myQUizzesScreen.style.display = "none";

    var newQuizzesScreen = document.querySelector(".new-quizzes");
    newQuizzesScreen.style.display = "initial";
}
function changeScreenForMyQuizzesAgain() {

    var newQuizzesScreen = document.querySelector(".new-quizzes");
    newQuizzesScreen.style.display = "none";

    var gameScreen = document.querySelector(".game");
    gameScreen.style.display = "none";

    var myQUizzesScreen = document.querySelector(".user-quizzes");
    myQUizzesScreen.style.display = "initial";


}
function LoadLayoutGame() {

    var myQUizzesScreen = document.querySelector(".user-quizzes");
    myQUizzesScreen.style.display = "none";

    var gameScreen = document.querySelector(".game");
    gameScreen.style.display = "initial";

}
function changeScreenEndOfGame() {

    var gameScreen = document.querySelector(".game");
    gameScreen.style.display = "none";

    var finalScreen = document.querySelector(".result");
    finalScreen.style.display = "initial";
}


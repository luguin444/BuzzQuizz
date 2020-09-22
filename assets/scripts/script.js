var userEmail;    //luguin
var userPassword; //8998
var token;

function validateDataWithServer () {
    
    if (checkIfFIeldsAreBlanck ()) {

        data = {email: userEmail, password: userPassword};
        
        var requestPostUser = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users",data);
        requestPostUser.then(enterUserAccount);
        requestPostUser.catch(RegisterUserError);
    }
}
function enterUserAccount (response) {
    token = response.data["token"];
    changeScreen();
}
function RegisterUserError() {
    alert("Senha ou email inválido. Favor tentar novamente.");
}
function checkIfFIeldsAreBlanck () {

    var inputLogin = document.querySelector(".email");
    var inputPassword = document.querySelector(".password");
    
    var EmptyLogin = inputLogin.value === "";
    var EmptyPassword = inputPassword.value === "";

    if (EmptyLogin || EmptyPassword)  {
        alert("Por favor, preencha os campos de email e senha.");
        return false;
    }

    userEmail = inputLogin.value;
    userPassword = inputPassword.value;
    return true;
      
}

function changeScreen() {
    var loginScreen = document.querySelector(".login");
    loginScreen.style.display = "none";
    

}
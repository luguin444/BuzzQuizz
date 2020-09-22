var userEmail;    //luguin
var userPassword; //8998
var token;

function validateDataWithServer () {
    
    if (checkIfFIeldsAreBlanck ()) {

        data = {email: userEmail, password: userPassword};
        
        var requestPostUser = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users",data);
        requestPostUser.then(teste);
        requestPostUser.catch(RegisterUserError);
    }
}


function teste (response) {
    token = response.data["token"];
    console.log(token);
}

function RegisterUserError() {
    console.log("deu ruim");
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
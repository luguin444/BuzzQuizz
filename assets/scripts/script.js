

function validateData () {
    
    checkIfFIeldsAreBlanck ();
}


function checkIfFIeldsAreBlanck () {

    var inputLogin = document.querySelector(".email");
    var inputPassword = document.querySelector(".password");
    
    var EmptyLogin = inputLogin.value === "";
    var EmptyPassword = inputPassword.value === "";

    if (EmptyLogin || EmptyPassword) 
        alert("Por favor, preencha os campos de email e senha.");
}

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
    
}
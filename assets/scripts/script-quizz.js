
function loadUserQuizzes () {
    headerObject = {"User-Token": token};
    console.log(headerObject);
    var request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", { headers: headerObject } );
    request.then(teste);
    request.catch(requestQuizzesError);
}

function teste (response) {
    console.log(response.data);
}

function requestQuizzesError () {
    console.log("n deu bien");
}
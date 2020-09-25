//CARREGAR MEUS QUIZZES DO SERVIDOR
function loadUserQuizzes () {

    headerObject = {"User-Token": token};
    var request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes", { headers: headerObject } );
    request.then(processMyQUizzes);
    request.catch(requestQuizzesError);
}
function processMyQUizzes (response) {
    console.log("Rolou de bucar os quizzes no servidor");
    console.log(response.data);
    myQuizzes = response.data;
    renderMyQuizzes();
}
function requestQuizzesError () {
    console.log("Não rolou de bucar os quizzes no servidor");
}

//  RENDERS
function renderMyQuizzes() {

    var listQuizzes = document.querySelector(".my-quizzes");

    listQuizzes.innerHTML = "";

    for (var i = 0; i < myQuizzes.length; i++) {

        var oneQuizz = document.createElement("li");
        oneQuizz.classList.add("quizz");
        oneQuizz.setAttribute("id", myQuizzes[i].id);
        var id = myQuizzes[i].id; 
        oneQuizz.setAttribute("onclick", "startQuizzClicked(id)");
        oneQuizz.innerText = myQuizzes[i].title;
        listQuizzes.appendChild(oneQuizz);
    }
}
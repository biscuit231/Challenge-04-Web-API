var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.innerHTML = "Initials: " + allScores[i].initials + " - " + "Score: " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}
// Event listener to move back to homePage
goBack.addEventListener("click", function () {
    window.location.replace("https://biscuit231.github.io/Coding-Quiz-Challenge/");
});

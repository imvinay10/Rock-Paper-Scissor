const CHOICES = [
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "scissor",
        beats: "paper"
    },
    {
        name: "rock",
        beats: "scissor"
    }
];

const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game-container');
const resultsDiv = document.querySelector('.results');
const resultDivs = document.querySelectorAll('.results_result');
const resultsWinner = document.querySelector('.results_winner');
const resultsText = document.querySelector('.results_text');
const subResultsText = document.querySelector('.sub_results_text');
const compScore = document.querySelector('#comp');
const userScore = document.querySelector('#user');
const rules = document.querySelector('.rules');
const cross = document.querySelector('.cross');

let cScore = 0;
let uScore = 0;

const playAgainbtn = document.querySelector('.play-again');

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find((choice) => choice.name === choiceName);
        choose(choice);
    });
});

function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `<div class="choice ${results[idx].name}">
                <img src="${results[idx].name}.png" alt="${results[idx].name}" />
            </div>`;
        }, idx * 1000);
    });

    rules.classList.toggle('hidden');
    cross.classList.toggle('hidden');
    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
}

function displayWinner(results){
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());

        if(userWins){
            resultsText.innerText = "YOU WIN";
            resultDivs[0].classList.toggle('winner');
            keepScore(1);
        } else if(aiWins){
            resultsText.innerText = "YOU LOST";
            resultDivs[0].classList.toggle('winner');
            keepScore(0);
        } else {
            resultsText.innerText = "TIE UP";
            subResultsText.classList.toggle('hidden');
        }
            
        resultsWinner.classList.toggle('hidden');
        resultsDiv.classList.toggle('show-winner');
    }, 1000);
}

function isWinner(results){
    return results[0].beats == results[1].name;
}

function keepScore(UserWins) {
    if (UserWins) {
        uScore++;
        userScore.innerText = uScore;
    } else {
        cScore++;
        compScore.innerText = cScore;
    }
}

playAgainbtn.addEventListener("click", () => {
    console.log("Play again button clicked");
    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');

    resultDivs.forEach(resultDiv => {
        console.log("Resetting result div");
        resultDiv.innerHTML = "";
        resultDiv.classList.remove('winner');
    });

    resultsText.innerHTML = "";
    resultsWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle('show-winner');
});


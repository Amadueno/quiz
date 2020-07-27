// this is my questions and answers array

let questions = [
    {
        "question": "What is the Capital of California?",
        "correct_answer": "Sacramento",
        "answers": [
            "San Diego",
            "Belmont",
            "Houston",
            "Sacramento"
        ]
    },
    {
        "question": "What month does Christmas fall in?",
        "correct_answer": "December",
        "answers": [
            "February",
            "March",
            "December",
            "June"
        ]
    },
    {
        "question": "What team does Lebron James play for currently?",
        "correct_answer": "Los Angeles Lakers",
        "answers": [
            "OKC Thunder",
            "Cleveland Cavaliers",
            "Dallas Mavericks",
            "Los Angeles Lakers"
        ]
    },
    {
        "question": "Where is the Eiffel Tower located?",
        "correct_answer": "France",
        "answers": [
            "Ecuador",
            "France",
            "Italy",
            "Germany"
        ]
    },
    {
        "question": "Who played Jack Sparrow in Pirates of the Caribbean?",
        "correct_answer": "Johnny Depp",
        "answers": [
            "Leonardo DiCaprio",
            "Jared Leto",
            "Orlando Bloom",
            "Johnny Depp"
        ]
    },
    {
        "question": "Who is the founder of Facebook?",
        "correct_answer": "Mark Zuckerberg",
        "answers": [
            "Elon Musk",
            "Jeff Bezos",
            "Mark Zuckerberg",
            "Mark Cuban"
        ]
    },
    {
        "question": "Who is the owner of the Los Angeles Lakers?",
        "correct_answer": "Jeanie Buss",
        "answers": [
            "Jeanie Buss",
            "Magic Johnson",
            "Shaquille O'Neal",
            "Jim Buss"
        ]
    },
    {
        "question": "Old McDonald had what?",
        "correct_answer": "farm",
        "answers": [
            "house",
            "barn",
            "farm",
            "boat",
        ]
    },
    {
        "question": "The Los Angeles Angels are located in Orange County",
        "correct_answer": "True",
        "answers": [
            "True",
            "False"
        ]
    },
    {
        "question": "How many innings are there in a baseball game?",
        "correct_answer": "9",
        "answers": [
            "10",
            "9",
            "8",
            "7"
        ]
    }
]
// this is what I will implement in the questions Array

let currentIndex = 0
// this will help tally the score and keep a timer on the questions portion
let score = 0
let seconds = 100
let timer
// this function will create new questions ont he screen when prompted to 
const newQuestion = () => {

    document.getElementById('question').textContent = questions[currentIndex].question

    let answers = questions[currentIndex].answers
    // this will add elements and a button to the inner html to help add answers within the domain

    document.getElementById('answers').innerHTML = ''

    for (let i = 0; i < answers.length; i++) {
        let answerElem = document.createElement('button')
        answerElem.className = 'answer btn btn-secondary btn-lg'
        answerElem.dataset.answer = answers[i]
        answerElem.textContent = answers[i]

        document.getElementById('answers').append(answerElem)
    }
}
// this function will alert the user if the answer is correct or incorrect, and will prompt an alert as well as a color to the text. 
const getAnswer = answer => {

    if (answer === questions[currentIndex].correct_answer) {
        score++
        document.getElementById('score').textContent = score
        let resultElem = document.createElement('div')
        resultElem.className = 'alert alert-success'
        resultElem.textContent = 'Correct Answer'
        document.getElementById('answers').append(resultElem)
    } else {
        let resultElem = document.createElement('div')
        resultElem.className = 'alert alert-danger'
        resultElem.textContent = 'Incorrect Answer'
        document.getElementById('answers').append(resultElem)
    }

    currentIndex++
    // this will add a new question 1 second after an answer is given, if nothing is answered result will be endGame

    setTimeout(() => {
        if (currentIndex < questions.length) {
            newQuestion()
        } else {
            endGame()
        }
    }, 1000)
}
// this will create a leaderboard within the HTML to show highest score to lowest
const endGame = () => {
    document.getElementById('trivia').innerHTML = `
      <h1 class="display-2">Game Over!</h1>
    <p class="display-4">Your final score is: ${score}</p>
    <hr class="my-4">
    <p>Please enter a username for the leaderboard</p>
    <form>
      <div class="form-group">
        <label for="username">username</label>
        <input type="text" class="form-control" id="username">
        <button id="submitScore" class="btn btn-primary">Submit</button>
      </div>
    </form>
    `

}
// this adds leaderboard, also turn the array into a string once it is pulled from the localstorage
const submitScore = submission => {
    console.log(submission)

    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []

    leaderboard.push(submission)

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))

    leaderboard.sort((a, b) => {
        return b.score - a.score
    })
    // this is using a bootstrap element to create the visual table, creates the elemnt as a result of the endGame

    let tableElem = document.createElement('table')
    tableElem.className = 'table'
    tableElem.innerHTML = `
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">username</th>
          <th scope="col">score</th>
        </tr>
      </thead>
    `

    let bodyElem = document.createElement('tbody')

    for (let i = 0; i < leaderboard.length; i++) {
        let rowElem = document.createElement('tr')
        rowElem.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td>${leaderboard[i].username}</td>
        <td>${leaderboard[i].score}</td>
      `
        bodyElem.append(rowElem)
    }

    tableElem.append(bodyElem)

    document.getElementById('trivia').append(tableElem)

}
// sets a timer within the eventlistener function, allowing the click to prompt a new question onces the interval of 1 second is cleared
document.getElementById('startTrivia').addEventListener('click', () => {

    timer = setInterval(() => {
        seconds--
        document.getElementById('time').textContent = seconds

        if (seconds <= 0) {
            clearInterval(timer)
            endGame()
        }
    }, 1000)

    newQuestion()
})
// created a new database within the html to allow us to manipulate the element easier
// adds an event listener to the submitScore, so when a username is entered it adds a new value as well as score. 
document.addEventListener('click', event => {
    if (event.target.classList.contains('answer')) {
        getAnswer(event.target.dataset.answer)
    } else if (event.target.id === 'submitScore') {
        event.preventDefault()
        submitScore({
            username: document.getElementById('username').value,
            score: score
        })
    }
})

  // endGame()
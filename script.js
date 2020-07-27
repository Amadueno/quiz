let questions = [
    {
        "question": "What does a milliner make and sell?",
        "correct_answer": "Hats",
        "answers": [
            "Shoes",
            "Belts",
            "Hats",
            "Shirts"
        ]
    },
    {
        "question": "Rolex is a company that specializes in what type of product?",
        "correct_answer": "Watches",
        "answers": [
            "Cars",
            "Watches",
            "Computers",
            "Sports equipment"
        ]
    },
    {
        "question": "What was the nickname given to the Hughes H-4 Hercules, a heavy transport flying boat which achieved flight in 1947?",
        "correct_answer": "Spruce Goose",
        "answers": [
            "Noah&#039;s Ark",
            "Fat Man",
            "Trojan Horse",
            "Spruce Goose"
        ]
    },
    {
        "question": "What is the romanized Arabic word for 'moon'",
        "correct_answer": "Qamar",
        "answers": [
            "Qamar",
            "Najma",
            "Kawkab",
            "Shams"
        ]
    },
    {
        "question": "Which restaurant's mascot is a clown?",
        "correct_answer": "McDonald's",
        "answers": [
            "Whataburger",
            "Burger King",
            "McDonald's",
            "Sonic"
        ]
    },
    {
        "question": "What is the Portuguese word for 'Brazil'",
        "correct_answer": "Brasil",
        "answers": [
            "Brazil",
            "Brasilia",
            "Brasil",
            "Bras&iacute;l"
        ]
    },
    {
        "question": "According to the 2014-2015 Australian Bureau of Statistics, what percentage of Australians were born overseas?",
        "correct_answer": "28%",
        "answers": [
            "28%",
            "13%",
            "20%",
            "7%"
        ]
    },
    {
        "question": "According to the nursery rhyme, what fruit did Little Jack Horner pull out of his Christmas pie?",
        "correct_answer": "Plum",
        "answers": [
            "Apple",
            "Peach",
            "Pear",
            "Plum",
        ]
    },
    {
        "question": "Francis Bacon died from a fatal case of pneumonia while he was attempting to preserve meat by stuffing a chicken with snow.",
        "correct_answer": "True",
        "answers": [
            "True",
            "False"
        ]
    },
    {
        "question": "How many notes are there on a standard grand piano?",
        "correct_answer": "88",
        "answers": [
            "98",
            "108",
            "78",
            "88"
        ]
    }
]

let currentIndex = 0
let score = 0
let seconds = 100
let timer

const newQuestion = () => {

    document.getElementById('question').textContent = questions[currentIndex].question

    let answers = questions[currentIndex].answers

    document.getElementById('answers').innerHTML = ''

    for (let i = 0; i < answers.length; i++) {
        let answerElem = document.createElement('button')
        answerElem.className = 'answer btn btn-secondary btn-lg'
        answerElem.dataset.answer = answers[i]
        answerElem.textContent = answers[i]

        document.getElementById('answers').append(answerElem)
    }
}

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

    setTimeout(() => {
        if (currentIndex < questions.length) {
            newQuestion()
        } else {
            endGame()
        }
    }, 1000)
}

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

const submitScore = submission => {
    console.log(submission)

    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []

    leaderboard.push(submission)

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard))

    leaderboard.sort((a, b) => {
        return b.score - a.score
    })

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
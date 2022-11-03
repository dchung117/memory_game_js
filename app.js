// define card array
const cards = ["fries", "cheeseburger", "hotdog", "ice-cream", "milkshake", "pizza"]
const cardArray = []
cards.forEach(c => cardArray.push(
    {
        name: c,
        img: `images/${c}.png`
    },
    {
        name: c,
        img: `images/${c}.png`
    })
)

// chosen card array
let cardsChosenIds = []

// randomly shuffle the cards
cardArray.sort(() => 0.5 - Math.random())

// get the result object, initialize as 0
const scoreDisplay = document.querySelector("#result")
scoreDisplay.textContent = 0

// make grid
const gridDisplay = document.querySelector("#grid")
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        // create an image of the card
        const card = document.createElement("img")

        // set src attribute to the image path
        card.setAttribute("src", "images/blank.png")
        card.setAttribute("data-id", i)

        // add event listener (flip card when clicked)
        card.addEventListener("click", flipCard)

        // append card to the grid display
        gridDisplay.append(card)
    }
}

createBoard()

// function to flip card
function flipCard() {
    // get the card id
    const cardId = this.getAttribute("data-id")
    cardsChosenIds.push(cardId)

    // flip the card over
    this.setAttribute("src", cardArray[cardId].img)

    // check if both cards match
    if (cardsChosenIds.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

// function to check if chosen cards match
function checkMatch() {
    // get all images in grid display
    const cards = document.querySelectorAll("#grid img")

    // compare chosen items
    const cardOneId = cardsChosenIds[0]
    const cardTwoId = cardsChosenIds[1]

    // check if same card is clicked
    if (cardOneId === cardTwoId) {
        alert("You clicked the same image!")
        // set both cards w/ original background
        cards[cardOneId].setAttribute("src", "images/blank.png")
        cards[cardTwoId].setAttribute("src", "images/blank.png")
    } else if (cardArray[cardOneId].name === cardArray[cardsChosenIds[1]].name) {
        alert("Match found!")
        // set both cards w/ white background
        cards[cardOneId].setAttribute("src", "images/white.png")
        cards[cardTwoId].setAttribute("src", "images/white.png")

        // remove event listeners on matched cards (i.e. ignore clicks)
        cards[cardOneId].removeEventListener("click", flipCard)
        cards[cardTwoId].removeEventListener("click", flipCard)

        // update the score
        scoreDisplay.textContent = (parseInt(scoreDisplay.innerHTML) + 10).toString()

    } else {
        // set both cards w/ original background
        cards[cardOneId].setAttribute("src", "images/blank.png")
        cards[cardTwoId].setAttribute("src", "images/blank.png")
        alert("Sorry, try again!")
    }

    // reset the cardsChosenIds
    cardsChosenIds = []

    // check if all matches found
    if (parseInt(scoreDisplay.textContent) === cardArray.length/2 * 10) {
        scoreDisplay.textContent = "YOU WIN! CONGRATULATIONS!"
    }
}
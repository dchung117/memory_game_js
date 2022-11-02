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

// randomly shuffle the cards
cardArray.sort(() => 0.5 - Math.random())

// make grid
const gridDisplay = document.querySelector("#grid")
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        // create an image of the card
        const card = document.createElement("img")

        // set src attribute to the image path
        card.setAttribute("src", "images/blank.png")
        card.setAttribute("data-id", i)

        // append card to the grid display
        gridDisplay.append(card)
    }
}

createBoard()
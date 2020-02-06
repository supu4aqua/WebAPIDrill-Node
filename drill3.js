const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/lotto", (req, res) => {
    const { numbers } = req.query;

    if (!numbers) {
        return res.status(400).send("numbers is required");
    }

    if (!Array.isArray(numbers)) {
        return res.status(400).send("numbers must be an array");
    }
    //Filter the numbers array with numbers between 1 and 20
    const guesses = numbers
        .map(n => parseInt(n))
        .filter(n => !Number.isNaN(n) && n >= 1 && n <= 20);

    if (guesses.length != 6) {
        return res
            .status(400)
            .send("numbers must contain 6 integers between 1 and 20");
    }

    const stockNumbers = Array(20)
        .fill(1)
        .map((_, i) => i + 1);

    //randomly choose 6
    const winningNumbers = [];
    for (let i = 0; i < 6; i++) {
        const ran = Math.floor(Math.random() * stockNumbers.length);
        winningNumbers.push(stockNumbers[ran]);
        stockNumbers.splice(ran, 1);
    }

    //compare the guesses to the winning number
    let diff = winningNumbers.filter(n => !guesses.includes(n));

    // construct a response
    let responseText;

    switch (diff.length) {
        case 0:
            responseText = "Wow! Unbelievable! You could have won the mega millions!";
            break;
        case 1:
            responseText = "Congratulations! You win $100!";
            break;
        case 2:
            responseText = "Congratulations, you win a free ticket!";
            break;
        default:
            responseText = "Sorry, you lose";
    }
});

app.listen(8000, () => {
    console.log("Express server is listening on port 8000!");
});
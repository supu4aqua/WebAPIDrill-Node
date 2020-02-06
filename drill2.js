const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/cipher", (req, res) => {
    const { text, shift } = req.query;
    if (!text) {
        return res.status(400).send("text is required");
    }

    if (!shift) {
        return res.status(400).send("shift is required");
    }
    const numShift = parseFloat(shift);
    const base = "A".charCodeAt(0);
    const cipher = text
        .toUpperCase()
        .split("") // create an array of characters
        .map(char => {
            // map each original char to a converted char
            const code = char.charCodeAt(0); //get the char code

            // if it is not one of the 26 letters ignore it
            if (code < base || code > base + 26) {
                return char;
            }

            // otherwise convert it
            // get the distance from A
            let diff = code - base;
            diff = diff + numShift;

            // in case shift takes the value past Z, cycle back to the beginning
            diff = diff % 26;

            // convert back to a character
            const shiftedChar = String.fromCharCode(base + diff);
            return shiftedChar;
        })
        .join(""); // construct a String from the array

    // Return the response
    res.status(200).send(cipher);
});

app.listen(8000, () => {
    console.log("Express server is listening on port 8000!");
});
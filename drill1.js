const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/sum", (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    if (!a) {
        return res.status(400).send("a is required");
    }

    if (!b) {
        return res.status(400).send("b is required");
    }
    const sum = a + b;
    const message = `The sum of a and b is ${sum}`;
    res.send(message);
});
app.listen(8000, () => {
    console.log("Express server is listening on port 8000!");
});
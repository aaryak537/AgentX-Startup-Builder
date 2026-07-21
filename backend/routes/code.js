const express = require("express");

const router = express.Router();

const runDocker = require("../sandbox/runner");

router.post("/run", async (req, res) => {

    const { code } = req.body;

    const result = await runDocker(code);

    res.json(result);

});

module.exports = router;
const express = require('express');
const Jimp = require('jimp');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const imgUrl = req.query.url || "";
    if (!imgUrl) {
        res.status(400).end();
    }
    const width = parseInt(req.query.w) || 200;
    const height = parseInt(req.query.h) || Jimp.AUTO;
    const quality = parseInt(req.query.q) || 60;

    const startTime = new Date().getTime();
    const img = await Jimp.read(imgUrl);
    img.resize(width, height);
    img.quality(quality);

    const imgRes = await img.getBufferAsync(Jimp.AUTO);

    res.header("Content-Type", "image/jpeg");
    res.header("Cost-Time", new Date().getTime() - startTime);
    res.send(imgRes);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
import express from 'express';
const app = express();
const port = 9714;

import { setSolidColorWallpaper, setWallpaper } from 'wallpaper';

import jimp from 'jimp';

app.get('/', (req, res) => {
    // Check if res.query.wallpaper is a real hex color
    var wallpaper = req.query.wallpaper;
    if (wallpaper && wallpaper.match(/^[0-9A-F]{6}$/i)) {
        // Set the wallpaper
        if(setSolidColorWallpaper !== undefined) {
            setSolidColorWallpaper(wallpaper);
        } else {
            var singleColorImage = new jimp(1, 1);
            var hexBackground = parseInt((wallpaper + 'FF'), 16)
            singleColorImage.background(hexBackground);
            singleColorImage.write('/tmp/wallpaper.jpg');

            setWallpaper('/tmp/wallpaper.jpg');
        }

        res.send('Sucessfully changed the wallpaper of the server to #' + wallpaper);
    } else {
        res.send('Invalid color');
    }
});

app.listen(port, () => console.log(`App started on ${port}!`));
const express = require('express');
const fs = require('fs');
const cors = require('cors')
const app = express();

app.use(express.json()); // for parsing application/json
app.use(cors());

app.post('/addLink', (req, res) => {
    const { category, url, name } = req.body;

    // Read the existing bookmarks
    fs.readFile('bookmarks.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
            return;
        }

        // Add the new link to the bookmarks
        // This will depend on how your bookmarks are structured
        // For example:
        const newLink = `<li><a href="${url}" target="_blank" title="${name}" rel="nofollow">${name}</a></li>`;
        const updatedData = data.replace(`<!-- Insert new links for ${category} here -->`, newLink);

        // Write the updated bookmarks back to the file
        fs.writeFile('bookmarks.html', updatedData, 'utf8', err => {
            if (err) {
                console.error(err);
                res.status(500).send('An error occurred');
                return;
            }

            res.send('Link added successfully');
        });
    });
});

app.listen(3000, () => console.log('Server listening on port 3000'));

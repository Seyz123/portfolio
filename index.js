const express = require("express");
const config = require("./config.json");
const path = require("path");
const on = require("octonode");
const app = express();
const client = on.client();
const user = client.user(config.username);
const PORT = config.port;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/*", async(req, res) => {
    user.repos((err, repos) => {
        user.info((err, infos) => {
            let json = {
                error: null,
                config,
                repos: [],
                user: null
            };
            
            if(err) {
                json.error = true;
            } else {
                json.user = infos;
                json.repos = repos;
            }
            
            res.render("index", json);
        });
    });
});

app.listen(PORT, () => {
    console.log("App running on port : " + PORT);
});
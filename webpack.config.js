var path = require("path"); // used to get context

module.exports = {
    context: path.join(__dirname, "app"), // resolves entry below, must be absolute path
    entry: "./app.js", // entry point or loader for the application
    output: {
        path: path.join(__dirname, "app/lib"), // express static folder is at /app/lib
        filename: "[name].bundle.js", // the file name of the bundle to create.  [name] is replaced by the name of the chunk (code-splitting)
        publicPath: "static", // example uses express as the webserver
    },
};
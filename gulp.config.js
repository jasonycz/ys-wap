module.exports = function () {
    var client = './src',
        clientApp = './src/app',
        dist = 'dist',
        tmp = '.tmp';
    var config = {
        client: client,
        dist: dist,
        tmp: tmp,
        index: client + "/index.html",
        alljs: [
            client + "/app/**/*.js",
            './*.js'
        ],
        assets: [
            client + "/app/**/*.html",
            "/node_modules/font-awesome/css/*",
            "/node_modules/font-awesome/fonts/*",
            "/node_modules/weather-icons/css/*",
            "/node_modules/weather-icons/font/*",
            "/node_modules/material-design-iconic-font/dist/**/*",
            client + "/fonts/**/*",
            client + "/images/**/*",
            client + "/favicon.ico"
        ],
        sass: [
            client + "/styles/**/*.scss"
            //client + "/styles/main.scss"
        ],
        js: [
            clientApp + "/**/*.module.js",
            clientApp + "/**/*.js",
            '!' + clientApp + "/**/*.spec.js"
        ],
        allToClean: [
            tmp,
            ".DS_Store",
            ".sass-cache",
            "node_modules",
            ".git",
            //client + "/node_modules",
            "readme.md"
        ]
    };

    return config;
};
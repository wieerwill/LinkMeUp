const express = require('express');
const chokidar = require('chokidar');
const { exec } = require('child_process');
const browserSync = require('browser-sync').create();

const app = express();
const port = 3000;

app.use(express.static('dist'));

const watcher = chokidar.watch(['src', 'public'], { ignored: /(^|[/\\])\../ });

watcher.on('change', (path) => {
    console.log(`File ${path} changed. Reloading...`);
    exec('npm run build', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Build Output: ${stdout}`);
        browserSync.reload(); // Reload the browser after the build is complete
    });
});

app.listen(port, () => {
    console.log(`Development server is running at http://localhost:${port}`);
});

// Initialize Browser Sync
browserSync.init({
    proxy: 'http://localhost:3000', // Proxy to the Express server
    files: 'dist/**/*.*', // Watch files in the dist directory
    open: false, // Do not open a new browser window
    notify: false // Do not show notifications
});

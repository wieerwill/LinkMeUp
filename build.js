const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const CleanCSS = require('clean-css');
const HTMLMinifier = require('html-minifier').minify;

// Function to clean up the dist directory
function cleanDistDir(distPath) {
    if (fs.existsSync(distPath)) {
        fs.readdirSync(distPath).forEach((file) => {
            const curPath = path.join(distPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                cleanDistDir(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(distPath);
    }
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content);
}

function minimizeCSS(css) {
    return new CleanCSS({}).minify(css).styles;
}

function minimizeHTML(html) {
    return HTMLMinifier(html, {
        removeComments: true,
        collapseWhitespace: true
    });
}

// Function to inline CSS into HTML
function inlineCSS(html, css) {
    return html.replace('</head>', `<style>${css}</style></head>`);
}

function copyImages(srcDir, destDir) {
    if (!fs.existsSync(destDir)){
        fs.mkdirSync(destDir, { recursive: true });
    }

    const files = fs.readdirSync(srcDir);

    for (const file of files) {
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    }
}

// Compile Handlebars Template
function compileTemplate(templatePath, data) {
    const templateSource = readFile(templatePath);
    const template = handlebars.compile(templateSource);
    return template(data);
}

// Main build function
function build() {
    const baseHtmlPath = path.join(__dirname, 'public', 'index.html');
    const templatePath = path.join(__dirname, 'src', 'templates', 'social-links-template.hbs');
    const dataPath = path.join(__dirname, 'src', 'data.json');
    const cssPath = path.join(__dirname, 'public', 'styles', 'main.css');
    const imagesSrcPath = path.join(__dirname, 'public', 'images');
    const distPath = path.join(__dirname, 'dist');
    const imagesDestPath = path.join(distPath, 'images');

    cleanDistDir(distPath);

    // Load data, base HTML, and CSS
    const data = JSON.parse(readFile(dataPath));
    const baseHtml = readFile(baseHtmlPath);
    let css = readFile(cssPath);

    // Output titles from data.json
    data.socialLinks.forEach(link => console.log(link.name));

    // Minimize CSS
    css = minimizeCSS(css);

    // Compile HTML with Handlebars
    const socialLinksHtml = compileTemplate(templatePath, data);

    // Replace placeholder in base HTML with compiled HTML
    let finalHtml = baseHtml.replace('<!-- Handlebars template will populate this section -->', socialLinksHtml);

    finalHtml = inlineCSS(finalHtml, css);
    finalHtml = minimizeHTML(finalHtml);

    // Ensure dist directory exists
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath);
    }

    writeFile(path.join(distPath, 'index.html'), finalHtml);
    copyImages(imagesSrcPath, imagesDestPath);
}

// Run the build process
build();

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, 'public');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Render each EJS template and save it as an HTML file
fs.readdirSync(templatesDir).forEach((file) => {
    if (file.endsWith('.ejs')) {
        const templatePath = path.join(templatesDir, file);
        const outputPath = path.join(outputDir, file.replace('.ejs', '.html'));

        const template = fs.readFileSync(templatePath, 'utf-8');
        const renderedHtml = ejs.render(template);

        fs.writeFileSync(outputPath, renderedHtml, 'utf-8');
    }
});

console.log('Templates rendered successfully.');

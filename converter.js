import { promises as fs } from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib'
import { fileURLToPath } from 'url';
import pdf2img from 'pdf-img-convert';

// Function to export PDF pages as images
async function exportPDFPagesAsImages(pdfPath, slidePrefix) {
  const pdfBuffer = await fs.readFile(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  const imageSizes = [
    { width: 1024, height: 768, suffix: 'full' },
    { width: 2048, height: 1536, suffix: 'slide', folder: 'img' },
    { width: 200, height: 150, suffix: 'thumb' }
  ];

  let slideCounter = 1;
  let totalSlides = pdfDoc.getPageCount() * imageSizes.length;
  let currentSlide = 0;
  
  for (const pdfPage of pdfDoc.getPages()) {
    const slideName = `${slidePrefix}_slide${slideCounter}`;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const slideFolderName = path.join(__dirname, slideName);
    await fs.mkdir(slideFolderName, { recursive: true });

    for (const imageSize of imageSizes) {
      const imageFolderName = imageSize.folder ? path.join(slideFolderName, imageSize.folder) : slideFolderName;
      await fs.mkdir(imageFolderName, { recursive: true });

      const imageFileName = `${slideName}-${imageSize.suffix}.jpeg`;
      const imageFilePath = path.join(imageFolderName, imageFileName);
      // console.log('### ', slideCounter);
      const imageData = await pdf2img.convert(pdfPath, {
        width: imageSize.width,
        height: imageSize.height,
        outputformat: 'jpeg',
        outputdir: imageFolderName,
        outputname: imageFileName,
        page_numbers: [slideCounter, slideCounter] // Convert only the current page
      });
      await fs.writeFile(imageFilePath, imageData);

      if (imageSize.suffix === 'slide') {
        const cssContent = `img {
          max-width: 100%;
          height: auto;
        }`;
        const cssFileName = 'styles.css';
        const cssFilePath = path.join(imageFolderName, 'css', cssFileName);
        await fs.mkdir(path.join(imageFolderName, 'css'), { recursive: true });
        await fs.writeFile(cssFilePath, cssContent);

        const jsContent = `console.log('Hello from ${slideName}');`;
        const jsFileName = 'script.js';
        const jsFilePath = path.join(imageFolderName, 'js', jsFileName);
        await fs.mkdir(path.join(imageFolderName, 'js'), { recursive: true });
        await fs.writeFile(jsFilePath, jsContent);

        const htmlContent = `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${slideName}</title>
          <link rel="stylesheet" href="css/${cssFileName}">
        </head>
        <body>
          <h1>${slideName}</h1>
          <img src="img/${imageFileName}" alt="${slideName}">
          <script src="js/${jsFileName}"></script>
        </body>
        </html>`;
        const htmlFilePath = path.join(imageFolderName, `${slideName}.html`);
        await fs.writeFile(htmlFilePath, htmlContent);
      }
      currentSlide++;
      const percentage = Math.floor((currentSlide / totalSlides) * 100);
      console.log(`Exported ${currentSlide} of ${totalSlides} slides = (${percentage}%).`);
    }
    slideCounter++;
  }
}

// Call the function with the PDF file path and slide prefix
exportPDFPagesAsImages('./document.pdf', 'Brintellix_id')
.then(() => {
  console.log('All PDF pages exported as images successfully!');
  })
  .catch((error) => {
  console.error('Error exporting PDF pages as images:', error);
  });

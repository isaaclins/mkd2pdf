document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const pdfPreview = document.getElementById('pdf-preview');
    const downloadBtn = document.getElementById('download-pdf');
    const copyPngBtn = document.getElementById('copy-png-btn');
    const fileInput = document.getElementById('file-input');
    const loader = document.getElementById('loader');
    const themeToggle = document.getElementById('theme-toggle');

    let debounceTimer;

    const getPdfStyles = (isDarkMode) => {
        if (isDarkMode) {
            return `
                body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.5; color: #c9d1d9; background-color: #0d1117; }
                pre, code { font-family: 'Courier New', Courier, monospace; }
                pre { background-color: #161b22; padding: 1em; border-radius: 6px; overflow-x: auto; border: 1px solid #30363d; }
                table { border-collapse: collapse; width: 100%; margin-top: 1em; margin-bottom: 1em; }
                th, td { border: 1px solid #30363d; padding: 8px 12px; }
                thead { background-color: #161b22; font-weight: bold; }
                a { color: #58a6ff; }
            `;
        }
        // Light Mode
        return `
            body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.5; color: #24292e; background-color: #ffffff; }
            pre, code { font-family: 'Courier New', Courier, monospace; }
            pre { background-color: #f6f8fa; padding: 1em; border-radius: 6px; overflow-x: auto; }
            table { border-collapse: collapse; width: 100%; margin-top: 1em; margin-bottom: 1em; }
            th, td { border: 1px solid #dfe2e5; padding: 8px 12px; }
            thead { background-color: #f6f8fa; font-weight: bold; }
            a { color: #0366d6; }
        `;
    };

    const createStyledHtml = (markdown) => {
        const isDarkMode = themeToggle.checked;
        const styles = getPdfStyles(isDarkMode);
        const html = marked.parse(markdown);
        return `<html><head><style>${styles}</style></head><body>${html}</body></html>`;
    };

    const generatePdf = (markdown) => {
        if (!markdown.trim()) {
            pdfPreview.src = 'about:blank';
            return;
        }

        loader.classList.remove('hidden');
        const elementForPdf = createStyledHtml(markdown);

        const opt = {
            margin: 0.5,
            filename: 'document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(elementForPdf).set(opt).outputPdf('datauristring').then(pdfDataUri => {
            pdfPreview.src = pdfDataUri;
        }).catch(err => {
            console.error('Error generating PDF:', err);
            pdfPreview.src = 'about:blank';
        }).finally(() => {
            loader.classList.add('hidden');
        });
    };

    const downloadPdf = () => {
        const markdown = markdownInput.value;
        if (!markdown.trim()) {
            alert('Please enter some markdown first.');
            return;
        }
        loader.classList.remove('hidden');
        const elementForPdf = createStyledHtml(markdown);

        const opt = {
            margin: 0.5,
            filename: 'markdown-export.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(elementForPdf).set(opt).save().catch(err => {
            console.error('Error downloading PDF:', err);
        }).finally(() => {
            loader.classList.add('hidden');
        });
    };

    const copyPng = () => {
        const markdown = markdownInput.value;
        if (!markdown.trim()) {
            alert('Please enter some markdown first.');
            return;
        }

        if (!navigator.clipboard || !navigator.clipboard.write) {
            alert('Clipboard API is not available in your browser. This feature requires a secure context (HTTPS).');
            return;
        }

        loader.classList.remove('hidden');
        const elementForPdf = createStyledHtml(markdown);

        const opt = {
            margin: 0,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true }
        };

        html2pdf().from(elementForPdf).set(opt).toCanvas().get('canvas').then(canvas => {
            canvas.toBlob(blob => {
                navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]).then(() => {
                    const originalText = copyPngBtn.textContent;
                    copyPngBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyPngBtn.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Error copying PNG:', err);
                    alert('Failed to copy image to clipboard.');
                });
            }, 'image/png', 1.0);
        }).catch(err => {
            console.error('Error generating canvas for PNG:', err);
            alert('Failed to generate PNG.');
        }).finally(() => {
            loader.classList.add('hidden');
        });
    };

    markdownInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            generatePdf(markdownInput.value);
        }, 500);
    });

    themeToggle.addEventListener('input', () => {
        generatePdf(markdownInput.value);
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                markdownInput.value = event.target.result;
                generatePdf(markdownInput.value);
            };
            reader.readAsText(file);
        }
    });

    downloadBtn.addEventListener('click', downloadPdf);
    copyPngBtn.addEventListener('click', copyPng);

    const initialMarkdown = `# Welcome to Markdown to PDF!
    
Type your markdown in this pane. The PDF preview will appear on the right.

## Features
* Real-time preview
* Upload Markdown files
* Download as PDF
* Dark Mode Theme

### Styled Tables
| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |

### Styled Code Blocks
\`\`\`javascript
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

Happy writing!`;
    markdownInput.value = initialMarkdown;
    generatePdf(initialMarkdown);
}); 

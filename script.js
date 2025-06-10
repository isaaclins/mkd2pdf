document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const pdfPreview = document.getElementById('pdf-preview');
    const downloadBtn = document.getElementById('download-pdf');
    const downloadPngBtn = document.getElementById('download-png');
    const fileInput = document.getElementById('file-input');
    const loader = document.getElementById('loader');

    let debounceTimer;

    const createStyledHtml = (markdown) => {
        const html = marked.parse(markdown);
        return `<div style="padding: 0.5in; width: 8.5in; box-sizing: border-box; font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.5; word-wrap: break-word;">${html}</div>`;
    };

    const generatePdf = (markdown) => {
        if (!markdown.trim()) {
            pdfPreview.src = 'about:blank';
            return;
        }

        loader.classList.remove('hidden');
        const elementForPdf = createStyledHtml(markdown);

        const opt = {
            margin: 0,
            filename: 'document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: { mode: 'avoid-all' }
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
            margin: 0,
            filename: 'markdown-export.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: { mode: 'avoid-all' }
        };

        html2pdf().from(elementForPdf).set(opt).save().catch(err => {
            console.error('Error downloading PDF:', err);
        }).finally(() => {
            loader.classList.add('hidden');
        });
    };

    const downloadPng = () => {
        const markdown = markdownInput.value;
        if (!markdown.trim()) {
            alert('Please enter some markdown first.');
            return;
        }
        loader.classList.remove('hidden');
        const elementForPdf = createStyledHtml(markdown);

        const opt = {
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true, letterRendering: true }
        };

        html2pdf().from(elementForPdf).set(opt).toCanvas().get('canvas').then(canvas => {
            const a = document.createElement('a');
            a.href = canvas.toDataURL('image/png', 1.0);
            a.download = 'markdown-export.png';
            a.click();
        }).catch(err => {
            console.error('Error downloading PNG:', err);
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
    downloadPngBtn.addEventListener('click', downloadPng);

    const initialMarkdown = `# Welcome to Markdown to PDF!
    
Type your markdown in this pane. The PDF preview will appear on the right.

## Features
* Real-time preview
* Upload Markdown files
* Download as PDF

Happy writing!`;
    markdownInput.value = initialMarkdown;
    generatePdf(initialMarkdown);
}); 

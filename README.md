# Markdown to PDF Converter

A simple, client-side, web-based utility to convert Markdown text to a PDF document. This tool runs entirely in the browser using JavaScript libraries and is hosted on GitHub Pages.

## Features

- **Live Preview:** See a real-time preview of the PDF as you type your Markdown.
- **File Upload:** Load a `.md` or `.txt` file directly into the editor.
- **Download PDF:** Generate and download the final PDF with a single click.
- **Client-Side:** All processing is done in your browser. Your data is never sent to a server.
- **Responsive Design:** Usable on both desktop and mobile devices.

## How It Works

The application uses the following JavaScript libraries:

- [marked.js](https://marked.js.org/): To parse the Markdown input into HTML.
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js/): To convert the generated HTML into a PDF document for previewing and downloading.

## Usage

1.  Open the live application hosted on GitHub Pages.
2.  Type or paste your Markdown into the left-hand editor pane.
3.  Alternatively, click "Or Upload File" to load a local Markdown file.
4.  The right-hand pane will automatically update with a preview of the PDF.
5.  Click the "Download PDF" button to save the document to your device.

## Deployment

This project is automatically deployed to GitHub Pages via a GitHub Actions workflow located at `.github/workflows/deploy.yml`. Any push to the `main` branch will trigger a new deployment.

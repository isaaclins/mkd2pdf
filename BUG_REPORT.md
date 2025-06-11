# How to File a Bug Report

If you've found a bug in the Markdown to PDF Converter, please file a report in our issue tracker. A well-written bug report helps us understand and fix the issue faster.

## Filing a Bug Report

To file a bug report, please [open a new issue](https://github.com/isaaclins/mkd2pdf/issues/new/choose) on our GitHub repository.

When you open the issue, please provide the following information:

### 1. Title

Write a clear and descriptive title that summarizes the bug.

- **Good:** "Large images in Markdown cause the PDF to be cut off."
- **Bad:** "PDF not working."

### 2. Steps to Reproduce

Provide a step-by-step description of how to reproduce the bug.

1.  Go to the main page.
2.  Paste the following Markdown text into the editor:
    ```markdown
    (Your problematic Markdown here)
    ```
3.  Click on 'Download PDF'.
4.  See the error.

### 3. Expected Behavior

Describe what you expected to happen when you followed the steps.

_Example: "I expected the PDF to be generated with the full image visible."_

### 4. Actual Behavior

Describe what actually happened.

_Example: "The PDF was generated, but the image was cut off at the bottom."_

### 5. Screenshot or Video

If possible, include a screenshot or a short video that demonstrates the issue. This can be very helpful for us to understand the problem.

### 6. Your Environment

Please provide information about your environment:

- **Browser + version:** (e.g., Chrome 124, Firefox 124, Safari 16)

### 7. Problematic Markdown

Please include the Markdown code that is causing the problem inside a fenced code block.

```markdown
# This is a heading

This is some text with an image that is too large.

![A very large image](https://example.com/large-image.png)
```

By providing this information, you will help us to resolve the issue as quickly as possible. Thank you for your contribution!

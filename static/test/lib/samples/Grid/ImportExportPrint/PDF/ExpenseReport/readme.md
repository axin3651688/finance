Expenses Report
===============

This sample shows how to create an expense report and save it to a PDF file using the **FlexGridPdfConverter** and **PdfDocument** API. The sample creates two FlexGrid instances (data & footer) internally and exports them to a document using the **FlexGridPdfConverter.draw** method in order to display an expense table. **drawText** and other vector graphics methods of PdfDocument are used to draw captions and expected handwritten entries.
Preserve Row Heights
====================

When the data source changes, the FlexGrid automatically re-generates all rows, and resets their sizes to the original values. This sample shows how you can preserve the row heights when the data is refreshed. It uses the **loadingRows**event to save the original row heights and the **loadedRows** event to restore them.
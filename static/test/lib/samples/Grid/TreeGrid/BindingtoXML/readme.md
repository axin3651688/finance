Binding to XML Documents
========================

This sample shows how you can use XML documents as a hierarchical data source for the **FlexGrid** control. It uses a **DOMParser** object to parse an XML string into a Document object and loops through the Document to build an array with "category" items, each with a "products" array. The array is used as an **itemsSource** and the **childItemsPath** property is used to show the products for each category as a tree.
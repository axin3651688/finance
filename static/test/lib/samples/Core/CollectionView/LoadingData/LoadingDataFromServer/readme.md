Loading Data from Server
============

Loading data into the __CollectionView__ from the server requires a network request. You can use the __wijmo.httpRequest__ method to retrieve the data from the server and set the __CollectionView.sourceCollection__ property to the returned data.  This sample makes a request and only selects category ids, names, and descriptions and displays them in a bulleted list.
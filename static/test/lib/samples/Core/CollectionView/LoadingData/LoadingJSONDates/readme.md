Loading JSON Dates
==================

Since JSON doesn't support dates very well, you may need to format them when loading in data from a server. This sample demonstrates how dates may appear in the __FlexGrid__ before and after they are 'revived'. It uses the __JSON.parse__ method to turn strings that look like dates into __Date__ objects.
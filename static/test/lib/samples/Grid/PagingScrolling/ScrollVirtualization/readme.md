Virtualization
==============

The sample below uses the **viewRange** property to implement a simple type of 'infinite scrolling'. When the user scrolls to the bottom of the grid, the code adds items to the grid's **itemsSource**. If you inspect the DOM, you will notice that no matter how large the **itemsSource** gets, the number of DOM elements remains constant. The data is 'virtualized'.
Hover Styles
============

By default, grid cells have solid backgrounds. This can get in the way of styling rows using pseudo selectors such as :hover. If you want to give a hover style to cells, things are simple. Just add some CSS based on the '.wj-cell' class and ':hover' pseudo-selector.  If you want to give a hover style to entire rows, apply the hover pseudo-style to the '.wj-row' element instead, and extend it to the row's non-selected child cells:
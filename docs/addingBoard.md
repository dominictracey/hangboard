## Steps for Adding a New Board

I use GIMP for editing the image, and use the [Mark Number Circles](http://registry.gimp.org/node/25086) plugin to put the numbers on it.

1. Grab a picture of the board from the internet.
2. Crop it to just include the left half of the board and scale it to be 720 pixels wide
3. Open up a new copy of one of the GIMP (xcf) files in docs/boards/. This has all the guides in it.
4. Open up the layers and get rid of the numbers and the old board
5. Copy the cropped board from 2
6. Paste it as a new layer into the copied xcf from 3.
7. Layer > Layer to image size
8. Fill the whole background with white.
9. Create a new directory in src/data/boards called $id_boardName
10. Copy one of the other board's board.js in and edit metadata. Make sure to change the id.
11. Figure out what all the holds are. Try to stick to the naming conventions (e.g. Big vs. Large or Deep)
12. Label the holds in GIMP. Tools > Path > click holds in order > Script-Fu > Mark Number Circles (circle radius 50, black bg, white fg)
13. Do the same path/script for labels below, using the guideline grid
14. Get the labels in. Font size 32.
15. Export to src/data/boards/{id_boardname}/board.png

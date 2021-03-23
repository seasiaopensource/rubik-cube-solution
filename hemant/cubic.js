/*
    (front) Orange ->  Opposite -> Red     (back)
    (top)   Blue   ->  Opposite -> Green   (bottom)
    (left)  Yellow ->  Opposite -> White   (right)

    Array Positions:
    0 - Front
    1 - Top
    2 - Right
    3 - Back
    4 - Left
    5 - Bottom

    Array Structure:
    8 | 7 | 6
    5 | 4 | 3
    2 | 1 | 0
*/

class Cubic {
    constructor(cubicValues) {
        this.cubicValues = cubicValues;
        this.temp1 = null;
        this.temp2 = null;
        this.temp3 = null;
    }

    getCubeSvg = (cubicValues) => {
        let updatedValues = cubicValues;

        for (i = 0; i <= 5; i++) {
            for (j = 8; j >= 0; j--) {
                // console.log(i, 'i', j, 'j', 'inside -- ', { updatedValues });
                if (updatedValues[i] && updatedValues[i][j]) {
                    let strItem = updatedValues[i][j];
                    let splitItems = strItem.split('-');

                    let currentColor = splitItems[0];
                    let currentIndex = parseInt(splitItems[1]);
                    let currentId = splitItems[2];

                    let fixedId = 'Front';
                    if(i == 0){
                        fixedId = 'Front';
                    }

                    if(i == 1){
                        fixedId = 'Top';
                    }

                    if(i == 2){
                        fixedId = 'Right';
                    }

                    if(i == 3){
                        fixedId = 'Back';
                    }

                    if(i == 4){
                        fixedId = 'Left';
                    }

                    if(i == 5){
                        fixedId = 'Bottom';
                    }
                    
                    let currentItemById = document.getElementById(fixedId);
                    let selectedItem = currentItemById.children[currentIndex];
                    selectedItem.style.backgroundColor = currentColor;
                    // console.log({ currentColor, currentIndex, currentId });
                }
            }
        }
    }

    getTempValues({ sourceIndex, sourceValues }) {
        this.temp1 = this.cubicValues[sourceIndex][sourceValues[0]];
        this.temp2 = this.cubicValues[sourceIndex][sourceValues[1]];
        this.temp3 = this.cubicValues[sourceIndex][sourceValues[2]];
    }

    setTempValues({ destinationIndex, destinationValues }) {
        this.cubicValues[destinationIndex][destinationValues[0]] = this.temp1;
        this.cubicValues[destinationIndex][destinationValues[1]] = this.temp2;
        this.cubicValues[destinationIndex][destinationValues[2]] = this.temp3;
        this.getCubeSvg(this.cubicValues);
    }

    setCubicValues({ destinationIndex, destinationValues, sourceIndex, sourceValues }) {
        this.cubicValues[destinationIndex][destinationValues[0]] = this.cubicValues[sourceIndex][sourceValues[0]];
        this.cubicValues[destinationIndex][destinationValues[1]] = this.cubicValues[sourceIndex][sourceValues[1]];
        this.cubicValues[destinationIndex][destinationValues[2]] = this.cubicValues[sourceIndex][sourceValues[2]];
    }
}

class SetMoves extends Cubic {
    constructor(cubicValues) {
        super(cubicValues)
    }

    getUpdatedCubicValues = () => {
        return cubicValues;
    }



    // Rotate Front
    // [comment] : this portion is at the front and move clockwise
    rotateFrontClock() {
        this.getTempValues({ sourceIndex: 1, sourceValues: [0, 1, 2] }); // top values

        this.setCubicValues({ destinationIndex: 1, destinationValues: [0, 1, 2], sourceIndex: 4, sourceValues: [6, 3, 0] });  // top to left
        this.setCubicValues({ destinationIndex: 4, destinationValues: [6, 3, 0], sourceIndex: 5, sourceValues: [8, 7, 6] }); // left to bottom
        this.setCubicValues({ destinationIndex: 5, destinationValues: [8, 7, 6], sourceIndex: 2, sourceValues: [2, 5, 8] }) // bottoom to right

        this.setTempValues({ destinationIndex: 2, destinationValues: [2, 5, 8] }); // set temp values to right
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
   
    }

    rotateFrontAntiClockWise() {
        this.getTempValues({ sourceIndex: 1, sourceValues: [0, 1, 2] }); // top values

        this.setCubicValues({ destinationIndex: 1, destinationValues: [0, 1, 2], sourceIndex: 2, sourceValues: [2, 5, 8] });  // top to right
        this.setCubicValues({ destinationIndex: 2, destinationValues: [2, 5, 8], sourceIndex: 5, sourceValues: [8, 7, 6] }); // right to bottom
        this.setCubicValues({ destinationIndex: 5, destinationValues: [8, 7, 6], sourceIndex: 4, sourceValues: [6, 3, 0] }) // bottoom to right

        this.setTempValues({ destinationIndex: 4, destinationValues: [6, 3, 0] }); // set temp values to left
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }


    // ROTATE LEFT 
    rotateLeftClockWise() {
        this.getTempValues({ sourceIndex: 1, sourceValues: [2, 5, 8] }); // top values

        this.setCubicValues({ destinationIndex: 1, destinationValues: [2, 5, 8], sourceIndex: 3, sourceValues: [6, 3, 0] });  // top to back
        this.setCubicValues({ destinationIndex: 3, destinationValues: [6, 3, 0], sourceIndex: 5, sourceValues: [2, 5, 8] }); // back to bottom
        this.setCubicValues({ destinationIndex: 5, destinationValues: [2, 5, 8], sourceIndex: 0, sourceValues: [2, 5, 8] }) // bottoom to front

        this.setTempValues({ destinationIndex: 0, destinationValues: [2, 5, 8] }); // set temp values to front
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }

    rotateLeftAntiClockWise() {
        this.getTempValues({ sourceIndex: 1, sourceValues: [2, 5, 8] }); // top values

        this.setCubicValues({ destinationIndex: 1, destinationValues: [2, 5, 8], sourceIndex: 0, sourceValues: [2, 5, 8] });  // top to front
        this.setCubicValues({ destinationIndex: 0, destinationValues: [2, 5, 8], sourceIndex: 5, sourceValues: [2, 5, 8] });  // front to bottom
        this.setCubicValues({ destinationIndex: 5, destinationValues: [2, 5, 8], sourceIndex: 3, sourceValues: [6, 3, 0] });  // bottom to back

        this.setTempValues({ destinationIndex: 3, destinationValues: [6, 3, 0] }); // set temp values to back
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }

    // ROTATE RIGHT 
    rotateRightClockWise() {
        this.getTempValues({ sourceIndex: 1, sourceValues: [0, 3, 6] }); // top values

        this.setCubicValues({ destinationIndex: 1, destinationValues: [0, 3, 6], sourceIndex: 0, sourceValues: [0, 3, 6] });  // top to front
        this.setCubicValues({ destinationIndex: 0, destinationValues: [0, 3, 6], sourceIndex: 5, sourceValues: [0, 3, 6] });  // front to bottom
        this.setCubicValues({ destinationIndex: 5, destinationValues: [0, 3, 6], sourceIndex: 3, sourceValues: [8, 5, 2] });  // bottom to back

        this.setTempValues({ destinationIndex: 3, destinationValues: [8, 5, 2] }); // set temp values to back
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }

    rotateRightAntiClockWise() {
        this.getTempValues({ sourceIndex: 1, sourceValues: [6, 3, 0] }); // top values

        this.setCubicValues({ destinationIndex: 1, destinationValues: [6, 3, 0], sourceIndex: 3, sourceValues: [2, 5, 8] });  // top to back
        this.setCubicValues({ destinationIndex: 3, destinationValues: [2, 5, 8], sourceIndex: 5, sourceValues: [6, 3, 0] });  // back to bottom
        this.setCubicValues({ destinationIndex: 5, destinationValues: [6, 3, 0], sourceIndex: 0, sourceValues: [6, 3, 0] });  // bottom to top

        this.setTempValues({ destinationIndex: 0, destinationValues: [6, 3, 0] }); // set temp values to top
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }

    // ROTATE TOP
    rotateTopClockWise() {
        this.getTempValues({ sourceIndex: 0, sourceValues: [8, 7, 6] }); //front values

        this.setCubicValues({ destinationIndex: 0, destinationValues: [8, 7, 6], sourceIndex: 2, sourceValues: [8, 7, 6] });  // front to right
        this.setCubicValues({ destinationIndex: 2, destinationValues: [8, 7, 6], sourceIndex: 3, sourceValues: [8, 7, 6] });  // right to back
        this.setCubicValues({ destinationIndex: 3, destinationValues: [8, 7, 6], sourceIndex: 4, sourceValues: [8, 7, 6] });  // back to left

        this.setTempValues({ destinationIndex: 4, destinationValues: [8, 7, 6] }); // set temp values to top
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }

    rotateTopAntiClockWise() {
        this.getTempValues({ sourceIndex: 0, sourceValues: [8, 7, 6] }); //front values

        this.setCubicValues({ destinationIndex: 0, destinationValues: [8, 7, 6], sourceIndex: 4, sourceValues: [8, 7, 6] });  // front to left
        this.setCubicValues({ destinationIndex: 4, destinationValues: [8, 7, 6], sourceIndex: 3, sourceValues: [8, 7, 6] });  // left  to back
        this.setCubicValues({ destinationIndex: 3, destinationValues: [8, 7, 6], sourceIndex: 2, sourceValues: [8, 7, 6] });  // back to right

        this.setTempValues({ destinationIndex: 2, destinationValues: [8, 7, 6] }); // set temp values to right
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }

    // ROTATE BOTTOM
    rotateBottomClockWise() {
        this.getTempValues({ sourceIndex: 0, sourceValues: [2, 1, 0] }); //front values

        this.setCubicValues({ destinationIndex: 0, destinationValues: [2, 1, 0], sourceIndex: 4, sourceValues: [2, 1, 0] });  // front to left
        this.setCubicValues({ destinationIndex: 4, destinationValues: [2, 1, 0], sourceIndex: 3, sourceValues: [2, 1, 0] });  // left to back
        this.setCubicValues({ destinationIndex: 3, destinationValues: [2, 1, 0], sourceIndex: 2, sourceValues: [2, 1, 0] });  // back to right

        this.setTempValues({ destinationIndex: 2, destinationValues: [2, 1, 0] }); // set temp values to right
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }


    rotateBottomAntiClockWise() {
        this.getTempValues({ sourceIndex: 0, sourceValues: [2, 1, 0] }); //front values

        this.setCubicValues({ destinationIndex: 0, destinationValues: [2, 1, 0], sourceIndex: 2, sourceValues: [2, 1, 0] });  // front to right
        this.setCubicValues({ destinationIndex: 2, destinationValues: [2, 1, 0], sourceIndex: 3, sourceValues: [2, 1, 0] });  // right to back
        this.setCubicValues({ destinationIndex: 3, destinationValues: [2, 1, 0], sourceIndex: 4, sourceValues: [2, 1, 0] });  // back to left

        this.setTempValues({ destinationIndex: 4, destinationValues: [2, 1, 0] }); // set temp values to left
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }


    // Rotate Back
    rotateBackClockWise() {
        this.getTempValues({ sourceIndex: 1, sourceValues: [6, 7, 8] }); //top values

        this.setCubicValues({ destinationIndex: 1, destinationValues: [6, 7, 8], sourceIndex: 2, sourceValues: [0, 3, 6] });  // top to right
        this.setCubicValues({ destinationIndex: 2, destinationValues: [0, 3, 6], sourceIndex: 5, sourceValues: [2, 1, 0] });  // right to bottom
        this.setCubicValues({ destinationIndex: 5, destinationValues: [2, 1, 0], sourceIndex: 4, sourceValues: [8, 5, 2] });  // bottom to left

        this.setTempValues({ destinationIndex: 4, destinationValues: [8, 5, 2] }); // set temp values to left
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }

    rotateBackAntiClockWise() {
        this.getTempValues({ sourceIndex: 2, sourceValues: [0, 3, 6] }); //right values

        this.setCubicValues({ destinationIndex: 2, destinationValues: [0, 3, 6], sourceIndex: 1, sourceValues: [6, 7, 8] });  // right to top
        this.setCubicValues({ destinationIndex: 1, destinationValues: [6, 7, 8], sourceIndex: 4, sourceValues: [8, 5, 2] });  // top to left
        this.setCubicValues({ destinationIndex: 4, destinationValues: [8, 5, 2], sourceIndex: 5, sourceValues: [2, 1, 0] });  // left to bottom

        this.setTempValues({ destinationIndex: 5, destinationValues: [2, 1, 0] }); // set temp values to bottom
        console.log({ cubicValues, temp1: this.temp1, temp2: this.temp2, temp3: this.temp3 });
    }

}
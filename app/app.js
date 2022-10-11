class GameBoard {
    players = [];
    pieces = new Array(7);
    turn = 0;
    win = false;

    constructor() {
        this.players.push(new Player(0, "red"));
        this.players.push(new Player(1, "yellow"));

        //create empty 2D array 6x7
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i] = new Array(6); 
        }

        //insert game pieces into array
        for (let r = 0; r < 6; r++) {
            for (let c = 0; c < 7; c++) {
                this.pieces[c][r] = new GamePiece(c, r);
            }
        }

        let p = document.getElementsByClassName("piece");

        for (let n = 0; n < p.length; n++) {
            p[n].addEventListener("click", this.selectPiece.bind(this));

        }

    }

    changeTurn() {
        //if turn = 0 then turn = 1
        if(this.turn == 0) {
            this.turn = 1;

        //if turn = 1 then turn = 0
        } else if (this.turn == 1) {
            this.turn = 0;
        }

        console.log(this.turn);
        
    }

    checkWins() {
        //grab current piece
        //check if the neighboring pieces == current piece color // set win to true
            //diagnals 1 
                //win count
                //direction1Continous = true
                //direction2Continous = true
                //for loop 3 add to column and add to row
                    //if direction1Continous == true
                        //if piece[c][r].color = player[turn].color
                            //wincount++
                        //else 
                            //direction1Continous = false
                //for loop 3 subtract to column and subtract row
                    //if direction2Continous == true
                        //if piece[c][r].color = player[turn].color
                            //wincount++
                        //else 
                            //direction2Continous = false
            //diagnals 2 
                //win count
                //direction1Continous = true
                //direction2Continous = true
                //for loop 3 add to column and subtract row
                    //if direction1Continous == true
                        //if piece[c][r].color = player[turn].color
                            //wincount++
                        //else 
                            //direction1Continous = false
                //for loop 3 subtract to column and add row
                    //if direction2Continous == true
                        //if piece[c][r].color = player[turn].color
                            //wincount++
                        //else 
                            //direction2Continous = false
                //if winCount > 3 
                    //win = true
            //vertical
                //win count
                //direction1Continous = true
                //direction2Continous = true
                //for loop 3 add to column
                    //if direction1Continous == true
                        //if piece[c][r].color = player[turn].color
                            //wincount++
                        //else 
                            //direction1Continous = false
                //for loop 3 subtract to column
                    //if direction2Continous == true
                        //if piece[c][r].color = player[turn].color
                            //wincount++
                        //else 
                            //direction2Continous = false
            //horizontal

        //if win == true
            //display player[turn] has won

    }

    selectPiece(event) {
        //onclick grab elements column 
        let c = event.target.dataset.column;
        let r = "";

        //loop through pieces in that column and grab element with first row num where
        for(let n = this.pieces[c].length - 1; -1 < n; n--) {
            if(r == "" && this.pieces[c][n].isSet === false) {
                r = n;
            }

            console.log(n, r);
        }

        if (r !== "") {
            //set piece color to player turn color
            this.pieces[c][r].setColor(this.players[this.turn].color);
        }

        //check win

        //change turn
        //if check win == false
            this.changeTurn();

  
    }
}

class Player {
    num
    color

    constructor(num, color) {
        this.num = num;
        this.color = color;
    }

    displayPlayer() {
        //create div for players info
        //add player + their num
        //add players color
        //place on page
    }
}

class GamePiece {
    element
    column
    row
    color
    isSet

    constructor(column, row) {
        //set class variables
        this.color = "#AAA"
        this.row = row;
        this.column = column;
        this.isSet = false;
    
        //create piece SVG 
        var pieceSVG = document.createElement('svg');

        pieceSVG.setAttribute("class", "piece");        
        pieceSVG.setAttribute("data-column", column);
        pieceSVG.setAttribute("data-row", row);
        pieceSVG.style.borderRadius = "20px";
        pieceSVG.style.backgroundColor = this.color;

        document.body.appendChild(pieceSVG);

        this.element = pieceSVG;

        //insert circle into svg
        // var piece = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        // piece.setAttribute("id", column + row)
        // piece.style.width = "40px";
        // piece.style.height = "40px";
        // piece.style.fill = this.color;

        // document.element.appendChild(piece);

        if (column == 6) {
            var br = document.createElement("br");
            document.body.appendChild(br);
        }
    }

    setColor(color) {
        this.color = color;
        this.element.style.backgroundColor = color;
        this.isSet = true;
    }
}

// let game = new Game();
let gameboard = new GameBoard();

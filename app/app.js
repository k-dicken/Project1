class GameMenu {
  gameboard;

  constructor() {}

  displayMenu() {}
}

class GameBoard {
  players = [];
  pieces = new Array(7);
  turn = 0;
  win = false;

  constructor() {
    this.players.push(new Player(1, "#D11"));
    this.players.push(new Player(2, "#FB0"));

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

    for (let n = p.length - 7; n < p.length; n++) {
      p[n].addEventListener("click", this.selectPiece.bind(this));
      p[n].addEventListener("mouseover", function (e) {
        console.log(e.path[0].dataset.column);
        let c = Number(e.path[0].dataset.column);
        for (let r = 0; r < 6; r++) {
          console.log(this.pieces[c][r]);
        }
      });
    }
  }

  changeTurn() {
    //if turn = 0 then turn = 1
    if (this.turn == 0) {
      this.turn = 1;

      //if turn = 1 then turn = 0
    } else if (this.turn == 1) {
      this.turn = 0;
    }

    // console.log(this.turn);
  }

  checkWins(column, row) {
    //grab current piece
    let c = Number(column);
    let r = Number(row);

    let winCount = 0;

    let dCont = true;

    //check if the neighboring pieces == current piece color // set win to true
    //FIRST CHECK || DIAGNALS LEFT
    if (this.win === false) {
      dCont = true;

      //for loop 3 check up left
      for (var n = 1; n < 4; n++) {
        let checkc = c - n;
        let checkr = r - n;

        if (dCont == true) {
          if (checkc > -1 && checkc < 7 && checkr > -1 && checkr < 6) {
            // console.log("check - ", checkc, checkr);
            // console.log("check - ", this.pieces[checkc][checkr]);

            if (this.pieces[checkc][checkr].color === this.pieces[c][r].color) {
              winCount++;
            } else {
              dCont = false;
            }
          } else {
            dCont = false;
          }
        }
      }

      dCont = true;

      //for loop 3 check down right
      for (var n = 1; n < 4; n++) {
        let checkc = c + n;
        let checkr = r + n;

        if (dCont == true) {
          if (checkc > -1 && checkc < 7 && checkr > -1 && checkr < 6) {
            // console.log("check ", checkc, checkr);
            // console.log("check ", this.pieces[checkc][checkr]);

            //if piece[c][r].color = player[turn].color
            if (this.pieces[checkc][checkr].color === this.pieces[c][r].color) {
              winCount++;
            } else {
              dCont = false;
            }
          } else {
            dCont = false;
          }
        }
      }

      //win count
      if (winCount == 3) {
        console.log("win");
      } else {
        winCount = 0;
      }
    }
    console.log("first", winCount);

    //SECOND CHECK || DIAGNALS RIGHT
    if (this.wins === false) {
      dCont = true;

      //for loop 3 check up right
      for (var n = 1; n < 4; n++) {
        let checkc = c + n;
        let checkr = r - n;

        if (this.win === false) {
          dCont = true;

          //for loop 3 check up left
          for (var n = 1; n < 4; n++) {
            let checkc = c - n;
            let checkr = r - n;

            if (dCont == true) {
              if (checkc > -1 && checkc < 7 && checkr > -1 && checkr < 6) {
                // console.log("check - ", checkc, checkr);
                // console.log("check - ", this.pieces[checkc][checkr]);

                if (
                  this.pieces[checkc][checkr].color === this.pieces[c][r].color
                ) {
                  winCount++;
                } else {
                  dCont = false;
                }
              } else {
                dCont = false;
              }
            }
          }

          dCont = true;

          //for loop 3 check down right
          for (var n = 1; n < 4; n++) {
            let checkc = c + n;
            let checkr = r + n;

            if (dCont == true) {
              if (checkc > -1 && checkc < 7 && checkr > -1 && checkr < 6) {
                // console.log("check ", checkc, checkr);
                // console.log("check ", this.pieces[checkc][checkr]);

                //if piece[c][r].color = player[turn].color
                if (
                  this.pieces[checkc][checkr].color === this.pieces[c][r].color
                ) {
                  winCount++;
                } else {
                  dCont = false;
                }
              } else {
                dCont = false;
              }
            }
          }

          //win count
          if (winCount == 3) {
            this.win = true;
            console.log("win");
          } else {
            winCount = 0;
          }
        }
      }

      dCont = true;

      //for loop 3 down left
      for (var n = 1; n < 4; n++) {
        let checkc = c - n;
        let checkr = r + n;

        if (dCont == true) {
          if (checkc > -1 && checkc < 7 && checkr > -1 && checkr < 6) {
            // console.log("check ", checkc, checkr);
            // console.log("check ", this.pieces[checkc][checkr]);

            //if piece[c][r].color = player[turn].color
            if (this.pieces[checkc][checkr].color === this.pieces[c][r].color) {
              winCount++;
            } else {
              dCont = false;
            }
          } else {
            dCont = false;
          }
        }
      }
      console.log(winCount);

      //win count
      if (winCount == 3) {
        this.win = true;
        console.log("win");
      } else {
        winCount = 0;
      }
    }
    console.log("second", winCount);

    //THIRD CHECK || VERTICAL
    if (this.win === false) {
      dCont = true;

      //for loop 3 check up
      for (var n = 1; n < 4; n++) {
        let checkr = r - n;

        if (dCont == true) {
          if (checkr > -1 && checkr < 6) {
            // console.log("check - ", c, checkr);
            // console.log("check - ", this.pieces[c][checkr]);

            if (this.pieces[c][checkr].color === this.pieces[c][r].color) {
              winCount++;
            } else {
              dCont = false;
              //   console.log(dCont);
            }
          } else {
            dCont = false;
          }
        }
      }

      dCont = true;

      //for loop 3 down
      for (var n = 1; n < 4; n++) {
        let checkr = r + n;

        if (dCont == true) {
          if (checkr > -1 && checkr < 6) {
            // console.log("check ", c, checkr);
            // console.log("check ", this.pieces[c][checkr]);

            //if piece[c][r].color = player[turn].color
            if (this.pieces[c][checkr].color === this.pieces[c][r].color) {
              winCount++;
            } else {
              dCont = false;
              //   console.log(dCont);
            }
          } else {
            dCont = false;
          }
        }
      }

      //win count
      if (winCount == 3) {
        this.win = true;
        console.log("win");
      } else {
        winCount = 0;
      }
    }
    console.log("third", winCount);

    //FOURTH CHECK || HORIZONTAL
    if (this.win === false) {
      dCont = true;

      //for loop 3 check right
      for (var n = 1; n < 4; n++) {
        let checkc = c + n;

        if (dCont == true) {
          if (checkc > -1 && checkc < 7) {
            // console.log("check - ", checkc, r);
            // console.log("check - ", this.pieces[checkc][r]);

            if (this.pieces[checkc][r].color === this.pieces[c][r].color) {
              winCount++;
            } else {
              dCont = false;
              //   console.log(dCont);
            }
          } else {
            dCont = false;
          }
        }
      }

      dCont = true;

      //for loop 3 left
      for (var n = 1; n < 4; n++) {
        let checkc = c - n;

        if (dCont == true) {
          if (checkc > -1 && checkc < 7) {
            // console.log("check ", checkc, r);
            // console.log("check ", this.pieces[checkc][r]);

            //if piece[c][r].color = player[turn].color
            if (this.pieces[checkc][r].color === this.pieces[c][r].color) {
              winCount++;
            } else {
              dCont = false;
              //   console.log(dCont);
            }
          } else {
            dCont = false;
          }
        }
      }

      //win count
      if (winCount == 3) {
        this.win = true;
        console.log("win");
      } else {
        winCount = 0;
      }
    }
    console.log("fourth", winCount);
  }

  selectPiece(event) {
    //onclick grab elements column
    let c = event.target.dataset.column;
    let r = "";

    //loop through pieces in that column and grab element with first row num where
    for (let n = this.pieces[c].length - 1; -1 < n; n--) {
      if (r == "" && this.pieces[c][n].isSet === false) {
        r = n;
      }
    }

    if (r !== "") {
      //set piece color to player turn color
      this.pieces[c][r].setColor(this.players[this.turn].color);

      //check win
      this.checkWins(c, r);
    }

    //if check win == false
    if (this.win == true) {
      let screen = document.getElementById("win-screen");
      let text = document.getElementById("player-win");

      screen.style.display = "flex";
      text.innerHTML = "PLAYER " + this.players[this.turn].num + "<br>WINS!";
    } else {
      //change turn
      this.changeTurn();
    }
  }
}

class Player {
  num;
  color;

  constructor(num, color) {
    this.num = num;
    this.color = color;

    this.displayPlayer();
  }

  displayPlayer() {
    //create div for players info
    var playerInfo = document.createElement("div");

    //add player + their num
    playerInfo.setAttribute("class", "player-info");
    playerInfo.innerHTML = "Player " + this.num;

    //add players color
    playerInfo.style.color = this.color;

    //place on page
    document.getElementById("players").appendChild(playerInfo);
  }
}

class GamePiece {
  element;
  column;
  row;
  color;
  isSet;

  constructor(column, row) {
    //set class variables
    this.color = "#111";
    this.row = row;
    this.column = column;
    this.isSet = false;

    let x = column * 80 + column * 20 + 40;
    let y = row * 80 + row * 20 + 40;

    //create piece SVG
    var pieceSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    pieceSVG.setAttribute("class", "piece");
    pieceSVG.setAttribute("data-column", column);
    pieceSVG.setAttribute("data-row", row);

    pieceSVG.setAttributeNS(null, "cx", x);
    pieceSVG.setAttributeNS(null, "cy", y);
    pieceSVG.setAttributeNS(null, "r", 40);

    // pieceSVG.style.borderRadius = "40px";
    pieceSVG.style.fill = this.color;

    document.getElementById("gameboard").appendChild(pieceSVG);

    this.element = pieceSVG;

    // console.log(this.element);

    //insert circle into svg
    // var piece = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    // piece.setAttribute("id", column + row)
    // piece.style.width = "40px";
    // piece.style.height = "40px";
    // piece.style.fill = this.color;

    // document.element.appendChild(piece);

    if (column == 6) {
      var br = document.createElement("br");
      document.getElementById("gameboard").appendChild(br);
    }
  }

  setColor(color) {
    this.color = color;
    this.element.style.fill = color;
    this.isSet = true;
  }
}

// let game = new Game();
let gameboard = new GameBoard();

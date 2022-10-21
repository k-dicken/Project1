class GameBoard {
  players = [];
  pieces;
  turn = 0;
  win = false;

  constructor() {
    this.players.push(new Player(0, "#D11"));
    this.players.push(new Player(1, "#FB0"));

    this.players[this.turn].element.innerHTML =
      "<span>Player " + this.players[this.turn].num + "</span><br>Your Turn";
    this.players[this.turn].element.style.fontWeight = "bold";

    this.pieces = this.createPieces();
  }

  createPieces() {
    let pieces = new Array(7);
    //create empty 2D array 6x7
    for (var i = 0; i < pieces.length; i++) {
      pieces[i] = new Array(6);
    }

    //insert game pieces into array
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        pieces[c][r] = new GamePiece(c, r);
      }
    }

    let p = document.getElementsByClassName("piece");

    //event listeners
    for (let n = 0; n < p.length; n++) {
      p[n].addEventListener("click", this.selectPiece.bind(this));
      p[n].addEventListener("click", function (e) {
        let c = Number(e.path[0].dataset.column);
        for (let r = pieces[c].length - 1; -1 < r; r--) {
          if (pieces[c][r].isSet === false) {
            // console.log(pieces[c][r]);
          }
        }
      });
      p[n].addEventListener("mouseover", function (e) {
        // console.log(e.path[0].dataset.column);
        let c = Number(e.path[0].dataset.column);
        for (let r = 0; r < 6; r++) {
          // console.log(c, typeof c, r, typeof r);
          // console.log(pieces[c][r].element);
          pieces[c][r].element.style.opacity = ".6";
        }
      });
      p[n].addEventListener("mouseout", function (e) {
        // console.log(e.path[0].dataset.column);
        let c = Number(e.path[0].dataset.column);
        for (let r = 0; r < 6; r++) {
          // console.log(c, typeof c, r, typeof r);
          // console.log(pieces[c][r].element);
          pieces[c][r].element.style.opacity = "1";
        }
      });
    }

    return pieces;
  }

  changeTurn() {
    //remove the Your Turn from the
    this.players[this.turn].element.innerHTML =
      "<span>Player " + this.players[this.turn].num + "</span><br><br>";
    this.players[this.turn].element.style.fontWeight = "normal";

    //if turn = 0 then turn = 1
    if (this.turn == 0) {
      this.turn = 1;

      //if turn = 1 then turn = 0
    } else if (this.turn == 1) {
      this.turn = 0;
    }

    //set the players turn
    this.players[this.turn].element.innerHTML =
      "<span>Player " + this.players[this.turn].num + "</span><br>Your Turn";
    this.players[this.turn].element.style.fontWeight = "bold";
  }

  checkWins(column, row) {
    //grab current piece column & row
    let c = Number(column);
    let r = Number(row);

    //tracks the number of pieces in a row, 3 = a win
    let winCount = 0;

    //tracks if all pieces checked have been matching color
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
        this.win = true;
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
            if (this.pieces[checkc][r].color === this.pieces[c][r].color) {
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
    console.log("fourth", winCount);
  }

  selectPiece(event) {
    //onclick grab elements column
    let c = event.target.dataset.column;
    let r = "";

    //track the length of the animation
    let animTime = 0;

    //enable the div that blocks any user interaction
    document.getElementById("prevent-clicks").style.display = "block";

    //loop through pieces in that column and grab element with first row num where
    for (let n = this.pieces[c].length - 1; -1 < n; n--) {
      if (this.pieces[c][n].isSet === false) {
        //increase the animation time for each piece
        animTime++;

        //if the row is not already set, set it to the current row being checked
        if (r == "") {
          r = n;
        }

        //save the original piece color before it is changes
        let originalColor = this.pieces[c][n].color;

        //fade into the set color
        TweenMax.to(this.pieces[c][n].element, {
          duration: 0.1,
          delay: n,
          fill: this.players[this.turn].color,
        });

        //fade out to the old saved color if it is not the piece being set
        if (n !== r) {
          TweenMax.from(this.pieces[c][n].element, {
            duration: 0.1,
            delay: n + 1,
            fill: originalColor,
          });
        }
      }
    }

    if (r !== "") {
      //set the piece's color and mark it as a used piece
      this.pieces[c][r].setColor(this.players[this.turn].color);

      //check if the piece caused a win
      this.checkWins(c, r);
    }

    //if check win == false
    if (this.win == true) {
      let screen = document.getElementById("win-screen");
      let text = document.getElementById("player-win");

      setTimeout(() => {
        //display win screen and insert win text
        screen.style.display = "flex";
        text.innerHTML = "PLAYER " + this.players[this.turn].num + "<br>WINS!";
      }, animTime * 1000);
    } else {
      //wait for piece animation to finish
      setTimeout(() => {
        //remove the div that disables any user interaction
        document.getElementById("prevent-clicks").style.display = "none";
        //change turn
        this.changeTurn();
      }, animTime * 1000);
    }
  }
}

class Player {
  num;
  color;
  element;

  constructor(num, color) {
    //add 1 to the players array num
    this.num = num + 1;

    this.color = color;

    //create the player display
    this.displayPlayer();
  }

  displayPlayer() {
    //create div for players info
    var playerInfo = document.createElement("div");

    //add player + their num
    playerInfo.setAttribute("class", "player-info");
    playerInfo.innerHTML = "<span>Player " + this.num + "</span><br><br>";

    //add players color
    playerInfo.style.color = this.color;

    //place on page
    document.getElementById("players").appendChild(playerInfo);

    this.element = playerInfo;
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

    //calculate piece x y position based on the piece's place on the board
    let x = column * 80 + column * 20 + 40;
    let y = row * 80 + row * 20 + 40;

    //create piece SVG circle
    var pieceSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    //add class and data
    pieceSVG.setAttribute("class", "piece");
    pieceSVG.setAttribute("data-column", column);
    pieceSVG.setAttribute("data-row", row);

    //set position and size
    pieceSVG.setAttributeNS(null, "cx", x);
    pieceSVG.setAttributeNS(null, "cy", y);
    pieceSVG.setAttributeNS(null, "r", 40);

    //set color to piece color
    pieceSVG.style.fill = this.color;

    //place piece into the gameboard
    document.getElementById("gameboard").appendChild(pieceSVG);

    //save element to piece class
    this.element = pieceSVG;
  }

  //set piece information when piece is clicked
  setColor(color) {
    this.color = color;
    this.isSet = true;
  }
}

//place game onto page
let gameboard = new GameBoard();

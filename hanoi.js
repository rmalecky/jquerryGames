(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function () {
    this.towers = [[3, 2, 1], [], []];
  };

  Game.prototype.turn = function () {

  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    console.log(startTowerIdx)
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.updateDisplay(startTowerIdx, endTowerIdx);
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());

      return true;
    } else {
      return false;
    }
  };

  Game.prototype.updateDisplay = function(startTowerIdx, endTowerIdx) {
    var startTowerHeight = this.towers[startTowerIdx].length - 1;
    var endTowerHeight = this.towers[endTowerIdx].length;
    var diskSize = this.towers[startTowerIdx][startTowerHeight];
    var diskStyle = ['small', 'medium', 'large'][diskSize - 1];

    $($('#' + startTowerIdx ).find('li')[2 - startTowerHeight]).removeClass(diskStyle);
    $($('#' + endTowerIdx ).find('li')[2 - endTowerHeight]).addClass(diskStyle);
  }
  Game.prototype.run = function () {


    // READER.question("Enter a starting tower: ",function (start) {
    //   var startTowerIdx = parseInt(start);
    //   READER.question("Enter an ending tower: ", function (end) {
    //     var endTowerIdx = parseInt(end);
    //
    //   });
    // });
  };

  Game.prototype.takeTurn = function (start,end){
    var game = this;

    if (game.move(start,end)) {
      console.log(game.towers);
    } else {
      alert("Invalid move!")
    }

    if (game.isWon()) {
      alert("You win!");
    }
  }
})(this);

// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.

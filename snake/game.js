(function (root) {
  var Snakes = root.Snakes = (root.Snakes || {});

  var Game = Snakes.Game = function(xDim, yDim){
    this.snake = new Snakes.Snake([Math.floor(xDim/2),
                                  Math.floor(yDim/2)]);
    this.apple = new Snakes.Apple(xDim, yDim, this.snake);
    this.score = 0;
    this.xDim = xDim;
    this.yDim = yDim;
  }

  Game.prototype.generateBoard = function() {
    $('body').append('<ul></ul>');
    $('ul').css('width', (this.xDim * 50) + "px");
    $('ul').css('height', (this.yDim * 50) + "px");

    for(var i = 0; i < (this.xDim * this.yDim); i++) {
      $('ul').append("<li></li>");
    };
  }

  Game.prototype.step = function(){
    this.snake.move();
    if(this.snake.ateSelf() || this.snakeOffBoard()){
      this.gameOver();
    }
    if(this.snake.isSnake(this.apple.coords)){
      this.snake.eatApple();
      this.score += 1;
      $('h1').replaceWith("<h1>Score: " + this.score + "</h1>");
      this.apple = new Snakes.Apple(this.xDim, this.yDim, this.snake);
    }

    this.draw();
  }

  Game.prototype.snakeOffBoard = function() {
    return (this.snake.head[0] < 0 || this.snake.head[0] > this.xDim ||
            this.snake.head[1] < 0 || this.snake.head[1] > this.yDim);
  };



  Game.prototype.gameOver  = function() {
    alert("Game Over");
    clearInterval(this.interval);
  };

  Game.prototype.spaceToStr = function(x, y) {
    if (this.snake.isSnake([x, y])) {
      return "*";
    } else if ( this.apple.coords[0] === x && this.apple.coords[1] === y) {
      return "@";
    } else {
      return " ";
    }
  }

  Game.prototype.spaceToClass = function(x, y) {
    if (this.snake.isSnake([x, y])) {
      return "snake";
    } else if ( this.apple.coords[0] === x && this.apple.coords[1] === y) {
      return "apple";
    } else {
      return " ";
    }
  }

  Game.prototype.draw = function() {
    $('li').removeClass();
    for (var i = 0; i < this.xDim; i++) {
      for (var j = 0; j < this.yDim; j++) {
        $($('li')[(i * this.xDim) + j]).addClass(this.spaceToClass(j, i));
      }
    }
  };

  Game.prototype.drawASCII = function() {
    var board = ""
    for (var i = 0; i < this.xDim; i++) {
      for (var j = 0; j < this.yDim; j++) {
        board += this.spaceToStr(j, i);
      }
      board += "\n"
    }

    console.log(board);
  };

  Game.prototype.bindKeyHandlers = function() {
    var game = this;

    var MOVES = {
      "up" : 'N',
      "left" : 'W',
      "right" : 'E',
      "down" : 'S'
    }

    for (c in MOVES){
      (function(c, dir) {
        key(c, function() {
          if( dir !== game.snake.oppDir()) {
            game.snake.dir = dir;
          }
        })
      })(c, MOVES[c]);
    }
  };

  Game.prototype.run = function() {
    this.interval = setInterval(this.step.bind(this), 200);
    this.bindKeyHandlers();
  };



})(this);
(function (root) {
  var Snakes = root.Snakes = (root.Snakes || {});

  var Snake = Snakes.Snake = function(coord) {
    this.dir = 'N';
    this.head = coord;
    this.segments = [];
    this.growthPts = 0;
    this.lastDir = 'N'
  };

  Snake.MOVEMENT = {
    'N': [0,-1],
    'S': [0,1],
    'W': [-1,0],
    'E': [1,0]
  };

  Snake.OP_DIR = {
    'N': 'S',
    'S': 'N',
    'W': 'E',
    'E': 'W'
  }

  Snake.prototype.oppDir = function() {
    return Snake.OP_DIR[this.lastDir];
  }

  Snake.prototype.move = function() {
    this.segments.unshift([this.head[0], this.head[1]]);
    this.lastDir = this.dir;

    if (this.growthPts === 0 ) {
      this.segments.pop();
    } else {
      this.growthPts--;
    };

    var disp = Snake.MOVEMENT[this.dir];
    this.head[0] += disp[0];
    this.head[1] += disp[1];
  };

  Snake.prototype.step = function() {
    this.move();
  };

  Snake.prototype.eatApple = function() {
    this.growthPts += 3;
  };


  Snake.prototype.isSnake = function(coord) {
    if (coord[0] === this.head[0] && coord[1] === this.head[1]){
      return true;
    }

    for( var i = 0; i < this.segments.length; i++){
      if (coord[0] === this.segments[i][0] &&
          coord[1] === this.segments[i][1]){
        return true;
      }
    }
    return false;
  };

  Snake.prototype.ateSelf = function() {
    for( var i = 0; i < this.segments.length; i++){
      if (this.head[0] === this.segments[i][0] &&
          this.head[1] === this.segments[i][1]){
        return true;
      }
    }
    return false
  }
})(this);
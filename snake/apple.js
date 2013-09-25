(function(root) {
  var Snakes = root.Snakes = (root.Snakes || {});

  var Apple = Snakes.Apple = function (DIM_X, DIM_Y, snake) {

    do {
      this.coords = [Math.floor(Math.random() * DIM_X),
                    Math.floor(Math.random() * DIM_Y)];

      } while (snake.isSnake(this.coords));

  }

  // Apple.prototype.randomApple = function (, snake) {
  //
  //   do {
  //     var coords = [Math.floor(Math.random() * DIM_X),
  //                   Math.floor(Math.random() * DIM_Y)];
  //     } while(!snake.isSnake(coords));
  //
  //     return new Apple(coords);
  // };

})(this);
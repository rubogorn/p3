'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* I tried to do this with ECMA6 */
var es = [];

var _loop = function _loop() {
    var c = i;
    es[i] = function () {
        console.log("Upcoming edition of ECMAScript is ES" + c);
    };
};

for (var i = 0; i < 10; i++) {
    _loop();
}
es[6](); // Upcoming edition of ECMAScript is ES6

// variables
var allEnemies = [];
var player = '';
var gem = '';
var GameOver = false;

// constats
var blockSizeHorizontal = 83;
var blockSizeHVertical = 101;
var playerLifes = 5;

// Generate Random Y Axis
function randomXPosition() {
    return Math.floor(Math.random() * 4) * blockSizeHVertical + blockSizeHVertical / 2 + 50.5;
}

// Generate Random Y Axis
function randomYPosition() {
    return Math.floor(Math.random() * 3) * blockSizeHorizontal + blockSizeHorizontal / 2 + 20;
}

var Figure = function () {
    function Figure(sprite, x, y) {
        _classCallCheck(this, Figure);

        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    // Draw the item on the screen, required method for game


    _createClass(Figure, [{
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }]);

    return Figure;
}();

var Gem = function (_Figure) {
    _inherits(Gem, _Figure);

    function Gem() {
        _classCallCheck(this, Gem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Gem).apply(this, arguments));
    }

    _createClass(Gem, [{
        key: 'update',
        value: function update() {
            if (player.x - this.x < 70 && this.x - player.x < 70 && this.y - player.y < 30 && player.y - this.y < 30) {
                player.points = player.points + 500;
                this.moveGem();
            }
        }

        // move gem to new position

    }, {
        key: 'moveGem',
        value: function moveGem() {
            this.x = randomXPosition();
            this.y = randomYPosition();
        }
    }]);

    return Gem;
}(Figure);

// Enemies our player must avoid


var Enemy = function (_Figure2) {
    _inherits(Enemy, _Figure2);

    function Enemy() {
        _classCallCheck(this, Enemy);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Enemy).apply(this, arguments));
    }

    _createClass(Enemy, [{
        key: 'update',
        value: function update(dt) {
            if (!GameOver) {
                // move enemy from left to right
                if (this.x < 508) {
                    this.x = this.x + this.speed * dt;
                    // if enemy leaves screen relocate it on the left
                } else {
                        this.x = -100;
                        this.y = randomYPosition();
                        this.speed = Math.floor(Math.random() * 2.9) * 83 + 41.5;
                    }

                // enemy gets player
                if (player.x - this.x < 70 && this.x - player.x < 70 && this.y - player.y < 30 && player.y - this.y < 30) {
                    player.reset('A Bug ate you');
                    player.points = player.points - 200;
                }

                // enemy gets gem
                if (gem.x - this.x < 70 && this.x - gem.x < 70 && this.y - gem.y < 30 && gem.y - this.y < 30) {
                    player.points = player.points - 100;
                    gem.moveGem();
                }
            }
        }
    }]);

    return Enemy;
}(Figure);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function (_Figure3) {
    _inherits(Player, _Figure3);

    function Player(sprite, x, y, lifes, points) {
        _classCallCheck(this, Player);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, sprite, x, y, lifes, points));

        _this3.lifes = playerLifes;
        _this3.points = 0;
        $('.lifes').text(_this3.lifes);
        $('.points').text(_this3.points);
        return _this3;
    }

    _createClass(Player, [{
        key: 'update',
        value: function update() {
            // show player points
            $('.points').text(player.points);
            if (player.lifes <= 0) {
                GameOver = true;
                $('.game-over').show();
            }
            if (this.y < 52) {
                player.points = player.points - 200;
                player.reset('You fell into the water. You can\'t swim, that\'s why you are dead');
            }
        }

        // move player with key commands

    }, {
        key: 'handleInput',
        value: function handleInput(keyCommand) {
            if (!GameOver) {
                switch (keyCommand) {
                    case 'left':
                        if (this.x > 0) {
                            this.x = this.x - blockSizeHVertical;
                        }
                        break;
                    case 'right':
                        if (this.x < 400) {
                            this.x = this.x + blockSizeHVertical;
                        }
                        break;
                    case 'down':
                        if (this.y < 400) {
                            this.y = this.y + blockSizeHorizontal;
                        }
                        break;
                    case 'up':
                        if (this.y > 0) {
                            this.y = this.y - blockSizeHorizontal;
                        }
                        break;
                }
            }
        }

        // reset player location, if player "died"

    }, {
        key: 'reset',
        value: function reset(deathInfo) {
            this.x = 200;
            this.y = 400;
            this.lifes--;

            // show game information
            $('.lifes').text(this.lifes);
            $('.my-death').text(deathInfo);
        }
    }]);

    return Player;
}(Figure);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


for (var _i = 0; _i < 3; _i++) {
    var y = randomYPosition();
    var speed = Math.floor(Math.random() * 2.9) * 83 + 41.5;
    var enemy = new Enemy('images/enemy-bug.png', 0, y, speed);
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
player = new Player('images/char-boy.png', 200, 400, 5);

// genarate Gem
gem = new Gem('images/Gem Blue.png', randomXPosition(), randomYPosition());

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//# sourceMappingURL=app-compiled.js.map
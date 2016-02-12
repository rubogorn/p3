/* I tried to do this with ECMA6 */
var es = [];
for (var i = 0; i < 10; i++) {
    let c = i;
    es[i] = function () {
        console.log("Upcoming edition of ECMAScript is ES" + c);
    };
}
es[6](); // Upcoming edition of ECMAScript is ES6

// variables
var allEnemies = [];
var player     = '';
var gem        = '';
var GameOver   = false;

// constats
const blockSizeHorizontal = 83;
const blockSizeHVertical  = 101;
const playerLifes         = 5;

// Generate Random Y Axis
function randomXPosition() {
    return (Math.floor(Math.random()*4)*blockSizeHVertical + (blockSizeHVertical/2)) + 50.5;
}

// Generate Random Y Axis
function randomYPosition() {
    return (Math.floor(Math.random()*3)*blockSizeHorizontal + (blockSizeHorizontal/2)) + 20;
}

// move gem to new position
function moveGem() {
    gem.x = randomXPosition() ;
    gem.y = randomYPosition();
}


class Figure {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    // Draw the item on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Gem extends Figure {

    update() {
        if ((player.x - this.x < 70) && (this.x - player.x < 70) && (this.y - player.y < 30) && (player.y - this.y < 30)) {
            player.points = player.points +500;
            moveGem();
        };
    }
}


// Enemies our player must avoid
class Enemy extends Figure {

    update(dt) {
        if(!GameOver) {
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
            if ((player.x - this.x < 70) && (this.x - player.x < 70) && (this.y - player.y < 30) && (player.y - this.y < 30)) {
                player.reset('A Bug ate you');
                player.points = player.points -200;
            }

            // enemy gets gem
            if  ((gem.x - this.x < 70) && (this.x - gem.x < 70) && (this.y - gem.y < 30) && (gem.y - this.y < 30)) {
                player.points = player.points -100;
                moveGem();
            }
        }
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Figure {
    constructor(sprite, x, y, lifes, points) {
        super(sprite, x, y, lifes, points);
        this.lifes = playerLifes;
        this.points = 0;
        $('.lifes').text(this.lifes);
        $('.points').text(this.points);
    }

    update() {
        // show player points
        $('.points').text(player.points);
        if (player.lifes <= 0) {
            GameOver = true;
            $('.game-over').show();
        }
        if(this.y <52) {
        player.points = player.points -200;
        player.reset('You fell into the water. You can\'t swim, that\'s why you are dead');
        }
    }

    // move player with key commands
    handleInput(keyCommand) {
        if (!GameOver) {
            switch(keyCommand) {
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
    reset(deathInfo) {
        this.x = 200;
        this.y = 400;
        this.lifes--;

        $('.lifes').text(this.lifes);
        $('.my-death').text(deathInfo);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
for (let i=0; i<3; i++) {
    let y = randomYPosition();
    let speed = Math.floor(Math.random()*2.9)*83 + 41.5;
    let enemy = new Enemy('images/enemy-bug.png', 0, y, speed);
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
player = new Player('images/char-boy.png', 200, 400, 5);



gem = new Gem('images/Gem Blue.png', randomXPosition(), randomYPosition());


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var allEnemies = [];
var player     = '';
var gem        = '';
var GameOver   = false;
var bugX       = 0;
var bugY       = 0;

// constats
const blockSizeHorizontal = 83;
const blockSizeHVertical  = 101;
const playerLifes         = 5;

// Generate Random Y Axis (between 1st stone tile to 4th grass tile from top)
function randomXPosition() {
    return (Math.floor(Math.random() * (800)) + blockSizeHorizontal);
}

// Generate Random X Axis (between 1st stone tile to 10th from left)
function randomYPosition() {
    return 1;
    //return (Math.floor(Math.random() * (blockSizeHVertical)) + 1);
}

function updateGameValues() {
    $('#x-range-bug').bind('change', function () {
        bugX = $(this).val();
        $('#x-range-bug-info').text(bugX);
    });

    $('#y-range-bug').bind('change', function () {
        bugY = $(this).val();
        $('#y-range-bug-info').text(bugY);
    });
}

updateGameValues();

class Figure {
    constructor(sprite, x, y, speed) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {

    }

    // Draw the item on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Gem extends Figure {

    update() {
        if ((player.x - this.x < 70) && (this.x - player.x < 70) && (this.y - player.y < 30) && (player.y - this.y < 30)) {
            player.points = player.points -200;
            generateGem();
        };
    }
}


// Enemies our player must avoid
class Enemy extends Figure {

    update(dt) {
        if (this.x < 508) {
            this.x = this.x + this.speed*dt;
        } else {
            this.x = -100;
            this.speed = Math.floor(Math.random()*2.9)*83 + 41.5;
        }

        if ((player.x - this.x < 70) && (this.x - player.x < 70) && (this.y - player.y < 30) && (player.y - this.y < 30)) {
            player.reset('A Bug ate you');
            player.points = player.points -200;
        };
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
    let y = (Math.floor(Math.random()*3)*83 + 42.5) + 20;
    let speed = Math.floor(Math.random()*2.9)*83 + 41.5;
    let enemy = new Enemy('images/enemy-bug.png', 0, y, speed);
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
player = new Player('images/char-boy.png', 200, 400, 5);


function generateGem() {
    console.log('X: ' + randomXPosition());
    console.log('Y: ' + randomYPosition());
    gem = new Gem('images/Gem Blue.png', randomXPosition(), randomYPosition());
}
generateGem();

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

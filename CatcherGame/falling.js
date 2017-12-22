(() => {

    let canvas = document.getElementById("game");
    let game = canvas.getContext("2d");
    let lastTimestamp = 0;

    const FRAME_RATE = 60;
    const FRAME_DURATION = 1000 / FRAME_RATE;


    let fallers = [];
    let score = 0;
    let colorValues = ["#ff0000", "#ff0000", "#00ff00", "#00ff00", "#0000ff"];


    var scoreCount = document.getElementById("scoreCount");

    let showScore = function() {
        scoreCount.innerHTML = "Your score is " + score;
    };

    let addScore = function(pointValue) {
        score = score + pointValue;
        showScore();
    };

    let fallerIn = function(inside) {
        inside.captured = true;
        addScore(inside.pointValue);
    };



    let DEFAULT_DESCENT = 0.0001;
    let Faller = function(x, y, width, height, dx = 0, dy = 0, ax = 0, ay = DEFAULT_DESCENT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.captured = false;
        this.pointValue = 5;
        this.color = this.randomcolor();
        if (this.color === "#0000ff") {
            this.pointValue = 10;
        }
        if (this.color === "#00ff00") {
            this.pointValue = -5;
        }

        // Velocity.
        this.dx = dx;
        this.dy = dy;

        // Acceleration.
        this.ax = ax;
        this.ay = ay;
    };

    Faller.prototype.draw = function() {
        game.fillStyle = this.color;
        game.fillRect(this.x, this.y, this.width, this.height);
    };

    Faller.prototype.randomcolor = function() {
        return colorValues[Math.floor(Math.random() * colorValues.length * 0.95)];
    };

    Faller.prototype.move = function(millisecondsElapsed) {
        // Good old Newtonian physics.
        this.x += this.dx * millisecondsElapsed;
        this.y += this.dy * millisecondsElapsed;

        this.dx += this.ax * millisecondsElapsed;
        this.dy += this.ay * millisecondsElapsed;
    };


    const DEFAULT_PLAYER_WIDTH = 65;
    const DEFAULT_PLAYER_HEIGHT = 45;
    const DEFAULT_PLAYER_Y = canvas.height - DEFAULT_PLAYER_HEIGHT;
    let Player = function(x, y = DEFAULT_PLAYER_Y, width = DEFAULT_PLAYER_WIDTH, height = DEFAULT_PLAYER_HEIGHT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    Player.prototype.draw = function() {
        let grd = game.createLinearGradient(0, 200, 200, 0);
        grd.addColorStop(0, "black");
        grd.addColorStop(0.5, "red");
        grd.addColorStop(1, "white");
        game.fillStyle = grd;
        game.fillRect(this.x, this.y, this.width, this.height);
        game.fill();
    };

    let player = new Player(canvas.width / 2);

    let caughtInARow = 0;


    let draw = (millisecondsElapsed) => {
        game.clearRect(0, 0, canvas.width, canvas.height);

        fallers.forEach((faller) => {
            faller.draw();
            faller.move(millisecondsElapsed);
            if (!faller.captured &&
                faller.y + faller.height > canvas.height &&
                faller.x + faller.width < player.x + player.width &&
                faller.x > player.x) {
                fallerIn(faller);
                caughtInARow += 1;
                if (caughtInARow === 5) {
                    DEFAULT_DESCENT += 0.0003;
                    caughtInARow = 0;
                }
            }
        });

        player.draw();

        let gameOver = false;


        fallers = fallers.filter((faller) => {
            if (score < 0 && !gameOver) {
                alert("Game Over");
                stopFallerGenerator();
                running = false;
                gamePlaying = false;
            }
            return faller.y < canvas.height;
        });

    };

    const MIN_WIDTH = 10;
    const WIDTH_RANGE = 20;
    const MIN_HEIGHT = 10;
    const HEIGHT_RANGE = 20;
    const MILLISECONDS_BETWEEN_FALLERS = 650;

    let fallerGenerator;
    let startFallerGenerator = () => {
        fallerGenerator = setInterval(() => {

            let fallerWidth = Math.floor(Math.random() * WIDTH_RANGE) + MIN_WIDTH;
            fallers.push(new Faller(
                Math.floor(Math.random() * (canvas.width - fallerWidth)), 0,
                fallerWidth, Math.floor(Math.random() * HEIGHT_RANGE) + MIN_HEIGHT
            ));
        }, MILLISECONDS_BETWEEN_FALLERS);
    };

    let stopFallerGenerator = () => clearInterval(fallerGenerator);


    let setPlayerPositionBasedOnMouse = (event) => {
        player.x = event.clientX / document.body.clientWidth * canvas.width;
    };

    document.body.addEventListener("mouseenter", setPlayerPositionBasedOnMouse);
    document.body.addEventListener("mousemove", setPlayerPositionBasedOnMouse);

    
    let running = false;
    let nextFrame = (timestamp) => {
        if (!lastTimestamp) {
            lastTimestamp = timestamp;
        }

        if (timestamp - lastTimestamp < FRAME_DURATION) {
            if (running) {
                window.requestAnimationFrame(nextFrame);
            }

            return;
        }

        draw(timestamp - lastTimestamp);

        lastTimestamp = timestamp;
        if (running) {
            window.requestAnimationFrame(nextFrame);
        }
    };

    let gamePlaying = false;

    document.getElementById("start-button").addEventListener("click", () => {
        if (!gamePlaying) {
            running = true;
            lastTimestamp = 0;
            startFallerGenerator();
            window.requestAnimationFrame(nextFrame);
            gamePlaying = true;
        }
    });

    document.getElementById("stop-button").addEventListener("click", () => {
        stopFallerGenerator();
        running = false;
        gamePlaying = false;
    });
})();

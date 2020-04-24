const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;


//piłka
const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;


//paletki
const paddleHeight = 100;
const paddleWidth = 20;
const playerX = 70;
const aiX = 910;
let playerY = ch / 2 - paddleHeight / 2;
let aiY = ch / 2 - paddleHeight / 2;

//linia srodkowa
const lineWidth = 6;
const lineHeight = 16;

//szybkosc pilki
let ballSpeedX = 5;
let ballSpeedY = -5;

//punkty
let playerPoint = 0;
let aiPoint = 0;

function table() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);

    //linia srodkowa
    ctx.fillStyle = 'white';
    for (let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
    }

}

function ball() {
    ctx.fillStyle = 'white';

    //kolizja z gora/dol
    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
    }

    //odbicie od paletki przeciwnika
    if (ballX + ballSize > aiX && ballY + ballSize > aiY && ballY < aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    }

    //odbicie od paletki gracza
    if (ballX < playerX + paddleWidth && ballY + ballSize > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    }

    //stracony punkt
    if (ballX < playerX + paddleWidth - 20) {
        aiPoint++;
        alert(`Punkt dla przeciwnika. Wynik ${playerPoint} : ${aiPoint}`);
        ballSpeedX = 5;
        ballSpeedY = 5;
        ballX = cw / 2 - ballSize / 2;
        ballY = ch / 2 - ballSize / 2;
        if (aiPoint === 10) {
            alert(`Przegrałeś. Wynik ${playerPoint} : ${aiPoint}`);
            location.reload();
        }
    }

    //zdobyty punkt
    if (ballX + ballSize > aiX + 20) {
        playerPoint++;
        alert(`Punkt dla ciebie. Wynik ${playerPoint} : ${aiPoint}`);
        ballSpeedX = 5;
        ballSpeedY = 5;
        ballX = cw / 2 - ballSize / 2;
        ballY = ch / 2 - ballSize / 2;
        if (playerPoint === 10) {
            alert(`Wygrałeś. Wynik ${playerPoint} : ${aiPoint}`);
            location.reload();
        }
    }

    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function player() {
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function ai() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}


//gora canvas
topCanvas = canvas.offsetTop;

function playerPosition(event) {
    playerY = event.clientY - topCanvas - paddleHeight / 2;
    if (playerY < 0) {
        playerY = 0;
    }
    if (playerY > ch - paddleHeight) {
        playerY = ch - paddleHeight;
    }
}

let difficult = 'medium';

function aiPosition() {
    let middlePaddle = aiY + paddleHeight / 2;
    let middleBall = ballY + ballSize / 2;


    if (difficult === 'easy') {
        if (ballX > 500) {
            if(middlePaddle-middleBall>200){
                aiY-=13;
            }else if(middlePaddle-middleBall>50){
                aiY-=7;
            }else if(middlePaddle-middleBall<-200){
                aiY+=13;
            }else if(middlePaddle-middleBall<-50){
                aiY+=7;
            }
        }
        else if (ballX <= 500 && ballX > 150) {
            if(middlePaddle-middleBall>200){
                aiY-=5;
            }else if(middlePaddle-middleBall>50){
                aiY-=5;
            }else if(middlePaddle-middleBall<-200){
                aiY+=5;
            }else if(middlePaddle-middleBall<-50){
                aiY+=5;
            }
        }
    }

    if (difficult === 'medium') {
        if (ballX > 500) {
            if(middlePaddle-middleBall>200){
                aiY-=17;
            }else if(middlePaddle-middleBall>50){
                aiY-=11;
            }else if(middlePaddle-middleBall<-200){
                aiY+=17;
            }else if(middlePaddle-middleBall<-50){
                aiY+=11;
            }
        }
        else if (ballX <= 500 && ballX > 150) {
            if(middlePaddle-middleBall>200){
                aiY-=7;
            }else if(middlePaddle-middleBall>50){
                aiY-=7;
            }else if(middlePaddle-middleBall<-200){
                aiY+=7;
            }else if(middlePaddle-middleBall<-50){
                aiY+=7;
            }
        }
    }

    if (difficult === 'hard') {
        if (ballX > 500) {
            if(middlePaddle-middleBall>200){
                aiY-=20;
            }else if(middlePaddle-middleBall>50){
                aiY-=14;
            }else if(middlePaddle-middleBall<-200){
                aiY+=20;
            }else if(middlePaddle-middleBall<-50){
                aiY+=14;
            }
        }
        else if (ballX <= 500 && ballX > 150) {
            if(middlePaddle-middleBall>200){
                aiY-=9;
            }else if(middlePaddle-middleBall>50){
                aiY-=5;
            }else if(middlePaddle-middleBall<-200){
                aiY+=9;
            }else if(middlePaddle-middleBall<-50){
                aiY+=9;
            }
        }
    }

    if (difficult === 'hardcore') {
        aiY = ballY + ballSize / 2 - paddleHeight / 2;
        if (aiY < 0) {
            aiY = 0;
        } else if (aiY > ch - paddleHeight) {
            aiY = ch - paddleHeight;
        }
    }
}


function speedUp() {
    if (ballSpeedX > 0 && ballSpeedX < 16) {
        ballSpeedX += 0.2;
    } else if (ballSpeedX < 0 && ballSpeedX > -16) {
        ballSpeedX -= 0.2;
    }
    if (ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY += 0.2;
    } else if (ballSpeedY < 0 && ballSpeedY > -16) {
        ballSpeedY -= 0.2;
    }
}


canvas.addEventListener("mousemove", playerPosition);

function game() {
    table();
    ball();
    player();
    ai();
    aiPosition();
}

setInterval(game, 1000 / 60);
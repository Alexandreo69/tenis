const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Redimensionar canvas para caber na tela
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Ajustar os tamanhos com base no canvas
    ball.radius = canvas.width * 0.02;
    paddle1.height = canvas.height * 0.1;
    paddle2.height = canvas.height * 0.1;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: canvas.width * 0.02, speedX: 0, speedY: 0 };
let paddle1 = { x: 10, y: canvas.height / 2 - 30, width: 15, height: canvas.height * 0.1 };
let paddle2 = { x: canvas.width - 25, y: canvas.height / 2 - 30, width: 15, height: canvas.height * 0.1 };
let rede = { x: canvas.width / 2 - 3, y: 0, width: 6, height: canvas.height };
let player1Score = 0;
let player2Score = 0;

function draw() {
    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Desenhar o fundo
    context.fillStyle = 'green';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Desenhar as raquetes e a rede
    context.fillStyle = 'white';
    context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    context.fillRect(rede.x, rede.y, rede.width, rede.height);
    // Desenhar a bola
    context.fillStyle = 'yellow';
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
    // Atualizar a posição da bola
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    // Colidir com as bordas superior e inferior
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        ball.speedY = -ball.speedY;
    }
    // Verificar pontuação
    if (ball.x < 0 || ball.x > canvas.width) resetBall();
    
    // Atualizar a tela
    requestAnimationFrame(draw);
}

// Função para iniciar o jogo no toque
canvas.addEventListener('touchstart', startGame);

// Controle de toque
canvas.addEventListener('touchmove', (event) => {
    let touch = event.touches[0];
    let touchX = touch.clientX;
    let touchY = touch.clientY;
    if (touchX < canvas.width / 2) paddle1.y = touchY - paddle1.height / 2;
    else paddle2.y = touchY - paddle2.height / 2;
});

// Iniciar o jogo
draw();
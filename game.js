const canvas = document.getElementById("canvas") // holt sich die id von canvas und speichert es
const ctx = canvas.getContext("2d") // holt den 2D-Zeichenbereich und speichert ihn in "ctx"

const playerWidth = 120 // spieler breite
const playerHeight = 100 // spieler grose
const playerSpeed = 15 // spieler schnelligheit
const groundOffset = 1 // spieler abstand von rand
const gravity = 1.2 // schwerkraft
const jumpStrength = 18 // sprungkraft

let playerX = 0 // spieler abstand rand
let playerY = 0 // ganz oben am canvas
let robber = null // da wird das roboter image gespeichert
let isJumping = false // robber springt gerade nicht
let jumpVelocity = 0 // aktuelle sprunggeschwindigkeit

const background = new Image() // erstellt ein bildobjekt
background.src = 'game image/game.jpg' // sagt welche datei geladen werden muss


background.onload = () => {
  canvas.width = background.width // hintergrund breite
  canvas.height = background.height // hintergrund grose

  robber = new Image() // erstellt das bild
  robber.src = 'player images/robber.png' // zeigt das bild an

  robber.onload = () => { // warte bis das robber bild geladen ist
    playerY = canvas.height - groundOffset - playerHeight // berechnet wo der robber unten auf den boden stehen soll
    drawPlayer() // Zeichnet danach den Hintergrund + Robber auf den Canvas.
  }
}

document.addEventListener("keydown", (e) => { // Höre auf Tastendrücke.
  if (e.key === "d" || e.key === "ArrowRight") { // wenn d oder pfeil rechts gedruckt wird
    backgroundX -= playerSpeed
    playerX += playerSpeed // spieler geht nach rechts
    if (playerX + playerWidth > canvas.width) { // Prüft, ob der Spieler über den rechten Rand hinausgeht
      playerX = canvas.width - playerWidth // Wenn ja, wird er genau an den rechten Rand gesetzt.
    }
    drawPlayer() // Canvas wird neu gezeichnet → dadurch siehst du die Bewegung.
  }

  if (e.key === "a" || e.key === "ArrowLeft") { // A ODER Pfeil links.
    playerX -= playerSpeed // Spieler geht nach links.
    if (playerX < 0) { // Prüft, ob er über den linken Rand geht.
      playerX = 0 // Wenn ja, bleibt er ganz links.
    }
    drawPlayer()
  }

  if (e.code === "Space" && !isJumping) { // Wenn Leertaste gedrückt wird UND der Spieler nicht schon springt
    isJumping = true // Wir sagen: Der Spieler springt jetzt.
    jumpVelocity = -jumpStrength // Das ist die Sprunggeschwindigkeit, 1 jumpStrength = wie stark der Sprung ist. 2 Das - sorgt dafür, dass es zunächst nach oben geht.
  }
})

setInterval(() => { 
  if (isJumping) {
    playerY += jumpVelocity
    jumpVelocity += gravity

    if (playerY >= canvas.height - groundOffset - playerHeight) {
      playerY = canvas.height - groundOffset - playerHeight
      isJumping = false
      jumpVelocity = 0
    }

    drawPlayer()  
  }
}, 16)


let coin = new Image();
coin.src = "coin image/coin.png";   

let coinX = 120;
let coinY = 700;
let coinWidth = 130;
let coinHeight = 50;


const coinPositionsX = [120, 180, 240, 300, 360];
let coinCollected = [];
let backgroundX = 0;
let nextCoinsX = 600;

function drawPlayer() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, backgroundX, 0, canvas.width, canvas.height);
  ctx.drawImage(background, backgroundX + canvas.width, 0, canvas.width, canvas.height);

  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }

    for (let i = 0; i < coinPositionsX.length; i++) {
    if (coinPositionsX[i] + backgroundX < -coinWidth) {
      coinPositionsX[i] = nextCoinsX;
      nextCoinsX += 300;
      coinCollected[i] = false;
    }


    if (!coinCollected[i]) {
      const hit =
      playerX < coinPositionsX[i] + backgroundX + coinWidth &&
      playerX + playerWidth > coinPositionsX[i] + backgroundX &&
      playerY < coinY + coinHeight &&
      playerY + playerHeight > coinY
   
      if (hit) {
        coinCollected[i] = true;
      }
    }

    if (!coinCollected[i]) {
      ctx.drawImage(
        coin,
        coinPositionsX[i] + backgroundX,
        coinY,
        coinWidth,
        coinHeight
      );
    }
  }

  ctx.drawImage(robber, playerX, playerY, playerWidth, playerHeight);
}

  










  








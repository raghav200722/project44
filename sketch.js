var river, riverImg;
var restBackground;
var restBackImg;

var player;
var playerImg;

var fish;
var fishImg;
var fishGroup;

var gameState = 0;

var messageImg, message;
var messageFish, messageFishImg;

var apple, appleImg;
var appleGroup;

var bottle, bottleImg;
var bottleGroup;

var rock, rockImg;
var rockGroup;

var fishObst, fishObstImg;
var fishObstGroup;

var chest, chestImg;
var chestGroup;

var scoreImg, scoreImage;

var score = 0;

var gameOver, gameOverImage;

var restart, restartImage;

var collectSound;

var losingSound;

var bonusSound;

var nextSound;

//var edges;

function preload(){
riverImg = loadAnimation("river2.png");
restBackImg = loadAnimation("rest background.png");
playerImg = loadImage("boat.png");
fishImg = loadImage("fish.png");
messageImg = loadImage("message.png");
messageFishImg = loadImage("messageFish.png");
appleImg = loadImage("apple.png");
bottleImg = loadImage("bottle.png");
rockImg = loadImage("rock.png");
fishObstImg = loadImage("fishObstacle.png");
chestImg = loadImage("goldenChest.png");
scoreImage = loadImage("score.png");
gameOverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");


}


function setup() {
  createCanvas(700,300);

 // edges = createEdgeSprites();

  river = createSprite(180,400,400,800);
  river.addAnimation("river", riverImg);
  river.scale = 2;

  collectSound = loadSound('collectingSound.mp3');
  losingSound = loadSound('losingSound.mp3');
  bonusSound = loadSound('bonusSound.mp3');
  nextSound = loadSound('nextRound.mp3')


  player = createSprite(175, 550, 50,70);
  player.addImage("boat", playerImg);
  player.scale = 0.35;
  player.debug = false;
  player.setCollider("circle", 0,-15,100);



  restBackground = createSprite(300,300,700,350);
  restBackground.addAnimation("background", restBackImg);
  
  message = createSprite(350,60,40,100);
  message.addImage("message", messageImg);
  message.scale = 0.4;
 

  scoreImg = createSprite(270,20,20,45);
  scoreImg.addImage("score", scoreImage);
  scoreImg.scale = 0.09;

  gameOver = createSprite(340,80,100,100);
gameOver.addImage("gameOver", gameOverImage);
gameOver.scale = 0.45;

restart = createSprite(340,250,50,50);
restart.addImage("restart", restartImage);
restart.scale = 0.2;
  

  fishGroup = new Group();
  appleGroup = new Group();
  bottleGroup = new Group();
  rockGroup = new Group();
  fishObstGroup = new Group();
  chestGroup = new Group();

  
}

function draw() {
  background("riverImg"); 

 

  // GAMESTATE 0
  
 if(gameState === 0){

  message.visible = false;
  scoreImg.visible = false;
  gameOver.visible = false;
  restart.visible = false;
  

  console.log("press space key to start");

  if(keyDown("space") && gameState === 0){
  restBackground.velocityY = -1.5;
  }
 
  console.log(restBackground.y);

  if(restBackground.y < 20){
    restBackground.velocityY = 0;

    console.log("press space again");
   message.visible = true;
  
    messageFish = createSprite(620, 150, 40,40);
    messageFish.addImage("fishImg", messageFishImg);
    messageFish.scale = 0.2;

  }

  if(keyDown("space") && restBackground.y <= 20){
    gameState = 1;
    nextSound.play();

  }

 
}
  // GAMESTATE 1
  if(gameState === 1){
  
    river.visible = true;

    player.visible = true;

    message.visible = false;
    scoreImg.visible = true;
    gameOver.visible = false;
  restart.visible = false;

    restBackground.visible = false;
    restBackground.velocityY = 0;

    createCanvas(350,600);
    console.log(score);

    fishGroup.visible = true;
    appleGroup.visible = true;
    bottleGroup.visible = true;

  river.velocityY = +5;

  
  
  if(keyDown("UP_ARROW")){
    player.y = player.y -3;
  }
  
  if(keyDown("DOWN_ARROW")){
    player.y = player.y +3.5;
  }
  
  if(keyDown("LEFT_ARROW")){
    player.x = player.x - 3.5;
  }
  
  if(keyDown("RIGHT_ARROW")){
    player.x = player.x + 3.5;
  }

  if(river.y > 300){
    river.y = 120;
  }

  spawnFish();
  spawnApple();
  spawnBottle();
  spawnRock();
  spawnFishObst();
  spawnChest();

  

  if(player.isTouching(fishGroup)){
    fish.visible = false;
    collectSound.play();
    score = score + 10;
  }


  if(player.isTouching(appleGroup)){
    apple.visible = false;
    collectSound.play();
    score = score + 10;
  }



  if(player.isTouching(bottleGroup)){
    bottle.visible = false;
    collectSound.play();
    score = score + 10;
  }

  if(player.isTouching(chestGroup)){
    chest.visible = false;
    bonusSound.play();
    score = score + 100;
 }

  if(player.isTouching(rockGroup)){
    losingSound.play();
    gameState = 2;
   }

   if(player.isTouching(fishObstGroup)){
    losingSound.play();
     gameState = 2;
   }

   
 
}

if(gameState === 2){
  background(183, 40, 40);
  fishGroup.destroyEach();
  bottleGroup.destroyEach();
  appleGroup.destroyEach();
  chestGroup.destroyEach();
  rockGroup.destroyEach();
  fishObstGroup.destroyEach();
  river.visible = false;
  scoreImg.visible = false;
  score.visible = false;
  player.visible = false;

  gameOver.visible = true;
  restart.visible = true;


if(mousePressedOver(restart) && gameState === 2) {
  reset();
  nextSound.play();
}

}

 // player.collide(edges[3]);
  drawSprites();

  textSize(10);
  fill("black");
  strokeWeight(8);
  text(":" + score, 325, 20);
}

function spawnFish(){
  if (frameCount % 120 === 0){
    fish = createSprite(300,10,20,50);
    fish.x = Math.round(random(0,300));
    fish.addImage("fish", fishImg);
    fish.scale = 0.4;
    fish.setCollider("rectangle",-140,40,100,160);
    

    fish.velocityY = +5;

    fish.lifetime = 400;

    //fish.debug = true;
    fishGroup.add(fish);
  }
}

function spawnApple(){
  if (frameCount % 120 === 0){
    apple = createSprite(300,5,50,50);
    apple.x = Math.round(random(0,300));
    apple.addImage("apple", appleImg);
    apple.scale = 0.4;
    apple.setCollider("rectangle",120,-90,120,170);

    apple.velocityY = +5;

    apple.lifetime = 400;

  // apple.debug = true;
   appleGroup.add(apple);
  }
}

function spawnBottle(){
  if (frameCount % 90 === 0){
    bottle = createSprite(300,10,50,50);
    bottle.x = Math.round(random(0,300));
    bottle.addImage("bottle", bottleImg);
    bottle.scale = 0.4;
    bottle.setCollider("rectangle",-140,-70,100,160);

    bottle.velocityY = +5;

    bottle.lifetime = 400;

  // bottle.debug = true;
   bottleGroup.add(bottle);
}
}

function spawnRock(){
  if (frameCount % 70 === 0){
    rock = createSprite(300,10,50,50);
    rock.x = Math.round(random(0,300));
    rock.addImage("rock", rockImg);
    rock.scale = 0.5;
    rock.setCollider("rectangle",0,0,60,60);

    rock.velocityY = +5;

    rock.lifetime = 400;

  // rock.debug = true;
   rockGroup.add(rock);
}
}


function spawnFishObst(){
  if (frameCount % 150 === 0){
    fishObst = createSprite(300,10,50,100);
    fishObst.x = Math.round(random(0,300));
    fishObst.addImage("fishObst", fishObstImg);
    fishObst.scale = 0.4;
    fishObst.setCollider("rectangle",0,0,90,270);
    
    fishObst.velocityY = +5;

    fishObst.lifetime = 400;

  //  fishObst.debug = true;
   fishObstGroup.add(fishObst);
}
}


function spawnChest(){
  if (frameCount % 500 === 0){
    chest = createSprite(300,10,50,50);
    chest.x = Math.round(random(0,300));
    chest.addImage("chest", chestImg);
    chest.scale = 0.5;
   // chest.setCollider("rectangle",0,0,90,270);
    
    chest.velocityY = +5;

    chest.lifetime = 400;

   // chest.debug = true;
    chestGroup.add(chest);
}
}

function reset(){

  gameState = 1;
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
}

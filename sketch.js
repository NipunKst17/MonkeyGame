var monkey , monkey_running, monkeyCollide;
var ground, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var foodY

function preload() {
  monkey_running = loadAnimation ("monkey_0.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");
  monkeyCollide = loadAnimation("monkey_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImg = loadImage("road.jpg");
}

function setup() {
  createCanvas(400, 300);
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
   
  monkey = createSprite(80,290,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
    
  ground = createSprite(200,290,400,20);
  ground.scale = 1;
  
}

function draw() {
  background(240);
  fill("black");
  text("SURVIVAL TIME: " + score, 235, 20);
  
  //monkey.debug = "true";
  
  foodY = Math.round(random(120,200));
  ground.addImage("road",groundImg);
  
  if (gameState === PLAY) {
    obstacles();
    bananas();   
    score = Math.round(frameCount/getFrameRate());
    
    ground.velocityX = -2;
  
    if(keyDown("space")&&monkey.y >= 140) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 2.4;
       
    if (ground.x < 200) {
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
    }
    
    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
    }
    
  }
  
  if (gameState === END) {
    ground.velocityX = 0;
    
    monkey.y = 210;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(0);
    fill("red");
    textSize(30);
    text("GAME OVER!!!", 110, 170);
  }
  
  drawSprites(); 
  monkey.collide(ground);
}

function bananas() {
  if (frameCount%80 === 0) { 
    banana = createSprite(620,foodY)
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-4;          
    banana.lifetime = 220;
    foodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount%100 === 0) {
    obstacle = createSprite(620,250);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.scale = 0.15 ;
    obstacle.velocityX = -4;
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    //obstacle.debug = "true";
    //obstacle.setCollider("circle", obstacle.x, obstacle.y);
    
  }
}

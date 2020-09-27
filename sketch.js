
var monkey , monkeyRunning, monkeyStopped;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup, bananaGroup;
var score=0;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY; 

function preload(){

  monkeyRunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkeyStopped = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,400);
  monkey = createSprite(100,320,500,10);
  monkey.addAnimation("running",monkeyRunning);
  monkey.addAnimation("stopped",monkeyStopped);
  monkey.scale = 0.15;
  
  ground = createSprite(250,380,500,10);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("lightgreen");
  
  if(gameState === PLAY)
  {
    console.log(gameState);
    score = Math.round(frameCount/frameRate());
    //move ground and reset it
    ground.velocityX = -4;
    if(ground.x < width/2)
    {
      ground.x = width/2;
    }

    if(keyDown("space"))
    {
      console.log("space");
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);

    food();
    obstacles();
    if(obstacleGroup.isTouching(monkey))
    {
      gameState = END;
    }
  }
  else if (gameState === END)
  {
    if(obstacleGroup.isTouching(monkey))
    {
      ground.velocityX = 0;
      monkey.velocityY = 0;

      obstacleGroup.setVelocityXEach(0); 
      bananaGroup.setVelocityXEach(0); 

      bananaGroup.destroyEach(); 
     // obstacleGroup.destroyEach();

      monkey.changeAnimation("stopped",monkeyStopped);

      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
    }
  }
  
  text("Survival Time : "+ score, 100,100);
  drawSprites();
}

function food()
{
  if(frameCount % 80 === 0)
  {
    banana = createSprite(500,Math.round(random(120,200),10,10));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 120;
    
    banana.velocityX = -4;
    bananaGroup.add(banana);
  }
}

function obstacles()
{
  if(frameCount % 300 === 0)
  {
    obstacle = createSprite(500,338,10,10);
    obstacle.addImage("stone",obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 120;
    
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle);
  }
}






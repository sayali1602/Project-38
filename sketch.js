var tower, towerImage;
var climber1, climber1Image; //, climber2, climber2Image;
var climbersGroups, invisibleBlock, invisibleblockGroups;
var shinchan, shinchanImage;
var gameState = "play"
// var sound;


function preload(){
  towerImage = loadImage("tower.jpg");
  climber1Image = loadImage("climber1.png");
  //climber2Image = loadImage("climber2.jpg");
  shinchanImage = loadImage("shinchan.png");
  // sound = loadSound("shinchan_2.mp3");
 // sound = loadSound("spooky.wav");
 // sound = loadSound("Shinchan Theme Song Hindi.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
//  console.log(windowWidth)
  tower = createSprite(camera.x+width/2-50,80,windowWidth,windowHeight);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  tower.scale = 1.0;
  
  climbersGroup = new Group();
  invisibleblockGroup = new Group();
  
  shinchan = createSprite(windowWidth-500,windowHeight-500);
  shinchan.addImage(shinchanImage);
  shinchan.scale = 0.3;
  
  //ground= createSprite(windowWidth-100,windowHeight-100,windowWidth,50);
  
  
  // sound.play();

  
}

function draw() {
  //shinchan.collide(ground)
  camera.x=shinchan.x;    

  background("black");
  
  if (gameState === "play") {
   
  if(tower.y>400) {
    tower.y = 300;
  }
  
  
  if(keyDown("space")) {
   shinchan.velocityY = -5;
  }
  
  if(keyDown("left_arrow")) {
    shinchan.x = shinchan.x -3;
  }
  
  if(keyDown("right_arrow")) {
    shinchan.x = shinchan.x +3;
  }
  
   shinchan.velocityY = shinchan.velocityY + 0.5;
  
  if(climbersGroup.isTouching(shinchan)) {
    shinchan.velocityY = 0;
  }
  
  if(invisibleblockGroup.isTouching(shinchan) || shinchan.y > 600){
    shinchan.destroy();
    gameState = "end"
    }
  
   spawnClimbers();
  
   drawSprites();
  }

  if (gameState === "end"){
    stroke("skyblue");
    fill("white");
    textSize(50);
    text("Game Over", camera.x-width/2+50,50)
    // sound.stop();
  }
  

}

function spawnClimbers() {
  if (frameCount % 340 === 0)  {
    var climber1 = createSprite(camera.x+ width/2,height-300,40,10);
    climber1 = createSprite(200,-50);
    climber1.addImage(climber1Image);
    climber1.scale = 0.1
    
    //climber2 = createSprite(200,-50);
    //climber2.addImage(climber2Image);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber1.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY= 1;
    invisibleBlock.scale = 0.1

    
    climbersGroup.add(climber1);
    invisibleblockGroup.add(invisibleBlock);
    
    climber1.x = Math.round(random(120,400));
    invisibleBlock.x = climber1.x
    
    climber1.velocityY = 1;
    climber1.lifetime = 600;
    
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 600;
    
    shinchan.depth = climber1.depth;
    shinchan.depth  += 1;
  }
}











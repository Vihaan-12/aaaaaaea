var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg, zombie, zombieGroup;


function preload(){
  
  shooterImg = loadAnimation("assets/ani1.png","assets/ani4.png");
  shooter_shooting = loadAnimation("assets/ani2.png","assets/ani3.png");
  zombieImg = loadImage("assets/zombie.png");

  healthbar1Img = loadImage("assets/healthbar.png");
  healthbar2Img = loadImage("assets/healthbar2.png");
  healthbar3Img = loadImage("assets/healthbar3.png");
  healthbar4Img = loadImage("assets/healthbar4.png");
  healthbar5Img = loadImage("assets/healthbar5.png");

  bgImg = loadImage("assets/bg.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.3;
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);

   player.scale = 1.5;
   player.setCollider("circle",60,0,50);
   player.debug = true;

   zombieGroup = new Group();

   healthbar1 = createSprite(displayWidth-350,40,20,20)
   healthbar1.visible = true
    healthbar1.addImage("healthbar1",healthbar1Img)
    healthbar1.scale = 0.4

    healthbar2 = createSprite(displayWidth-350,40,20,20)
    healthbar2.visible = false
    healthbar2.addImage("healthbar2",healthbar2Img)
    healthbar2.scale = 0.4

    healthbar3 = createSprite(displayWidth-350,40,20,20)
    healthbar3.visible = false
    healthbar3.addImage("healthbar3",healthbar3Img)
    healthbar3.scale = 0.4

    healthbar4 = createSprite(displayWidth-350,40,20,20)
    healthbar4.visible = false
    healthbar4.addImage("healthbar3",healthbar4Img)
    healthbar4.scale = 0.4

    healthbar5 = createSprite(displayWidth-350,40,20,20)
    healthbar5.visible = false
    healthbar5.addImage("healthbar3",healthbar5Img)
    healthbar5.scale = 0.4

}

function draw() {
  background(0); 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
 player.x = player.x-30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyDown("space")){
 
  player.changeAnimation("shooter",shooter_shooting);
 
}

//player goes back to original standing image once we stop pressing the space bar
else {
  player.addAnimation("shooter1", shooterImg);
  player.scale = 1.5;
}

if(zombieGroup.isTouching(player)){
 
  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy();
        } 
  }
 }

enemy();
drawSprites();

}

function enemy(){
  if(frameCount%60===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(1200,1600),random(100,700),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,900)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}

var canvas;
var block;
var bigblock;
var bigestblock,start,state=0;
var shooter,bulet,blockGroup;
var score=0;
var buletSound;
var buletGroup;
var heart1,heart2,heart3,heart1Img,heart2img,heart3img,lives=3;
function preload() {
  buletSound=loadSound("assets/explosion.mp3");
  heart1Img=loadImage("assets/heart_1.png");
  heart3img=loadImage("assets/heart_1.png");
  heart2img=loadImage("assets/heart_1.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
 start=createSprite(windowWidth/2,windowHeight/2,100,50)
 shooter=createSprite(windowWidth/2,windowHeight,-100,100);
buletGroup=new Group();
blockGroup=new Group();
heart1=createSprite(displayWidth-150,40,20,30);
heart1.addImage("heart1",heart1Img);
heart1.scale=0.2;
heart1.visible=false;

heart2=createSprite(displayWidth-100,40,20,30);
heart2.addImage("heart2",heart2img);
heart2.scale=0.2;
heart2.visible=false;

heart3=createSprite(displayWidth-50,40,20,30);
heart3.addImage("heart3",heart3img);
heart3.scale=0.2;
heart3.visible=false;
shooter.visible=false;
}

function draw() {
  background("blue");
  
 if(mousePressedOver(start)){
   state=1;
 }
 if(state===0){
start.visible=true;
 }
 else if(state===1){
   start.visible=false;
   shooter.visible=true;
   shooter.shapeColor="red";
   createBlock();
   if(keyDown("b")){
    bulet=createSprite(windowWidth/2,windowHeight,10,20);
    bulet.x=shooter.x
    bulet.velocityY=-2
    bulet.shapeColor="black";
buletGroup.add(bulet);

    buletSound.play();

  }
  
   if(keyDown("left")){
     shooter.x=shooter.x-5

   }
   if(keyDown("right")){
    shooter.x=shooter.x+5

  }
  
  if(score>20){
  background("red");

  }
  if(buletGroup.isTouching(blockGroup)){
    for(var i=0;i<blockGroup.length;i=i+1){
      if(blockGroup[i].isTouching(buletGroup)){
        blockGroup[i].destroy();
        buletGroup.destroyEach();
        score=score+2;
      }
    }
  }
  if(blockGroup.isTouching(shooter)){
    for(var i=0;i<blockGroup.length;i=i+1){
      if(blockGroup[i].isTouching(shooter)){
        blockGroup[i].destroy();
  lives=lives-1;
      }
    }
  }
  if(lives===3){
    heart1.visible=true;
    heart2.visible=true;
    heart3.visible=true;
    
  }

  if(lives===2){
    heart1.visible=true;
    heart2.visible=true;
    heart3.visible=false;
    
  }
  if(lives===1){
    heart1.visible=true;
    heart2.visible=false;
    heart3.visible=false;
    
  }
  if(lives===0){
    heart1.visible=false;
    heart2.visible=false;
    heart3.visible=false;
    shooter.visible=false;
    state=2
  }
 }
 drawSprites();
 if(state===2){
  fill ("black");
  textSize(40);
   text("game ended!",500,200);

 }
 fill ("black");
 textSize(40);
 text("Score: "+score,100,50);
 
}
function createBlock(){
if(frameCount%50===0){
  block=createSprite(random(10,1150),0,50,random(50,100));
  block.velocityY=2;
  block.shapeColor="black";
  block.lifetime=250;
  blockGroup.add(block);

   
}

}



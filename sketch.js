var link,ground
var obstacle
var obstacleGroup
var bomb
var gameState
var bombGroup
var obstacleImg
var bombImg
var score=0
var ihouse
var groundImg
var bgImg
function preload(){
link_running=loadAnimation("link1.png","link2.png")
link_collided=loadAnimation("link1.png")
obstacleImg=loadImage("th.png")
bombImg=loadImage("bomb.png")
groundImg=loadImage("ground2.png")
bgImg=loadImage("Background.png")


}
function setup(){
createCanvas(1000,800)
obstacleGroup=createGroup()
bombGroup=createGroup()
link=createSprite(100,750,50,50)
ground=createSprite(500,780,1000,30)
ground.addImage("groundImg",groundImg)
ground.velocityX=-10
gameState=0
link.addAnimation("LinkRunAnimation",link_running)
link.addAnimation("linkCollided",link_collided)

link.scale=(0.3)

}


function draw(){
  background("black")
  textSize(30)
  text("Score: "+ score, 500,50);
 if(gameState===0){
  
  if(ground.x<0){
    ground.x=500
  }
  spawnObstacles()
  if(keyDown("space") && link.y>500){
    link.velocityY=-12
  }
  if(keyDown("a") && frameCount%15===0){
  bomb=createSprite(link.x,link.y,20,20)
  bomb.addImage("bombImg",bombImg)
  bomb.scale=(0.3)
  bombGroup.add(bomb)
  bomb.velocityX=3
  }
  link.velocityY=link.velocityY+0.8
  link.collide(ground)
   if(obstacleGroup.isTouching(link)){
     gameState=1  
     link.changeAnimation("linkCollided",link_collided)
    } 
    if(obstacleGroup.isTouching(bombGroup)){
      score=score+10
      obstacleGroup.destroyEach()
      bombGroup.destroyEach()
    }
    if(score===10){
    spawnHouse()
    gameState=2
    }

    
    /*if(link.isTouching(house)){
     textSize(20)
    text("Congratulations! You Won The Game that took very long to code!",300,300)
      gameState=3
    }*/
  }
 if(gameState===1){

  textSize(50)
  text("You Got Poked to death",400,500)
  link.velocityY=0
  obstacleGroup.setVelocityXEach(0)
  ground.velocityX=0

 }
  
 if(gameState===2){
  link.velocityY=link.velocityY+0.8
  link.collide(ground)
  if(keyDown(RIGHT_ARROW)){
    link.x=link.x+10
  }
  if(keyDown(LEFT_ARROW)){
    link.x=link.x-10
  }
 if(house.x===500){
  house.velocityX=0
 }
  
  if(link.isTouching(house)){
    gameState=3
  }
}

if(gameState===3){
  textSize(20)
    text("Congratulations! You Won The Game that took very long to code!",300,300)
link.collide(house)
}
 
drawSprites()
  
}
function spawnObstacles(){
  if(frameCount%90===0){
    obstacle=createSprite(600,165,10,40)
    obstacle.velocityX=-5
    obstacle.y=Math.round(random(650,750))
    obstacleGroup.add(obstacle)
    obstacle.addImage("obstacleImg",obstacleImg)
    obstacle.scale=(0.5)
  }
}

function spawnHouse(){
  house=createSprite(1000,700,100,100)
  house.velocityX=-2
  ground.velocityX=0


}
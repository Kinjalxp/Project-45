var paddle;
var brickGroup;
var ball,ball_img;
var score = 0;
var lives = 3;
var gameState = "serve";
var confetti,confetti_gif;


function preload(){
  ball_img = loadImage("ball.png");
  confetti_gif = loadImage("Conf_img.gif");
}

function setup() {
  createCanvas(800,400);

  paddle = createSprite(400,350,100,10);
  brickGroup = new Group();
  bricks(65);
  bricks(95);
  bricks(125);
  bricks(155);

 

  ball = createSprite(400,270);
  ball.addImage(ball_img);
  ball.scale = 0.1;

  edges = createEdgeSprites();

  confetti = createSprite(400,200,800,400);
 confetti.visible = false;

 
}

function draw() {
  background(0,0,0);  

  paddle.x = mouseX;
  paddle.shapeColor = ("lightblue");

  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(brickGroup,brickHit);
  // ball.bounceOff(edges[3]);
  ball.bounceOff(paddle);

  // if(ball.isTouching(brickGroup)){
  //   brickGroup.remove();
  // }

  if(gameState === "serve"){
    textSize(20);
    fill ("White");
    text("Click to serve the ball", 320,230);
  }
 if(gameState === "play"){

  if(ball.isTouching(edges[3])){
    lifeOver();
  }
}

  if(lives === 0){
    gameState = "end";
  }

  if(gameState === "end"){
    textSize(25);
    fill("White");
    text ("Game Over",350,250);
    ball.remove();
  }

  if(!brickGroup[0]){
    fill("LimeGreen");
    textSize(30);
    text("Congratulations!",280,210);
    text("You won the Game",270,250);
    //image (confetti_gif,20,20,800,350);
    //confetti.visible = true;
    confetti_gif = createImg("Conf_img.gif");
    confetti_gif.position(20,20);
    confetti_gif.size(confetti_gif.width*1.5,confetti_gif.height*1.2);
   
    ball.remove();
  }


  stroke("White");
  fill("White");
  textSize(15);
  text("score = " + score,700,20);
  text("Lives = "+ lives,700,40);

  drawSprites();
}

function bricks(y){
  for(var c = 0; c < 12; c++){
    var brick = createSprite(65+55*c,y,50,25);
    var randomColor = color(random(255),random(255),random(255))
    brick.shapeColor = randomColor;
    brickGroup.add(brick);
  }
}

function mouseClicked(){
  ball.velocityX = 10;
  ball.velocityY = 10; 
  gameState = "play";
}

function brickHit(ball,brick){
  brick.remove();
  score = score + 1;
}

function lifeOver(){
  lives = lives - 1;
  if(lives >=1){
    gameState = "serve";
    ball.x = 400;
    ball.y = 270;
    ball.velocityX = 0;
    ball.velocityY = 0;
  }
  else{
    gameState = "end";
  }
  
}
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var updateState, readState;
var gameState="Hungry";



function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
  bedroom=loadImage("Bed Room.png");
  garden=loadImage("Garden.png");
  washroom=loadImage("Wash Room.png");
  }
  
  function setup() {
    database=firebase.database();
      // createCanvas(displayWidth,displayHeight);
   createCanvas(1000,500);
  
    foodObj = new Food();
  
    foodStock=database.ref('Food');
    foodStock.on("value",readStock);
    
    dog=createSprite(800,200,150,150);
    dog.addImage(sadDog);
    dog.scale=0.15;
    
    feed=createButton("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);
  
    addFood=createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);

    readState=database.ref('gameState');
   readState.on("value",function(data){
    gameState=data.val();
  });
  
  }
  
  function draw() {
    background(46,139,87);
    foodObj.display();
  
    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
      lastFed=data.val();
    });
   
    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Feed : "+ lastFed%12 + " PM", 350,30);
     }else if(lastFed==0){
       text("Last Feed : 12 AM",350,30);
     }else{
       text("Last Feed : "+ lastFed + " AM", 350,30);
     }

     if(gameState!="Hungry"){
      feed.hide();
      addFood.hide();
      dog.remove();
    
    }else{
      feed.show();
      addFood.show();
      dog.addImage(sadDog);
    }
    currentTime=hour();
    if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
    }
    else if(currentTime==(lastFed+2)){
      foodObj.bedroom();
      update("sleeping");
    }
    else if(currentTime>=(lastFed+2) && currentTime<=4){
      foodObj.washroom();
      update("Bathing");
    }
    else{
      update("Hungry");
      foodObj.display();
    }
   
    drawSprites();
  }
  
  //function to read food Stock
  function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
  }
  
  
  //function to update food stock and last fed time
  function feedDog(){
    dog.addImage(happyDog);
    
    var food_stock_val = foodObj.getFoodStock();
    if(food_stock_val <= 0){
        foodObj.updateFoodStock(food_stock_val *0);
    }else{
        foodObj.updateFoodStock(food_stock_val -1);
    }
    
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
  
  //function to add food in stock
  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }
  function update(state){
    database.ref('/').update({
      gameState:state
    })
  }

































/*

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");

}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

 

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }



  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  console.log("hello");
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0);
  }else{
      foodObj.updateFoodStock(food_stock_val -1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

/*function update(state){
database.ref('/').update({
  gameState:state
})



}


 
if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();

}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);
}
currentTime=hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}
else if(currentTime==(lastFed+2)){
  foodObj.bedroom();
  update("sleeping");
}
else if(currentTime>=(lastFed+2) && currentTime<=4){
  foodObj.washroom();
  update("Bathing");
}
else{
  update("Hungry");
  foodObj.display();
}
*/


//function setup()
/*  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });*/


  /*bedroom=loadImage("Bed Room.png");
garden=loadImage("Garden.png");
washroom=loadImage("Wash Room.png");*/
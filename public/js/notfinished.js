var counter = 0;


//could create an all bees array
var allBees = {
  //each bee will have its unique name
  bee1: {type:'qBee', health:100 },
  
  bee2: {type: 'wBee', health:75 },
  
  bee3: {type: 'dBee', health:50 },
  
  //total added at time a new bee is added
  "bee total": 0,
  
  //or can use prototype
  getHit: function() {
    return health - 7;
  }
 
  
};

//constructor
function Bee(name,type,health,beeTotal) {
  
  this.name = name | 'default';    //0
  this.type = type | 'default';    //0 
  this.health = health | 'default';  //0
  this.beeTotal = "bee total";      //0
 
  
}


function addbees(type) {
  
   var bee = new Bee();
  
  allBees.beeTotal = counter++;
 
  if (bee.type == 'qBee') {
    
    //adds a new name ex: 'bee1' dynamically
     allBees["bee" + allBees.beeTotal] = {type:'qBee',health:100};
    
  }
  
  else if (bee.type == 'wBee') {
    
     allBees["bee" + allBees.beeTotal] = {type:'wBee',health:75};
    
  }
  
  if (bee.type == 'dBee') {
    
     allBees["bee" + allBees.beeTotal] = {type:'dBee',health:50};
    
  }
  
  //console.log(allBees["bee" + allBees.beeTotal] = {type:type,health:100});

}//addbees

  addbees('qBee');
  addbees('wBee');
//addbees('wBee');
//addbees('dBee');
//addbees('dBee');

console.log(allBees);

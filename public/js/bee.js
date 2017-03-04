(function() {



	//globals


	//canvas
	var canvas = null;
	var context = null;

	//offscreen canvas
	var bufferCanvas = null;
	var bufferCanvasCtx = null;


	var beesArr = [];

	//purple reset button bee handle
	var ibee = document.getElementById('ibee');

	//image
	var img = new Image();
	img.src = "../../public/builds/assets/images/bee2.png";

	//timer
	var beeCannon = null;
	var beeCannon2 = null;
	//border blink
	var preInter = null;

	
	//initiliaze counters
	
	var qcount = 0;		//queen bees counter
	var wcount = 0;		//worker bees counter
	var dcount = 0;		//drone bees counter
	var count = 0;		//counting b-adds
	//this id is counter different that other added to object property
	var id=0;	
	

	//max settings
	var mxqb = 3;		//max queen bees
	var mxwb = 5;		//max worker bees
	var mxdb = 7;		//max drone bees
	var mxbees = (mxqb + mxwb + mxdb); 	//max bees num

	//keyup-keydown event
	var allowed = true;

	//handle i need it for testing existence of elem too
	var outer = document.getElementById('outercanvas');


/*****
BorderTimerOnCanvasPreview
******/	

	function borderBlink(arg) {
		//call from preview function
		//clears timeout at key down events | reload of canvas
		preInter = setInterval(function() {
				//existing  page border for canvas
			if (outer.style.border == "1px solid rgba(197, 140, 255, 0.6)") {

					outer.style.border = "";
			
			} else {
				outer.style.border = "1px solid rgba(197, 140, 255, 0.6)";
			}

			
		},1000);


	}//borderBlink funct
	


	
	
/*****
Bee Controls
******/	

	function preview() {
		//border handle
	
		//this here so that it would hold class while created!!
		var some = this;
		//new elem
		var pre = document.createElement('h1');
		pre.className = 'view';
		pre.innerHTML = "Canvas Cleared";
		pre.innerHTML += "<br/>";
		pre.innerHTML += "Commercials Intermission ..";
		pre.innerHTML += "<br/>";
		pre.innerHTML += "Canvas Slider Coming Soon!";
		pre.innerHTML += "<br/>";
		pre.innerHTML += "Press Z or X to Continue";
		//grab elem in DOM and append child
		//outer.appendChild(pre);	adding it at if statement.
																	
		//test for existence of elem outer | calling preview from multiple places in function
		//below	
		//if not 7 count childnodes and last elem child class name isn't view											
		if(outer.childNodes.length != 7 && outer.lastElementChild.className != "" || outer.lastElementChild.className != "view") {
			//adding it for the first time here.
			outer.appendChild(pre);	
			
		}
		//else
		else {
			//otherwise removing elem h1.view
			//need to grab handle inside outer
			var tar = document.getElementById('outercanvas').childNodes[6];
			outer.removeChild(tar);
			
		}

		//call border blink
		borderBlink();


		



		
		

	}//preview



	//on click Bee clears Canvas, Z reload same settings, X re-shuffle bees
	ibee.onclick = function() {
		//clear canvas method
		context.clearRect(0,0,canvas.width, canvas.height);
		//add preview while canvas empty
		preview();
		//press z to re-run function after canvas removed
		document.onkeydown = function(e) {
		
	 

			   if (e.keyCode === 90) {		//pressed Z
					//check for h1.view elem && run preview if it exists
					if(outer.childNodes.length == 7 && outer.lastElementChild.className == "view")  { 
						//clear border time interval first
				    	borderBlink(clearInterval(preInter));
				    	//run to remove it	
				    	preview();
				    	

							
				    }
				   init();

			   }//if pressed z reload

			  //re-shuffle bees X
			  else if(e.keyCode == 88) {	//pressed X
			  		//check for h1.view elem && run preview if it exists
					if(outer.childNodes.length == 7 && outer.lastElementChild.className == "view")  { 
				    	//clear border time interval first
				    	borderBlink(clearInterval(preInter));
				    	//run to remove it	
				    	preview();
				    }
			  	
			  		beesArr = [];
			  		qcount = 0;		
					wcount = 0;		
					dcount = 0;		
					count = 0;
					id=0;
					beeCannon = null;
					beeCannon2 = null;
				  	init();
			  }
		  

			  //hard reset
			  else if(e.keyCode == 80) {
				  	context.clearRect(0,0,canvas.width, canvas.height);
				  	this.location.reload();
			    	
			  }
		    
		};//onkeydown



		  

	};//onclick



/*****
Bee function
******/	

	function Bee(type) {
	
		this.type = type;

		// gets x positions from zero to canvas width (left-to-right)
		this.x = Math.round(Math.random() * context.canvas.width);
		// get y positions across y-axis (or canvas height)
		this.y = Math.round(Math.random() * context.canvas.height);
		this.id = id;

		

		//fly-off
		this.fly = (Math.random() * 5) +7;

		//for now all bees same size
		this.width = 18;
		this.height = 22;
		
		//handle for outercanvas border at init style
		var oc = document.getElementById('outercanvas');
		oc.style.cursor = "pointer";
		oc.style.borderWidth = "1px";

		

	}//bee const





	//bee functions| getHealth
	Bee.prototype.addHealth = function() {

		if (this.type == "qBee") {
			this.health = 100;
			return this.health;

		}
		else if (this.type == "wBee") {
			this.health = 75;
		}
		else if (this.type == "dBee") {
			this.health = 50;
		}

	}//getHealth

	//console.log()

	//bee functions| getHit (substract from health)
	Bee.prototype.getHit = function() {

		if (this.type == "qBee") {
			this.health - 7;
		}
		else if (this.type == "wBee") {
			this.health -12;
		}
		else if (this.type == "dBee") {
			this.health - 18;
		}
	}//getHit
	


/*****
init function
******/


	function init() {

		//console.log('step1: enter init');

		//handle dom
		canvas = document.getElementById('beeCanvas');
		//ref inst
		context = canvas.getContext('2d');
		
		
		//create new elem based on canvas
		bufferCanvas = document.createElement("canvas");
		//new elem inst
		bufferCanvasCtx = bufferCanvas.getContext("2d");
		
		//buffers new width and height same as original canvas already in page
		bufferCanvasCtx.canvas.width = context.canvas.width;
		bufferCanvasCtx.canvas.height = context.canvas.height;

		//set interval timer -> add/shoot bees randomly to page
		beeCannon = setInterval(addBee,200);
		//console.log('step:2 call addBee');
		beeDraw();
		//calling beeDraw
		beeCannon2 = setInterval(beeDraw,100);

	}//init


/*****
beeDraw function
******/

	function beeDraw() {
		//console.log('step4: entered beeDraw');
		//canvas bg color
		
		//bufferCanvasCtx.fillStyle = "white";   
		//bufferCanvasCtx.fillRect(0,0,bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);
		

		//loop array
		for (var i=0; i < beesArr.length; i++) {
			//global alpha transparency
			bufferCanvasCtx.globalAlpha = .9;
			//bees are colored here
			//bufferCanvasCtx.fillStyle = "#400d63";	//this is the old purple
			//modifyng red and green values | blue fixed
			for (var j=0; j<beesArr.length*2.5; j++) {
			bufferCanvasCtx.fillStyle = 'rgb(' + Math.floor(255 - 25.5 * i) + ', ' +
										Math.floor(255 - 9.5 * j) + ', 255)';
			bufferCanvasCtx.strokeStyle = 'rgb(110, ' + Math.floor(255 - 42.5 * i) + ', ' +							
										  Math.floor(255 - 22.5 * j) + ')';
 			
 			bufferCanvasCtx.beginPath();

 			//bg canvas circles
 			bufferCanvasCtx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);										  
 			
 			//bg canvas colors
 			bufferCanvasCtx.fillRect(j * 25, i * 25, 25, 25);
 			bufferCanvasCtx.stroke();
			}							
			bufferCanvasCtx.stroke();
			bufferCanvasCtx.fillRect(
				beesArr[i].x,
				beesArr[i].y,
				beesArr[i].width,
				beesArr[i].height

			);//rect

		}//for loop

		//copy buffer
		context.drawImage(bufferCanvas,0,0,bufferCanvas.width, bufferCanvas.height);

		//circle
		var circle = new Path2D();
		
		context.fillStyle = 'red';

	    circle.moveTo(95, 12);
	    circle.arc(120, 55, 8, 0, 5 * Math.PI);
	    context.fill(circle);

		

	}//beeDraw	



/*****
addBee function
******/



	function addBee() {
		//console.log('step:3 enter addBee');
		
		function addToArr(obj) {

			if(count < mxbees && obj.id < 15 ) {

				//drones less than max setting
				if (dcount < mxdb) {
				id++;
				count++;
				dcount++;
				
					obj.type = "dBee";
					obj.health = 100;
					obj.id = id;
					beesArr.push(obj);
					//console.log(obj);						

				}//drones

				//workers less than max setting
				else if (wcount < mxwb) {
				id++;
				count++;
				wcount++;
				
					obj.type = "wBee";
					obj.health = 75;
					obj.id = id;
					beesArr.push(obj);
					//console.log(obj);	

				}//workers

				//queens less than max allowed
				else if (qcount < mxqb) {
				id++;
				count++;
				qcount++;
				
					obj.type = "qBee";
					obj.health = 50;
					obj.id = id;
					beesArr.push(obj);
					//console.log(obj);	

				}//queens

			}//outer if


			else {
				//cut off timer all bees been added
				clearInterval(beeCannon);
				clearInterval(beeCannon2);
				//console.log('all bees created and added - shutting off timer');
				

			}//reached max bcount - can't add anymore bees


		}//addToArr


		//Adding all bees with for loops
		//console.log('beegate - bee creation begins');
		//debugger;
		for(var i=0; i< mxdb; i++) {
			addToArr(new Bee("dBee"));
		}
		for(var i=0; i< mxwb; i++) {
			addToArr(new Bee("wBee"));
		}
		for(var i=0; i< mxqb; i++) {
			addToArr(new Bee("qBee"));
		}


		
	}//addBee

		


	  

	
	
	//console.log('qcounter: ' + qcount);
	//console.log('wcounter: ' + wcount);
	//console.log('dcounter: ' + dcount);

	//fire up init//
	document.addEventListener('DOMContentLoaded', init, false);

	
	


})(); //self exe funct



//self exec function is part of the window.object
window.console.log('event fired up');



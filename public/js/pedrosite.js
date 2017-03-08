(function(){
	
	var $ = window.jQuery;
	var SL_01 = {
	    init: function(data) {
	    	//main domain name
	        var site = location.host;

	        //disables external css
	        this.mainCss(false);

	        //targetting urls
	        var URL = document.URL;

	        //home page
	        if(site.href){
	        	console.log('do something');
	        }
	        //contact page 
	        else if(location.pathname == '/contact.htm'){
	        	console.log('contact page');
	        	this.contact();
	        }
	        
	    },  //init


	    //css injection
	    mainCss: function(style){
	        if(style){

	        	var style = document.createElement('style');
				
				style.type = 'text/css';
				style.innerHTML = ".freefood {border:5px solid #383838"; 
				style.innerHTML +="background-color:rgba(255,255,255,.95)"; 
				style.innerHTML +="outline:3px solid #c7c7c7; padding:15px;}";

				//append to head
				document.getElementsByTagName('head')[0].appendChild(style);

	  
	        }
	    },
	    
	    //contact
	    contact: function() {
	        console.log('Greetings from Contact page');
	        //h1 tag
	        var contact = document.querySelector('div.fs-title h1');
	        //add new copy
	        contact.textContent = "FREE FOOD TODAY";
	        //add new class
	        contact.classList.add('freefood');
	    },

	    //homepage
	    homepage: function() {
	        console.log('Greetings from Home page');
	    }
	};


		
	//executes 3 seconds after all html has loaded
	setTimeout(function() {

			try {
				console.log('ready here to call');
				debugger;
				SL_01.init();
			
			} //try

			catch(err) {
				console.log("Error happened: " + err);
			}

	},500);






	

})();    //doc ready
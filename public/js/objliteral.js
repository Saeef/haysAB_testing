(function(){
	
	var $ = window.jQuery;
	var SL_01 = {
	    init: function(data) {
	        
	        //disables external css
	        this.mainCss(false);

	        //targetting urls
	        var URL = document.URL;
	        //home page
	        if(URL.indexOf('pedro-l.com') > -1){
	        	this.homepage();
	        }
	        //about page 
	        else if(URL.indexOf('pedro-l.com/about') > -1){
	        	this.about();
	        }
	        
	    },  //init

	    //css injection
	    mainCss: function(applyCss){
	        if(applyCss){
	        	var mainCss = '';

	            var headofdoc = document.getElementsByTagName('head')[0];
	            var s = document.createElement('style');
	            s.setAttribute('type', 'text/css');
	            s.appendChild(document.createTextNode(mainCss));
	            headofdoc.appendChild(s);
	        }
	    },
	    
	    //about
	    about: function() {
	        console.log('Greetings from About page');
	    },

	    //homepage
	    homepage: function() {
	        console.log('Greetings from Home page');
	    }
	};

    
	//on page load
	$(document).on('load',function() {
			
		try {
	      
	      	SL_01.init();

	    } //try 

	    catch(err) {
	      
	        console.log('Something happen: '+ err);
	    
	    }//catch err

	});

})();    //doc ready
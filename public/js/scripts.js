(function() {

/*****
 Globals
******/

var sideNav = document.querySelector('section.apiarea');
//entire div
var beeRules = document.getElementById('mainmiddle2');
//bee rules title
var beeTitle = document.getElementsByClassName('headline')[1];



/*****
Inserts year in the footer dynamically
******/ 

var footersYear = function() {
	var today = new Date();
	var year = today.getFullYear();
	document.getElementById('fyear').textContent = year;
}


/*****
 Side navigation   
******/

function openNav() {
    var aprire = document.getElementById('aprire');
    document.getElementById("mySidenavL").style.width = "285px";
    //document.getElementById("mainL").style.marginLeft = "285px";
    document.getElementById('bee6').style.opacity = "0";
    document.getElementById('sesame').style.opacity = "0";
    

    //aprire
    aprire.classList.remove('panclose');
    aprire.classList.add('panclose');
    aprire.classList.add('panopen');
    //bee6
    document.getElementById('bee6').style.paddingLeft = "0em";
   

    document.getElementById('bee6').style.transition = "slide-down,width,2s";


    //toggle sideNav
    sideNav.classList.remove('apiarea');
    sideNav.classList.add('curtain');
    

}//openNav

function closeNav() {
    var aprire = document.getElementById('aprire');
    document.getElementById("mySidenavL").style.width = "0";
    document.getElementById("mainL").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
    document.getElementById('bee6').style.opacity = "1";
    //aprire
    aprire.classList.remove('panopen');
    aprire.classList.add('panclose');

    //toggle sideNav
    sideNav.classList.add('apiarea');
    sideNav.classList.remove('curtain');

    

    //bee6  //230
    document.getElementById('bee6').style.paddingLeft = "0";
    document.getElementById('bee6').style.maxWidth = "70px";
    document.getElementById('bee6').style.transition = "slide-up,width,1s";
    document.getElementById('sesame').style.opacity = "1";
    document.getElementById('sesame').style.marginLeft = '14.5em';


    
}



/*****
Bee Rules Headline (#mainmiddle2) Section When WinScreen 375 or less
******/ 




//while screen width is equal or less than
if (window.screen.width <= 385) {

    function beeRule(e) {
        console.log('clcka');
        console.log(e.currentTarget);
        var tar = e.currentTarget;

        switch (tar.id ) {
            case "beeOpen" :
                e.currentTarget.setAttribute('id', 'mainmiddle2');
                break;
            case "mainmiddle2" :
                e.currentTarget.setAttribute('id', 'beeOpen');
                break;
        }

    }

/****************************************************
Making a click event work on  small screens
AddEventListener caused so many problems here
Made it work with this event/function call. Unlike
eventlisteners only handle one function which sometimes
could be useful
*****************************************************/
//target entire section and cruise down the dom
beeRules.onclick = beeRule;
   
}//if window.screen.width



























document.getElementById('sesame').addEventListener('click',openNav,false);
document.getElementById('closa').addEventListener('click', closeNav,false);

footersYear();
		
		
})(); //self exec fun









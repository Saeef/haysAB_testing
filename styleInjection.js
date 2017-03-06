(function() {
	


#popup {
	width:500px;
	height: 200px;
	border:5px solid red;
}


.overlay {
	
	position:absolute;
	top:0;
	left:0;
}


function(css) {
	
	styleTags();
	styleInner();
	styleHead();

}

/*************

styleInjection

**************/

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = "#popup {width:500px; height:200px; border:5px solid #383838; z-index:2000; background-color:rgba(255,255,255,.95); border:1px inset #0e0e0e;outline:3px solid #c7c7c7; padding:15px;}";
style.innerHTML += "#overlayOff {display:none;}";
style.innerHTML += ".close {font-size:10px;line-height:16px; padding:7px 9px; position: absolute; top:10px; right: 10px; text-shadow:0px 0px 1px black; border-radius:3px; background-color:#09223c; box-shadow:0px 0px 1px rgba(0,0,0,.35); float:right;margin-right:5px; margin-top:5px; color:#fff; text-transform:uppercase; letter-spacing:1px; font-family:arial,helvetica,sans-serif; cursor:pointer;}";
style.innerHTML += ".close:hover {background-color:#2121c0;}";
style.innerHTML += ".close:active,.close:focus,.close:visited {outline:none!important;}";
style.innerHTML += ".heading1 {color:#002776; font-size: 28px; line-height: 36px; margin-top:10px !important; font-weight:600; letter-spacing:.5px; margin-left:0 !important;}";
style.innerHTML += ".pop1 {font-size:15px; color:#646161; line-height: 24px; margin-top:.75em;}";
style.innerHTML += "#gtouch { margin-top:30px; height:55px; vertical-align: bottom;}";
style.innerHTML += "#gtouch img {width:40px; height:40px; margin-right:15px;float:left; background:#0c79d4; color:#fff;}";
style.innerHTML += "#slogan {float:left; color:#646161;}";
style.innerHTML += "#phone {float:left; color:#002776; letter-spacing:1px; font-weight:600; line-height:20px; font-size:19px; text-decoration:none;}";
//append to head
document.getElementsByTagName('head')[0].appendChild(style);






















})(); 
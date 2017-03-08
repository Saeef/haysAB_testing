(function() {

var arr = [];
var inner = null;


function styleInner(arr) {
	
	if (arr) {

		//convert into string
		var css = arr.toString();
		//removes white space
		css = css.replace(/\s+/g,'');
		
		var re1 = /}./gi;
		var re2 = /}#/gi;

		for (var i=0 i < css.length; i++) {
			//convert class
			css[i].replace(re1,'},.');
			arr.push(css[i];)
			//convert id
			css[i].replace(re2,'},#');
			arr.push(css[i]);
		}

		console.log(arr);
		inner = "style.innerHTML = " + arr + ";";
		return inner;



	}//if css

	
}//styleInner



function render() {
	//style elem
	var style = document.createElement('style');	
	//style attr
	style.type = "text/css";
	if (inner != null) {
		return inner;
	}
	//append to head
	document.getElementsByTagName('head')[0].appendChild(style);

}

debugger;
function css(css) {

	styleInner(css);
	setTimeout(function() {
		render();
	},3000);

}
var css = "#popup{width:500px;height:200px;border:5px solid #383838}.popup{width:500px;height:200px;border:5px solid #383838}#popup2{width:500px;height:200px;border:5px solid #383838}"
css(css);
})(); 
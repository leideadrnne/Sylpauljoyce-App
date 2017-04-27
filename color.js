var config = {
    apiKey: "AIzaSyAMvvdmqAVaymmXxfBen6BUG0LHPYT7gkg",
    authDomain: "sylpauljoyce-d9115.firebaseapp.com",
    databaseURL: "https://sylpauljoyce-d9115.firebaseio.com",
    storageBucket: "sylpauljoyce-d9115.appspot.com",
    messagingSenderId: "409659361447"
  };
  firebase.initializeApp(config);
  var unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
    if(user) {
		console.log(user);
		var uid = user.uid;
		var password = user.password;
		var token = user.getToken();
		console.log(uid);
		if(uid == null) {
			window.location = "index.html";
			alert('You have to login first');
		}
	}
	else {
		window.location = "index.html";
		alert('You have to login first');
	}
});

var favProducts = new Firebase('https://sylpauljoyce-d9115.firebaseio.com/Products');
var btnSubmit = document.getElementById('Submit');
function refreshUI(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<table style="width:100%"><div data-key="' + list[i].key + '"><tr><div class="col-sm-6"><font style = "font-size:40px" face = "Montserrat" color = "#197b30"> ' + list[i].name + '</font><iframe width = "400" height = "400" frameborder = "0" scrolling = "auto" allowfullscreen src = '+ list[i].htmlUrl + '></iframe></div></a><br><br><br><br>' + '<font style = "font-size:30px" face = "Montserrat" color = "#197b30"># ' + list[i].code + '</font><font style = "font-size:15px" face = "Montserrat" color = "#197b30"><br>"' + list[i].description + '"</font><font style = "font-size:15px" face = "Montserrat" color = "#197b30"><br><br><img src = "size-web.png" height = "60px" width = "60px">' + list[i].size + '</font><font style = "font-size:15px" face = "Montserrat" color = "#197b30"><br><img src = "color.png" height = "60px" width = "60px">' + list[i].color + '</font><br><font style = "font-size:40px" face = "Metropolis" color = "#197b30"><br>PHP ' + list[i].price + '</font><br><button id = "btnView">' + genLinks(list[i].key, list[i].code, list[i].name, list[i].color, list[i].description) + '</button><tr></div></table><hr><br>';
    };
    document.getElementById('favProducts').innerHTML = lis;
};
 
function genLinks(key, pCode, pName, pColor, pDesc) {
    var links = '';
	links += '<a href = "spjView.html?key=' + key + '">View</a>';
    return links;
};
 
function edit(key, pCode, pName, pColor, pDesc) {
	var productCode = prompt("Update product code", pCode);
    var productName = prompt("Update the product name", pName); // to keep things simple and old skool :D
	var color = prompt("Update color", pColor);
	var desc = prompt("Update description", pDesc);
    if (productName && productName.length > 0 && color.length > 0 && productCode.length > 0 && desc.length > 0) {
        // build the FB endpoint to the item in movies collection
        var updateProduct = buildEndPoint(key);
        updateProduct.update({
            name: productName,
			color: color,
			code: productCode,
			description: desc
			
        });
    }
	else{
		alert("Error");
	}
}
 
function del(key, pName) {
    var response = confirm("Are you certain about removing \"" + pName + "\" from the list?");
    if (response == true) {
        // build the FB endpoint to the item in movies collection
        var deleteProduct = buildEndPoint(key);
        deleteProduct.remove();
    }
}
 
function buildEndPoint (key) {
	return new Firebase('https://sylpauljoyce-d9115.firebaseio.com/Products/' + key);
}
 
// this will get fired on inital load as well as when ever there is a change in the data
favProducts.on("value", function(snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
			color = data[key].color ? data[key].color : '';
			code = data[key].code ? data[key].code : '';
			size = data[key].size ? data[key].size : '';
			price = data[key].price ? data[key].price : '';
			description = data[key].description ? data[key].description : '';
			htmlUrl = data[key].htmlUrl ? data[key].htmlUrl : '';
            if (name.trim().length > 0) {
                list.push({
                    name: name,
					color: color,
					code: code,
					description: description,
					size: size,
					price: price,
					htmlUrl: htmlUrl,
                    key: key
                })
            }
        }
    }
    // refresh the UI
    refreshUI(list);
});
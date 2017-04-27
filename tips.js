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
var favProducts = new Firebase('https://sylpauljoyce-d9115.firebaseio.com/Tips');
var btnSubmit = document.getElementById('Submit');
function refreshUI(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<table style="width:100%"> <div data-key="' + list[i].key + '"><tr><div class="col-sm-8"><font style = "font-size:30px" face = "Metropolis" color = "#197b30"><img src = "prodstry.png" height = "60px" width = "60px"> ' + list[i].category + '<br><font style = "font-size:20px" face = "Montserrat" color = "#197b30"> ' + list[i].tip + '</font></div><br><button id = "btnView"><div class="col-sm-4">' + genLinks(list[i].key, list[i].category, list[i].name, list[i].products, list[i].description) + '</div></button></tr></div></table><hr>';
    };
    document.getElementById('favProducts').innerHTML = lis;
};
 
function genLinks(key, pCode, pName, pColor, pDesc) {
    var links = '';
	links += '<a href = "viewTips.html?key=' + key + '">View</a>';
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
            tip = data[key].tip ? data[key].tip : '';
			category = data[key].category ? data[key].category : '';
		
            if (tip.trim().length > 0) {
                list.push({
                    tip: tip,
					category: category,
				
                    key: key
                })
            }
        }
    }

    // refresh the UI
    refreshUI(list);
});
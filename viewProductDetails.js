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
var five = 0, four = 0, three = 0, two = 0, one = 0;
function refreshUI(list) {
	var details = '';
	var title = '';
	title += '<div class = "tblTitle"><table style = "width:100%"><tr><td style = \'width:200px;\'><center><font style = "font-size:25px" face = "Metropolis" color = "#197b30">Code</font></td><td style = \'width:200px;\'><center><font style = "font-size:25px" face = "Metropolis" color = "#197b30">Name</font></td><td style = \'width:150px;\'><center><font style = "font-size:25px" face = "Metropolis" color = "#197b30">Category</font></td><td style = \'width:150px;\'><center><font style = "font-size:25px" face = "Metropolis" color = "#197b30">Color</font></td><td style = \'width:150px;\'><center><font style = "font-size:25" face = "Metropolis" color = "#197b30">Size</font></td><td style = \'width:150px;\'><center><font style = "font-size:25px" face = "Metropolis" color = "#197b30">Price</font></td><td style = \'width:150px;\'><center><font style = "font-size:25px" face = "Metropolis" color = "#197b30">Date Added</font></td></tr></table></div>';
    for (var i = 0; i < list.length; i++) {
	
	details += '<div class = "tblDetails"><table style = "width:100%" border = "1"><tr><td style = \'width: 200px;\'><center><font style = "font-size:15px" face = "Metropolis" color = "#197b30">' + list[i].code + '</font></td><td style = \'width: 200px;\'><center><font style = "font-size:15px" face = "Metropolis" color = "#197b30">' + list[i].name + '</font></td><td style = \'width: 150px;\'><center><font style = "font-size:15px" face = "Metropolis" color = "#197b30">' + list[i].category + '</font></td><td style = \'width: 150px;\'><center><font style = "font-size:15px" face = "Metropolis" color = "#197b30">' + list[i].color + '</font></td><td style = \'width: 150px;\'><center><font style = "font-size:15px" face = "Metropolis" color = "#197b30">' + list[i].size + '</font></td><td style = \'width: 150px;\'><center><font style = "font-size:15px" face = "Metropolis" color = "#197b30">' + list[i].price + '</font></td><td style = \'width: 150px;\'><center><font style = "font-size:15px" face = "Metropolis" color = "#197b30">' + list[i].dateAdded + '</font></td></tr></table></div>';


    };

	document.getElementById('title').innerHTML = title;
	document.getElementById('details').innerHTML = details;
};
 
function genLinks(key, pCode, pName, pColor, pDesc) {
    var links = '';
	links += '<a href = "spjViewShowroom.html?key=' + key + '">View</a>';
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
            code = data[key].code ? data[key].code: '';
			name = data[key].name ? data[key].name : '';
			category = data[key].category ? data[key].category : '';
			color = data[key].color ? data[key].color : '';
			size = data[key].size ? data[key].size : '';
			price = data[key].price ? data[key].price : '';
			dateAdded = data[key].dateAdded ? data[key].dateAdded : '';
            if (name.trim().length > 0) {
                list.push({
                    code: code,
					name: name,
					category: category,
					color: color,
					size: size,
					price: price,
					dateAdded: dateAdded,
                    key: key
                })
            }
        }
    }

    // refresh the UI
    refreshUI(list);
});
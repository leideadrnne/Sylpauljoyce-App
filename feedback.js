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
var favProducts = new Firebase('https://sylpauljoyce-d9115.firebaseio.com/Feedbacks');
var btnSubmit = document.getElementById('Submit');
var five = 0, four = 0, three = 0, two = 0, one = 0;
function refreshUI(list) {
    var lis = '';
	var chart = '';
	var details = '';
    for (var i = 0; i < list.length; i++) {
        details += '<table style="width:100%"> <div data-key="' + list[i].key + '"><tr><div class="col-sm-6"><font style = "font-size:40px" face = "Montserrat" color = "#197b30"> ' + list[i].email + '</font><font style = "font-size:15px" face = "Montserrat" color = "#197b30"><br>Value: ' + list[i].feedbackVal +'<tr></div></table><br><br><br>';
		
		if(list[i].feedbackVal == 5) {
			five++;
		} else if(list[i].feedbackVal == 4) {
			four++;
		} else if(list[i].feedbackVal == 3) {
			three++;
		} else if(list[i].feedbackVal == 2) {
			two++;
		} else if(list[i].feedbackVal == 1) {
			one++;
		}

    };
	
	var listLength = list.length;
	var fivePercent = (five/listLength) * 100;
	console.log(fivePercent);
	var fourPercent = (four/listLength) * 100;
	console.log(fourPercent);
	var threePercent = (three/listLength) * 100;
	console.log(threePercent);
	var twoPercent = (two/listLength) * 100;
	console.log(twoPercent);
	var onePercent = (one/listLength) * 100;
	console.log(onePercent);
	console.log(listLength);
	console.log(five);
	console.log(four);
	console.log(three);
	console.log(two);
	console.log(one);
	
	//lis += '<br><table style="width:100%" border = "1px"><tr><td><b><center>5 stars</td><td><b><center>4 stars</td><td><b><center>3 stars</td><td><b><center>2 stars</td><td><b><center>1 star</td></tr><tr><td><center>' + (fivePercent).toFixed(2) + '%</td><td><center>' + (fourPercent).toFixed(2) + '%</td><td><center>' + (threePercent).toFixed(2) + '%</td><td><center>' + twoPercent.toFixed(2) + '%</td><td><center>' + onePercent.toFixed(2) + '%</td></tr></table>';
	
	chart += '<div class = "chartcss"><div class="chart">' + 
  '<div style="width: ' + fivePercent * 10  + 'px;" id = "first">'+fivePercent.toFixed(2)+'%</div>' +
  '<div style="width: ' + fourPercent * 10 +'px;">'+fourPercent.toFixed(2)+'%</div>' + 
  '<div style="width: ' + threePercent * 10 + 'px;">'+threePercent.toFixed(2)+'%</div>' +
  '<div style="width: ' + twoPercent * 10 + 'px;">'+twoPercent.toFixed(2)+'%</div>' +
  '<div style="width: ' + onePercent * 10 + 'px;">'+onePercent.toFixed(2)+'%</div>' +
  '</div></div>';
	
    document.getElementById('favProducts').innerHTML = lis;
	document.getElementById('chart').innerHTML = chart;
	//document.getElementById('details').innerHTML = details;
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
            email = data[key].email ? data[key].email: '';
			feedbackVal = data[key].feedbackVal ? data[key].feedbackVal : '';
            if (email.trim().length > 0) {
                list.push ({
                    email: email,
					feedbackVal: feedbackVal,
                    key: key
                })
            }
        }
    }

    // refresh the UI
    refreshUI(list);
});
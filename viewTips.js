var ref = new Firebase('https://sylpauljoyce-d9115.firebaseio.com/');

  // Initialize Firebase
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
var dbRef = firebase.database().ref();
var favProducts = dbRef.child("Tips");
var btnDelete = document.getElementById('btnDelete');
if((window.location.href).indexOf('?') != -1) {
    var queryString = (window.location.href).substr((window.location.href).indexOf('?') + 1); 

    // "queryString" will now contain kerdesPost=fdasdas%20ad%20asd%20ad%20asdas

    var key = (queryString.split('='))[1];

    // "value" will now contain fdasdas%20ad%20asd%20ad%20asdas

    key = decodeURIComponent(key);

    // "value" will now contain fdasdas ad asd ad asdas (unescaped value)
	
}

const btnSubmit = document.getElementById('btnSubmit');
var downloadUrl = "", downloadHtml ="", picUrl, htmlUrl, used;
function refreshUI(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<div data-key="' + list[i].key + '"><div class="viewTips"><font style = "font-size:70px" face = "Bebas Neue" color = "#197b30">' + list[i].category + '</font><div class = "tip"><img src = "abouty-full.png" height = "40px" width = "40px"><font style = "font-size:20px" face = "Metropolis" color = "#197b30">						' + list[i].tip + '</font></div></div></div>';
    };
    document.getElementById('favProducts').innerHTML = lis;
};

favProducts.orderByKey().equalTo(key).on("child_added", function(snap) {
	var data = snap.val();
	var tip = snap.val().tip;
	var category = snap.val().category;
	if(category == "livingroom") {
		document.getElementById('category').selectedIndex = 0;
	}
	else if(category == "bedroom") {
		document.getElementById('category').selectedIndex = 1;
	}
	else if(category == "diningroom") {
		document.getElementById('category').selectedIndex = 2;
	}
	else if(category == "office") {
		document.getElementById('category').selectedIndex = 3;
	}
	else if(category == "outdoor") {
		document.getElementById('category').selectedIndex = 4;
	}
	else {
	
	}
	
	document.getElementById('tip').value = tip;	
	
	var list = [];
	list.push({
		tip: tip,
		category, category,
		key: key
	})
	console.log(snap.val());
	refreshUI(list);
});
btnSubmit.addEventListener('click', e => {
console.log(picUrl);
	var txtTips = document.getElementById('tip').value;
	var e = document.getElementById("category");
	var txtCategory = e.options[e.selectedIndex].value;

	var updateProduct = new Firebase('https://sylpauljoyce-d9115.firebaseio.com/Tips/' + key);
	updateProduct.update ({
		tip: txtTips,
		category: txtCategory,
		
	});
	window.location = 'viewTips.html?key=' + key;
});

btnDelete.addEventListener('click', e => {
	var response = confirm("Are you certain about deleting this product?");
	if(response == true){
		var deleteProduct = new Firebase('https://sylpauljoyce-d9115.firebaseio.com/Products/' + key);
		deleteProduct.remove();
		alert('Successfully deleted');
		window.location = "spjProducts.html";
	}
});
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
var downloadUrl, downloadHtml;
var used = 0;
var date = new Date();
var dd = date.getDate();
var mm = date.getMonth() + 1;
var yyyy = date.getFullYear();

if(dd < 10) {
	dd = '0'+dd;
}

if(mm <10) {
	mm = '0'+mm;
}

date = mm+'/'+dd+'/'+yyyy;
console.log(date);
function saveToFB(productCode, productName, category, color, size, price, discountStatus, discount, desc, picUrl, htmlUrl) {
    // this will save data to Firebase
	console.log(htmlUrl);
    favProducts.push({
        name: productName,
		color: color,
		code: productCode,
		category: category,
		description: desc,
		size: size,
		price: price,
		picUrl: picUrl,
		htmlUrl: htmlUrl,
		discountStatus: discountStatus,
		discount: discount,
		used: used,
		dateAdded: date
    });
	alert('Added successfully');
		window.location = "spjProducts.html";
};

var pnguploader = document.getElementById('pnguploader');
var pngButton = document.getElementById('png');

pngButton.addEventListener('change', function(e) {
var file = e.target.files[0];
var storageRef = firebase.storage().ref('spj/' +file.name);
var task = storageRef.put(file);
task.on('state_changed', 
function progress(snapshot) {
	var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
		pnguploader.value = percentage;
	},
	
	function error(err) {
		
	},
	
	function complete() {
		
		downloadUrl = task.snapshot.downloadURL;
	}
	
	);
});

var htmluploader = document.getElementById('htmluploader');
var htmlButton = document.getElementById('html');

htmlButton.addEventListener('change', function(e) {
var file = e.target.files[0];
var storageRef = firebase.storage().ref('spj/' +file.name);
var task = storageRef.put(file);
task.on('state_changed', 
function progress(snapshot) {
	var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
		htmluploader.value = percentage;
	},
	
	function error(err) {
		
	},
	
	function complete() {
		
		downloadHtml = task.snapshot.downloadURL;
	}
	
	);
});

var fbxuploader = document.getElementById('fbxuploader');
var fbxButton = document.getElementById('fbx');

fbxButton.addEventListener('change', function(e) {
var file = e.target.files[0];
var storageRef = firebase.storage().ref('spj/' +file.name);
var task = storageRef.put(file);
task.on('state_changed', 
function progress(snapshot) {
	var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
		fbxuploader.value = percentage;
	},
	
	function error(err) {
		
	},
	
	function complete() {
		
	}
	
	);
});

btnSubmit.addEventListener('click', e => {
	var productName = document.getElementById('productName').value.trim();
	
	var type = document.getElementById("type").value;
	if(type == "local") {
		var color = "local";
	} else if(type == "imported") {
		var color = document.getElementById('color').value.trim();
	} else {
		console.log("hehe");
	}
	console.log(color);
	if(document.getElementById('discountStatus').checked) {
		var discountStatus = "true";
		var discount = document.getElementById('discount').value.trim();
	}
	else {
		var discountStatus = "false";
		var discount = "0";
	}
	console.log(discountStatus);
	console.log(discount);
	var e = document.getElementById("category");
	var category = e.options[e.selectedIndex].value;
	var productCode = document.getElementById('productCode').value.trim();
	var desc = document.getElementById('desc').value.trim();
	var size = document.getElementById('size').value.trim();
	var price = document.getElementById('srp').value.trim();
	saveToFB(productCode, productName, category, color, size, price, discountStatus, discount, desc, downloadUrl, downloadHtml);	
		

});

	
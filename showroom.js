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
var favShowroom = new Firebase('https://sylpauljoyce-d9115.firebaseio.com/Showroom');
  
var btnSubmit = document.getElementById('Submit');
var downloadUrl, showroomName;
function saveToFB(showroomName, products, category, desc, size, picUrl) {
    // this will save data to Firebase
	
    favShowroom.push({
        name: showroomName,
		description: desc,
		size: size,
		category: category,
		products: products,
		picUrl: picUrl
    });
	alert('Added successfully');
		window.location = "spjShowroom.html";
};

var picuploader = document.getElementById('picuploader');
var fbxuploader = document.getElementById('fbxuploader');
var fileButton = document.getElementById('picture');
var fbxButton = document.getElementById('fbx');

fileButton.addEventListener('change', function(e) {
var file = e.target.files[0];
var storageRef = firebase.storage().ref('spj/' + file.name);
var task = storageRef.put(file);
task.on('state_changed', 
function progress(snapshot) {
	var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
		picuploader.value = percentage;
	},
	
	function error(err) {
		
	},
	
	function complete() {
		
		downloadUrl = task.snapshot.downloadURL;
	}
	
	);
});

fbxButton.addEventListener('change', function(e) {
var file = e.target.files[0];
var storageRef = firebase.storage().ref('spj/' + file.name);
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
		showroomName = document.getElementById('showroomName').value.trim();
		var products = document.getElementById('products').value.trim();
		var e = document.getElementById("category");
		var category = e.options[e.selectedIndex].value;
		var desc = document.getElementById('desc').value.trim();
		var size = document.getElementById('size').value.trim();
		
		saveToFB(showroomName, products, category, desc, size, downloadUrl);	
		

});

	
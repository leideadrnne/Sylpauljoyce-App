var ref = new Firebase('https://jkl-thesisit.firebaseio.com');

var config = {
  apiKey: "AIzaSyA3Q7243BzlK-bbZDV3GVfhjSqsRtuu7SA",
  authDomain: "jkl-thesisit.firebaseapp.com",
  databaseURL: "https://jkl-thesisit.firebaseio.com",
  storageBucket: "jkl-thesisit.appspot.com",
  messagingSenderId: "3046923160"
};
firebase.initializeApp(config);

//var ref = firebase.database().ref('jkl-thesisit');
//var productRef = ref.child('clients');
var dbRef = firebase.database().ref();
var productRef = dbRef.child("productWithColor");
/*
productRef.once('value')
.then (function(snap) {
	var users = snap.val();
	console.log(users);
});*/

/*productRef.orderByChild('name').startAt('Duterte').endAt('Duterte').on("child_added", function(snap) {
	console.log(snap.val());
});*/
//C:\Users\jorren\Desktop\JEN\College\testFirebase\jsLogin\wheretest.js

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

fileButton.addEventListener('change', function(e) {
	var file = e.target.files[0];
	var storageRef = firebase.storage().ref('test/' +file.name);
	var task = storageRef.put(file);
	task.on('state_changed', 
	function progress(snapshot) {
		var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
		uploader.value = percentage;
		if(percentage == 100) {
			alert('Upload complete!');
		}
	},
	
	function error(err) {
		
	},
	
	function complete() {
		
	}
	
	);
});
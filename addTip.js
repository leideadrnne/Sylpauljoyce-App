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
var favShowroom = new Firebase('https://sylpauljoyce-d9115.firebaseio.com/Tips');
  
var btnSubmit = document.getElementById('Submit');
var downloadUrl, showroomName;
function saveToFB(tip, category) {
    // this will save data to Firebase
	
    favShowroom.push({
        tip: tip,
		category: category,
    });
	alert('Added successfully');
		window.location = "tips.html";
};

btnSubmit.addEventListener('click', e => {
		var tip = document.getElementById('tip').value.trim();
		var e = document.getElementById("category");
		var category = e.options[e.selectedIndex].value;
		
		saveToFB(tip, category);	
		

});

	
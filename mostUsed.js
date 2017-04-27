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
var favProducts = dbRef.child("Products");
var btnSubmit = document.getElementById('Submit');
var five = 0, four = 0, three = 0, two = 0, one = 0;

function refreshUI() {
	var details = '';
	var title = '';
	title += '<div class = "tblTitle"><table style = "width:100%" ><tr><td style = \'width:150px;\'><center><font style = "font-size:30px" face = "Metropolis" color = "#197b30">Code</font></td><td style = \'width:150px;\'><center><font style = "font-size:30px" face = "Metropolis" color = "#197b30">Name</font></td><td style = \'width:150px;\'><center><font style = "font-size:30px" face = "Metropolis" color = "#197b30">Number of times tried</font></td></tr></table></div>';
	document.getElementById('title').innerHTML = title;
};
// this will get fired on inital load as well as when ever there is a change in the data
favProducts.orderByChild("used").on("child_added", function(snapshot) {
    var data = snapshot.val();
	console.log(data);
	var code = snapshot.val().code;
	console.log("code: " + code);
	var name = snapshot.val().name;
	var used = snapshot.val().used;
	details += '<div class = "tblDetails"><table style = "width:100%"><tr><td style = \'width: 150px;\'><center><font style = "font-size:20px" face = "Metropolis" color = "#197b30">' + code + '</font></td><td style = \'width: 150px;\'><center><font style = "font-size:20px" face = "Metropolis" color = "#197b30">' + name + '</font></td><td style = \'width: 150px;\'><center><font style = "font-size:20px" face = "Metropolis" color = "#197b30">' + used + '</font></td></tr></table></div>';

    // refresh the UI
	document.getElementById('details').innerHTML = details;
    refreshUI();
});
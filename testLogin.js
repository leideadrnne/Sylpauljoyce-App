(function() {

/*import * as firebase from 'firebase'
import 'firebase/auth';
import 'firebase/database';*/

var config = {
    apiKey: "AIzaSyAMvvdmqAVaymmXxfBen6BUG0LHPYT7gkg",
    authDomain: "sylpauljoyce-d9115.firebaseapp.com",
    databaseURL: "https://sylpauljoyce-d9115.firebaseio.com",
    storageBucket: "sylpauljoyce-d9115.appspot.com",
    messagingSenderId: "409659361447"
  };
  firebase.initializeApp(config);

const txtEmail = document.getElementById('email');
const txtPass = document.getElementById('pword');
const btnLogin = document.getElementById('btnLogin');
//const btnSignUp = document.getElementById('btnSignUp');

var user = firebase.auth().currentUser;
var uId;
if (user != null) {
  console.log('uhm');
  uId = user.uid;
  console.log('user id: ' + uId);
} else {
  console.log('tangina');
}

btnLogin.addEventListener('click', e => {
	const email = txtEmail.value;
	const pass = txtPass.value;
	const auth = firebase.auth();

	firebase.auth().signInWithEmailAndPassword(email, pass)
   .then(function(firebaseUser) {
       alert('success');
		window.location='spjHome3.html';
   })
  .catch(function(error) {
      alert('error');
  });
})

var ref = new Firebase('https://jkl-thesisit.firebaseio.com/clients');
function saveToClientTable(email, pass) {
	ref.push({
		email: email,
		password: pass,
		name: 'Cutipie'
	});
};

btnSignUp.addEventListener('click', e => {
	const email = txtEmail.value;
	const pass = txtPass.value;
	const auth = firebase.auth();
	if(email.length > 0 && pass.length > 0) {
		firebase.auth().createUserWithEmailAndPassword(email, pass)
		.then(function(user) {
			console.log(user);
			saveToClientTable(email, pass);
		})
		.catch(function(error) {
			alert('error');
		});
	}
	else {
		alert('error po');
	}
		
})


btnLogout.addEventListener('click', e => {
	firebase.auth().signOut();
	txtEmail.value = '';
	txtPass.value = '';
})

var unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
    if(user) {
		console.log(user);
		var uid = user.getToken();
		console.log(uid);
		
		//alert('User logged in successfully!');
		document.getElementById('btnLogout').style.visibility = "visible";
		//#("$btnLogout").show();
	}
	else {
		console.log('Invalid email or password!');
		document.getElementById('btnLogout').style.visibility = "hidden";
	}
});
}());
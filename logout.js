var config = {
    apiKey: "AIzaSyAMvvdmqAVaymmXxfBen6BUG0LHPYT7gkg",
    authDomain: "sylpauljoyce-d9115.firebaseapp.com",
    databaseURL: "https://sylpauljoyce-d9115.firebaseio.com",
    storageBucket: "sylpauljoyce-d9115.appspot.com",
    messagingSenderId: "409659361447"
  };
  firebase.initializeApp(config);
  
  firebase.auth().signOut().then(function() {
  alert("Sign out successful");
  window.location = "index.html";
}).catch(function(error) {
 console.log(error);
});
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
var favProducts = dbRef.child("Showroom");
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
        lis += '<div data-key="' + list[i].key + '"><div class="col-sm-6"><font style = "font-size:60px" face = "Montserrat" color = "#197b30">' + list[i].name + '</font><br><br><iframe width = "400" height = "400" frameborder = "0" scrolling = "auto" allowfullscreen src = ' + list[i].picUrl + '></iframe></div></a><br>' + '<br><br><br><br><br><br><div class="col-sm-6"><font style = "font-size:20px" face = "Metropolis" color = "#197b30"><br>"' + list[i].description + '"</font><font style = "font-size:15px" face = "Metropolis" color = "#197b30"><br><img src = "size-web.png" height = "60px" width = "60px">   ' + list[i].size + '</font><font style = "font-size:15px" face = "Metropolis" color = "#197b30"><br><img src = "prodList.png" height = "60px" width = "60px">   ' + list[i].products  + '</font><br><br><br><br></div></div>';
    };
    document.getElementById('favProducts').innerHTML = lis;
};

favProducts.orderByKey().equalTo(key).on("child_added", function(snap) {
	var data = snap.val();
	var name = snap.val().name;
	var desc = snap.val().description;
	var size = snap.val().size;
	var picUrl = snap.val().picUrl;
	var category = snap.val().category;
	var products = snap.val().products;
	picUrl = snap.val().picUrl;
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
	
	document.getElementById('name').value = name;	
	document.getElementById('desc').value = desc;
	document.getElementById('size').value = size;
	document.getElementById('picUrl').value = picUrl;
	document.getElementById('products').value = products;
	
	var list = [];
	list.push({
		name: name,
		description: desc,
		size: size,
		products, products,
		picUrl: picUrl,
		key: key
	})
	console.log(snap.val());
	refreshUI(list);
});

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
		document.getElementById('picUrl').value = downloadUrl;
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
console.log(picUrl);
	var txtName = document.getElementById('name').value;
	var txtDesc = document.getElementById('desc').value;
	var txtProducts = document.getElementById('products').value;
	var txtSize = document.getElementById('size').value;
	var e = document.getElementById("category");
	var txtCategory = e.options[e.selectedIndex].value;
	var txtPicUrl = document.getElementById('picUrl').value;
	console.log(txtPicUrl);

	var updateProduct = new Firebase('https://sylpauljoyce-d9115.firebaseio.com/Showroom/' + key);
	updateProduct.update ({
		name: txtName,
		description: txtDesc,
		size: txtSize,
		products: txtProducts,
		picUrl: txtPicUrl,
		category: txtCategory,
		
	});
	window.location = 'spjViewShowroom.html?key=' + key;
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
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
var favProducts = dbRef.child("Products");
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
        lis += '<div data-key="' + list[i].key + '"><div class="col-sm-6"><font style = "font-size:70px" face = "Montserrat" color = "#197b30">' + list[i].name + '</font><br><iframe width = "400" height = "400" frameborder = "0" scrolling = "auto" allowfullscreen src = ' + list[i].htmlUrl + '></iframe></div></a><br>' + '<br><br><br><br><br><br><div class="col-sm-6"><font style = "font-size:30px" face = "Metropolis" color = "#197b30"># ' + list[i].code + '</font><font style = "font-size:15px" face = "Montserrat" color = "#197b30"><br>"' + list[i].description + '"</font><font style = "font-size:15px" face = "Metropolis" color = "#197b30"><br><img src = "size-web.png" height = "60px" width = "60px">' + list[i].size + '</font><font style = "font-size:15px" face = "Metropolis" color = "#197b30"><br><img src = "color.png" height = "60px" width = "60px">   ' + list[i].color + '</font><font style = "font-size:40px" face = "Metropolis" color = "#197b30"><hr><br>PHP ' + list[i].price  + '</font><br><br></div></div>';
    };
    document.getElementById('favProducts').innerHTML = lis;
};

favProducts.orderByKey().equalTo(key).on("child_added", function(snap) {
	var data = snap.val();
	var name = snap.val().name;
	var code = snap.val().code;
	var color = snap.val().color;
	var desc = snap.val().description;
	var price = snap.val().price;
	var size = snap.val().size;
	var picUrl = snap.val().picUrl;
	var category = snap.val().category;
	var discountStatus = snap.val().discountStatus;
	var discount = snap.val().discount;
	picUrl = snap.val().picUrl;
	htmlUrl = snap.val().htmlUrl;
	used = snap.val().used;
	if(color == "local") {
		document.getElementById('typelocal').checked = true;
	} else {
		document.getElementById('typeimported').checked = true;
		document.getElementById('color').value = color;
	}
	
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
	
	if(discountStatus) {
		document.getElementById('discountStatus').checked = true;
		document.getElementById('discount').value = discount;
	}
	else  {
		document.getElementById('discountStatus').checked = false;
		
	}
	
	document.getElementById('code').value = code;
	document.getElementById('name').value = name;	
	document.getElementById('desc').value = desc;
	document.getElementById('price').value = price;
	document.getElementById('size').value = size;
	//document.getElementById('picUrl').value = picUrl;
	document.getElementById('picUrl').value = picUrl;
	document.getElementById('htmlUrl').value = htmlUrl;
	
	var list = [];
	list.push({
		name: name,
		code: code,
		color: color,
		description: desc,
		price: price,
		size: size,
		picUrl: picUrl,
		htmlUrl: htmlUrl,
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
		document.getElementById('htmlUrl').value = downloadHtml;
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
	var txtCode = document.getElementById('code').value;
	var txtName = document.getElementById('name').value;
	//var txtColor = document.getElementById('color').value;
	var txtDesc = document.getElementById('desc').value;
	var txtPrice = document.getElementById('price').value;
	var txtSize = document.getElementById('size').value;
	var txtPic = document.getElementById('picUrl').value;
	var e = document.getElementById("category");
	var txtCategory = e.options[e.selectedIndex].value;
	var type = document.getElementById('typelocal').value;
	var txtColor, txtdiscountStatus, txtdiscount;
	var txtPicUrl = document.getElementById('picUrl').value;
	var txtHtmlUrl = document.getElementById('htmlUrl').value;
	console.log(txtPicUrl);
	if(document.getElementById('typelocal').checked == true) {
		txtColor = "local";
	} else  {
		txtColor = document.getElementById('color').value.trim();
	}
	
	if(document.getElementById('discountStatus').checked) {
		txtdiscountStatus = "true";
		txtdiscount = document.getElementById('discount').value.trim();
	}
	else {
		txtdiscountStatus = "false";
		txtdiscount = "0";
	}
	console.log(downloadUrl);
/*	if(downloadUrl = "") {
		console.log("hi");
		txtPicUrl = txtPicUrl;
	}
	
	else{
		
		txtPicUrl = downloadUrl;
	}
	console.log(downloadUrl);
	if(downloadHtml = "") {
		txtHtmlUrl = txtHtmlUrl;
	}
	else {
		txtHtmlUrl = downloadHtml;
	}
	console.log(txtPicUrl);*/
	var updateProduct = new Firebase('https://sylpauljoyce-d9115.firebaseio.com/Products/' + key);
	console.log(txtHtmlUrl);
	updateProduct.update ({
		code: txtCode,
		name: txtName,
		color: txtColor,
		description: txtDesc,
		size: txtSize,
		price: txtPrice,
		picUrl: txtPicUrl,
		htmlUrl: txtHtmlUrl,
		category: txtCategory,
		discountStatus: txtdiscountStatus,
		discount: txtdiscount,
		used: used
		
	});
	window.location = 'spjView.html?key=' + key;
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
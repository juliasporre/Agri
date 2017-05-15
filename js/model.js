//model.js

AgriApp.factory('model', function($resource){

	var _this = this;

	this.list = [{id: '1', name: "Cool Wood", area: "Dalarna", size: "100", img: "forest1.jpg", type:"Woods", subtype: "Oak", description: "Nice forest. Mostly consisting of fir (Planted 10 years ago).", price: "15000"},
	{id: '2',name: "Crop land for leasing", area: "Skåne", size: "20", img: "corps1.jpg", type:"Crops", subtype: "Wheat", description: "This land has been used for growing rapeseed the last 23 years. Now I'm retiering and I'm willing to lease my land for a good price.", price: "20000"}];

	this.database;
	this.username= "default";
	this.password = "default";
	this.recentCourses = ['DD1325','MD1454','DD4455'];
	this.favoriteCourses = [];
	this.name= "default";
	this.age= "default";
	this.studying= "default";
  	this.description= "default";
  	this.color = "#0099ff";

		this.first = true;
		this.noMatches = 0;

  	this.colorsToRandomFrom = ["#0099ff", "#00ffcc", "#cc99ff", "#ff66cc", "#ffff66", "#66ff66",
  	"#99ccff", "#ffcccc", "#ffb3cc", "#ffb84d", "#33ffcc", "#b3ff1a", "#8cd9b3"];

		this.savedSearch = [];
	// Initialize Firebase
	if(firebase.apps.length===0){
		console.log("init database");
		var config = {
		    apiKey: "AIzaSyDTtTEVNIbjTeGthtsq2nTk1aYTfotFBD4",
		    authDomain: "phoenix-eacb9.firebaseapp.com",
		    databaseURL: "https://phoenix-eacb9.firebaseio.com",
		    projectId: "phoenix-eacb9",
		    storageBucket: "phoenix-eacb9.appspot.com",
		    messagingSenderId: "451842193436"
		  };
		firebase.initializeApp(config);
		this.database = firebase.database();
	}

	this.getList = function(){
		var tmp = []
		for(var i = 0; i < this.list.length; i++ ){
			tmp.push(this.list[i]);
		}
		return tmp;
	}

	this.addToList = function(obj){
		this.list.push(obj);
		console.log(this.list);
	}

	this.addToSave = function(obj){
		this.savedSearch.push(obj);
	}


	this.checkSaved = function(){
		var match = [];
		for (var i = 0; i < this.savedSearch.length; i++){
			for (var j = 0; j < this.list.length; j++){
				if(this.savedSearch[i].area == this.list[j].area){

					if(this.savedSearch[i].type == this.list[j].type){

						if(this.savedSearch[i].subtype == this.list[j].subtype){

							if(parseInt(this.savedSearch[i].priceMin) <= parseInt(this.list[j].price)){

								if(parseInt(this.savedSearch[i].priceMax) >= parseInt(this.list[j].price)){

									if(parseInt(this.savedSearch[i].sizeMin) <= parseInt(this.list[j].size)){

										if(parseInt(this.savedSearch[i].sizeMax) >= parseInt(this.list[j].size)){

											match.push(this.list[j]);
										}
									}
								}
							}
						}
					}
				}
			}
		}
		console.log(match);

		return match;
	}



	this.getSchools = $resource('https://crossorigin.me/https://www.kth.se/api/kopps/v2/departments.sv.json',{},{
		get: {
			method: 'GET',
			isArray: true,
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return tmp;
			}
		}
	});

	this.getCourse = $resource('https://crossorigin.me/https://www.kth.se/api/kopps/v2/course/:query',{},{
		get: {
			method: 'GET',
			transformResponse: function(data){
				var tmp =  angular.fromJson(data);
				return {1:{
					code: tmp.code,
					name: tmp.title.en,
					url: tmp.href.en,
					level: tmp.level.en,
					info: tmp.info.sv}
				};
			}
		}
	});

	// Adds a course to recentCourses, also updates database
	this.addToRecent = function(course){
		var index = this.favoriteCourses.indexOf(course);
		if (index > -1) {
    	this.favoriteCourses.splice(index, 1);
		}
		if(this.recentCourses.length > 2){
			this.recentCourses.splice(0, 1);
		}
		this.recentCourses.push(course);


	}

	this.getRecentCourses = function(){
		return this.recentCourses;
	}

	// Adds a course to favorites, also updates database
	this.addToFavorite = function(course){
		window.hyper.log("addToFavorite "+course);
		var alreadyExists = false;
		for(var i=0;i<this.favoriteCourses.length;i++){
			if(course==this.favoriteCourses[i]){
				alreadyExists=true;
				break;
			}
		}
		if(alreadyExists==false){
			this.favoriteCourses.push(course);
		}
	}

	this.isFavoriteCourse = function(course){
		for(var i = 0; i < this.favoriteCourses.length; i++){
			if(this.favoriteCourses[i] == course){
				return true;
			}
		}
		return false;
	}

	this.removeFromFavorite = function(course){
		console.log("removeFromFavorite "+course);
		var index = this.favoriteCourses.indexOf(course);
		if (index > -1) {
    		this.favoriteCourses.splice(index, 1);
		}
	}

	this.getFavoriteCourses = function(){
		return this.favoriteCourses;
	}

	// When logging in it fetches all available data from database
	// and stores in model-attributes
	this.fetchData = function(userName){
		var ref = this.database.ref('users/'+userName);
		ref.once("value").then(function(snapshot){
	        if(snapshot.exists()){
	        	_this.username = snapshot.val().username;
				_this.password = snapshot.val().password;
				_this.name = snapshot.val().name;
				_this.age = snapshot.val().age;
				_this.studying = snapshot.val().studying;
		  		_this.description = snapshot.val().description;
		  		_this.color = snapshot.val().color;

			  	var list = [];
			  	//console.log("fetch favorites");
			  	snapshot.child("favorites").forEach(function(childsnapshot){
			  		//console.log(childsnapshot.key);
			  		list.push(childsnapshot.key);
			  	});
			  	this.favoriteCourses=list;
			  	//console.log(list);

			  	list = [];
			  	//console.log("fetch recent");
			  	snapshot.child("recent").forEach(function(childsnapshot){
			  		//console.log(childsnapshot.key);
			  		list.push(childsnapshot.key);
			  	});
			  	this.recentCourses=list;
	        	console.log("Data fetched from database");
	        }
	        else{
	            console.log("Somehow user does not exist, Error i guess :(");
	        }
	    });
	}

	this.setDatabase = function(){
		this.database = firebase.database();
	}

	this.getDatabase = function(){
		return this.database;
	}

	// creates a new user in database with empty attributes
	// that the uses fill in inside the app
	this.newAccount = function(userName, passWord){
		this.database.ref('users/'+userName).set({
		    username: userName,
		    password: passWord,
		    name: userName,
		    age:"",
		    description:"",
		    studying:"",
		    color:"#0099ff"
		});

		// startvalues for testing; SHOULD BE DELETED LATER
		alert('account sucessfully created');
	}


	this.getAge = function(){
		return this.age;
	}

	this.getUserFullName = function(){
		//Returns users name
		return this.name;
	}

	this.getUserName = function(){
		//Returns users name
		return this.username;
	}

	this.getStudying = function(){
		return this.studying;
	}

	this.getDescription = function(){
		return this.description;
	}

	this.getColor = function(){
		return this.color;
	}

	this.setFullName = function(name){
		this.name = name;
		this.database.ref('users/'+this.username+'/name').set(name);
		//this.setData();
	}

	this.setAge = function(age){
		this.age = age;
		this.database.ref('users/'+this.username+'/age').set(age);
		//this.setData();
	}

	this.setStudying = function(studying){
		this.studying = studying;
		this.database.ref('users/'+this.username+'/studying').set(studying);
		//this.setData();
	}

	this.setDescription = function(description){
		this.description = description;
		this.database.ref('users/'+this.username+'/description').set(description);
		//this.setData();
	}

	this.setColor = function(color){
		this.color = color;
		this.database.ref('users/'+this.username+'/color').set(color);
	}


	return this;
});

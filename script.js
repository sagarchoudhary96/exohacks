const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzS21pO6ZUhfWjhEHfgR8mzAG8OV1xAqzQP4SXU4jNn9rgtjqG-/exec"

var getCardController = function() {
	{
		//       	this.cards = [
		//		{
		//		 title: "Exotel on mobile",
		//		 color: "#173F5F",
		//		 link: ""
		//		},
		//		{
		//		 title: "Voice of future",
		//		 color: "#20639B",
		//		 link: ""
		//		},
		//		{
		//		 title: "Automation in Exotel",
		//		 color: "#3CAEA3",
		//		 link: "",
		//		},
		//		{
		//		 title: "Voice of future",
		//		 color: "#F6D55C",
		//		 link: ""
		//		},
		//		{
		//		 title: "Crystal ball of data",
		//		 color: "#ED553B",
		//		 link: ""
		//		},
		//		{
		//		 title: "Other",
		//		 color: "",
		//		 link: ""
		//		}
		//	];
	}

	this.templateCard = document.querySelector('#template-card');
	this.createNewTemplateCard = function() { return this.templateCard.content.cloneNode(true); }
	
	this.createCard = function(data) {
        var card = createNewTemplateCard();
        var title = document.createTextNode(data.title);
        card.querySelector('.card > .title').appendChild(title);
	    card.querySelector('.card').style.backgroundColor = data.color;
	    console.log(data)
	    card.querySelector('.card').href = data.link; 
	    card.querySelector('.card').addEventListener('click',function () {
	    	addScript(data.link);
	    });
	    return card;
	}
	
	this.appendCards = function(cards) {
		var wrapper = document.createElement("div");
		wrapper.id = 'wrapper';
		cards.map((data)=>{
			var card = createCard(data);
			wrapper.appendChild(card);
		});
		document.body.appendChild(wrapper);
	}

	return this;
}


var onSignIn = function(googleUser) {
	     var profile = googleUser.getBasicProfile();
	     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	     console.log('Name: ' + profile.getName());
	     console.log('Image URL: ' + profile.getImageUrl());
	     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
         }
function init() {
	  gapi.load('auth2', function() {
		      /* Ready. Make a call to gapi.auth2.init or some other API */
              GoogleAuth = gapi.auth2.getAuthInstance();
	      var cardController = getCardController(GoogleAuth);
	    //  cardController.appendCards();
	  });
}

function addScript( src ) {
	  var s = document.createElement( 'script' );
	  s.setAttribute( 'src', src );
	  s.setAttribute('type','application/javascript');
	  document.body.appendChild( s );
}


function respond(data){
 var cardController = getCardController()
 cardController.appendCards(data)
// addScript("")
}

const postIdea = (author, idea) => {
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", APP_SCRIPT_URL, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(`author=${author}&idea=${idea}`);
	xhttp.onreadystatechange = (e) => {
		if (e.target.readyState == 4) {
			console.log(e.target.status, JSON.parse(xhttp.responseText))
		}
	}
}
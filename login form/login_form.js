document.getElementsByClassName('register-form').addEventListener('submit',perform);

function perform(e){
	let name = document.getElementById('username').value();
	let email = document.getElementById('email').value();
	let password = document.getElementById('pwd').value();

	if(!validate(name,email,password)){
		return false;
	}

	document.getElementById('username').value() = "";
	document.getElementById('email').value() = "";
	document.getElementById('pwd').value() = "";
	e.preventDefault();
}
function validate(name,email,address){
	  if(!name || !email || !password){
	    alert("Please fill in the details.");
	    return false;
	  }
	  let expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  let regex = new RegExp(expression);
	  if(!email.match(regex)){
	    alert("Please fill in a valid email address.");
	    return false;
	  }
	  return true;
}



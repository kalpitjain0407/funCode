document.getElementById('myform').addEventListener('submit',saveBookmark);
let bookmark;
function saveBookmark(e){

	let siteName = document.getElementById('siteName').value;
	let siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	bookmark = {
		name : siteName,
		url : siteUrl
	}

	if(localStorage.getItem('bookmarks') === null){
		let bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	else{
		let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	document.getElementById('siteName').value = "";
	document.getElementById('siteUrl').value = '';
//document.getElementById('myform').reset();
	fetchBookmarks();
	e.preventDefault();

}

	function deleteBookmark(url){

		let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		for(let i=0;i<bookmarks.length;i++){
			if(bookmarks[i].url == url){
				bookmarks.splice(i,1);
			//	return true;
			}
		}

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		fetchBookmarks();
	}

	function fetchBookmarks(){

		let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		let bookmarksResults = document.getElementById('bookmarksResults');
		bookmarksResults.innerHTML = '';

		for(let i=0;i<bookmarks.length;i++){
			let name = bookmarks[i].name;
			let url = bookmarks[i].url;
			bookmarksResults.innerHTML += '<div class="well">'+
										  '<h3>'+name+
										  '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
										  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
										  '</h3>'+
										  '</div>';
		}
	}

	function validateForm(siteName, siteUrl){
		if(!siteName || !siteUrl){
			alert("Please fill in the details.");
			return false;
		}
		var expression = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
		var regex = new RegExp(expression);
		if(!siteUrl.match(regex)){
			alert("Please enter a valid url.");
			return false;
		}
		return true;
	}
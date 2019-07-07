// Listen for form submit
document.getElementById('myForm').addEventListener('submit' , saveBookmark);


// Save saveBookmark

function saveBookmark(e){
// get form values
 
var siteName = document.getElementById('siteName').value;

var siteUrl = document.getElementById('siteUrl').value;
if(!validateForm(siteName, siteUrl)){

    return false;

}

var bookmark = {
    name: siteName,
    url: siteUrl
}

// save bookmark in localStorage

// Test if bookmark is null

if(localStorage.getItem('bookmarks') === null){
    var bookmarks =[];

    // add to array
    bookmarks.push(bookmark);

    // set to local storage
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
else{
    // Get bookmarks localStorage
    var bookmarks=  JSON.parse(localStorage.getItem('bookmarks'));

    // add bookmark to the array

    bookmarks.push(bookmark);

    // reset it to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Clear Form
document.getElementById('myForm').reset();

fetchBookmarks();
   
//    Prevent form from submitting
    e.preventDefault();
}

// Delete bookmark here

function deleteBookmark(url){

    // Get bookmark form localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Loopthorugh bookmarks

    for(var i = 0; i< bookmarks.length ; i++){
        if(bookmarks[i].url == url){

        // remove form Array
        bookmarks.splice(i,1);
        }
    }
    // reset it to localStorage
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


   fetchBookmarks();
   
   
}

// Fetch bookmarks

function fetchBookmarks(){
//    get bookmarks form local storage

var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

// get output id
var bookmarkResult = document.getElementById('bookmarkResult');


// build output
bookmarkResult.innerHTML = '';
for(var i = 0 ; i< bookmarks.length ; i++){

    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarkResult.innerHTML += '<div class="card mb-2">' +
                                '<div class="card-body">'+
                                '<ul class="result-ul">' +
                                   '<li class="webiste-name">' +
                                   '<h6>Website Name:' +
                                   '<span>'
                                   +name+
                                  '</span>' +
                                   '</h6>' + 
                                   '</li>'+ 
                                   '<li class="webiste-visit">'+
                                     '<a class="btn btn-primary btn-sm"  target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                   '</li>'+
                                   '<li class="webiste-url">'+
                                       '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger btn-sm"  href="#">Delete</a> ' +
                                 '</li>'+
                                 '</ul>'+
                                '</div>'+
                                '</div>';

    console.log(name);                            

}

}

function validateForm(siteName , siteUrl){
    if(!siteName || !siteUrl){
        alert ('Please Fill the Form');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
      alert("Please Use Valid Url");
      return false;
    }
    
   return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }
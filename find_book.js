const btn = document.getElementsByClassName('btn')[0];
const input = document.getElementsByClassName('inp')[0];
const form = document.getElementsByClassName('form')[0];
const not_found_space = document.getElementsByClassName('not_found_space')[0];
const books_block = document.getElementById('book_block');
const apiBase = 'https://openlibrary.org';
const apiSearch = '/search.json?q=';
var endpoint = 'the+lord+of+the+rings';
var search_text_global;
input.focus();
StopLoading();
SendRequest();

btn.addEventListener('click', function() {
  Find();
});

form.addEventListener('keydown', function findListener(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    Find();
  }
});

function Find(){ // convert request text to right form like "the+lord+of+the+rings"
  var search_text = input.value;
  search_text_global = search_text;
  list = search_text.split(" ");
  search_str = list[0];
  list.slice(1, list.length).forEach(el => search_str = search_str + '+' + el)
  endpoint = search_str;
  books_block.innerHTML = "";
  SendRequest();
}

function SetNotFound(search_text){ // show not found with wrong request
  not_found_space.style.display = 'block';
  not_found_space.innerHTML = 'Not Found: \"' + search_text + "\"";
}

function SetFound(){ // hide block note found
  not_found_space.style.display = 'none';
}

function SendRequest() { // send request
  Loading();
  fetch(apiBase + apiSearch + endpoint)
  .then(response => response.json())
  .then(data => {
      if (data.docs.length == 0){
        StopLoading();
        SetNotFound(search_text_global);
      }
      else {
        StopLoading();
        SetFound();
        data.docs?.slice(0, data.docs.length >= 20 ? 20 : data.docs.length).forEach(element => {
          const bookDiv = document.createElement('div');
          st_html = `<h3>${element?.title}</h3>`;  
          st_html_2 = `<p>Author: ${element?.author_name?.[0]}</p>`;
          st_html_3 = `<p>Publisher: ${element?.publisher?.[0]}</p>`;  
          bookDiv.innerHTML = st_html + st_html_2 + st_html_3;
          books_block.appendChild(bookDiv);
          SetAnimation();
        })
      }
    })
  .catch(error => {
    console.log("I write error");
    console.log(error);
  });
}
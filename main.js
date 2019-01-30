// Renders an error message
function showError(msg) {
  const html = `<li><p class="error">${msg}</p></li>`;
  document.querySelector('#results').innerHTML = html;
}


//to render the search on press of enter key
    var input = document.getElementById("search-bar");
    input.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("search-btn").click();
      }
    });

// Searches for books and returns a promise that resolves a JSON list
    document.getElementById("search-btn").onclick = function(){
    document.getElementById("container-background").classList.add("container-background");
        
          var search= document.getElementById("search-bar").value;
          console.log(search);
          if(search == '')
            {
              alert("enter book name");
            }
          else{
            function searchForBooks() {
              // TODO
                return new Promise((resolve, reject) => {
                  let xmlHttp = new XMLHttpRequest();
                  const theUrl ="https://www.googleapis.com/books/v1/volumes?q=";
                  xmlHttp.open( "GET", theUrl + search, false );
                  xmlHttp.onload = () => {
                    if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
                         resolve(xmlHttp.responseText);
                      } else {
                         reject(xmlHttp.statusText);
                      }
                  };
                    xmlHttp.onerror = () => reject(xmlHttp.statusText);
                    xmlHttp.send();
                });
            };

// Generate HTML and sets #results's contents to it
              searchForBooks().
              then (data => {
                let array=JSON.parse(data);
                
                console.log(array);
                let out ="" ;

                for(i=0; i<array.items.length; i++)
                {
                  
                  out += '<div class="books-container">'+
                  '<h4 class="title">'+ array.items[i].volumeInfo.title + '</h5>' +
                  '<h5 class="subtitle">'+ array.items[i].volumeInfo.subtitle + '</h5>'+ 
                  '<p class="element">By</p>'+
                    '<h5 class="authors">'+ array.items[i].volumeInfo.authors + '</h5>'+
                    '<img class="book-img" id="dynamic" src='+array.items[i].volumeInfo.imageLinks.thumbnail+'><br><a href='+ array.items[i].volumeInfo.infoLink +'><div class="read-btn"><button id="read-more-button" class="btn">Read More</button></div></a>'+'</div>';
                    
                }
                document.getElementById("results").innerHTML = out;
              })
             
          .catch(error =>{
            console.log(error);
          });


              }
              
            }

           
            













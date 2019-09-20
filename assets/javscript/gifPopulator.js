// Initial array of characters
var characters = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {
  var gifSearch = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      //create new gifCard placeholder
      var gifCard = $('<div class="col-4 card">');
      //create new gifImage placeholder and set sttribute src to the correct url
      var gifImg = $('<img class="card-img-top img-fluid">');
      gifImg.attr("src", results[i].images.fixed_width.url);
      //create new gifCardBody for the main text area
      var gifCardBody = $('<div class="card-body text-center">');
      //create new gifCardTitle for the gif title
      var gifCardTitle = $('<h5 class="card-title">' + results[i].title + '</h5>');
      //create rating variable for gifs and assign them to a new div card-text
      var rating = results[i].rating;
      var gifCardText = $('<div class="card-text">').text("Rating: " + rating);
      //appends gifCardTitle and gifCardText to gifCardBody
      gifCardBody.append(gifCardTitle);
      gifCardBody.append(gifCardText);
      //append gifImg and gifCardBody to gifCard
      gifCard.append(gifImg);
      gifCard.append(gifCardBody);
      //append gifCard to the row
      $("#divGifs").prepend(gifCard);
    }
  });
}

// Function for displaying movie data
function renderButtons() {

  $("#divButtons").empty();
  // Loops through the array of characters
  for (var i = 0; i < characters.length; i++) {

    var a = $('<button class="btn btn-primary">');
    // Provided the initial button text
    a.text(characters[i]);
    // Added the button to the divButtons div
    $("#divButtons").append(a);
  }
}

// This function handles events where the add movie button is clicked
$("#btnCharacterAdd").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var movie = $("#tbCharacter").val().trim();

  // The movie from the textbox is then added to our array
  characters.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document.body).on("click", ".btn-primary", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
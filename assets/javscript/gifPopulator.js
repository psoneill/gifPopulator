// Initial array of characters
var characters = ["Bobby Hill", "Jerry Smith", "Carlton Banks", "Jesse Pinkman", "Zoidberg", "Ron Swanson", "Ash Ketchum", "Uncle Jesse", "The Dude", "Randy Marsh",
  "Spike Spiegel", "Jay and Silent Bob"];

function displayMovieInfo() {
  var gifSearch = $(this).text();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var results = response.data;

    for (var i = results.length-1; i >= 0; i--) {
      //create new gifCard placeholder
      var gifCard = $('<div class="col-lg-3 col-sm-5 card">');
      //create new gifImage placeholder and set sttribute src to the correct url
      var gifImg = $('<img class="card-img-top img-fluid">');
      gifImg.attr("imgGIF", results[i].images.fixed_width.url);
      gifImg.attr("imgStill", results[i].images.fixed_width_still.url);
      gifImg.attr("src", gifImg.attr("imgStill"));
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

$("#btnCharacterAdd").on("click", function (event) {
  event.preventDefault();
  var character = $("#tbCharacter").val().trim();
  characters.push(character);

  $("#tbCharacter").val("");
  renderButtons();
});

function imgClick() {
  if ($(this).attr("src") == $(this).attr("imgStill")) {
    $(this).attr("src", $(this).attr("imgGIF"));
  } else {
    $(this).attr("src", $(this).attr("imgStill"));
  }
};

$(document.body).on("click", ".btn-primary", displayMovieInfo);

$(document.body).on("click", "img", imgClick);

renderButtons();
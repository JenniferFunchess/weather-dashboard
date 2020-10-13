$(document).ready(function () {
  console.log("ready!");

  var APIKey = "c4fae5edaad45a9b13c98adafcd08019";
  var chosenCity = $("#city-search").val();
  console.log(chosenCity);

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});

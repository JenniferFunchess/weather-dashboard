$(document).ready(function () {
  console.log("ready!");

  var APIKey = "c4fae5edaad45a9b13c98adafcd08019";
  var chosenCity = $("#city-search").val();
  console.log(chosenCity);

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + APIKey;
  
    function renderList() {
        $("#city-search").empty();
          var a = $("<ul>");
          a.addClass("list");
          a.attr("data-name", chosenCity);
          a.text(chosenCity);
          $("#city-search").append(a);
        }
  
    $("#citySubmit").on("click", function (event) {
        renderList();
        
    $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var currentTempF = (response.main.temp - 273.15) * 1.8 + 32;



    $("#cityChosen").text(response.name + currentdate);
    $("#tempChosen").text(currentTempF.toFixed(2));
    $("#humidityChosen").text("Humidity: " + response.main.humidity);
    $("#windChosen").text("Wind Speed: " + response.wind.speed);
    $("#uvChosen").text("UV Index: " + );

  });}


});

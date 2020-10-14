$(document).ready(function () {
  console.log("ready!");

  var APIKey = "c4fae5edaad45a9b13c98adafcd08019";
  var chosenCity = $("#citySearch").val().trim();

  function renderList() {
    $("#citySearch").empty();
    var a = $("<ul>");
    a.addClass("list");
    a.attr("data-name", chosenCity);
    a.text(chosenCity);
    $("#citySearch").append(a);
  }

  $("#citySubmit").on("click", function (event) {
    event.preventDefault();

    var chosenCity = $("#citySearch").val().trim();
    console.log(chosenCity);
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      chosenCity +
      "&units=imperial&appid=" +
      APIKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var today = new Date();
      console.log(new Date());
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      console.log(date);

      $("#cityChosen").text(response.name + "(" + date + ")");
      $("#tempChosen").text("Temperature: " + response.main.temp + "°F");
      $("#humidityChosen").text("Humidity: " + response.main.humidity + "%");
      $("#windChosen").text("Wind Speed: " + response.wind.speed + " MPH");
      $("#uvChosen").text("UV Index: ");
    });
  });
});

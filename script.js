$(document).ready(function () {
  console.log("ready!");
  $("#popUp").hide();

  var APIKey = "c4fae5edaad45a9b13c98adafcd08019";
  var chosenCity = $("#citySearch").val().trim();

  function renderList() {
    $("#citySearch").empty();
    var a = $("<ul>");
    a.addClass("list");
    a.attr("data-name", chosenCity);
    a.text(chosenCity);
    $("#pastList").append(a);
  }

  function cityContainer() {
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
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();
      console.log(date);

      $("#cityChosen").text(response.name + "(" + date + ")");
      $("#tempChosen").text("Temperature: " + response.main.temp + "°F");
      $("#humidityChosen").text("Humidity: " + response.main.humidity + "%");
      $("#windChosen").text("Wind Speed: " + response.wind.speed + " MPH");
      $("#uvChosen").text("UV Index: ");
    });
  }

  function futureForecast() {
    var chosenCity = $("#citySearch").val().trim();
    console.log(chosenCity + "2");
    var queryURL2 =
      "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +
      chosenCity +
      "&units=imperial&cnt=5&appid=" +
      APIKey;

    $.ajax({
      url: queryURL2,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $("#date1").text(response.list[0].dt_txt);
      $("#date2").text(response.list[1].dt_txt);
      $("#date3").text(response.list[2].dt_txt);
      $("#date4").text(response.list[3].dt_txt);
      $("#date5").text(response.list[4].dt_txt);

      $("#temp1").text("Temp: " + response.list[0].main.temp + "°F");
      $("#temp2").text("Temp: " + response.list[1].main.temp + "°F");
      $("#temp3").text("Temp: " + response.list[2].main.temp + "°F");
      $("#temp4").text("Temp: " + response.list[3].main.temp + "°F");
      $("#temp5").text("Temp: " + response.list[4].main.temp + "°F");

      $("#humidity1").text("Humidity: " + response.list[4].main.temp + "%");
      $("#humidity2").text("Humidity: " + response.list[4].main.temp + "%");
      $("#humidity3").text("Humidity: " + response.list[4].main.temp + "%");
      $("#humidity4").text("Humidity: " + response.list[4].main.temp + "%");
      $("#humidity5").text("Humidity: " + response.list[4].main.temp + "%");
    });
  }

  function uvIndex() {
    var chosenCity = $("#citySearch").val().trim();
    console.log(chosenCity + "3");
    var queryURL3 =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=" +
      APIKey;

    $.ajax({
      url: queryURL3,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  }

  $("#citySubmit").on("click", function (event) {
    event.preventDefault();
    $("#popUp").show();
    cityContainer();
    futureForecast();
    renderList();
  });
});

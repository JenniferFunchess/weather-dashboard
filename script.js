$(document).ready(function () {
  console.log("ready!");
  $("#popUp").hide();

  var APIKey = "c4fae5edaad45a9b13c98adafcd08019";
  var chosenCity = $("#citySearch").val().trim();

  function renderList() {
    $("#citySearch").empty();

    for (var i = 0; i < chosenCity.length; i++) {
      var a = $("<ul>");
      a.addClass("list");
      a.attr("data-name", chosenCity);
      a.text(chosenCity);
      $("#pastList").append(a);
      console.log(pastList);
    }
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

      var long = response.coord.lon;
      var lat = response.coord.lat;
      console.log("lat&long" + lat, long);
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

        if (response.value <= 2) {
          $("#uvChosen").attr("style", "background-color: green");
          $("#uvChosen").css("color", "white");
          $("#uvChosen").text("UV Index: " + response.value);
        } else if (response.value >= 2 && response.value <= 5) {
          $("#uvChosen").attr("style", "background-color: yellow");
          $("#uvChosen").css("color", "white");
          $("#uvChosen").text("UV Index: " + response.value);
        } else if (response.value >= 6 && response.value <= 7) {
          $("#uvChosen").attr("style", "background-color: orange");
          $("#uvChosen").css("color", "white");
          $("#uvChosen").text("UV Index: " + response.value);
        } else if (response.value >= 8 && response.value <= 10) {
          $("#uvChosen").attr("style", "background-color: red");
          $("#uvChosen").css("color", "white");
          $("#uvChosen").text("UV Index: " + response.value);
        } else {
          $("#uvChosen").attr("style", "background-color: purple");
          $("#uvChosen").css("color", "white");
          $("#uvChosen").text("UV Index: " + response.value);
        }
      });

      var queryURL2 =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        chosenCity +
        "&cnt=5&units=imperial&appid=" +
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

        $("#humidity1").text("Humidity: " + response.daily[0].humidity + "%");
        $("#humidity2").text("Humidity: " + response.daily[1].humidity + "%");
        $("#humidity3").text("Humidity: " + response.daily[2].humidity + "%");
        $("#humidity4").text("Humidity: " + response.daily[3].humidity + "%");
        $("#humidity5").text("Humidity: " + response.daily[4].humidity + "%");
      });
    });
  }

  $("#citySubmit").on("click", function (event) {
    event.preventDefault();
    $("#popUp").show();
    cityContainer();
    renderList();
  });
});

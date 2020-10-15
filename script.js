$(document).ready(function () {
  console.log("ready!");
  $("#popUp").hide();
  $("#pastList").hide();

  var APIKey = "c4fae5edaad45a9b13c98adafcd08019";
  var chosenCity = $("#citySearch").val().trim();

  //   This section saves the chosen city to a button below the search bar
  function renderList() {
    $("#citySearch").empty();
    var chosenCity = $("#citySearch").val().trim();
    var a = $("<button>");
    // a.addClass("city-btn");
    a.attr("data-name", chosenCity);
    a.text(chosenCity + "<br>");
    $("#pastList").append(a);
    localStorage.setItem(chosenCity);
  }

  $("#pastList").val(localStorage.getItem(chosenCity));

  //   This section calls in the chosen city and places info on the page
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
        "&units=imperial&appid=" +
        APIKey;

      $.ajax({
        url: queryURL2,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        $("#date1").text(response.list[5].dt_txt);
        $("#date2").text(response.list[13].dt_txt);
        $("#date3").text(response.list[21].dt_txt);
        $("#date4").text(response.list[29].dt_txt);
        $("#date5").text(response.list[37].dt_txt);

        $("#temp1").text("Temp: " + response.list[5].main.temp + "°F");
        $("#temp2").text("Temp: " + response.list[13].main.temp + "°F");
        $("#temp3").text("Temp: " + response.list[21].main.temp + "°F");
        $("#temp4").text("Temp: " + response.list[29].main.temp + "°F");
        $("#temp5").text("Temp: " + response.list[37].main.temp + "°F");

        $("#humidity1").text(
          "Humidity: " + response.list[5].main.humidity + "%"
        );
        $("#humidity2").text(
          "Humidity: " + response.list[13].main.humidity + "%"
        );
        $("#humidity3").text(
          "Humidity: " + response.list[21].main.humidity + "%"
        );
        $("#humidity4").text(
          "Humidity: " + response.list[29].main.humidity + "%"
        );
        $("#humidity5").text(
          "Humidity: " + response.list[37].main.humidity + "%"
        );
      });
    });
  }

  //   This section is for the submit button response
  $("#citySubmit").on("click", function (event) {
    event.preventDefault();
    $("#popUp").show();
    $("#pastList").show();
    cityContainer();
    renderList();
  });
});

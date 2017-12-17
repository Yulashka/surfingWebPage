/*Carousel*/
var app = angular.module("myApp", ["ngRoute"]);
app.controller('carCtrl', function($scope, $http) {
  $http.get("carouselData.json").then(mySuccess, myError);

  //when json data is successfully loaded use it to build the page
  function mySuccess(response){
    console.log("Success: " + response.status);
    $scope.content = response.data;
    var images = makeContent(response.data, "Image"); //new Array(response.data[0].Image);
    var titles = makeContent(response.data, "Title");
    var ratings = makeContent(response.data, "Rating");
    var prices = makeContent(response.data, "Price");
    var description = makeContent(response.data, "Description");
    var features = makeContent(response.data, "Features");
    var dimensions = makeContent(response.data, "Dimensions");
    var stars = makeContent(response.data, "Stars");
    var thumbnails = makeContent(response.data, "Thumbnails");
    makeThumbnails(thumbnails);
    var contentDto = new ContentDTO(images, titles, ratings, prices, description, features, dimensions, stars, thumbnails);
    makeCarousel(contentDto);
  }

  //creating an object for surf-carousel for the further use
  function ContentDTO(images, titles, ratings, prices, description, features, dimensions, stars) {
    this.images= images;
    this.titles=titles;
    this.ratings=ratings; 
    this.prices=prices; 
    this.description= description;
    this.features= features; 
    this.dimensions = dimensions; 
    this.stars =stars;
  }


  //translate number to ratings stars
  //takes a number and shows that many stars rating to the client
  // @param num - number to translate 
  function translateRating(num) {
    $(".star-rate").removeClass("dark-yellow");
    var starArray = $(".star-rate");
    for(var i = 0; i < num; i++) {
      $(starArray[i]).addClass("dark-yellow");
    }
  }

  //message on error
  function myError(response) {
    console.log("Error: " + response);
  }
  
  //make content
  function makeContent(someJson, property) {
    var arr = [];
    for(var i = 0; i < someJson.length; i++) {
      arr.push(someJson[i][property]);
    }
    return arr;
  }

  //make the thumbnails images
  function makeThumbnails(pics) {
    var stuf = $(".thumbnails img");
    for(var x = 0; x < pics.length; x++) {
      $(stuf[x]).attr("src", pics[x][x] );
    }
  }

  /**
   * Adds two numbers
   * @param {Number} a 
   * @param {Number} b
   * @return {Number} sum
   */
  function addContent(content, current) {
    $(".main-img").attr('src', "img/" + content.images[current]);
    $("#surf-web #carousel-surf h3").text(content.titles[current]);
    $("#surf-web .rating .num").text(content.ratings[current]);
    $("#surf-web .price").text(content.prices[current]);
    $("#surf-web #text1").text(content.description[current]);
    $("#surf-web #text2").text(content.features[current]);
    $("#surf-web #text3").text(content.dimensions[current]);
    translateRating(content.stars[current]);
  }

  //make a carousel
  function makeCarousel(content){
    var length = content.images.length - 1;
    var current = 0;
    addContent(content, current);
    //display conent when you click on right arrow
    $("#carousel-surf .fa-long-arrow-right").on("click", function() {
      current = current + 1;
      addContent(content, current);

      if( current > length){
        current = 0;
        addContent(content, current);
      } 
    });
    //display conent when you click on left arrow
    $("#carousel-surf .fa-long-arrow-left").on("click", function() {
      if( current == 0 ){
        current = length;
        addContent(content, current);
      } else {
        current = current - 1;
        addContent(content, current);
      }
    });

    //when window is less 650 px collapse the navigation
    $(window).resize(function() {
        if($(window).width() < 650){
        $(".collapse").addClass("d-none");
        $(".collapsed").removeClass("d-none");
      }else {
        $(".collapse").removeClass("d-none");
        $(".collapsed").addClass("d-none");
      }
    });
    //tabs
    var text = $(".surf-tab-text p");
    $(".surf-tab a").on('click', function() {
      $(".surf-tab a").removeClass('tab-active');
      $(".surf-tab-text p").addClass('d-none');

      for(var i = 0; i < text.length; i++){
        if( $(this).attr('data-href') == ( "#" + $(text[i]).attr('id')) ) {
          $(this).addClass('tab-active');
          $(text[i]).removeClass("d-none");
        }
      }
    });
  }

  //creating an object for team carousel
  function TeamCarouselContent(teamImages, teamTitles, teamNickname, teamLocation) {
    this.teamImages = teamImages;
    this.teamTitles = teamTitles;
    this.teamNickname = teamNickname; 
    this.teamLocation = teamLocation; 
  }

  /*carousel for team members*/
  $http.get("teamData.json").then(mySuccess2, myError2);

  //when json data is successfully loaded use it to build the page
  function mySuccess2(response){
    console.log("Success: " + response.status);
    $scope.content = response.data;
    var objs = response.data;
    var teamImages = makeContent(response.data, "Image"); //new Array(response.data[0].Image);
    var teamTitles = makeContent(response.data, "Title");
    var teamNickname = makeContent(response.data, "Nickname");
    var teamLocation = makeContent(response.data, "Location");
    //console.log(teamImages);
    var teamCarouselContent = new TeamCarouselContent(teamImages, teamTitles, teamNickname, teamLocation);
    //console.log(teamCarouselContent);
    makeTeamCarousel(teamCarouselContent);
    makeTeamCarouselMobile(teamCarouselContent);
  }

  //create team carousel content
  function addTeamContent(obj, current, max) {
    var imgs = $(".team-card .team-pic");
    var titles = $(".team-card h4");
    var nicknames = $(".team-card .nickname");
    var locations = $(".team-card .location");

    for(var i = 0; i < max; i++) {
      $(imgs[i]).attr("src", obj.teamImages[current]);
      $(titles[i]).text(obj.teamTitles[current]);
      $(nicknames[i]).text(obj.teamNickname[current]);
      $(locations[i]).text(obj.teamLocation[current]);
      current++;
    }
  }

  //make carousel
  function makeTeamCarousel(obj) {
    var current = 0;
    var max = 4;
    addTeamContent(obj, current, max);

    //click right
    $(".team .fa-arrow-right").on("click", function() {
      current = 4;
      max = 8;
      addTeamContent(obj, current, max);
    });

    //click left
    $(".team .fa-arrow-left").on("click", function() {
      current = 0;
      max = 4;
      addTeamContent(obj, current, max);
    });
  }

  /*mobile carousel*/
  function addTeamContentMobile(obj, current, max) {
    var imgs = $("#surf-web .team .carousel-mobile .team-card .team-pic");
    var titles = $("#surf-web .team .carousel-mobile .team-card h4");
    var nicknames = $("#surf-web .team .carousel-mobile .team-card .nickname");
    var locations = $("#surf-web .team .carousel-mobile .team-card .location");

    for(var i = 0; i < max; i++) {
      $(imgs[i]).attr("src", obj.teamImages[current]);
      $(titles[i]).text(obj.teamTitles[current]);
      $(nicknames[i]).text(obj.teamNickname[current]);
      $(locations[i]).text(obj.teamLocation[current]);
      current++;
    }
  }
  
  function makeTeamCarouselMobile(obj) {
    var max = 7;
    var current = 0;
    addTeamContentMobile(obj, current, max);
    //click right arrow -> display new content
    $("#surf-web .team .carousel-mobile .fa-arrow-right").on("click", function() {
      current = current + 1;
      addTeamContentMobile(obj, current, max);
      if( current > max){
        current = 0;
        addTeamContentMobile(obj, current, max);
      } 
    });
    //click left arrow -> display new content
    $("#surf-web .team .carousel-mobile .fa-arrow-left").on("click", function() {
      if( current == 0 ){
        current = max;
        addTeamContentMobile(obj, current, max);
      } else {
        current = current - 1;
        addTeamContentMobile(obj, current, max);
      }
    });
  }

  //error message
  function myError2(response) {
    console.log("Error: " + response);
  }

  //navigation dropdown toggle
  $("#iconBar-surf").unbind().click(function() {
    $("#surf-web .dropdown").toggle();
  });

  //on resize hide/show collapsed nav
  $(window).resize(function() {
      if($(window).width() < 650){
      $("#surf-web .collapse").addClass("display-none");
      $("#surf-web .collapsed").removeClass("display-none");
      $("#surf-web nav").addClass("display-none");
    }else {
      $("#surf-web .collapse ").removeClass("display-none");
      $("#surf-web .collapsed").addClass("display-none");
      $("#surf-web nav").removeClass("display-none");
    }
  });
});

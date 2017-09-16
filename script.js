$(document).ready(function(){

  $.get("http://playlistapi.surge.sh/playlistAPI", function(data){

    let randomArr = [];

    do {
      randomArr[0] = Math.floor(Math.random() * 10);
      randomArr[1] = Math.floor(Math.random() * 10);
      randomArr[2] = Math.floor(Math.random() * 10);
    } while ((randomArr[0] === randomArr[1]) || (randomArr[0] === randomArr[2]) || (randomArr[1] === randomArr[2]));

    for (let i = 0; i < 3; i++) {
      let coverDIV = document.createElement("div");
      $(coverDIV).css("backgroundImage", `url(./myAPIimages/${data.results[randomArr[i]].cover_art})`);
      $(coverDIV).addClass("cover-art z-depth-5 hoverable");
      $(".second-half").append(coverDIV);
    }
  })
})

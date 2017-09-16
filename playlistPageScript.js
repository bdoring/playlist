$(document).ready(function(){
  let myData = {};
  $('select').material_select();

  $.get("http://playlistapi.surge.sh/playlistAPI", function(data){
    //loads and adds the album covers to the DOM
    for (let i = 0; i < data.results.length; i++) {
      let coverDIV = document.createElement("div");
      $(coverDIV).css("backgroundImage", `url(./myAPIimages/${data.results[i].cover_art})`);
      $(coverDIV).addClass("cover-art-small z-depth-5 hoverable");
      $(".album-display").append(coverDIV);

      //adds the album info to the lower half of the page
      $(coverDIV).click(() => {
        $(".add-tracks").empty();
        $(".track-list").empty();
        let myAlbumCover = document.createElement("div");
        $(myAlbumCover).css("backgroundImage", `url(./myAPIimages/${data.results[i].cover_art}`);
        $(myAlbumCover).addClass("cover-art z-depth-5");
        $(".add-tracks").append(`
          <h5>Add tracks from:</h5>
          <p>${data.results[i].artist}: ${data.results[i].title}</p>
          `, myAlbumCover);
        //loads the album tracks to the page
        for (let j = 0; j < data.results[i].songs.length; j++) {
          $(".track-list").append(
            `<p>
              <input type="checkbox" id= "${j}" />
              <label for="${j}">${data.results[i].songs[j].title} ${data.results[i].songs[j].length}</label>
            </p>`);
          //adds selected tracks to the bin that will be submitted -
          $($("label")[j]).click(() => {

            let id = `${data.results[i].id}${j}`; //assigns an id to each track being added to the bin

            //if the track has already been added, it gets removed
            if ($($("label")[j]).attr("class") === "clicked") {
              $($("label")[j]).attr("class", "unclicked");
              $("p").remove(`#${id}`);
              delete myData[id];
            } else {
                $("p").remove(`#${id}`);
                $($("label")[j]).attr("class", "clicked");
                $(".selected-tracks").append(`<p id="${id}">${$($("label")[j]).html()}</p>`);
                myData[id] = $($("label")[j]).html();
              }
            })
        }
      })
    }
  });

  function clearTracks() {
    $(".add-tracks").empty();
    $(".add-tracks").append(`
      <h5>Add tracks from:</h5>
      <p>Choose an album</p>
      `);
    $(".track-list").empty();
    $(".selected-tracks").empty();
  }

  $("#clear").click(() => {
    clearTracks();
  })

  $("#submit").click(() => {
    $.post("https://lit-fortress-6467.herokuapp.com/post", myData, function(response, status){
      console.log("Response: ", response, "Status: ", status);
    })
    clearTracks();
  })

});

$.get('./data/videos.JSON', function(d) {
  
  d.videos.forEach(function(b) {
      $("js-row").append(`<div class="row videos js-videos">`)
    for(let i = 0; i < 5; i++){

      

    }

    // $(".col-videos").append(`<div><h2>${b.id}</h2><p>${b.url}</p></div>`);

    $(".col-videos").append(`
      <div class="col_1">
                <div class="video js-video drag-drop">
                ${b.id}
                  <span class="remove js-remove">
                    <svg class="delete"
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 34.56 34.56"
                    ><path
                              id="Icon_map-circle"
                              data-name="Icon map-circle"
                              d="M35.28,18A17.28,17.28,0,1,1,18,.72,17.28,17.28,0,0,1,35.28,18Z"
                              transform="translate(-0.72 -0.72)"
                      /><svg
                          class="delete-cross"
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 48 48"
                  ><path
                              id="Icon_metro-cross"
                              data-name="Icon metro-cross"
                              d="M33.138,26.711h0l-9.358-9.358,9.358-9.358h0a.966.966,0,0,0,0-1.363L28.717,2.21a.967.967,0,0,0-1.363,0h0L18,11.568,8.637,2.21h0a.966.966,0,0,0-1.363,0L2.852,6.631a.966.966,0,0,0,0,1.363h0l9.358,9.358L2.852,26.711h0a.966.966,0,0,0,0,1.363l4.421,4.421a.966.966,0,0,0,1.363,0h0L18,23.136l9.358,9.358h0a.966.966,0,0,0,1.363,0l4.421-4.421a.966.966,0,0,0,0-1.363Z"
                              transform="translate(15 15)"
                              fill="#fff"
                      />
                    </svg>
                    </svg>
                  </span>
                </div>
              </div>
      
      `);



  });
});
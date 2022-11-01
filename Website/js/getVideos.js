let assignment;

document.addEventListener("DOMContentLoaded", async function () {
  const url = new URL(window.location.href);
  const assignmentId = url.searchParams.get("id") || 1;

  const assignmentRequest = await fetch("./data/opdrachten.JSON");
  const assignmentJson = await assignmentRequest.json();

  assignment = assignmentJson.opdrachten.find((e) => e.id == assignmentId);

  if (!assignment) {
    return;
  }

  console.log(assignment);

  const mediaLibraryRequest = await fetch("./data/videos.JSON");
  const mediaLibraryJson = await mediaLibraryRequest.json();

  const videos = mediaLibraryJson.videos.filter(function(e) {
    //Bepaal of deze video in de lijst van te tonen videos zit
    return assignment.listOfVideos.some(function(videoId) {
      return videoId == e.id; 
    });
  });

  placeVideos(videos);

  //document.dispatchEvent(new CustomEvent("Custom-VideosLoaded"));
  afterVideosLoaded();
});

function placeVideos(videos) {
  let shuffledVideoList = shuffle(videos);

  let k = 0;

  for (let i = 0; i < shuffledVideoList.length; i++) {
    let currentVideo = shuffledVideoList[i];

    const videoBlock = document
      .getElementById("video-block")
      .content.cloneNode(true);
    videoBlock.querySelector(".js-video").dataset["videoId"] = currentVideo.id;
    videoBlock.querySelector(".js-video-source").src = currentVideo.url;
    videoBlock.querySelector(".js-title").innerHTML = `Videos
    ${currentVideo.id}
    ${currentVideo.name}
    ${currentVideo.url}
    ${currentVideo.category}
    ${currentVideo.tone}`;

    // let videoCodeBlock = `
    //   <div class="col">
    //   <div class="video js-video drag-drop" onclick="openVideo()" data-video-id="${currentVideo.id}">
    //     Videos
    //     ${currentVideo.id}
    //     ${currentVideo.name}
    //     ${currentVideo.url}
    //     ${currentVideo.category}
    //     ${currentVideo.tone}
    //     <span class="remove js-remove">
    //       <svg class="delete"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="25"
    //             height="25"
    //             viewBox="0 0 34.56 34.56"
    //       ><path
    //                 id="Icon_map-circle"
    //                 data-name="Icon map-circle"
    //                 d="M35.28,18A17.28,17.28,0,1,1,18,.72,17.28,17.28,0,0,1,35.28,18Z"
    //                 transform="translate(-0.72 -0.72)"
    //         /><svg
    //             class="delete-cross"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="25"
    //             height="25"
    //             viewBox="0 0 48 48"
    //     ><path
    //                 id="Icon_metro-cross"
    //                 data-name="Icon metro-cross"
    //                 d="M33.138,26.711h0l-9.358-9.358,9.358-9.358h0a.966.966,0,0,0,0-1.363L28.717,2.21a.967.967,0,0,0-1.363,0h0L18,11.568,8.637,2.21h0a.966.966,0,0,0-1.363,0L2.852,6.631a.966.966,0,0,0,0,1.363h0l9.358,9.358L2.852,26.711h0a.966.966,0,0,0,0,1.363l4.421,4.421a.966.966,0,0,0,1.363,0h0L18,23.136l9.358,9.358h0a.966.966,0,0,0,1.363,0l4.421-4.421a.966.966,0,0,0,0-1.363Z"
    //                 transform="translate(15 15)"
    //                 fill="#fff"
    //         />
    //       </svg>
    //       </svg>
    //     </span>
    //   </div>
    //   </div>
    // `;

    if (i % 5 === 0) {
      k++;

      let videos = document.querySelector(".js-videos");

      let row = document.createElement("div");
      row.classList.add("row", "videos", "js-row" + k);
      //row.innerHTML = videoCodeBlock;
      row.appendChild(videoBlock);

      videos.appendChild(row);
    } else {
      //document.querySelector(".js-row" + k).innerHTML += videoCodeBlock;
      document.querySelector(".js-row" + k).appendChild(videoBlock);
    }
  }
}

//Source: https://stackoverflow.com/a/3718452 // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffle(sourceArray) {
  for (var i = 0; i < sourceArray.length - 1; i++) {
    var j = i + Math.floor(Math.random() * (sourceArray.length - i));

    var temp = sourceArray[j];
    sourceArray[j] = sourceArray[i];
    sourceArray[i] = temp;
  }
  return sourceArray;
}

function openVideo() {
  console.log("open " + videoCodeBlock);
}

function closeVideo() {
  var video = document.getElementById(shuffledVideoList.id);
  video.style.display = "none";
}

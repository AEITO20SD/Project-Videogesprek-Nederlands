let assignment;

document.addEventListener("DOMContentLoaded", async function () {
  const url = new URL(window.location.href);
  const assignmentId = url.searchParams.get("id") || 1;

  const assignmentRequest = await fetch("./data/opdrachten.JSON");
  const assignmentJson = await assignmentRequest.json();

  assignment = assignmentJson.opdrachten.find((e) => e.id == assignmentId);

  if (!assignment) {
    //TODO: nette error afhandeling maken
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

    //hierin kan je relevante data meegeven. denk aan bijvoorbeeld de locatie van een video
    const videoBlock = document
      .getElementById("video-block")
      .content.cloneNode(true);
      
    videoBlock.querySelector(".js-video").dataset["videoId"] = currentVideo.id;
    videoBlock.querySelector(".js-video-source").src = currentVideo.url;
    // videoBlock.querySelector(".js-title").innerHTML = `Videos
    // ${currentVideo.id}
    // ${currentVideo.name}
    // ${currentVideo.url}
    // ${currentVideo.category}
    // ${currentVideo.tone}`;

    // vul de rij met videos todat er 5 in staan, maakt daarna een nieuwe rij aan
    if (i % 5 === 0) {
      k++;

      let videos = document.querySelector(".js-videos");

      let row = document.createElement("div");
      row.classList.add("row", "videos", "js-row-" + k);
      //row.innerHTML = videoCodeBlock;
      row.appendChild(videoBlock);

      videos.appendChild(row);
    } else {
      //document.querySelector(".js-row" + k).innerHTML += videoCodeBlock;
      document.querySelector(".js-row-" + k).appendChild(videoBlock);
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

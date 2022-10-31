    function allowDrop(ev)
    {
        ev.preventDefault();
    }

    function drag(ev)
    {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev)
    {
        //ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        disableVideos(data);
    }

    function disableVideos(video)
    {
        draggedVideo = document.getElementById(video);
        draggedVideo.classList.add("dragged");
    }

    function shuffle(array)
    {
        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0)
        {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    //Geen window.onload omdat de video's dan eerder worden gemaakt dan de div's met de id's
    function randomVideos()
    {
        var videoList = new Array('1.1.mp4', '1.2.mp4', '1.3.mp4', '2.1.mp4', '2.2.mp4', '2.3.mp4', '3.1.mp4', '3.2.mp4', '3.3.mp4', 
                        '4.1.mp4', '4.2.mp4', '4.3.mp4', '5.1.mp4', '5.2.mp4', '5.3.mp4');
        //Mogelijk de list een array maken -> new Array('1.1.mp4', '1.2.mp4')
        //list.sort(function (a, b) { return 0.5 - MathRandom()});

        //var videoIndex = getRandomInt(videoList.length);

        shuffle(videoList);
        
        for (var i = 1; i <= 3; i++)
        {
            for (var j = 1; i <= 5; i++)
            {
                // const newDiv = document.createElement("div");
                // const newVideo = document.createElement("video");
                // newDiv.appendChild(newVideo);
                // const currentDiv = document.getElementById("yes-drop");
                // document.body.insertBefore(newDiv, currentDiv);

                // var id = "video" + i;
                // var element = document.getElementById(id);
                // var video = videoList[Math.floor(Math.random() * videoList.length)];
                // element.classList.add(video);

                // var placedVideo = [];
                // placedVideo += video;
                // placedVideo.forEach((video_) => {
                     
                // });
            }
        }
    }

    randomVideos();
    //document.getElementById('yes-drop').innerHTML = video; -> set content
    //Mogelijk gebruik maken van appendChild()
    //2 loops maken, 1 die video's neerzet en 1 die controleerd of hij er al in staat (met bijv een list die de bestaande toevoegd)
    //Foreach() verwijst naar een andere methode
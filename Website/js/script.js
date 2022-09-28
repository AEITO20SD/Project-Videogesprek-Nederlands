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
        console.log("test");
        draggedVideo.classList.add("dragged");
    }

    function randomVideos()
    {
        var videoList = ['1.1.mp4', '1.2.mp4', '1.3.mp4', '2.1.mp4', '2.2.mp4', '2.3.mp4', '3.1.mp4', '3.2.mp4', '3.3.mp4', 
                        '4.1.mp4', '4.2.mp4', '4.3.mp4', '5.1.mp4', '5.2.mp4', '5.3.mp4'];
        //Mogelijk de list een array maken -> new Array('1.1.mp4', '1.2.mp4')
        //list.sort(function (a, b) { return 0.5 - MathRandom()});
        var videoIndex = Math.floor(Math.random() * videoList.length); 

        for (var i = 0; i < 3; i++ )
        {
            for (var j = 0; i < 5; i++)
            {
                const newDiv = document.createElement("div");
                const newVideo = document.createElement("video");
                newDiv.appendChild(newVideo);
                const currentDiv = document.getElementById("yes-drop");
                document.body.insertBefore(newDiv, currentDiv);
            }
        }
    }

    //document.getElementById('yes-drop').innerHTML = video; -> set content
    //Mogelijk gebruik maken van appendChild()

randomVideos();
    
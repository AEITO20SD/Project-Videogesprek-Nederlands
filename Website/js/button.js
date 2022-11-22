function openQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "block";
}

function closeQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "none";
}

function openCheckBox() {
    var e = document.getElementById("openCheckBox");
    e.style.display = "block";
}

function closeCheckBox() {
    var e = document.getElementById("openCheckBox");
    e.style.display = "none";
}

function checkInput2(){
    let dropzones = document.querySelectorAll('.js-dropzone');
    let score = 0;
    let answers = [];

    //check if every dropzone is filled
    for(let i = 0; i < dropzones.length; i++){
        if(dropzones[i].childNodes.length == 1){
            score++
        }else{

        }
    }

    //if every dropzone is filled
    if(score == dropzones.length){
        for(let i = 0; i < dropzones.length; i++) {
            //set draggable to false
            dropzones[i].querySelector(".js-video").setAttribute("draggable", false);
            //get video id
            let videoId = dropzones[i].querySelector(".js-video").dataset["videoId"];
            //add video id to array
            answers[i] = videoId;
        }
        console.log(answers);
        checkanswers(answers);
    }else{

    }
}

function checkanswers(userinput) {
    console.log("checkanswers function fired");

    // Create and Send the request
    var fetch_status;
    fetch('/', {
        method: "POST",
        // Set the headers
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // Set the post data
        body: JSON.stringify({
            answers : userinput
        })
    })
    .then(function (response) {
        // Save the response status in a variable to use later.
        fetch_status = response.status;
        // Handle success
        // eg. Convert the response to JSON and return
        console.log(response);
        console.log(fetch_status);
        return response.json();

    }) 
    .then(function (json) {
        // Check if the response were success
        if (fetch_status == 200) {
            // Use the converted JSON
            console.log(json);
        }
    })
    .catch(function (error){
        // Catch errors
        console.log(error);
    }); 
}

function checkInput() {
    let dropzones = document.querySelectorAll('.js-dropzone');
    let success = true;
    let score = 0;

    for(let i = 0; i < dropzones.length; i++){
        let dropzone = dropzones[i];

        setErrorFor(dropzone);
        if(dropzone.childNodes.length == 1){
            setNeutralFor(dropzone);
            score++;
        }
    }

    if (score == dropzones.length) {
        for(let i = 0; i < dropzones.length; i++) {
            let video = dropzones[i];
            let innerVideo = video.querySelector(".js-video");
            innerVideo.setAttribute("draggable", false);

            if(innerVideo) {
                let videoId = video.querySelector(".js-video").dataset["videoId"];

                if(assignment.correctAnswer[i] == videoId) {
                    //Video is correct
                    setSuccessFor(video);
                }
                else {
                    //Video is niet correct
                    setWrongFor(video);  
                    
                    success = false;
                }
            }
        }
    }

    // if(success) {
    //     setTimeout(function() {
    //         window.location.href = "?id=2";
    //     }, 5000);
    // }
    
    closeCheckBox();
    return success;
}

function setErrorFor(boxControl) {
    boxControl.style.borderColor = "#ff2d4a";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "block";
    small.style.color = "#ff2d4a";
    const span = boxControl.parentElement.querySelector('#checkboxSpan');
    span.style.display = "none";
    const crossboxSpan = boxControl.parentElement.querySelector('.crossboxSpan');
    crossboxSpan.style.display = "none";
}

function setNeutralFor(boxControl) {
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "none";
}

function setWrongFor(boxControl) {
    boxControl.style.borderColor = "#c44848";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "none";
    const span = boxControl.parentElement.querySelector('.crossboxSpan');
    span.style.display = "block";
    const cross = boxControl.parentElement.querySelector('.remove');
    cross.style.display = "none";
}

function setSuccessFor(boxControl) {
    boxControl.style.borderColor = "#7ac142";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "none";
    const span = boxControl.parentElement.querySelector('#checkboxSpan');
    span.style.display = "block";
    const crossboxSpan = boxControl.parentElement.querySelector('.crossboxSpan');
    crossboxSpan.style.display = "none";
    const cross = boxControl.parentElement.querySelector('.remove');
    cross.style.display = "none";
}
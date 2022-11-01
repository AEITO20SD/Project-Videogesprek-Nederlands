function openQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "block";
}

function closeQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "none";
}

function checkInput() {
    let videos = document.querySelectorAll('.js-dropzone');
    let success = true;

    for(let i = 0; i < videos.length; i++) {
        let video = videos[i];
        let innerVideo = video.querySelector(".js-video");

        if(innerVideo) {
            let videoId = video.querySelector(".js-video").dataset["videoId"];

            if(assignment.correctAnswer[i] == videoId) {
                //Video is correct
                setSuccessFor(video);
            }
            else {
                //Video is niet correct
                setErrorFor(video);  
                
                success = false;
            }
        }
        else {
            //Video is niet geselecteerd
            setErrorFor(video);

            success = false;
        }
    }

    // if(success) {
    //     setTimeout(function() {
    //         window.location.href = "?id=4";
    //     }, 5000);
    // }
    
    return success;
}

function setErrorFor(boxControl) {
    boxControl.style.borderColor = "#ff2d4a";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "block";
    small.style.color = "#ff2d4a";
    const span = boxControl.parentElement.querySelector('#checkboxSpan');
    span.style.display = "none";
}

function setSuccessFor(boxControl) {
    boxControl.style.borderColor = "#7ac142";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "none";
    const span = boxControl.parentElement.querySelector('#checkboxSpan');
    span.style.display = "block";
}
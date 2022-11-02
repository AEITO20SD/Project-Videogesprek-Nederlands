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

function checkInput() {
    let videosInDropzone = document.querySelectorAll('.js-dropzone');
    let success = true;

    //check if all dropzones are filled with a video, if so, make modal visible

    for(let i = 0; i < videosInDropzone.length; i++) {
        let video = videosInDropzone[i];
        let innerVideo = video.querySelector(".js-video");

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
        else {
            //Video is niet geselecteerd
            setErrorFor(video);

            success = false;
        }
    }

    if(success) {
        setTimeout(function() {
            window.location.href = "?id=2";
        }, 5000);
    }
    
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

function setWrongFor(boxControl) {
    boxControl.style.borderColor = "#c44848";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "none";
    const span = boxControl.parentElement.querySelector('.crossboxSpan');
    span.style.display = "block";
}

function setSuccessFor(boxControl) {
    boxControl.style.borderColor = "#7ac142";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "none";
    const span = boxControl.parentElement.querySelector('#checkboxSpan');
    span.style.display = "block";
    const crossboxSpan = boxControl.parentElement.querySelector('.crossboxSpan');
    crossboxSpan.style.display = "none";
}
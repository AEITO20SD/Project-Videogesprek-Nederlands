function openQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "block";
} 

function closeQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "none";
} 

function checkInput() {
    var video = document.getElementsByClassName("dropzone");
    // const videoBox = document.querySelector('.js-dropzone');
    var success = true;

    // for(var video in videos){
    //     if (video.childNodes.length <= 0) {
    //         success = false;
    //         setErrorFor(video);
    //     } else {
    //         setSuccessFor(video);
    //     }
    //     return success;
    // }   

    for(var x = 0; x < video.length; x++){
        if (video.childNodes.length <= 0) {
            success = false;
            setErrorFor(video);
        } else {
            setSuccessFor(video);
        }
        return success;
    }   

    // if (videoBox.childNodes.length <= 0) {
    //     success = false;
    //     setErrorFor(videoBox)
    // } else {
    //     setSuccessFor(videoBox)
    // }
}

function setErrorFor() {
    // const boxControl = document.querySelector('.js-dropzone');
    var boxControl = document.getElementsByClassName("dropzone");
    boxControl.style.borderColor = "#ff2d4a";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "block";
    small.style.color = "#ff2d4a";
    const span = document.getElementById('checkboxSpan');
    span.style.display = "none";
}

function setSuccessFor() {
    // const boxControl = document.querySelector('.js-dropzone');
    var boxControl = document.getElementsByClassName("dropzone");
    boxControl.style.borderColor = "white";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "none";
    const span = document.getElementById('checkboxSpan');
    span.style.display = "block";
}
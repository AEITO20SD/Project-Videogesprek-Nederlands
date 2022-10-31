function openQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "block";
} 

function closeQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "none";
} 

function checkInput() {
    var videos = document.querySelectorAll('.js-dropzone');
    var success = true;

    for(var i = 0; i < videos.length; i++) {
        var video = videos[i];

        setErrorFor(video);
        if (video.childNodes.length > 0) {
            setSuccessFor(video)
        }
    }
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
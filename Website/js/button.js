function openQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "block";
} 

function closeQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "none";
} 

function checkInput() {
    // var videos = document.querySelectorAll('.js-dropzone');
    const videoBox = document.querySelector('.js-dropzone');
    const videoBoxTwo = document.querySelector('#dropzone-1');
    const videoBoxThree = document.querySelector('#dropzone-2');
    const videoBoxFour = document.querySelector('#dropzone-3');
    const videoBoxFive = document.querySelector('#dropzone-4');
    var success = true;

    // for(var video in videos){
    //     if (videos.childNodes.length <= 0) {
    //         success = false;
    //         setErrorFor(video);
    //     } else {
    //         setSuccessFor(video);
    //     }
    //     return success;
    // }   

    // for(var i = 0; i < child.length; i++){
    //     if (child.length <= 0) {
    //         success = false;
    //         setErrorFor(videos);
    //     } else {
    //         setSuccessFor(videos);
    //     }
    //     return success;
    // }   

    if (videoBox.childNodes.length <= 0) {
        success = false;
        setErrorFor(videoBox)
    } else {
        setSuccessFor(videoBox)
    }

    if (videoBoxTwo.childNodes.length <= 0) {
        success = false;
        setErrorFor(videoBoxTwo)
    } else {
        setSuccessFor(videoBoxTwo)
    }

    if (videoBoxThree.childNodes.length <= 0) {
        success = false;
        setErrorFor(videoBoxThree)
    } else {
        setSuccessFor(videoBoxThree)
    }

    if (videoBoxFour.childNodes.length <= 0) {
        success = false;
        setErrorFor(videoBoxFour)
    } else {
        setSuccessFor(videoBoxFour)
    }

    if (videoBoxFive.childNodes.length <= 0) {
        success = false;
        setErrorFor(videoBoxFive)
    } else {
        setSuccessFor(videoBoxFive)
    }
}

function setErrorFor(boxControl) {
    boxControl.style.borderColor = "#ff2d4a";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "block";
    small.style.color = "#ff2d4a";
    const span = document.getElementById('checkboxSpan');
    span.style.display = "none";
}

function setSuccessFor(boxControl) {
    boxControl.style.borderColor = "white";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "none";
    const span = document.getElementById('checkboxSpan');
    span.style.display = "block";
}
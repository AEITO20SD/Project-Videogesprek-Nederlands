function openQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "block";
} 

function closeQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "none";
} 

function checkInput() {
    var x = document.getElementsByClassName("dropzone");
    const videoBox = document.querySelector('.js-dropzone');
    var success = true;

    if (videoBox.childNodes.length <= 0) {
        success = false;
        setErrorFor(videoBox)
    } else {
        setSuccessFor(videoBox)
    }


    return success;
    // Als er geen child div in de js-dropzone zit pas setError toe, als child div aanwezig is pas setSucces toe
    // for each box without child element give setError 
}

function setErrorFor() {
    const boxControl = document.querySelector('.js-dropzone');
    // const boxControl = document.getElementsByClassName("dropzone");
    boxControl.style.borderColor = "#ff2d4a";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "block";
    small.style.color = "#ff2d4a";
    const span = document.getElementById('checkboxSpan');
    span.style.display = "none";
}

function setSuccessFor() {
    const boxControl = document.querySelector('.js-dropzone');
    // const boxControl = document.getElementsByClassName("dropzone");
    boxControl.style.borderColor = "white";
    const small = boxControl.parentElement.querySelector('small');
    small.style.display = "none";
    const span = document.getElementById('checkboxSpan');
    span.style.display = "block";
}
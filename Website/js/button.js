function openQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "block";
} 

function closeQuestion() {
    var e = document.getElementById("questionBox");
    e.style.display = "none";
} 

function checkInput() {
    const videoboxValue = $('#videoBox').val();
    var success = true;

    if(videoboxValue === '') {
        success = false;
        setErrorFor("videoBox");
    } else {
        setSuccesFor("videoBox");
    }
    return success;
}

function setErrorFor() {
    const boxControl = document.getElementsByClassName('dropzone-2');
    const border = boxControl.parentElement.querySelector('dropzone-2');
    border.style.borderColor = "#ff2d4a";
}

function setSuccesFor() {
    const boxControl = document.getElementsByClassName('dropzone');
    const border = boxControl.parentElement.querySelector('dropzone');
    border.style.borderColor = "white";
}
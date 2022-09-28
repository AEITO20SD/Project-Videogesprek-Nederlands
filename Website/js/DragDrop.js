document.addEventListener("DOMContentLoaded", function () {
  let id = 0;

  this.body.addEventListener("dragend", dragend_handler);

  document.querySelectorAll(".js-dropzones .js-dropzone").forEach((n) => {
    n.id = `dropzone-${id++}`;

    n.addEventListener("drop", drop_handler);
    n.addEventListener("dragover", dragover_handler);
  });

  document.querySelectorAll(".js-videos .js-video").forEach((n) => {
    n.id = `video-${id++}`;

    n.parentElement.id = `parent-${n.id}`;

    n.draggable = true;
    n.addEventListener("dragstart", dragstart_handler);

    n.querySelector(".js-remove").addEventListener("click", function () {
      sendVideoBackToOriginalLocation(n);
    });
  });
});

let draggedElement = undefined;

function dragstart_handler(ev) {
  draggedElement = this;
}

function dragover_handler(ev) {
  const existingElement = this.querySelector(".js-video");

  if (existingElement && existingElement != ev.srcElement) {
    return;
  }

  //Allow the drop
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function drop_handler(ev) {
  ev.preventDefault();

  if (ev.target.classList.contains("js-dropzone")) {
    ev.target.appendChild(draggedElement);
  }
}

function dragend_handler(ev) {
  if (ev.dataTransfer.dropEffect == "none") {
    sendVideoBackToOriginalLocation(draggedElement);
  }

  draggedElement = undefined;
}

function sendVideoBackToOriginalLocation(video) {
  const targetId = `parent-${video.id}`;
  const target = document.getElementById(targetId);
  target.appendChild(video);
}

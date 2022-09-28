// function dragMoveListener (event) {
//     var target = event.target
//     // keep the dragged position in the data-x/data-y attributes
//     var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
//     var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

//     // translate the element
//     target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

//     // update the posiion attributes
//     target.setAttribute('data-x', x)
//     target.setAttribute('data-y', y)
//   }

//     /* The dragging code for '.draggable' from the demo above
//    * applies to this demo as well so it doesn't have to be repeated. */

//   // enable draggables to be dropped into this
//   interact('.dropzone').dropzone({
//     // only accept elements matching this CSS selector
//     accept: '#yes-drop',
//     // Require a 75% element overlap for a drop to be possible
//     overlap: 0.75,

//     // listen for drop related events:

//     ondropactivate: function (event) {
//       // add active dropzone feedback
//       event.target.classList.add('drop-active')
//     },
//     ondragenter: function (event) {
//       var draggableElement = event.relatedTarget
//       var dropzoneElement = event.target

//       // feedback the possibility of a drop
//       dropzoneElement.classList.add('drop-target')
//       draggableElement.classList.add('can-drop')
//       draggableElement.textContent = 'Dragged in'
//     },
//     ondragleave: function (event) {
//       // remove the drop feedback style
//       event.target.classList.remove('drop-target')
//       event.relatedTarget.classList.remove('can-drop')
//       event.relatedTarget.textContent = 'Dragged out'
//     },
//     ondrop: function (event) {
//       event.relatedTarget.textContent = 'Dropped'
//     },
//     ondropdeactivate: function (event) {
//       // remove active dropzone feedback
//       event.target.classList.remove('drop-active')
//       event.target.classList.remove('drop-target')
//     }
//   })

//   interact('.drag-drop')
//     .draggable({
//       inertia: true,
//       modifiers: [
//         interact.modifiers.restrictRect({
//           restriction: '.AllowedDropZone',
//           elementRect: { top: 0, left: 0, bottom: 1, right: 1},
//           endOnly: true
//         })
//       ],
//       autoScroll: true,
//       // dragMoveListener from the dragging demo above
//       listeners: { move: dragMoveListener }
//     })

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

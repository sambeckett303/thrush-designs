var bg = document.getElementById('fullImagePreviewBg');

function closeFullScreen() {
    bg.classList.remove('active');
    var placeholderDiv = document.getElementById('fullImagePreview');
    placeholderDiv.innerHTML = '';
};

function openFullScreen(e) {
    bg.classList.add('active');
    var placeholderDiv = document.getElementById('fullImagePreview');
    const clonedImg = e.target.cloneNode(true);
    placeholderDiv.appendChild(clonedImg);
    const closeButton = document.createElement("button");
    closeButton.className = "close";
    closeButton.addEventListener("click", function() {
        closeFullScreen();
    });
    placeholderDiv.appendChild(closeButton);
}

const workImages = document.querySelectorAll(".work-image");
workImages.forEach(function(workImage) {
  workImage.addEventListener("click", function(e) {
    openFullScreen(e);
  });
});
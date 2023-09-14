const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadLink = document.getElementById('downloadLink');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                let squareSize = Math.min(img.width, img.height);

                canvas.width = squareSize;
                canvas.height = squareSize;

                let offsetX = img.width > squareSize ? (img.width - squareSize) / 2 : 0;
                let offsetY = img.height > squareSize ? (img.height - squareSize) / 2 : 0;

                ctx.drawImage(img, offsetX, offsetY, squareSize, squareSize, 0, 0, squareSize, squareSize);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

function resizeImage() {
    const imgWidth = parseInt(widthInput.value) || canvas.width;
    const imgHeight = parseInt(heightInput.value) || canvas.height;

    const img = new Image();
    img.onload = function() {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
        });
    }
    img.src = canvas.toDataURL();
}
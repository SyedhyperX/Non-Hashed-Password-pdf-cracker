document.addEventListener('DOMContentLoaded', () => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var W = window.innerWidth;
    var H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;

    var fontSize = 16;
    var columns = Math.floor(W / fontSize);
    var drops = [];
    for (var i = 0; i < columns; i++) {
        drops.push(0);
    }
    var str = "JavaScript Hacking Effect";

    function drawMatrix() {
        context.fillStyle = "rgba(0,0,0,0.05)";
        context.fillRect(0, 0, W, H);
        context.font = "700 " + fontSize + "px Courier";
        context.fillStyle = "#00cc33";
        for (var i = 0; i < columns; i++) {
            var index = Math.floor(Math.random() * str.length);
            var x = i * fontSize;
            var y = drops[i] * fontSize;
            context.fillText(str[index], x, y);
            if (y >= canvas.height && Math.random() > 0.99) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    drawMatrix();
    setInterval(drawMatrix, 35);

    var dropArea = document.querySelector('.drop-area');
    var uploadBtn = document.querySelector('.upload-btn');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    dropArea.addEventListener('drop', handleDrop, false);
    uploadBtn.addEventListener('click', () => {
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'application/pdf';
        fileInput.onchange = (e) => {
            handleFiles(fileInput.files);
        };
        fileInput.click();
    });

    function handleDrop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;

        handleFiles(files);
    }

    function handleFiles(files) {
        files = [...files];
        files.forEach(uploadFile);
    }

    function uploadFile(file) {
        var formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.password) {
                alert("Password found: " + data.password);
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });

        var fileItem = document.createElement('div');
        fileItem.classList.add('file-item');

        var fileName = document.createElement('div');
        fileName.classList.add('file-name');
        fileName.textContent = file.name;

        var fileSize = document.createElement('div');
        fileSize.classList.add('file-size');
        fileSize.textContent = (file.size / 1024).toFixed(2) + ' KB';

        fileItem.appendChild(fileName);
        fileItem.appendChild(fileSize);

        document.getElementById('file-list').appendChild(fileItem);
    }
});
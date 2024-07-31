let frontStream = null;
let backStream = null;

document.getElementById('start-front-camera').addEventListener('click', () => {
    startCamera('front');
});

document.getElementById('stop-front-camera').addEventListener('click', () => {
    stopCamera('front');
});

document.getElementById('start-back-camera').addEventListener('click', () => {
    startCamera('back');
});

document.getElementById('stop-back-camera').addEventListener('click', () => {
    stopCamera('back');
});

async function startCamera(type) {
    const constraints = {
        front: { video: { facingMode: "user" } },
        back: { video: { facingMode: "environment" } }
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints[type]);
        const videoElement = document.getElementById(`${type}-camera`);

        videoElement.srcObject = stream;
        videoElement.style.display = 'block';

        if (type === 'front') {
            frontStream = stream;
        } else {
            backStream = stream;
        }
    } catch (error) {
        console.error(`Error accessing ${type} camera: `, error);
        alert(`カメラのアクセスに失敗しました: ${error.message}`);
    }
}


function stopCamera(type) {
    const videoElement = document.getElementById(`${type}-camera`);
    const stream = type === 'front' ? frontStream : backStream;

    if (stream) {
        // Capture the current frame
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imgDataUrl = canvas.toDataURL('image/png');

        // Replace the video element with an image element
        const imgElement = document.createElement('img');
        imgElement.src = imgDataUrl;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        videoElement.replaceWith(imgElement);
        imgElement.id = `${type}-camera`;

        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());

        if (type === 'front') {
            frontStream = null;
        } else {
            backStream = null;
        }
    }
}

window.addEventListener('load', () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("Your browser does not support getUserMedia API");
        alert("このブラウザはカメラアクセスをサポートしていません。");
    }
});

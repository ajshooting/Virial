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
        front: {
            video: {
                facingMode: "user"
            }
        },
        back: {
            video: {
                facingMode: "environment"
            }
        }
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints[type]);
        let videoElement = document.getElementById(`${type}-camera`);

        // Replace the image element with a new video element if it exists
        if (videoElement.tagName === 'IMG') {
            const newVideoElement = document.createElement('video');
            newVideoElement.id = `${type}-camera`;
            newVideoElement.autoplay = true;
            newVideoElement.playsInline = true;
            newVideoElement.style.width = '100%';
            newVideoElement.style.height = '100%';
            videoElement.replaceWith(newVideoElement);
            videoElement = newVideoElement;
        }

        videoElement.srcObject = stream;

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
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());

        // Ensure the video element is ready before drawing the frame
        requestAnimationFrame(() => {
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth || 640; // Fallback width
            canvas.height = videoElement.videoHeight || 480; // Fallback height
            const context = canvas.getContext('2d');
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const imgDataUrl = canvas.toDataURL('image/png');
            console.log(`Captured image URL: ${imgDataUrl}`); // Debug log

            // Replace the video element with an image element
            const imgElement = document.createElement('img');
            imgElement.onload = () => {
                videoElement.replaceWith(imgElement);
            };
            imgElement.onerror = () => {
                console.error('Failed to load the captured image');
            };
            imgElement.src = imgDataUrl;
            imgElement.style.width = '100%';
            imgElement.style.height = '100%';

            if (type === 'front') {
                frontStream = null;
            } else {
                backStream = null;
            }
        });
    }
}

window.addEventListener('load', () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("Your browser does not support getUserMedia API");
        alert("このブラウザはカメラアクセスをサポートしていません。");
    }
});

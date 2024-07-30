document.getElementById('start-cameras').addEventListener('click', () => {
    setupCameras();
});

async function setupCameras() {
    const constraints = {
        video: true,
        audio: false
    };

    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        const frontCamera = videoDevices.find(device => device.label.toLowerCase().includes('front'));
        const backCamera = videoDevices.find(device => device.label.toLowerCase().includes('back') || device.label.toLowerCase().includes('environment'));

        if (!frontCamera || !backCamera) {
            console.error("Both front and back cameras are not available.");
            alert("前面および背面のカメラの両方が利用できません。");
            return;
        }

        const frontStream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: frontCamera.deviceId }
        });

        const backStream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: backCamera.deviceId }
        });

        const frontCameraVideo = document.getElementById('front-camera');
        const backCameraVideo = document.getElementById('back-camera');

        frontCameraVideo.srcObject = frontStream;
        backCameraVideo.srcObject = backStream;
    } catch (error) {
        console.error("Error accessing cameras: ", error);
        alert(`カメラのアクセスに失敗しました: ${error.message}`);
    }
}

window.addEventListener('load', () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("Your browser does not support getUserMedia API");
        alert("このブラウザはカメラアクセスをサポートしていません。");
    }
});

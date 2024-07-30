document.getElementById('start-camera').addEventListener('click', () => {
    setupCameras();
});

async function setupCameras() {
    const constraintsBackCamera = {
        video: {
            facingMode: { exact: "environment" } // 外カメラ
        }
    };

    const constraintsFrontCamera = {
        video: {
            facingMode: "user" // 内カメラ
        }
    };

    try {
        const backStream = await navigator.mediaDevices.getUserMedia(constraintsBackCamera);
        const frontStream = await navigator.mediaDevices.getUserMedia(constraintsFrontCamera);

        const backCameraVideo = document.getElementById('back-camera');
        const frontCameraVideo = document.getElementById('front-camera');

        backCameraVideo.srcObject = backStream;
        frontCameraVideo.srcObject = frontStream;
    } catch (error) {
        console.error("Error accessing camera: ", error);
    }
}

document.getElementById('start-front-camera').addEventListener('click', () => {
    setupCamera('front');
});

document.getElementById('start-back-camera').addEventListener('click', () => {
    setupCamera('back');
});

async function setupCamera(type) {
    const constraints = {
        front: {
            video: {
                facingMode: "user" // 内カメラ
            }
        },
        back: {
            video: {
                facingMode: "environment" // 外カメラ
            }
        }
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints[type]);
        const videoElement = document.getElementById(`${type}-camera`);
        videoElement.srcObject = stream;
    } catch (error) {
        console.error(`Error accessing ${type} camera: `, error);
        alert(`カメラのアクセスに失敗しました: ${error.message}`);
    }
}

window.addEventListener('load', () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("Your browser does not support getUserMedia API");
        alert("このブラウザはカメラアクセスをサポートしていません。");
    }
});

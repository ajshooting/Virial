// Service Workerの登録
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
            console.log('Service Worker registration failed:', error);
        });
}

document.getElementById('notifySet').addEventListener('click', () => {
    // 通知の許可をリクエスト
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            }
        });
    } else {
        alert('This browser does not support notifications.');
    }
});

document.getElementById('notifyButton').addEventListener('click', () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        setTimeout(() => {
            if (Notification.permission === 'granted') {
                navigator.serviceWorker.getRegistration().then(registration => {
                    registration.showNotification('⚠️Virialの時間です⚠️', {
                        body: '2分以内にVirial定理を証明しないと他の友達の証明を見ることができません！',
                        icon: 'virial-192.png',
                        sound: ''
                    });
                });
            }
        }, 5000);
    } else {
        alert('このブラウザでは通知がサポートされていません。');
    }
});
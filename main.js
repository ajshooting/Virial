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

var title = '⚠️Virialの時間です⚠️'
var payload = {
    body: '2分以内にVirial定理を証明しないと他の友達の証明を見ることができません！',
    icon: 'virial-192.png',
    sound: '',
}

document.getElementById('notifyButton').addEventListener('click', () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        setTimeout(() => {
            if (Notification.permission === 'granted') {
                navigator.serviceWorker.getRegistration().then(registration => {
                    registration.showNotification(title, payload);
                });
            }
        }, 0);
    } else {
        alert('このブラウザでは通知がサポートされていません。');
    }
});

document.getElementById('notifyButton_2').addEventListener('click', () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        setTimeout(() => {
            if (Notification.permission === 'granted') {
                navigator.serviceWorker.getRegistration().then(registration => {
                    registration.showNotification(title, payload);
                });
            }
        }, 5000);
    } else {
        alert('このブラウザでは通知がサポートされていません。');
    }
});

document.getElementById('notifyButton_3').addEventListener('click', () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        if (Notification.permission === 'granted') {
            for (let i = 0; i < 100; i++) {
                navigator.serviceWorker.getRegistration().then(registration => {
                    registration.showNotification(title, payload);
                });
            }
        }
    } else {
        alert('このブラウザでは通知がサポートされていません。');
    }
});
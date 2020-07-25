// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        registerServiceWorker();
        requestNotificationPermission();
    })
} else {
    console.log("ServiceWorker is not yet supported by this browser.")
}

// Function for register service worker
function registerServiceWorker() {
    return navigator.serviceWorker.register('../service-worker.js')
        .then(function () {
            console.log('ServiceWorker registration successful');
        })
        .catch(function () {
            console.log('ServiceWorker registration failed');
        });
}

// Request permission to use the Notification API
function requestNotificationPermission() {
    // Check the Notification API feature
    if ("Notification" in window) {
        console.log("Browser support notification.");
    } else {
        console.error("Browser does not support notification.");
        return;
    }

    Notification.requestPermission().then(function (result) {
        if (result === "denied") {
            console.log("Notification feature not permitted.");
            return;
        } else if (result === "default") {
            console.error("User closes the permission request dialog box");
            return;
        }

        console.log("Notification feature allowed.");

        // Subscribe to push messages via the PushManager object
        if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(function (registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BNyb8SYHYTaRBXDpKvqb8GrYpMkOcT5XyFdivoWIjTrcrhqaCAI2lyOMILxKTiEPDDV93jH65pGPSmQLELXBMXM")
                }).then(function (subscribe) {
                    console.log('Successfully subscribed with endpoint: ', subscribe.endpoint);
                    console.log('Successfully subscribed with p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Successfully subscribed with auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(function (e) {
                    console.error('Unable to subscribe, ', e.message);
                });
            });
        }
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('../service-worker.js')
            .then(function () {
                console.log('ServiceWorker registration successful');
            })
            .catch(function () {
                console.log('ServiceWorker registration failed');
            });
    })
} else {
    console.log("ServiceWorker is not yet supported by this browser.")
}

document.addEventListener('DOMContentLoaded', function() {

    console.log('Map functionality would be initialized here');
    

    document.querySelectorAll('[data-feather]').forEach(icon => {
        const iconName = icon.getAttribute('data-feather');
        icon.setAttribute('aria-label', iconName.replace('-', ' '));
    });
});


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });

}

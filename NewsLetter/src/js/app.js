export class App {

    registerWorker = () => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', (evt) => {
                try {
                    navigator.serviceWorker.register('/sw.js')
                        .then((reg) => {
                            console.log('Service Worker registered');
                        });

                } catch (e) {
                    console.log('Registering the Service Worker failed');
                    throw (e);
                }
            });
        }
    }
}
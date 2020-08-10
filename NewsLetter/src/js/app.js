import Controller from './Controller.js';

class App {
    constructor() {
        this.registerWorker();
    }

    registerWorker = () => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", evt => {
                try {
                    navigator.serviceWorker.register("/sw.js").then(reg => {
                        console.log("Service Worker registered");
                    });
                } catch (e) {
                    console.log("Registering the Service Worker failed");
                    throw e;
                }
            });
        }

    };

    controller = new Controller();
}

let app = new App();
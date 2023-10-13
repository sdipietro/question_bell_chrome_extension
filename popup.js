document.getElementById('activate').addEventListener('click', () => {
    console.log('Activated');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: activateBellSound
        });
    });
});

function activateBellSound() {
    const audioElement = document.createElement('audio');
    audioElement.src = 'https://sdipietro.github.io/audio_host/assets/445058__matrixxx__ping-ping.wav';
    audioElement.id = 'pingSound';

    function playPingSound() {
        const pingSound = document.getElementById("pingSound");
        if (pingSound) {
            pingSound.play();
        }
    }

    const documentObserver = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            const table = document.querySelector("tbody");
            if (table) {
                documentObserver.disconnect();

                const rowObserver = new MutationObserver(function (mutationsList) {
                    for (const mutation of mutationsList) {
                    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                        playPingSound();
                    }
                    }
                });

                rowObserver.observe(table, { childList: true });
            }
        }
        }
    });
    
    const existingAudio = document.getElementById("pingSound");
    if (!existingAudio) {
        document.head.appendChild(audioElement);
        documentObserver.observe(document.body, { childList: true, subtree: true });
    };
}

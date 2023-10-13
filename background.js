function activateContentScript(tabId, tabUrl) {
    if (tabUrl.startsWith("https://sis.appacademy.tools/cohorts/")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: () => {
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
        });
    }
}

chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.frameId === 0) {
    chrome.tabs.get(details.tabId, function (tab) {
      activateContentScript(details.tabId, tab.url);
    });
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  if (details.frameId === 0) {
    chrome.tabs.get(details.tabId, function (tab) {
      activateContentScript(details.tabId, tab.url);
    });
  }
});

function addBellAndObserver() {
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

                const bellIdentifier = document.createElement('img');
                bellIdentifier.id = 'bellIdentifier';
                bellIdentifier.alt = 'Bell Icon';
                bellIdentifier.width = 36;
                bellIdentifier.height = 36;
                bellIdentifier.src = 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/notification-bell-32.png';
                if (!document.getElementById('bellIdentifier')) {
                  document.getElementsByClassName("mb-10")[0].getElementsByTagName('section')[0].appendChild(bellIdentifier);
                }
                
                if (!table.__mutationObserver) {
                  const questionTableObserver = new MutationObserver(function (mutationsList) {
                      for (const mutation of mutationsList) {
                      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                          playPingSound();
                      }
                      }
                  });

                  questionTableObserver.observe(table, { childList: true });
                  table.__mutationObserver = questionTableObserver;
                }
            }
        }
        }
    });
    
    const existingAudio = document.getElementById("pingSound");
    if (!existingAudio) {
        document.body.appendChild(audioElement);
    };
    documentObserver.observe(document.body, { childList: true, subtree: true });
}


function activateContentScript(tabId, tabUrl) {
    if (tabUrl.includes("https://sis.appacademy.tools/cohorts/") && tabUrl.endsWith("/questions")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: addBellAndObserver
        });
    }
}

chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.frameId === 0) {
    activateContentScript(details.tabId, details.url);
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  if (details.frameId === 0) {
    activateContentScript(details.tabId, details.url);
  }
});

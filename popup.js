document.getElementById('activate').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab.url.includes("https://sis.appacademy.tools/cohorts/") && activeTab.url.endsWith("/questions")) {
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: addBellAndObserver
            });
        };
    });
});

function addBellAndObserver() {
    const audioElement = document.createElement('audio');
    audioElement.src = 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/notification-bell-128.png';
    audioElement.id = 'pingSound';

    function playPingSound() {
        const pingSound = document.getElementById("pingSound");
        if (pingSound) {
            pingSound.play();
        }
    }

    function handleAudioToggle(bellIdentifier) {
      bellIdentifier.addEventListener('click', function(e) {
        const audioEle = document.getElementById("pingSound");
        
        if (audioEle) {
          audioEle.remove();
          bellIdentifier.setAttribute('status', 'active');
          bellIdentifier.src = 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/Crossed-out-bell.png';
        } else {
          const audioElement = document.createElement('audio');
          audioElement.src = 'https://sdipietro.github.io/audio_host/assets/445058__matrixxx__ping-ping.wav';
          audioElement.id = 'pingSound';
          document.body.appendChild(audioElement);
          bellIdentifier.setAttribute('status', 'active');
          bellIdentifier.src = 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/notification-bell-128.png';
        }
      })
    }

    const documentObserver = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            const table = document.querySelector("tbody");
            if (table) {
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
    
    const bellIdentifier = document.createElement('img');
    bellIdentifier.id = 'bellIdentifier';
    bellIdentifier.alt = 'Bell Icon';
    bellIdentifier.width = 36;
    bellIdentifier.height = 36;
    bellIdentifier.style.cursor = 'pointer';
    bellIdentifier.setAttribute('status', 'active');
    bellIdentifier.src = 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/notification-bell-128.png';

    if (!document.getElementById('bellIdentifier')) {
        document.getElementsByClassName("mb-10")[0].getElementsByTagName('section')[0].appendChild(bellIdentifier);
        handleAudioToggle(bellIdentifier);
    }

    if (!existingAudio) {
        document.body.appendChild(audioElement);
    };
    documentObserver.observe(document.body, { childList: true, subtree: true });
}

function script() {
  // Possible audios to choose from
  let audios = [
    {
      'name': 'Ping Ping',
      'icon': 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/notification-bell-128.png',
      'sound': 'https://sdipietro.github.io/audio_host/assets/ping-ping-sound.wav'
    },
    {
      'name': 'Hummus',
      'icon': 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/hummus.png',
      'sound': 'https://sdipietro.github.io/audio_host/assets/hummus.mp3'
    },
    {
      'name': 'Progress Tracker',
      'icon': 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/progress_tracker.png',
      'sound': 'https://sdipietro.github.io/audio_host/assets/progress-tracker.wav'
    },
    {
      'name': 'Kyle',
      'icon': 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/kyle.png',
      'sound': 'https://sdipietro.github.io/audio_host/assets/kyle.mp3'
    },
    {
      'name': 'Mario',
      'icon': 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/mario.gif',
      'sound': 'https://sdipietro.github.io/audio_host/assets/maro-jump-sound-effect.mp3'
    }
  ];

  // Add animations for Mario
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
 
  const keyframes = `
    @keyframes jump {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-50px);
      }
    }
  `;
  const animationRule = `
    #mario {
      animation-name: jump;
      animation-duration: 0.5s;
      animation-timing-function: ease-in-out;
      animation-play-state: running;
    }
  `;
  styleElement.textContent = keyframes + animationRule;

  // Add style element to the page if it doesn't exist
  const existingStyleElement = document.getElementById('animation-style');
  if (!existingStyleElement) {
    styleElement.id = 'animation-style';
    document.head.appendChild(styleElement);
  }

  // Make Mario jump
  function handleMarioJump() {
    const mario = document.querySelector('.Mario');
    const crossOutIcon = document.getElementById('crossOutIcon');

    if (mario && crossOutIcon.style.display === 'none') {
        mario.style.animation = 'jump 0.5s ease-in-out';
  
        mario.addEventListener('animationend', () => {
          mario.style.animation = '';
        }, { once: true });
    }
  }

  // Add dropwdown to toggle sound type
  function addDropDown(bellContainer) {
    const dropDownContainer = document.createElement('div');
    dropDownContainer.style.position = 'relative';
    dropDownContainer.id = 'dropDownContainer';

    // Create dropdown icon
    const dropDownIcon = document.createElement('img');
    dropDownIcon.src = 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/drop-down-43.svg';
    dropDownIcon.style.display = 'none';
    dropDownIcon.width = 14;
    dropDownIcon.height = 14;
    dropDownIcon.style.marginTop = "15px";
    dropDownIcon.style.marginLeft = "5px";
    dropDownIcon.style.marginRight = "15px";
    
    dropDownContainer.appendChild(dropDownIcon);

    // Display dropdown icon when hovering over the bell Icon
    bellContainer.addEventListener('mouseover', () => {
      dropDownIcon.style.display = 'block';
    });

    bellContainer.addEventListener('mouseout', () => {
      dropDownIcon.style.display = 'none';
    });

    // Create dropdown box itself
    const dropDownBox = document.createElement('div');
    dropDownBox.id = 'dropDownBox';
    dropDownBox.style.display = 'none';
    dropDownBox.style.position = 'absolute';
    dropDownBox.style.top = '36px';
    dropDownBox.style.left = '-35px';
    dropDownBox.style.borderRadius = '3px';
    dropDownBox.style.fontSize = '14px';
    dropDownBox.style.width = '130px';
    dropDownBox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    dropDownBox.style.border = '1px solid gray';
    dropDownBox.style.height = '88px';
    dropDownBox.style.overflow = 'scroll';

    // Populate dropdown with audio options
    audios.forEach(function(audio) {
      let dropDownItem = document.createElement('div');
      dropDownItem.innerText = audio.name;
      dropDownItem.style.display = 'flex';
      dropDownItem.style.justifyContent = 'center';
      dropDownItem.style.padding = '2px 5px 2px 5px';
       
      // Change audio element and icon when click on dropdown item
      dropDownItem.addEventListener('click', () => {
        addAudioElement(audio.sound);
        dropDownBox.scrollTop = 0;
        dropDownBox.style.display = 'none';
        const crossOut = document.getElementById('crossOutIcon');
        crossOut.style.display = 'none';
        const icon = document.getElementById('bellIcon');
        icon.src = audio.icon;

        // Add class of Mario if mario sound selected
        if (audio.name === 'Mario') {
          icon.classList.add('Mario');
        } else {
          icon.classList.remove('Mario');
        }

        // Add choice to localStorage
        localStorage.setItem('soundChoice', audio.sound);
        localStorage.setItem('audioIcon', audio.icon);
      });

      // Hover effect on dropdown items
      dropDownItem.addEventListener('mouseover', () => {
        dropDownItem.style.background = '#222529';
      });

      dropDownItem.addEventListener('mouseout', () => {
        dropDownItem.style.background = '';
      });

      dropDownBox.appendChild(dropDownItem);
    })

    dropDownContainer.appendChild(dropDownBox);
    
    // Display dropdown when hovering over the dropdown Icon
    dropDownContainer.addEventListener('mouseover', () => {
      dropDownBox.style.display = 'block';
    });
    
    dropDownContainer.addEventListener('mouseout', () => {
      dropDownBox.style.display = 'none';
    });

    bellContainer.appendChild(dropDownContainer);
  }

  // Add bell icon to page if it doesn't exist. Add click event listener to toggle sound on/off
  function addBellIcon() {
    // Create container for bell icon and dropdown
    const bellContainer = document.createElement('div');
    bellContainer.style.display = 'flex';
    bellContainer.style.cursor = 'pointer';

    // Create icon element
    const bellIcon = document.createElement('img');
    bellIcon.id = 'bellIcon';
    bellIcon.alt = 'Bell Icon';
    bellIcon.width = 36;
    bellIcon.height = 36;
    bellIcon.style.borderRadius = '20px';
    
    // Check localStorage for existing audio choice first
    if (localStorage.getItem('audioIcon')) {
      bellIcon.src = localStorage.getItem('audioIcon');
    } else {
      bellIcon.src = 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/notification-bell-128.png';
    }
    
    bellContainer.appendChild(bellIcon);

    // Add cross out image
    const crossOutIcon = document.createElement('img');
    crossOutIcon.style.position = 'absolute';
    crossOutIcon.id = 'crossOutIcon';
    crossOutIcon.width = 36;
    crossOutIcon.height = 36;
    crossOutIcon.src = 'https://raw.githubusercontent.com/sdipietro/audio_host/main/assets/line.png';
    
    // Display cross out element if no audio
    const audioEle = document.getElementById("pingSound");
    if (audioEle) {
      crossOutIcon.style.display = 'none';
    } else {
      crossOutIcon.style.display = 'block';
    }
    
    bellContainer.appendChild(crossOutIcon);
    
    // Add class of Mario if icon is Mario
    if (bellIcon.src.includes('mario')) {
      bellIcon.classList.add('Mario');
    } else {
      bellIcon.classList.remove('Mario');
    }

    // Create dropdown element
    addDropDown(bellContainer);

    // Add icon and dropdown to page
    if (!document.getElementById('bellIcon')) {
      document.getElementsByClassName("mb-10")[0].getElementsByTagName('section')[0].appendChild(bellContainer);
      bellIcon.addEventListener('click', handleAudioToggle);
      crossOutIcon.addEventListener('click', handleAudioToggle);
    }
  }

  // Add audio tag to page if it doesn't exist
  function addAudioElement(sound) {
    let soundLink;

    if (sound) {
      soundLink = sound;
    } else if (localStorage.getItem('soundChoice')) {
      soundLink = localStorage.getItem('soundChoice');
    } else {
      soundLink = 'https://sdipietro.github.io/audio_host/assets/ping-ping-sound.wav'
    }

    const existingAudio = document.getElementById("pingSound");

    if (existingAudio) {
      existingAudio.remove();
    }

    const audioElement = document.createElement('audio');
    audioElement.src = soundLink;
    audioElement.id = 'pingSound';
    document.body.appendChild(audioElement);
  }

  // Play sound
  function playSound() {
    const pingSound = document.getElementById("pingSound");
    if (pingSound) {
        pingSound.play();
    }
  }

  // Toggle bell sound on/off
  function handleAudioToggle() {
    const audioEle = document.getElementById("pingSound");
    const crossOut = document.getElementById('crossOutIcon');
    
    if (audioEle) {
      audioEle.remove();
      crossOut.style.display = 'block';
    } else {
      addAudioElement();
      crossOut.style.display = 'none';
    }
  }

  // Add bell icon and audio element to page and listen for new questions
  function addBellAndObserver() {
      // Observe document to wait for question table to load
      const documentObserver = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
              const table = document.querySelector("tbody");
              if (table) {
                  // Once question table loads, remove document observer
                  documentObserver.disconnect();
                  // Add bell icon if table exists
                  addBellIcon();

                  // Add mutation observer to table to observe for new questions
                  if (!table.__mutationObserver) {
                    const questionTableObserver = new MutationObserver(function (mutationsList) {
                        for (const mutation of mutationsList) {
                          // Play ping sound when new question is asked
                          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                            playSound();
                            handleMarioJump();
                          }
                        }
                    });

                    // Observe question table for new questions
                    questionTableObserver.observe(table, { childList: true });
                    table.__mutationObserver = questionTableObserver;
                  }
              }
          }
        }
      });

      // Observe document for questions table to appear
      documentObserver.observe(document.body, { childList: true, subtree: true });
  }

  addBellAndObserver();
}

// Only execute script when on sis questions page
function activateContentScript(tabId, tabUrl) {
    if (tabUrl.includes("https://sis.appacademy.tools/cohorts/") && tabUrl.endsWith("/questions")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: script
        });
    }
}

// Activate content script after navigating to a page
chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.frameId === 0) {
    activateContentScript(details.tabId, details.url);
  }
});

// Activate content script after history updates on a page
chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  if (details.frameId === 0) {
    activateContentScript(details.tabId, details.url);
  }
});

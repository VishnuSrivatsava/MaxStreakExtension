document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'getHandle' }, function (response) {
        const handle = response.handle;
        if (handle) {
          fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
            .then((response) => response.json())
            .then((data) => {
              const submissions = data.result;
              let maxStreak = 0;
              let currentStreak = 0;
              for (const submission of submissions) {
                if (submission.verdict === 'OK') {
                  currentStreak++;
                  maxStreak = Math.max(maxStreak, currentStreak);
                } else {
                  currentStreak = 0;
                }
              }
              const resultDiv = document.querySelector('.result');
              resultDiv.textContent = `Max streak: ${maxStreak}`;

              const progressBar = document.querySelector('.progress-bar');
              progressBar.style.width = `${(maxStreak / submissions.length) * 100}%`;
            })
            .catch((error) => {
              console.error('Fetch error:', error);
              document.querySelector('.result').textContent =
                'Error fetching data. Please try again later.';
            });
        } else {
          document.querySelector('.result').textContent =
            'Could not retrieve the Codeforces handle from the current page.';
        }
      });
    });
});

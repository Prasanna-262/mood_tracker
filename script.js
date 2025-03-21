document.addEventListener('DOMContentLoaded', function() {
    const moodForm = document.getElementById('moodForm');
    const moodSelect = document.getElementById('mood');
    const moodHistory = document.getElementById('moodHistory');
    const moodHistoryHeader = document.getElementById('moodHistoryHeader');
    const clearHistoryButton = document.getElementById('clearHistory');

    const savedMoods = JSON.parse(localStorage.getItem('moodHistory')) || [];
    if (savedMoods.length > 0) {
        moodHistoryHeader.style.display = 'block';
        clearHistoryButton.style.display = 'block';
        savedMoods.forEach(mood => {
            const li = document.createElement('li');
            li.innerHTML = `${mood.text} <span class="date">${mood.timestamp}</span>`;
            li.classList.add(`mood-${mood.value}`);
            moodHistory.appendChild(li);
        });
    }

    moodForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const mood = moodSelect.value;

        if (mood) {
            const moodText = moodSelect.options[moodSelect.selectedIndex].text;
            const timestamp = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            const li = document.createElement('li');
            li.innerHTML = `${moodText} <span class="date">${timestamp}`;
            li.classList.add(`mood-${mood}`);
            moodHistory.insertBefore(li,moodHistory.firstChild);

            savedMoods.push({ text: moodText, value: mood, timestamp: timestamp });
            localStorage.setItem('moodHistory', JSON.stringify(savedMoods));

            moodHistoryHeader.style.display = 'block';
            clearHistoryButton.style.display = 'block';

            moodSelect.value = '';
        }
    });

    clearHistoryButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all mood history?')) {
            moodHistory.innerHTML = '';

            localStorage.removeItem('moodHistory');
            
            moodHistoryHeader.style.display = 'none';
            clearHistoryButton.style.display = 'none';
        }
    });
});
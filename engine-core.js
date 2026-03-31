// === ÉTAT DU JEU ===

let state = {
    stars: 0,
    stats: {
        lecture: 0,
        maths: 0,
        sons: 0,
        perfectSeries: 0,
    },
    trophees: [],
    exerciseHistory: {},
    dailyHistory: [],
    currentSection: null,
    lectureDifficulty: 'syllabes',
    mathsDifficulty: 'facile',
    sonsDifficulty: 'sons-simples',
    currentExercises: [],
    currentIndex: 0,
    correctCount: 0,
    isAnswering: false,
    pendingTimeout: null,
};

// === SAUVEGARDE ===

function saveState() {
    recordDailySnapshot();
    const toSave = {
        stars: state.stars,
        stats: state.stats,
        trophees: state.trophees,
        exerciseHistory: state.exerciseHistory,
        dailyHistory: state.dailyHistory,
    };
    localStorage.setItem('mentalis_state', JSON.stringify(toSave));
    if (typeof syncToCloud === 'function') syncToCloud();
}

function loadState() {
    // Migration depuis l'ancien nom
    const oldData = localStorage.getItem('baptize_state');
    if (oldData && !localStorage.getItem('mentalis_state')) {
        localStorage.setItem('mentalis_state', oldData);
        localStorage.removeItem('baptize_state');
    }
    const saved = localStorage.getItem('mentalis_state');
    if (saved) {
        const data = JSON.parse(saved);
        state.stars = data.stars || 0;
        state.stats = data.stats || { lecture: 0, maths: 0, sons: 0, perfectSeries: 0 };
        state.trophees = data.trophees || [];
        state.exerciseHistory = data.exerciseHistory || {};
        state.dailyHistory = data.dailyHistory || [];
    }
    updateStarsDisplay();
}

// === NAVIGATION ===

function showSection(section) {
    document.querySelectorAll('.game-section').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));

    document.getElementById('section-' + section).classList.remove('hidden');
    document.querySelector(`[data-section="${section}"]`).classList.add('active');

    state.currentSection = section;

    if (section === 'recompenses') {
        document.body.classList.remove('in-game');
    } else {
        document.body.classList.add('in-game');
    }

    if (section === 'lecture') startLecture();
    else if (section === 'maths') startMaths();
    else if (section === 'sons') startSons();
    else if (section === 'recompenses') showEvolution();
}

// === SUIVI DES EXERCICES ===

function getExerciseKey(section, difficulty, exercise) {
    if (section === 'maths') {
        return 'maths_' + difficulty + '_' + exercise.a + '_' + exercise.op + '_' + exercise.b;
    }
    var answer = exercise.choices[exercise.answer];
    return section + '_' + difficulty + '_' + exercise.prompt + '_' + answer;
}

function getExerciseLabel(section, difficulty, exercise) {
    if (section === 'maths') {
        var result;
        if (exercise.op === '+') result = exercise.a + exercise.b;
        else if (exercise.op === '-') result = exercise.a - exercise.b;
        else result = exercise.a * exercise.b;
        return exercise.a + ' ' + exercise.op + ' ' + exercise.b + ' = ' + result;
    }
    return exercise.prompt + ' \u2192 ' + exercise.choices[exercise.answer];
}

function trackExerciseResult(section, difficulty, exercise, isCorrect) {
    var key = getExerciseKey(section, difficulty, exercise);
    var label = getExerciseLabel(section, difficulty, exercise);
    var now = new Date().toISOString();

    if (!state.exerciseHistory[key]) {
        state.exerciseHistory[key] = {
            note: 0,
            attempts: 0,
            errors: 0,
            successes: 0,
            lastPlayed: now,
            section: section,
            difficulty: difficulty,
            label: label,
            exerciseData: section === 'maths'
                ? { a: exercise.a, b: exercise.b, op: exercise.op }
                : { prompt: exercise.prompt, question: exercise.question || null, choices: exercise.choices.slice(), answer: exercise.answer, instruction: exercise.instruction || null },
        };
    }

    var h = state.exerciseHistory[key];
    h.attempts++;
    h.lastPlayed = now;
    h.label = label;

    if (isCorrect) {
        h.successes++;
        h.note = Math.min((h.note || 0) + 1, 5);
    } else {
        h.errors++;
        h.note = 0;
    }
}

function selectSmartExercises(allExercises, section, difficulty, count) {
    var errors = [];
    var unseen = [];
    var corrected = [];
    var learned = [];

    allExercises.forEach(function(ex) {
        var key = getExerciseKey(section, difficulty, ex);
        var h = state.exerciseHistory[key];
        if (!h) {
            unseen.push(ex);
        } else if (h.note <= 0 && h.errors > 0) {
            errors.push(ex);
        } else if (h.note > 0 && h.note < 5 && h.errors > 0) {
            corrected.push(ex);
        } else {
            // note >= 5 with errors = mastered, or no errors = learned
            learned.push({ ex: ex, note: h.note, lastPlayed: h.lastPlayed || '' });
        }
    });

    learned.sort(function(a, b) {
        if (a.note !== b.note) return a.note - b.note;
        return (a.lastPlayed < b.lastPlayed) ? -1 : 1;
    });

    var selected = [];
    var shuffledErrors = shuffle([].concat(errors));
    var shuffledUnseen = shuffle([].concat(unseen));
    var shuffledCorrected = shuffle([].concat(corrected));

    // 1. Errors (up to 2)
    for (var i = 0; i < Math.min(2, shuffledErrors.length) && selected.length < count; i++) {
        selected.push(shuffledErrors[i]);
    }

    // 2. Unseen exercises
    for (var i = 0; i < shuffledUnseen.length && selected.length < count; i++) {
        selected.push(shuffledUnseen[i]);
    }

    // 3. Remaining errors
    for (var i = 2; i < shuffledErrors.length && selected.length < count; i++) {
        selected.push(shuffledErrors[i]);
    }

    // 4. Corrected errors (up to 1 random, for reinforcement)
    for (var i = 0; i < Math.min(1, shuffledCorrected.length) && selected.length < count; i++) {
        selected.push(shuffledCorrected[i]);
    }

    // 5. Learned (least mastered first)
    for (var i = 0; i < learned.length && selected.length < count; i++) {
        selected.push(learned[i].ex);
    }

    return shuffle(selected.slice(0, count));
}

// === FIN DE SÉRIE ===

function endSeries(type) {
    const total = 5;
    const correct = state.correctCount;
    const isPerfect = correct === total;

    if (isPerfect) {
        state.stats.perfectSeries++;
        state.stars += 3;
        updateStarsDisplay();
        saveState();
    }

    checkTrophees();

    const modal = document.getElementById('bravo-modal');
    const animation = document.getElementById('bravo-animation');
    const title = document.getElementById('bravo-title');
    const message = document.getElementById('bravo-message');
    const starsDiv = document.getElementById('bravo-stars');

    if (isPerfect) {
        animation.textContent = '\uD83C\uDF89';
        title.textContent = 'Parfait ! \uD83C\uDFC6';
        message.textContent = `${correct}/${total} \u2014 Incroyable, aucune erreur ! +3 \u00e9toiles bonus !`;
    } else if (correct >= 3) {
        animation.textContent = '\uD83D\uDC4F';
        title.textContent = 'Bravo ! \uD83D\uDE0A';
        message.textContent = `${correct}/${total} \u2014 C'est tr\u00e8s bien, continue comme \u00e7a !`;
    } else {
        animation.textContent = '\uD83D\uDCAA';
        title.textContent = 'Courage ! \uD83C\uDF08';
        message.textContent = `${correct}/${total} \u2014 Tu vas y arriver, on r\u00e9essaie !`;
    }

    starsDiv.textContent = '\u2B50'.repeat(correct);
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('bravo-modal').classList.add('hidden');
    if (state.currentSection === 'lecture') startLecture();
    else if (state.currentSection === 'maths') startMaths();
    else if (state.currentSection === 'sons') startSons();
}

// === TROPHÉES ===

function checkTrophees() {
    let newTrophee = false;

    TROPHEES.forEach(t => {
        if (state.trophees.includes(t.id)) return;

        let earned = false;
        if (t.type === 'stars') earned = state.stars >= t.threshold;
        else if (t.type === 'lecture') earned = state.stats.lecture >= t.threshold;
        else if (t.type === 'maths') earned = state.stats.maths >= t.threshold;
        else if (t.type === 'sons') earned = state.stats.sons >= t.threshold;
        else if (t.type === 'perfect') earned = state.stats.perfectSeries >= t.threshold;

        if (earned) {
            state.trophees.push(t.id);
            newTrophee = true;
        }
    });

    if (newTrophee) saveState();
}

// === BOUTON SUIVANT AVEC TIMER CIRCULAIRE ===

const NEXT_TIMER_MS = 15000;

function showNextButton(containerId, callback) {
    const container = document.getElementById(containerId);
    container.classList.remove('hidden');
    container.innerHTML = `
        <button class="next-btn" id="${containerId}-btn">
            <svg class="next-timer-ring" viewBox="0 0 44 44">
                <circle class="next-timer-bg" cx="22" cy="22" r="20" />
                <circle class="next-timer-progress" cx="22" cy="22" r="20" />
            </svg>
            <span class="next-btn-label">Suivant \u25B6</span>
        </button>
    `;

    const btn = document.getElementById(`${containerId}-btn`);
    const progress = container.querySelector('.next-timer-progress');

    progress.style.animationDuration = NEXT_TIMER_MS + 'ms';
    progress.classList.add('next-timer-animate');

    state.pendingTimeout = setTimeout(() => {
        state.pendingTimeout = null;
        hideNextButton(containerId);
        callback();
    }, NEXT_TIMER_MS);

    btn.onclick = () => {
        if (state.pendingTimeout) {
            clearTimeout(state.pendingTimeout);
            state.pendingTimeout = null;
        }
        hideNextButton(containerId);
        callback();
    };
}

function hideNextButton(containerId) {
    const container = document.getElementById(containerId);
    container.classList.add('hidden');
    container.innerHTML = '';
}

// === AUDIO VIA WIKIMEDIA COMMONS ===

const audioCache = {};
let currentAudio = null;

function speakFrench(word) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }

    const w = word.trim().toLowerCase();
    const filename = 'File:Fr-' + w + '.ogg';
    const filenameAlt = 'File:Fr-' + w.charAt(0).toUpperCase() + w.slice(1) + '.ogg';

    if (audioCache[w]) {
        playAudioUrl(audioCache[w]);
        return;
    }

    const apiUrl = 'https://commons.wikimedia.org/w/api.php?action=query&titles='
        + encodeURIComponent(filename) + '|' + encodeURIComponent(filenameAlt)
        + '&prop=imageinfo&iiprop=url&format=json&origin=*';

    fetch(apiUrl)
        .then(r => r.json())
        .then(data => {
            const pages = data.query.pages;
            const found = Object.values(pages).find(p => p.imageinfo && p.imageinfo[0]);
            if (found) {
                const url = found.imageinfo[0].url;
                audioCache[w] = url;
                playAudioUrl(url);
            }
        })
        .catch(() => {});
}

function playAudioUrl(url) {
    currentAudio = new Audio(url);
    currentAudio.play().catch(() => {});
}

// === UTILITAIRES ===

function colorizeNumber(n) {
    const str = String(n);
    if (str === '0') return '<span class="digit-zero">0</span>';
    if (str.length === 1) return `<span class="digit-unit">${str}</span>`;

    let html = '';
    for (let i = 0; i < str.length; i++) {
        const digit = str[i];
        const position = str.length - 1 - i;
        if (digit === '0') {
            html += `<span class="digit-zero">${digit}</span>`;
        } else if (position >= 1) {
            html += `<span class="digit-ten">${digit}</span>`;
        } else {
            html += `<span class="digit-unit">${digit}</span>`;
        }
    }
    return html;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateStarsDisplay() {
    document.getElementById('stars-count').textContent = state.stars;
}

function updateProgress(section) {
    const total = state.currentExercises.length;
    const current = state.currentIndex;
    const pct = (current / total) * 100;

    document.getElementById(`${section}-progress`).style.width = pct + '%';
    document.getElementById(`${section}-current`).textContent = current;
    document.getElementById(`${section}-total`).textContent = total;
}

// === INITIALISATION ===
// L'auth est gérée par supabase.js (chargé avant engine.js)

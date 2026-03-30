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
    const toSave = {
        stars: state.stars,
        stats: state.stats,
        trophees: state.trophees,
        exerciseHistory: state.exerciseHistory,
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
            exerciseData: section === 'maths' ? { a: exercise.a, b: exercise.b, op: exercise.op } : null,
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
    var learned = [];

    allExercises.forEach(function(ex) {
        var key = getExerciseKey(section, difficulty, ex);
        var h = state.exerciseHistory[key];
        if (!h) {
            unseen.push(ex);
        } else if (h.note <= 0 && h.errors > 0) {
            errors.push(ex);
        } else {
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

    // 4. Learned (least mastered first)
    for (var i = 0; i < learned.length && selected.length < count; i++) {
        selected.push(learned[i].ex);
    }

    return shuffle(selected.slice(0, count));
}

function recreateMathExercise(a, b, op, config) {
    var answer;
    if (op === '+') answer = a + b;
    else if (op === '-') answer = a - b;
    else answer = a * b;

    var promptHtml = colorizeNumber(a) + ' <span class="math-op">' + op + '</span> ' + colorizeNumber(b) + ' <span class="math-op">=</span> <span class="math-op">?</span>';

    var choices = [answer];
    var range = config.showHands ? 3 : 5;
    while (choices.length < 4) {
        var wrong = answer + randomInt(-range, range);
        if (wrong !== answer && wrong >= 0 && !choices.includes(wrong)) {
            choices.push(wrong);
        }
    }
    choices = shuffle(choices);
    var correctIndex = choices.indexOf(answer);

    return { promptHtml: promptHtml, choices: choices, answer: correctIndex, a: a, b: b, op: op, showHands: !!config.showHands };
}

// === LECTURE ===

function setLectureDifficulty(diff) {
    state.lectureDifficulty = diff;
    document.querySelectorAll('#section-lecture .diff-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    startLecture();
}

function startLecture() {
    if (state.pendingTimeout) {
        clearTimeout(state.pendingTimeout);
        state.pendingTimeout = null;
    }
    state.isAnswering = false;
    hideNextButton('lecture-next');
    document.getElementById('lecture-choices').innerHTML = '';
    document.getElementById('lecture-feedback').textContent = '';
    document.getElementById('lecture-feedback').className = 'feedback';

    const data = LECTURE_DATA[state.lectureDifficulty];
    state.currentExercises = selectSmartExercises(data.exercises, 'lecture', state.lectureDifficulty, 5);
    state.currentIndex = 0;
    state.correctCount = 0;
    updateProgress('lecture');
    showLectureExercise();
}

function showLectureExercise() {
    if (state.currentIndex >= state.currentExercises.length) {
        endSeries('lecture');
        return;
    }

    const ex = state.currentExercises[state.currentIndex];
    const promptDiv = document.getElementById('lecture-prompt');
    const questionDiv = document.getElementById('lecture-question');
    promptDiv.textContent = ex.prompt;
    if (state.lectureDifficulty === 'histoires') {
        promptDiv.classList.add('story-text');
        questionDiv.classList.add('story-question');
    } else {
        promptDiv.classList.remove('story-text');
        questionDiv.classList.remove('story-question');
    }
    if (ex.question) {
        questionDiv.textContent = ex.question;
        questionDiv.classList.remove('hidden');
    } else {
        questionDiv.textContent = '';
        questionDiv.classList.add('hidden');
    }
    document.getElementById('lecture-feedback').textContent = '';
    document.getElementById('lecture-feedback').className = 'feedback';

    const choicesDiv = document.getElementById('lecture-choices');
    choicesDiv.innerHTML = '';
    state.isAnswering = false;

    ex.choices.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice;
        btn.onclick = () => answerLecture(i, ex.answer, btn);
        choicesDiv.appendChild(btn);
    });
}

function answerLecture(chosen, correct, btn) {
    if (state.isAnswering) return;
    state.isAnswering = true;

    const feedback = document.getElementById('lecture-feedback');
    const allBtns = document.querySelectorAll('#lecture-choices .choice-btn');

    allBtns.forEach(b => { b.disabled = true; b.blur(); });

    if (chosen === correct) {
        btn.classList.add('correct');
        feedback.textContent = randomItem(ENCOURAGEMENTS);
        feedback.className = 'feedback success';
        state.correctCount++;
        state.stars++;
        state.stats.lecture++;
        trackExerciseResult('lecture', state.lectureDifficulty, state.currentExercises[state.currentIndex], true);
        updateStarsDisplay();
        saveState();
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
        feedback.textContent = randomItem(ENCOURAGEMENTS_ERROR);
        feedback.className = 'feedback error';
        state.stats.lecture++;
        trackExerciseResult('lecture', state.lectureDifficulty, state.currentExercises[state.currentIndex], false);
        saveState();
    }

    state.currentIndex++;
    updateProgress('lecture');

    showNextButton('lecture-next', () => {
        document.getElementById('lecture-choices').innerHTML = '';
        showLectureExercise();
    });
}

// === MATHS ===

function setMathsDifficulty(diff) {
    state.mathsDifficulty = diff;
    document.querySelectorAll('#section-maths .diff-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    startMaths();
}

function startMaths() {
    if (state.pendingTimeout) {
        clearTimeout(state.pendingTimeout);
        state.pendingTimeout = null;
    }
    hideNextButton('maths-next');

    state.currentExercises = [];
    const config = MATHS_DATA[state.mathsDifficulty];

    // Include error exercises to retry
    var mathsErrors = [];
    for (var key in state.exerciseHistory) {
        var h = state.exerciseHistory[key];
        if (h.section === 'maths' && h.difficulty === state.mathsDifficulty && h.note <= 0 && h.errors > 0 && h.exerciseData) {
            mathsErrors.push(h.exerciseData);
        }
    }
    var shuffledMathsErrors = shuffle([].concat(mathsErrors));
    var errorCount = Math.min(2, shuffledMathsErrors.length);
    for (var i = 0; i < errorCount; i++) {
        var ed = shuffledMathsErrors[i];
        state.currentExercises.push(recreateMathExercise(ed.a, ed.b, ed.op, config));
    }

    for (let i = state.currentExercises.length; i < 5; i++) {
        state.currentExercises.push(generateMathExercise(config));
    }

    state.currentIndex = 0;
    state.correctCount = 0;
    state.isAnswering = false;
    document.getElementById('maths-choices').innerHTML = '';
    document.getElementById('maths-prompt').innerHTML = '';
    document.getElementById('maths-hands').innerHTML = '';
    document.getElementById('maths-hands').classList.add('hidden');
    document.getElementById('maths-feedback').textContent = '';
    document.getElementById('maths-feedback').className = 'feedback';
    updateProgress('maths');
    showMathsExercise();
}

function generateMathExercise(config) {
    const op = randomItem(config.operations);
    let a, b, answer;

    if (config.showHands) {
        a = randomInt(1, 5);
        b = randomInt(1, 5);
        answer = a + b;
    } else if (op === '+') {
        a = randomInt(config.min, config.max);
        b = randomInt(config.min, config.max);
        answer = a + b;
    } else if (op === '-') {
        a = randomInt(config.min, config.max);
        b = randomInt(config.min, a);
        answer = a - b;
    } else if (op === '×') {
        a = randomInt(1, 10);
        b = randomInt(1, 10);
        answer = a * b;
    }

    const promptHtml = `${colorizeNumber(a)} <span class="math-op">${op}</span> ${colorizeNumber(b)} <span class="math-op">=</span> <span class="math-op">?</span>`;

    let choices = [answer];
    const range = config.showHands ? 3 : 5;
    while (choices.length < 4) {
        const wrong = answer + randomInt(-range, range);
        if (wrong !== answer && wrong >= 0 && !choices.includes(wrong)) {
            choices.push(wrong);
        }
    }
    choices = shuffle(choices);
    const correctIndex = choices.indexOf(answer);

    return { promptHtml, choices, answer: correctIndex, a, b, op, showHands: !!config.showHands };
}

function showMathsExercise() {
    if (state.currentIndex >= state.currentExercises.length) {
        endSeries('maths');
        return;
    }

    const ex = state.currentExercises[state.currentIndex];
    document.getElementById('maths-prompt').innerHTML = ex.promptHtml;
    document.getElementById('maths-feedback').textContent = '';
    document.getElementById('maths-feedback').className = 'feedback';

    const handsDiv = document.getElementById('maths-hands');
    if (ex.showHands) {
        handsDiv.classList.remove('hidden');
        handsDiv.innerHTML =
            '<div class="hands-group">' +
                '<div class="hands-label">' + ex.a + '</div>' +
                '<div class="hands-dots">' + getFingerDots(ex.a) + '</div>' +
            '</div>' +
            '<div class="hands-plus">+</div>' +
            '<div class="hands-group">' +
                '<div class="hands-label">' + ex.b + '</div>' +
                '<div class="hands-dots">' + getFingerDots(ex.b) + '</div>' +
            '</div>';
    } else {
        handsDiv.classList.add('hidden');
        handsDiv.innerHTML = '';
    }

    const choicesDiv = document.getElementById('maths-choices');
    choicesDiv.innerHTML = '';
    state.isAnswering = false;

    ex.choices.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = colorizeNumber(choice);
        btn.onclick = () => answerMaths(i, ex.answer, btn);
        choicesDiv.appendChild(btn);
    });
}

function answerMaths(chosen, correct, btn) {
    if (state.isAnswering) return;
    state.isAnswering = true;

    const feedback = document.getElementById('maths-feedback');
    const allBtns = document.querySelectorAll('#maths-choices .choice-btn');

    allBtns.forEach(b => { b.disabled = true; b.blur(); });

    if (chosen === correct) {
        btn.classList.add('correct');
        feedback.textContent = randomItem(ENCOURAGEMENTS);
        feedback.className = 'feedback success';
        state.correctCount++;
        state.stars++;
        state.stats.maths++;
        trackExerciseResult('maths', state.mathsDifficulty, state.currentExercises[state.currentIndex], true);
        updateStarsDisplay();
        saveState();
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
        feedback.textContent = randomItem(ENCOURAGEMENTS_ERROR);
        feedback.className = 'feedback error';
        state.stats.maths++;
        trackExerciseResult('maths', state.mathsDifficulty, state.currentExercises[state.currentIndex], false);
        saveState();
    }

    state.currentIndex++;
    updateProgress('maths');

    showNextButton('maths-next', () => {
        document.getElementById('maths-choices').innerHTML = '';
        document.getElementById('maths-prompt').innerHTML = '';
        document.getElementById('maths-hands').innerHTML = '';
        document.getElementById('maths-hands').classList.add('hidden');
        document.getElementById('maths-feedback').textContent = '';
        document.getElementById('maths-feedback').className = 'feedback';
        requestAnimationFrame(() => showMathsExercise());
    });
}

// === SONS ===

function setSonsDifficulty(diff) {
    state.sonsDifficulty = diff;
    document.querySelectorAll('#section-sons .diff-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    startSons();
}

function startSons() {
    if (state.pendingTimeout) {
        clearTimeout(state.pendingTimeout);
        state.pendingTimeout = null;
    }
    state.isAnswering = false;
    hideNextButton('sons-next');
    document.getElementById('sons-choices').innerHTML = '';
    document.getElementById('sons-feedback').textContent = '';
    document.getElementById('sons-feedback').className = 'feedback';

    const data = SONS_DATA[state.sonsDifficulty];
    state.currentExercises = selectSmartExercises(data.exercises, 'sons', state.sonsDifficulty, 5);
    state.currentIndex = 0;
    state.correctCount = 0;
    updateProgress('sons');
    showSonsExercise();
}

function showSonsExercise() {
    if (state.currentIndex >= state.currentExercises.length) {
        endSeries('sons');
        return;
    }

    const ex = state.currentExercises[state.currentIndex];

    const promptDiv = document.getElementById('sons-prompt');
    if (ex.speak) {
        promptDiv.innerHTML = ex.prompt + ' <button class="speak-btn" onclick="speakFrench(\'' + ex.speak.replace(/'/g, "\\'") + '\')">\uD83D\uDD0A</button>';
        setTimeout(() => speakFrench(ex.speak), 300);
    } else {
        promptDiv.textContent = ex.prompt;
    }

    document.getElementById('sons-instruction').textContent = ex.instruction;
    document.getElementById('sons-feedback').textContent = '';
    document.getElementById('sons-feedback').className = 'feedback';

    const choicesDiv = document.getElementById('sons-choices');
    choicesDiv.innerHTML = '';
    state.isAnswering = false;

    ex.choices.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice;
        btn.onclick = () => answerSons(i, ex.answer, btn);
        choicesDiv.appendChild(btn);
    });
}

function answerSons(chosen, correct, btn) {
    if (state.isAnswering) return;
    state.isAnswering = true;

    const feedback = document.getElementById('sons-feedback');
    const allBtns = document.querySelectorAll('#sons-choices .choice-btn');

    allBtns.forEach(b => { b.disabled = true; b.blur(); });

    if (chosen === correct) {
        btn.classList.add('correct');
        feedback.textContent = randomItem(ENCOURAGEMENTS);
        feedback.className = 'feedback success';
        state.correctCount++;
        state.stars++;
        state.stats.sons++;
        trackExerciseResult('sons', state.sonsDifficulty, state.currentExercises[state.currentIndex], true);
        updateStarsDisplay();
        saveState();
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
        feedback.textContent = randomItem(ENCOURAGEMENTS_ERROR);
        feedback.className = 'feedback error';
        state.stats.sons++;
        trackExerciseResult('sons', state.sonsDifficulty, state.currentExercises[state.currentIndex], false);
        saveState();
    }

    state.currentIndex++;
    updateProgress('sons');

    showNextButton('sons-next', () => {
        document.getElementById('sons-choices').innerHTML = '';
        showSonsExercise();
    });
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

function showEvolution() {
    checkTrophees();

    // Troph\u00e9es
    const grid = document.getElementById('trophees-grid');
    grid.innerHTML = '';

    TROPHEES.forEach(t => {
        const card = document.createElement('div');
        const unlocked = state.trophees.includes(t.id);
        card.className = 'trophee-card ' + (unlocked ? 'unlocked' : 'locked');
        card.innerHTML = `
            <span class="trophee-icon">${t.icon}</span>
            <span class="trophee-name">${t.name}</span>
        `;
        grid.appendChild(card);
    });

    // Erreurs
    const errorsDiv = document.getElementById('errors-content');
    const errorEntries = Object.entries(state.exerciseHistory)
        .filter(function(entry) { return entry[1].errors > 0; })
        .sort(function(a, b) {
            if (a[1].note === 0 && b[1].note > 0) return -1;
            if (a[1].note > 0 && b[1].note === 0) return 1;
            return b[1].errors - a[1].errors;
        });

    if (errorEntries.length === 0) {
        errorsDiv.innerHTML = '<p class="no-errors-text">Aucune erreur pour le moment !</p>';
    } else {
        var html = '';
        errorEntries.forEach(function(entry) {
            var h = entry[1];
            var sectionIcon = h.section === 'lecture' ? '\uD83D\uDCD6' : h.section === 'maths' ? '\uD83D\uDD22' : '\uD83D\uDD0A';
            var statusClass = h.note === 0 ? 'error-pending' : 'error-resolved';
            var statusLabel = h.note === 0 ? '\u00c0 retravailler' : 'Corrig\u00e9 \u2713';
            html += '<div class="error-row ' + statusClass + '">' +
                '<span class="error-section-icon">' + sectionIcon + '</span>' +
                '<span class="error-label">' + h.label + '</span>' +
                '<span class="error-count">' + h.errors + ' err.</span>' +
                '<span class="error-status">' + statusLabel + '</span>' +
                '</div>';
        });
        errorsDiv.innerHTML = html;
    }

    // Statistiques
    const statsDiv = document.getElementById('stats-content');
    const totalExercises = Object.keys(state.exerciseHistory).length;
    const totalErrors = Object.values(state.exerciseHistory).filter(function(h) { return h.errors > 0; }).length;
    const pendingErrors = Object.values(state.exerciseHistory).filter(function(h) { return h.note === 0 && h.errors > 0; }).length;

    statsDiv.innerHTML = `
        <div class="stat-row">
            <span class="stat-label">\u00c9toiles gagn\u00e9es</span>
            <span class="stat-value">${state.stars} \u2B50</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Exercices de lecture</span>
            <span class="stat-value">${state.stats.lecture}</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Exercices de maths</span>
            <span class="stat-value">${state.stats.maths}</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Exercices de sons</span>
            <span class="stat-value">${state.stats.sons}</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">S\u00e9ries parfaites</span>
            <span class="stat-value">${state.stats.perfectSeries} \uD83C\uDFC5</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Troph\u00e9es d\u00e9bloqu\u00e9s</span>
            <span class="stat-value">${state.trophees.length}/${TROPHEES.length}</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Exercices travaill\u00e9s</span>
            <span class="stat-value">${totalExercises}</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Erreurs \u00e0 corriger</span>
            <span class="stat-value">${pendingErrors} / ${totalErrors}</span>
        </div>
    `;
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

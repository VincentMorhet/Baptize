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

    const sonsInstructionTexts = {
        'sons-simples': '\u00c9coute le son puis choisis le mot qui le contient.',
        'graphemes': 'Lis le groupe de lettres puis choisis le mot qui le contient.',
        'confusions': 'Regarde bien les lettres puis choisis la bonne r\u00e9ponse.'
    };
    document.getElementById('sons-exercise-instruction').textContent =
        sonsInstructionTexts[state.sonsDifficulty] || '';

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

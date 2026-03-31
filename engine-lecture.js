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

    const instructionTexts = {
        syllabes: 'Lis la syllabe puis choisis le mot qui commence par cette syllabe.',
        mots: 'Regarde l\'image puis choisis le mot qui correspond.',
        phrases: 'Lis la phrase puis choisis le mot qui la compl\u00e8te.',
        histoires: 'Lis l\'histoire puis r\u00e9ponds \u00e0 la question.'
    };
    document.getElementById('lecture-exercise-instruction').textContent =
        instructionTexts[state.lectureDifficulty] || '';

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
    if (state.lectureDifficulty === 'mots') {
        promptDiv.classList.add('mots-prompt');
    } else {
        promptDiv.classList.remove('mots-prompt');
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

    // Shuffle choices randomly so answers aren't always in the same position
    const indices = ex.choices.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const shuffledCorrect = indices.indexOf(ex.answer);

    indices.forEach((origIndex) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = ex.choices[origIndex];
        btn.onclick = () => answerLecture(indices.indexOf(origIndex), shuffledCorrect, btn);
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

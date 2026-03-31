// === MATHS ===

function recreateMathExercise(a, b, op, config) {
    if (config.decompose) {
        var larger = Math.max(a, b);
        var smaller = Math.min(a, b);
        var promptHtml = colorizeNumber(a) + ' <span class="math-op">+</span> ' + colorizeNumber(b) + ' <span class="math-op">=</span> <span class="math-op">?</span>';
        return {
            promptHtml: promptHtml,
            choices: [],
            answer: -1,
            a: a, b: b, op: '+',
            decompose: true,
            phase: 1,
            larger: larger,
            smaller: smaller,
            result: a + b,
        };
    }

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

    // Include error exercises to retry (pending and corrected, not mastered)
    var mathsPending = [];
    var mathsCorrected = [];
    for (var key in state.exerciseHistory) {
        var h = state.exerciseHistory[key];
        if (h.section === 'maths' && h.difficulty === state.mathsDifficulty && h.errors > 0 && h.exerciseData) {
            if (h.note <= 0) mathsPending.push(h.exerciseData);
            else if (h.note < 5) mathsCorrected.push(h.exerciseData);
        }
    }
    var shuffledPending = shuffle([].concat(mathsPending));
    var shuffledCorrected = shuffle([].concat(mathsCorrected));
    var errorCount = Math.min(2, shuffledPending.length);
    for (var i = 0; i < errorCount; i++) {
        var ed = shuffledPending[i];
        state.currentExercises.push(recreateMathExercise(ed.a, ed.b, ed.op, config));
    }
    // Add up to 1 corrected error for reinforcement
    if (state.currentExercises.length < 5 && shuffledCorrected.length > 0) {
        var ed = shuffledCorrected[0];
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

    if (config.decompose) {
        a = randomInt(config.min, config.max);
        b = randomInt(config.min, config.max);
        while (a === b) b = randomInt(config.min, config.max);
        answer = a + b;
        var larger = Math.max(a, b);
        var smaller = Math.min(a, b);

        return {
            promptHtml: colorizeNumber(a) + ' <span class="math-op">+</span> ' + colorizeNumber(b) + ' <span class="math-op">=</span> <span class="math-op">?</span>',
            choices: [],
            answer: -1,
            a: a, b: b, op: '+',
            decompose: true,
            phase: 1,
            larger: larger,
            smaller: smaller,
            result: answer,
        };
    }

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
    } else if (op === '\u00d7') {
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

    if (ex.decompose) {
        showDecompositionExercise(ex);
        return;
    }

    const mathsInstructionTexts = {
        doigts: 'Compte les points de chaque groupe puis trouve le r\u00e9sultat.',
        facile: 'Calcule le r\u00e9sultat de l\'op\u00e9ration puis choisis la bonne r\u00e9ponse.',
        moyen: 'Calcule le r\u00e9sultat de l\'op\u00e9ration puis choisis la bonne r\u00e9ponse.',
        difficile: 'Calcule le r\u00e9sultat de l\'op\u00e9ration puis choisis la bonne r\u00e9ponse.'
    };
    document.getElementById('maths-exercise-instruction').textContent =
        mathsInstructionTexts[state.mathsDifficulty] || '';

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

function showDecompositionExercise(ex) {
    document.getElementById('maths-feedback').textContent = '';
    document.getElementById('maths-feedback').className = 'feedback';
    document.getElementById('maths-exercise-instruction').textContent =
        'D\u00e9compose l\'op\u00e9ration \u00e9tape par \u00e9tape pour trouver le r\u00e9sultat.';
    const handsDiv = document.getElementById('maths-hands');
    const choicesDiv = document.getElementById('maths-choices');
    choicesDiv.innerHTML = '';
    state.isAnswering = false;

    if (ex.phase === 1) {
        // Phase 1: identify the larger number
        document.getElementById('maths-prompt').innerHTML = ex.promptHtml;
        handsDiv.classList.remove('hidden');
        handsDiv.innerHTML =
            '<div class="decompose-instruction">Quel est le plus grand nombre ?</div>';

        var phase1Choices = shuffle([ex.a, ex.b]);
        var phase1Answer = phase1Choices.indexOf(ex.larger);

        phase1Choices.forEach(function(choice, i) {
            var btn = document.createElement('button');
            btn.className = 'choice-btn choice-btn-large';
            btn.innerHTML = colorizeNumber(choice);
            btn.onclick = function() { answerDecompositionPhase1(i, phase1Answer, btn, ex); };
            choicesDiv.appendChild(btn);
        });
    } else {
        // Phase 2: decomposition — larger + 1 + 1 + ... + 1 = ?
        var decompPrompt = colorizeNumber(ex.larger);
        for (var i = 0; i < ex.smaller; i++) {
            decompPrompt += ' <span class="math-op">+</span> ' + colorizeNumber(1);
        }
        decompPrompt += ' <span class="math-op">=</span> <span class="math-op">?</span>';
        document.getElementById('maths-prompt').innerHTML = decompPrompt;

        // Visual: show larger group, then each +1 step
        handsDiv.classList.remove('hidden');
        var dotsHtml = '<div class="decompose-visual">';
        dotsHtml += '<div class="hands-group">' +
            '<div class="hands-label">' + ex.larger + '</div>' +
            '<div class="hands-dots">' + getFingerDots(ex.larger) + '</div>' +
            '</div>';
        dotsHtml += '<div class="hands-plus">+</div>';
        dotsHtml += '<div class="decompose-steps">';
        for (var i = 0; i < ex.smaller; i++) {
            dotsHtml += '<div class="decompose-step">' +
                '<div class="finger-dot decompose-dot"></div>' +
                '<div class="decompose-step-label">+1</div>' +
                '</div>';
        }
        dotsHtml += '</div></div>';
        handsDiv.innerHTML = dotsHtml;

        // Choices for the result
        var resultChoices = [ex.result];
        while (resultChoices.length < 4) {
            var wrong = ex.result + randomInt(-3, 3);
            if (wrong !== ex.result && wrong >= 0 && !resultChoices.includes(wrong)) {
                resultChoices.push(wrong);
            }
        }
        resultChoices = shuffle(resultChoices);
        var correctIndex = resultChoices.indexOf(ex.result);

        resultChoices.forEach(function(choice, i) {
            var btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = colorizeNumber(choice);
            btn.onclick = function() { answerMaths(i, correctIndex, btn); };
            choicesDiv.appendChild(btn);
        });
    }
}

function answerDecompositionPhase1(chosen, correct, btn, ex) {
    if (state.isAnswering) return;
    state.isAnswering = true;

    var feedback = document.getElementById('maths-feedback');
    var allBtns = document.querySelectorAll('#maths-choices .choice-btn');
    allBtns.forEach(function(b) { b.disabled = true; b.blur(); });

    if (chosen === correct) {
        btn.classList.add('correct');
        feedback.textContent = 'Bien ! On d\u00e9compose maintenant.';
        feedback.className = 'feedback success';
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
        feedback.textContent = 'Le plus grand est ' + ex.larger + '. On d\u00e9compose !';
        feedback.className = 'feedback error';
    }

    // Transition to phase 2 after a short delay
    ex.phase = 2;
    showNextButton('maths-next', function() {
        document.getElementById('maths-choices').innerHTML = '';
        document.getElementById('maths-prompt').innerHTML = '';
        document.getElementById('maths-hands').innerHTML = '';
        document.getElementById('maths-feedback').textContent = '';
        document.getElementById('maths-feedback').className = 'feedback';
        requestAnimationFrame(function() { showDecompositionExercise(ex); });
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

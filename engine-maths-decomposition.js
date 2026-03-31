// === MATHS : DÉCOMPOSITION ===

MATHS_TYPES.decomposition = {
    instruction: 'D\u00e9compose l\'op\u00e9ration \u00e9tape par \u00e9tape pour trouver le r\u00e9sultat.',
    showExercise: showDecompositionExercise,
};

function showDecompositionExercise(ex) {
    document.getElementById('maths-feedback').textContent = '';
    document.getElementById('maths-feedback').className = 'feedback';
    document.getElementById('maths-exercise-instruction').textContent =
        MATHS_TYPES.decomposition.instruction;
    var handsDiv = document.getElementById('maths-hands');
    var choicesDiv = document.getElementById('maths-choices');
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

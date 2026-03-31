// === ÉVOLUTION / PROGRESSION ===

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
            // Order: pending (note=0) first, then corrected (0<note<5), then mastered (note>=5)
            var aState = a[1].note === 0 ? 0 : (a[1].note >= 5 ? 2 : 1);
            var bState = b[1].note === 0 ? 0 : (b[1].note >= 5 ? 2 : 1);
            if (aState !== bState) return aState - bState;
            return b[1].errors - a[1].errors;
        });

    // Store for onclick handlers
    window._evolutionErrors = errorEntries;

    if (errorEntries.length === 0) {
        errorsDiv.innerHTML = '<p class="no-errors-text">Aucune erreur pour le moment !</p>';
    } else {
        var pendingCount = errorEntries.filter(function(e) { return e[1].note === 0; }).length;
        var html = '';

        var correctedCount = errorEntries.filter(function(e) { return e[1].note > 0 && e[1].note < 5; }).length;
        if (pendingCount > 0) {
            html += '<button class="replay-all-errors-btn" onclick="replayAllPendingErrors()">Rejouer les erreurs (' + pendingCount + ')</button>';
        }
        if (correctedCount > 0) {
            html += '<button class="replay-all-errors-btn replay-corrected-btn" onclick="replayAllCorrectedErrors()">Rejouer les erreurs corrig\u00e9es (' + correctedCount + ')</button>';
        }

        errorEntries.forEach(function(entry, index) {
            var h = entry[1];
            var sectionIcon = h.section === 'lecture' ? '\uD83D\uDCD6' : h.section === 'maths' ? '\uD83D\uDD22' : '\uD83D\uDD0A';
            var statusClass, statusLabel, actionBtn;
            if (h.note === 0) {
                statusClass = 'error-pending';
                statusLabel = '\u00c0 retravailler';
                actionBtn = '<button class="error-action-btn error-replay-btn" onclick="replayErrorExercise(' + index + ')">Rejouer</button>';
            } else if (h.note >= 5) {
                statusClass = 'error-mastered';
                statusLabel = 'Acquis \u2605';
                actionBtn = '<button class="error-action-btn error-view-btn" onclick="viewExercise(' + index + ')">Voir</button>';
            } else {
                statusClass = 'error-resolved';
                statusLabel = 'Corrig\u00e9 (' + h.note + '/5) \u2713';
                actionBtn = '<button class="error-action-btn error-replay-btn" onclick="replayErrorExercise(' + index + ')">Rejouer</button>';
            }
            html += '<div class="error-row ' + statusClass + '">' +
                '<span class="error-section-icon">' + sectionIcon + '</span>' +
                '<span class="error-label">' + h.label + '</span>' +
                '<span class="error-count">' + h.errors + ' err.</span>' +
                '<span class="error-status">' + statusLabel + '</span>' +
                actionBtn +
                '</div>';
        });
        errorsDiv.innerHTML = html;
    }

    // Statistiques
    const statsDiv = document.getElementById('stats-content');
    const totalExercises = Object.keys(state.exerciseHistory).length;
    const totalErrors = Object.values(state.exerciseHistory).filter(function(h) { return h.errors > 0; }).length;
    const pendingErrors = Object.values(state.exerciseHistory).filter(function(h) { return h.note === 0 && h.errors > 0; }).length;
    const masteredErrors = Object.values(state.exerciseHistory).filter(function(h) { return h.note >= 5 && h.errors > 0; }).length;

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
        <div class="stat-row">
            <span class="stat-label">Erreurs acquises</span>
            <span class="stat-value">${masteredErrors} \u2605</span>
        </div>
    `;

    // Courbes
    renderCharts();
}

// === REJOUER / VOIR EXERCICES DEPUIS ÉVOLUTION ===

function buildExerciseFromHistory(h) {
    if (!h.exerciseData) return null;
    if (h.section === 'maths') {
        var config = MATHS_DATA[h.difficulty] || MATHS_DATA['facile'];
        return recreateMathExercise(h.exerciseData.a, h.exerciseData.b, h.exerciseData.op, config);
    }
    return {
        prompt: h.exerciseData.prompt,
        question: h.exerciseData.question || null,
        choices: h.exerciseData.choices.slice(),
        answer: h.exerciseData.answer,
        instruction: h.exerciseData.instruction || null,
    };
}

function replayErrorExercise(index) {
    var entry = window._evolutionErrors[index];
    if (!entry) return;
    var h = entry[1];
    var ex = buildExerciseFromHistory(h);
    if (!ex) {
        startSectionForReplay(h.section, h.difficulty);
        return;
    }
    startReplaySession([ex], h.section, h.difficulty);
}

function replayAllPendingErrors() {
    var exercises = [];
    var section = null;
    var difficulty = null;
    window._evolutionErrors.forEach(function(entry) {
        var h = entry[1];
        if (h.note !== 0) return;
        var ex = buildExerciseFromHistory(h);
        if (ex) {
            exercises.push({ ex: ex, section: h.section, difficulty: h.difficulty });
            if (!section) { section = h.section; difficulty = h.difficulty; }
        }
    });
    if (exercises.length === 0) return;
    var shuffled = shuffle(exercises);
    var selected = shuffled.slice(0, 5);
    var firstSection = selected[0].section;
    var firstDifficulty = selected[0].difficulty;
    startReplaySession(selected.map(function(e) { return e.ex; }), firstSection, firstDifficulty);
}

function replayAllCorrectedErrors() {
    var exercises = [];
    window._evolutionErrors.forEach(function(entry) {
        var h = entry[1];
        if (h.note <= 0 || h.note >= 5) return; // Skip pending and mastered
        var ex = buildExerciseFromHistory(h);
        if (ex) {
            exercises.push({ ex: ex, section: h.section, difficulty: h.difficulty });
        }
    });
    if (exercises.length === 0) return;
    var shuffled = shuffle(exercises);
    var selected = shuffled.slice(0, 5);
    var firstSection = selected[0].section;
    var firstDifficulty = selected[0].difficulty;
    startReplaySession(selected.map(function(e) { return e.ex; }), firstSection, firstDifficulty);
}

function startSectionForReplay(section, difficulty) {
    if (section === 'lecture') {
        state.lectureDifficulty = difficulty;
    } else if (section === 'maths') {
        state.mathsDifficulty = difficulty;
    } else if (section === 'sons') {
        state.sonsDifficulty = difficulty;
    }
    showSection(section);
}

function startReplaySession(exercises, section, difficulty) {
    if (state.pendingTimeout) {
        clearTimeout(state.pendingTimeout);
        state.pendingTimeout = null;
    }
    state.isAnswering = false;
    state.currentSection = section;
    state.currentExercises = exercises;
    state.currentIndex = 0;
    state.correctCount = 0;

    document.querySelectorAll('.game-section').forEach(function(s) { s.classList.add('hidden'); });
    document.querySelectorAll('.menu-btn').forEach(function(b) { b.classList.remove('active'); });
    document.body.classList.add('in-game');

    if (section === 'lecture') {
        state.lectureDifficulty = difficulty;
        document.getElementById('section-lecture').classList.remove('hidden');
        document.querySelector('[data-section="lecture"]').classList.add('active');
        hideNextButton('lecture-next');
        document.getElementById('lecture-choices').innerHTML = '';
        document.getElementById('lecture-feedback').textContent = '';
        document.getElementById('lecture-feedback').className = 'feedback';
        updateProgress('lecture');
        showLectureExercise();
    } else if (section === 'maths') {
        state.mathsDifficulty = difficulty;
        document.getElementById('section-maths').classList.remove('hidden');
        document.querySelector('[data-section="maths"]').classList.add('active');
        hideNextButton('maths-next');
        document.getElementById('maths-choices').innerHTML = '';
        document.getElementById('maths-feedback').textContent = '';
        document.getElementById('maths-feedback').className = 'feedback';
        updateProgress('maths');
        showMathsExercise();
    } else if (section === 'sons') {
        state.sonsDifficulty = difficulty;
        document.getElementById('section-sons').classList.remove('hidden');
        document.querySelector('[data-section="sons"]').classList.add('active');
        hideNextButton('sons-next');
        document.getElementById('sons-choices').innerHTML = '';
        document.getElementById('sons-feedback').textContent = '';
        document.getElementById('sons-feedback').className = 'feedback';
        updateProgress('sons');
        showSonsExercise();
    }
}

function viewExercise(index) {
    var entry = window._evolutionErrors[index];
    if (!entry) return;
    var h = entry[1];
    var modal = document.getElementById('exercise-view-modal');
    var content = document.getElementById('exercise-view-content');

    var sectionLabel = h.section === 'lecture' ? 'Lecture' : h.section === 'maths' ? 'Maths' : 'Sons';
    var html = '<div class="exercise-view-header">' +
        '<span class="exercise-view-section">' + sectionLabel + ' - ' + h.difficulty + '</span>' +
        '</div>';

    if (h.exerciseData && h.section !== 'maths') {
        var isStory = h.difficulty === 'histoires';
        html += '<div class="exercise-view-prompt' + (isStory ? ' story-text' : '') + '">' + h.exerciseData.prompt + '</div>';
        if (h.exerciseData.question) {
            html += '<div class="exercise-view-question">' + h.exerciseData.question + '</div>';
        }
        if (h.exerciseData.instruction) {
            html += '<div class="exercise-view-question">' + h.exerciseData.instruction + '</div>';
        }
        html += '<div class="exercise-view-choices">';
        h.exerciseData.choices.forEach(function(choice, i) {
            var isCorrect = i === h.exerciseData.answer;
            html += '<div class="exercise-view-choice' + (isCorrect ? ' correct' : '') + '">' +
                choice + (isCorrect ? ' \u2705' : '') + '</div>';
        });
        html += '</div>';
    } else if (h.exerciseData && h.section === 'maths') {
        var a = h.exerciseData.a, b = h.exerciseData.b, op = h.exerciseData.op;
        var result;
        if (op === '+') result = a + b;
        else if (op === '-') result = a - b;
        else result = a * b;
        html += '<div class="exercise-view-prompt">' + a + ' ' + op + ' ' + b + ' = ?</div>';
        html += '<div class="exercise-view-answer">R\u00e9ponse : ' + result + '</div>';
    } else {
        html += '<div class="exercise-view-prompt">' + h.label + '</div>';
    }

    html += '<div class="exercise-view-stats">' +
        '<span>Tentatives : ' + h.attempts + '</span>' +
        '<span>Erreurs : ' + h.errors + '</span>' +
        '<span>R\u00e9ussites : ' + h.successes + '</span>' +
        '</div>';

    content.innerHTML = html;
    modal.classList.remove('hidden');
}

function closeExerciseViewModal() {
    document.getElementById('exercise-view-modal').classList.add('hidden');
}

// === HISTORIQUE JOURNALIER ET COURBES ===

function getTodayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function recordDailySnapshot() {
    var today = getTodayStr();
    var histories = Object.values(state.exerciseHistory);
    var totalExercises = histories.length;
    var pending = 0, corrected = 0, mastered = 0;
    histories.forEach(function(h) {
        if (h.errors > 0) {
            if (h.note === 0) pending++;
            else if (h.note >= 5) mastered++;
            else corrected++;
        }
    });
    var totalDone = state.stats.lecture + state.stats.maths + state.stats.sons;

    var entry = {
        date: today,
        stars: state.stars,
        totalExercises: totalExercises,
        totalDone: totalDone,
        pending: pending,
        corrected: corrected,
        mastered: mastered,
    };

    if (!state.dailyHistory) state.dailyHistory = [];
    var idx = state.dailyHistory.findIndex(function(e) { return e.date === today; });
    if (idx >= 0) {
        state.dailyHistory[idx] = entry;
    } else {
        state.dailyHistory.push(entry);
    }
}

function renderCharts() {
    var chartContainer = document.getElementById('charts-content');
    if (!chartContainer) return;

    var data = state.dailyHistory || [];
    if (data.length < 1) {
        chartContainer.innerHTML = '<p class="no-errors-text">Les courbes appara\u00eetront apr\u00e8s ta premi\u00e8re session de jeu !</p>';
        return;
    }

    // Sort by date
    data = data.slice().sort(function(a, b) { return a.date < b.date ? -1 : 1; });

    chartContainer.innerHTML =
        '<canvas id="chart-progression" width="600" height="250"></canvas>' +
        '<canvas id="chart-errors" width="600" height="250"></canvas>';

    drawLineChart('chart-progression', data, [
        { key: 'stars', label: '\u00c9toiles', color: '#f4c542' },
        { key: 'totalDone', label: 'Exercices faits', color: '#667eea' },
    ], 'Progression');

    drawLineChart('chart-errors', data, [
        { key: 'pending', label: '\u00c0 retravailler', color: '#dc3545' },
        { key: 'corrected', label: 'Corrig\u00e9es', color: '#28a745' },
        { key: 'mastered', label: 'Acquises', color: '#667eea' },
    ], '\u00c9volution des erreurs');
}

function drawLineChart(canvasId, data, series, title) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    // High DPI
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.parentElement.getBoundingClientRect();
    var w = rect.width || 300;
    var h = 220;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    var pad = { top: 35, right: 15, bottom: 45, left: 45 };
    var chartW = w - pad.left - pad.right;
    var chartH = h - pad.top - pad.bottom;

    // Background
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);

    // Title
    ctx.fillStyle = '#555';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, w / 2, 18);

    // Find max value
    var maxVal = 1;
    series.forEach(function(s) {
        data.forEach(function(d) {
            if (d[s.key] > maxVal) maxVal = d[s.key];
        });
    });
    maxVal = Math.ceil(maxVal * 1.15);

    // Grid lines
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    var gridSteps = 4;
    for (var i = 0; i <= gridSteps; i++) {
        var y = pad.top + chartH - (i / gridSteps) * chartH;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(pad.left + chartW, y);
        ctx.stroke();

        ctx.fillStyle = '#aaa';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round((i / gridSteps) * maxVal), pad.left - 5, y + 3);
    }

    // X labels (dates)
    var maxLabels = Math.min(data.length, 10);
    var step = Math.max(1, Math.floor(data.length / maxLabels));
    ctx.fillStyle = '#aaa';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    for (var i = 0; i < data.length; i += step) {
        var x = pad.left + (data.length === 1 ? chartW / 2 : (i / (data.length - 1)) * chartW);
        var label = data[i].date.slice(5); // MM-DD
        ctx.fillText(label, x, h - pad.bottom + 15);
    }

    // Draw lines
    series.forEach(function(s) {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        data.forEach(function(d, i) {
            var x = pad.left + (data.length === 1 ? chartW / 2 : (i / (data.length - 1)) * chartW);
            var y = pad.top + chartH - ((d[s.key] || 0) / maxVal) * chartH;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Dots
        data.forEach(function(d, i) {
            var x = pad.left + (data.length === 1 ? chartW / 2 : (i / (data.length - 1)) * chartW);
            var y = pad.top + chartH - ((d[s.key] || 0) / maxVal) * chartH;
            ctx.beginPath();
            ctx.arc(x, y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });
    });

    // Legend
    var legendX = pad.left;
    var legendY = h - 8;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    series.forEach(function(s, i) {
        var x = legendX + i * (chartW / series.length);
        ctx.fillStyle = s.color;
        ctx.fillRect(x, legendY - 7, 10, 10);
        ctx.fillStyle = '#666';
        ctx.fillText(s.label, x + 13, legendY + 2);
    });
}

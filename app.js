// === DONNÉES DU JEU ===

const LECTURE_DATA = {
    syllabes: {
        exercises: [
            { prompt: "ba", question: "Quel mot commence par « ba » ?", choices: ["bateau", "château", "maison", "jardin"], answer: 0 },
            { prompt: "cha", question: "Quel mot commence par « cha » ?", choices: ["soleil", "chapeau", "papillon", "bouton"], answer: 1 },
            { prompt: "ma", question: "Quel mot commence par « ma » ?", choices: ["pomme", "livre", "maman", "nuage"], answer: 2 },
            { prompt: "pa", question: "Quel mot commence par « pa » ?", choices: ["chien", "papa", "rouge", "table"], answer: 1 },
            { prompt: "to", question: "Quel mot commence par « to » ?", choices: ["tomate", "fleur", "arbre", "lune"], answer: 0 },
            { prompt: "lu", question: "Quel mot commence par « lu » ?", choices: ["chat", "soleil", "pont", "lune"], answer: 3 },
            { prompt: "po", question: "Quel mot commence par « po » ?", choices: ["pomme", "dent", "voiture", "fille"], answer: 0 },
            { prompt: "li", question: "Quel mot commence par « li » ?", choices: ["maison", "table", "livre", "porte"], answer: 2 },
            { prompt: "sa", question: "Quel mot commence par « sa » ?", choices: ["roi", "sapin", "vent", "eau"], answer: 1 },
            { prompt: "ro", question: "Quel mot commence par « ro » ?", choices: ["bleu", "vert", "robot", "jaune"], answer: 2 },
        ]
    },
    mots: {
        exercises: [
            { prompt: "🐱", question: "Quel est ce mot ?", choices: ["chien", "chat", "souris", "lapin"], answer: 1 },
            { prompt: "🌞", question: "Quel est ce mot ?", choices: ["lune", "étoile", "soleil", "nuage"], answer: 2 },
            { prompt: "🏠", question: "Quel est ce mot ?", choices: ["école", "maison", "magasin", "jardin"], answer: 1 },
            { prompt: "🐶", question: "Quel est ce mot ?", choices: ["chat", "oiseau", "poisson", "chien"], answer: 3 },
            { prompt: "🌳", question: "Quel est ce mot ?", choices: ["fleur", "herbe", "arbre", "feuille"], answer: 2 },
            { prompt: "⭐", question: "Quel est ce mot ?", choices: ["étoile", "soleil", "lune", "comète"], answer: 0 },
            { prompt: "🚗", question: "Quel est ce mot ?", choices: ["bus", "train", "vélo", "voiture"], answer: 3 },
            { prompt: "🍎", question: "Quel est ce mot ?", choices: ["orange", "banane", "pomme", "fraise"], answer: 2 },
            { prompt: "📚", question: "Quel est ce mot ?", choices: ["cahier", "livre", "stylo", "crayon"], answer: 1 },
            { prompt: "🐟", question: "Quel est ce mot ?", choices: ["poisson", "baleine", "dauphin", "crabe"], answer: 0 },
        ]
    },
    phrases: {
        exercises: [
            // Animaux
            { prompt: "Le chat dort sur le ___.", question: "Quel mot complète la phrase ?", choices: ["canapé", "ciel", "eau", "vent"], answer: 0 },
            { prompt: "Le ___ aboie fort.", question: "Quel mot complète la phrase ?", choices: ["chat", "poisson", "chien", "oiseau"], answer: 2 },
            { prompt: "Le poisson nage dans l'___.", question: "Quel mot complète la phrase ?", choices: ["arbre", "eau", "herbe", "air"], answer: 1 },
            { prompt: "La ___ donne du lait.", question: "Quel mot complète la phrase ?", choices: ["poule", "vache", "chèvre", "brebis"], answer: 1 },
            { prompt: "Le lapin mange une ___.", question: "Quel mot complète la phrase ?", choices: ["carotte", "pomme", "pizza", "soupe"], answer: 0 },
            { prompt: "L'oiseau ___ dans le ciel.", question: "Quel mot complète la phrase ?", choices: ["mange", "dort", "vole", "nage"], answer: 2 },
            { prompt: "Le papillon a de jolies ___.", question: "Quel mot complète la phrase ?", choices: ["pattes", "dents", "ailes", "cornes"], answer: 2 },
            { prompt: "La poule pond un ___.", question: "Quel mot complète la phrase ?", choices: ["lait", "oeuf", "pain", "fruit"], answer: 1 },
            // Famille et maison
            { prompt: "Maman prépare le ___.", question: "Quel mot complète la phrase ?", choices: ["soleil", "repas", "livre", "arbre"], answer: 1 },
            { prompt: "Papa lit un ___.", question: "Quel mot complète la phrase ?", choices: ["chien", "livre", "arbre", "mur"], answer: 1 },
            { prompt: "Ma soeur joue dans le ___.", question: "Quel mot complète la phrase ?", choices: ["jardin", "nuage", "vent", "soleil"], answer: 0 },
            { prompt: "Je dors dans mon ___.", question: "Quel mot complète la phrase ?", choices: ["école", "lit", "vélo", "sac"], answer: 1 },
            { prompt: "On regarde la ___ le soir.", question: "Quel mot complète la phrase ?", choices: ["porte", "fenêtre", "télévision", "chaise"], answer: 2 },
            { prompt: "Je me brosse les ___.", question: "Quel mot complète la phrase ?", choices: ["pieds", "yeux", "dents", "bras"], answer: 2 },
            { prompt: "Je mets mes ___ pour sortir.", question: "Quel mot complète la phrase ?", choices: ["lunettes", "chaussures", "gants", "cahiers"], answer: 1 },
            { prompt: "Mamie fait un gros ___.", question: "Quel mot complète la phrase ?", choices: ["câlin", "bruit", "dessin", "saut"], answer: 0 },
            // École
            { prompt: "Je vais à l'___.", question: "Quel mot complète la phrase ?", choices: ["voiture", "école", "maison", "chat"], answer: 1 },
            { prompt: "J'écris avec un ___.", question: "Quel mot complète la phrase ?", choices: ["ballon", "crayon", "couteau", "peigne"], answer: 1 },
            { prompt: "La maîtresse lit une ___.", question: "Quel mot complète la phrase ?", choices: ["chanson", "histoire", "table", "fenêtre"], answer: 1 },
            { prompt: "Je dessine avec des ___.", question: "Quel mot complète la phrase ?", choices: ["ciseaux", "feutres", "livres", "règles"], answer: 1 },
            { prompt: "Je range mes affaires dans mon ___.", question: "Quel mot complète la phrase ?", choices: ["sac", "lit", "bain", "plat"], answer: 0 },
            { prompt: "À la récré, on joue au ___.", question: "Quel mot complète la phrase ?", choices: ["ballon", "piano", "puzzle", "livre"], answer: 0 },
            // Nature et météo
            { prompt: "Il fait ___ dehors.", question: "Quel mot complète la phrase ?", choices: ["livre", "table", "beau", "poisson"], answer: 2 },
            { prompt: "Le ___ est bleu.", question: "Quel mot complète la phrase ?", choices: ["herbe", "terre", "ciel", "feu"], answer: 2 },
            { prompt: "La ___ brille la nuit.", question: "Quel mot complète la phrase ?", choices: ["lune", "pluie", "fleur", "route"], answer: 0 },
            { prompt: "Il ___ des flocons blancs.", question: "Quel mot complète la phrase ?", choices: ["pleut", "neige", "vente", "grêle"], answer: 1 },
            { prompt: "Les fleurs poussent au ___.", question: "Quel mot complète la phrase ?", choices: ["hiver", "automne", "printemps", "soir"], answer: 2 },
            { prompt: "L'arbre a perdu ses ___.", question: "Quel mot complète la phrase ?", choices: ["racines", "branches", "feuilles", "fleurs"], answer: 2 },
            { prompt: "Le soleil se ___ le matin.", question: "Quel mot complète la phrase ?", choices: ["couche", "cache", "lève", "dort"], answer: 2 },
            { prompt: "La pluie tombe sur le ___.", question: "Quel mot complète la phrase ?", choices: ["toit", "ciel", "soleil", "vent"], answer: 0 },
            // Nourriture
            { prompt: "Je mange une ___.", question: "Quel mot complète la phrase ?", choices: ["chaise", "pomme", "table", "route"], answer: 1 },
            { prompt: "Je bois un verre de ___.", question: "Quel mot complète la phrase ?", choices: ["pain", "eau", "fromage", "salade"], answer: 1 },
            { prompt: "Le matin, je mange du ___.", question: "Quel mot complète la phrase ?", choices: ["dîner", "goûter", "pain", "soir"], answer: 2 },
            { prompt: "Le gâteau est très ___.", question: "Quel mot complète la phrase ?", choices: ["salé", "bon", "froid", "dur"], answer: 1 },
            { prompt: "On coupe le pain avec un ___.", question: "Quel mot complète la phrase ?", choices: ["stylo", "couteau", "balai", "livre"], answer: 1 },
            // Actions du quotidien
            { prompt: "Le soir, je prends mon ___.", question: "Quel mot complète la phrase ?", choices: ["bain", "vélo", "sac", "ballon"], answer: 0 },
            { prompt: "Je ___ mes mains avant de manger.", question: "Quel mot complète la phrase ?", choices: ["coupe", "lave", "cache", "montre"], answer: 1 },
            { prompt: "Il faut ___ avant de traverser.", question: "Quel mot complète la phrase ?", choices: ["courir", "chanter", "regarder", "sauter"], answer: 2 },
            { prompt: "Je ___ un bisou à maman.", question: "Quel mot complète la phrase ?", choices: ["fais", "mange", "lis", "jette"], answer: 0 },
            { prompt: "On ___ les bougies sur le gâteau.", question: "Quel mot complète la phrase ?", choices: ["mange", "souffle", "coupe", "jette"], answer: 1 },
        ]
    }
};

const MATHS_DATA = {
    doigts: { min: 1, max: 5, operations: ['+'], showHands: true },
    facile: { min: 1, max: 10, operations: ['+'] },
    moyen: { min: 1, max: 20, operations: ['+', '-'] },
    difficile: { min: 1, max: 50, operations: ['+', '-', '×'] }
};

// Représentation des nombres avec des doigts dessinés
function getHandEmojis(n) {
    if (n <= 0) return '';
    let html = '';
    for (let i = 0; i < n; i++) {
        html += '<span class="finger">🖐</span>';
    }
    return html;
}

function getFingerDots(n) {
    if (n <= 0) return '';
    let html = '';
    for (let i = 0; i < n; i++) {
        html += '<span class="finger-dot"></span>';
    }
    return html;
}

const SONS_DATA = {
    // Niveau 1 : Entendre un son dans un mot (phonème)
    // Les choix erronés ne contiennent JAMAIS le phonème demandé, même écrit différemment
    "sons-simples": {
        exercises: [
            // Voyelles
            { prompt: "🔊 [a]", speak: "a", instruction: "Quel mot contient le son « a » ?", choices: ["chat", "loup", "jeu", "feu"], answer: 0 },
            { prompt: "🔊 [i]", speak: "i", instruction: "Quel mot contient le son « i » ?", choices: ["bout", "four", "tapis", "moule"], answer: 2 },
            { prompt: "🔊 [u]", speak: "u", instruction: "Quel mot contient le son « u » (comme dans lune) ?", choices: ["mur", "mot", "bras", "vent"], answer: 0 },
            { prompt: "🔊 [o]", speak: "o", instruction: "Quel mot contient le son « o » ?", choices: ["lit", "sac", "mur", "vélo"], answer: 3 },
            { prompt: "🔊 [é]", speak: "bé", instruction: "Quel mot contient le son « é » ?", choices: ["bébé", "chat", "loup", "dur"], answer: 0 },
            { prompt: "🔊 [è]", speak: "lait", instruction: "Quel mot contient le son « è » ?", choices: ["mur", "forêt", "doux", "goût"], answer: 1 },
            // Consonnes
            { prompt: "🔊 [f]", speak: "fe", instruction: "Quel mot contient le son « f » ?", choices: ["girafe", "chat", "loup", "banane"], answer: 0 },
            { prompt: "🔊 [s]", speak: "se", instruction: "Quel mot contient le son « s » ?", choices: ["cerise", "table", "four", "arbre"], answer: 0 },
            { prompt: "🔊 [k]", speak: "ke", instruction: "Quel mot contient le son « k » ?", choices: ["journal", "sable", "école", "lune"], answer: 2 },
            { prompt: "🔊 [j]", speak: "je", instruction: "Quel mot contient le son « j » (comme dans jeu) ?", choices: ["gilet", "balle", "pomme", "robe"], answer: 0 },
            // Sons nasaux
            { prompt: "🔊 [on]", speak: "on", instruction: "Quel mot contient le son « on » ?", choices: ["maison", "lapin", "salade", "vélo"], answer: 0 },
            { prompt: "🔊 [an]", speak: "an", instruction: "Quel mot contient le son « an » ?", choices: ["maman", "souris", "tapis", "loup"], answer: 0 },
            { prompt: "🔊 [in]", speak: "in", instruction: "Quel mot contient le son « in » ?", choices: ["pomme", "lapin", "mouton", "gâteau"], answer: 1 },
            // Sons composés
            { prompt: "🔊 [ou]", speak: "ou", instruction: "Quel mot contient le son « ou » ?", choices: ["mouton", "matin", "sapin", "balai"], answer: 0 },
            { prompt: "🔊 [oi]", speak: "oi", instruction: "Quel mot contient le son « oi » ?", choices: ["jardin", "fleur", "voiture", "ballon"], answer: 2 },
            { prompt: "🔊 [ch]", speak: "che", instruction: "Quel mot contient le son « ch » ?", choices: ["garçon", "cheval", "ballon", "table"], answer: 1 },
        ]
    },

    // Niveau 2 : Reconnaître comment un son S'ÉCRIT (graphème)
    "graphemes": {
        exercises: [
            { prompt: "eau", speak: "o, comme dans eau", instruction: "Quel mot s'écrit avec « eau » ?", choices: ["gâteau", "vélo", "auto", "moto"], answer: 0 },
            { prompt: "au", speak: "o, comme dans au", instruction: "Quel mot s'écrit avec « au » ?", choices: ["château", "bateau", "beau", "vélo"], answer: 0 },
            { prompt: "ph", speak: "fe, comme dans ph", instruction: "Quel mot s'écrit avec « ph » ?", choices: ["photo", "girafe", "café", "soif"], answer: 0 },
            { prompt: "f", speak: "fe, comme dans f", instruction: "Quel mot s'écrit avec « f » (pas « ph ») ?", choices: ["éléphant", "phare", "forêt", "pharmacie"], answer: 2 },
            { prompt: "ss", speak: "se, comme dans ss", instruction: "Quel mot s'écrit avec « ss » ?", choices: ["poisson", "garçon", "cerise", "sable"], answer: 0 },
            { prompt: "ç", speak: "se, comme dans cé cédille", instruction: "Quel mot s'écrit avec « ç » ?", choices: ["garçon", "singe", "salade", "poisson"], answer: 0 },
            { prompt: "c", speak: "se, comme dans c", instruction: "Quel mot a le son « s » écrit avec un « c » ?", choices: ["cerise", "sable", "tasse", "garçon"], answer: 0 },
            { prompt: "qu", speak: "ke, comme dans qu", instruction: "Quel mot s'écrit avec « qu » ?", choices: ["quatre", "carotte", "koala", "classe"], answer: 0 },
            { prompt: "k", speak: "ke, comme dans k", instruction: "Quel mot s'écrit avec « k » ?", choices: ["koala", "quatre", "coq", "carte"], answer: 0 },
            { prompt: "en", speak: "an, comme dans en", instruction: "Quel mot s'écrit avec « en » ?", choices: ["enfant", "maman", "chambre", "lampe"], answer: 0 },
            { prompt: "an", speak: "an, comme dans an", instruction: "Quel mot s'écrit avec « an » ?", choices: ["maman", "enfant", "vent", "temps"], answer: 0 },
            { prompt: "am", speak: "an, comme dans am", instruction: "Quel mot s'écrit avec « am » ?", choices: ["chambre", "maman", "enfant", "vent"], answer: 0 },
            { prompt: "ain", speak: "in, comme dans ain", instruction: "Quel mot s'écrit avec « ain » ?", choices: ["pain", "lapin", "timbre", "plein"], answer: 0 },
            { prompt: "ein", speak: "in, comme dans ein", instruction: "Quel mot s'écrit avec « ein » ?", choices: ["peinture", "sapin", "main", "simple"], answer: 0 },
            { prompt: "g", speak: "je, comme dans g", instruction: "Quel mot a le son « j » écrit avec un « g » ?", choices: ["girafe", "jardin", "jouet", "jupe"], answer: 0 },
            { prompt: "ai", speak: "lait, comme dans ai", instruction: "Quel mot s'écrit avec « ai » ?", choices: ["maison", "forêt", "fête", "mère"], answer: 0 },
            { prompt: "ê", speak: "fête, comme dans e accent circonflexe", instruction: "Quel mot s'écrit avec « ê » ?", choices: ["forêt", "maison", "balai", "neige"], answer: 0 },
        ]
    },

    // Niveau 3 : Confusions fréquentes en dyslexie
    "confusions": {
        exercises: [
            { prompt: "b ou d ?", speak: "banane", instruction: "Comment s'écrit « __anane » ?", choices: ["banane", "danane"], answer: 0 },
            { prompt: "b ou d ?", speak: "bouche", instruction: "Comment s'écrit « __ouche » ?", choices: ["douche", "bouche"], answer: 1 },
            { prompt: "b ou d ?", speak: "domino", instruction: "Comment s'écrit « __omino » ?", choices: ["bomino", "domino"], answer: 1 },
            { prompt: "b ou d ?", speak: "bille", instruction: "Comment s'écrit « __ille » (petite boule ronde) ?", choices: ["dille", "bille"], answer: 1 },
            { prompt: "p ou q ?", speak: "poule", instruction: "Comment s'écrit « __oule » (un oiseau) ?", choices: ["poule", "qoule"], answer: 0 },
            { prompt: "p ou q ?", speak: "quatre", instruction: "Comment s'écrit « __atre » (le chiffre 4) ?", choices: ["patre", "quatre"], answer: 1 },
            { prompt: "f ou v ?", speak: "voiture", instruction: "Comment s'écrit « __oiture » ?", choices: ["foiture", "voiture"], answer: 1 },
            { prompt: "f ou v ?", speak: "fleur", instruction: "Comment s'écrit « __leur » (dans le jardin) ?", choices: ["fleur", "vleur"], answer: 0 },
            { prompt: "f ou v ?", speak: "vélo", instruction: "Comment s'écrit « __élo » ?", choices: ["félo", "vélo"], answer: 1 },
            { prompt: "t ou d ?", speak: "table", instruction: "Comment s'écrit « __able » (un meuble) ?", choices: ["dable", "table"], answer: 1 },
            { prompt: "t ou d ?", speak: "dent", instruction: "Comment s'écrit « __ent » (dans la bouche) ?", choices: ["dent", "tent"], answer: 0 },
            { prompt: "m ou n ?", speak: "maman", instruction: "Comment s'écrit « __aman » ?", choices: ["maman", "naman"], answer: 0 },
            { prompt: "m ou n ?", speak: "nuage", instruction: "Comment s'écrit « __uage » (dans le ciel) ?", choices: ["muage", "nuage"], answer: 1 },
            { prompt: "on ou an ?", speak: "mouton", instruction: "J'entends « on » ou « an » dans « mout____ » ?", choices: ["mouton", "moutan"], answer: 0 },
            { prompt: "on ou an ?", speak: "maman", instruction: "J'entends « on » ou « an » dans « mam____ » ?", choices: ["mamon", "maman"], answer: 1 },
            { prompt: "in ou an ?", speak: "lapin", instruction: "J'entends « in » ou « an » dans « lap____ » ?", choices: ["lapan", "lapin"], answer: 1 },
            { prompt: "in ou an ?", speak: "éléphant", instruction: "J'entends « in » ou « an » dans « élèph____ » ?", choices: ["éléphint", "éléphant"], answer: 1 },
        ]
    }
};

const TROPHEES = [
    { id: "first_star", name: "Première étoile", icon: "⭐", condition: "Gagner 1 étoile", threshold: 1, type: "stars" },
    { id: "ten_stars", name: "10 étoiles !", icon: "🌟", condition: "Gagner 10 étoiles", threshold: 10, type: "stars" },
    { id: "fifty_stars", name: "Super étoile", icon: "💫", condition: "Gagner 50 étoiles", threshold: 50, type: "stars" },
    { id: "lecture_5", name: "Petit lecteur", icon: "📖", condition: "5 exercices de lecture", threshold: 5, type: "lecture" },
    { id: "lecture_20", name: "Grand lecteur", icon: "📚", condition: "20 exercices de lecture", threshold: 20, type: "lecture" },
    { id: "maths_5", name: "Petit matheux", icon: "🔢", condition: "5 exercices de maths", threshold: 5, type: "maths" },
    { id: "maths_20", name: "Grand matheux", icon: "🧮", condition: "20 exercices de maths", threshold: 20, type: "maths" },
    { id: "sons_5", name: "Bonne oreille", icon: "👂", condition: "5 exercices de sons", threshold: 5, type: "sons" },
    { id: "perfect", name: "Sans faute !", icon: "🏅", condition: "Série parfaite (5/5)", threshold: 1, type: "perfect" },
];

const ENCOURAGEMENTS = [
    "Super, Baptiste ! 👏",
    "Excellent ! Tu es génial ! 🌟",
    "Bravo, continue comme ça ! 💪",
    "Trop fort ! 🎯",
    "Magnifique ! ✨",
    "Tu progresses vite ! 🚀",
];

const ENCOURAGEMENTS_ERROR = [
    "Presque ! Essaie encore 😊",
    "Pas tout à fait, courage ! 💪",
    "Ce n'est pas grave, on réessaie ! 🌈",
];

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
    };
    localStorage.setItem('baptize_state', JSON.stringify(toSave));
}

function loadState() {
    const saved = localStorage.getItem('baptize_state');
    if (saved) {
        const data = JSON.parse(saved);
        state.stars = data.stars || 0;
        state.stats = data.stats || { lecture: 0, maths: 0, sons: 0, perfectSeries: 0 };
        state.trophees = data.trophees || [];
    }
    updateStarsDisplay();
}

// === NAVIGATION ===

function showSection(section) {
    // Cacher toutes les sections
    document.querySelectorAll('.game-section').forEach(s => s.classList.add('hidden'));

    // Désactiver tous les boutons
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));

    // Afficher la section choisie
    document.getElementById('section-' + section).classList.remove('hidden');
    document.querySelector(`[data-section="${section}"]`).classList.add('active');

    state.currentSection = section;

    // Mode compact quand un exercice est en cours
    if (section === 'recompenses') {
        document.body.classList.remove('in-game');
    } else {
        document.body.classList.add('in-game');
    }

    // Lancer le jeu correspondant
    if (section === 'lecture') startLecture();
    else if (section === 'maths') startMaths();
    else if (section === 'sons') startSons();
    else if (section === 'recompenses') showTrophees();
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
    state.currentExercises = shuffle([...data.exercises]).slice(0, 5);
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
    document.getElementById('lecture-prompt').textContent = ex.prompt;
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

    // Désactiver tous les boutons
    allBtns.forEach(b => { b.disabled = true; b.blur(); });

    if (chosen === correct) {
        btn.classList.add('correct');
        feedback.textContent = randomItem(ENCOURAGEMENTS);
        feedback.className = 'feedback success';
        state.correctCount++;
        state.stars++;
        state.stats.lecture++;
        updateStarsDisplay();
        saveState();
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
        feedback.textContent = randomItem(ENCOURAGEMENTS_ERROR);
        feedback.className = 'feedback error';
        state.stats.lecture++;
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

    for (let i = 0; i < 5; i++) {
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
        // Mode doigts : uniquement des additions simples avec résultat <= 10
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

    // Générer des mauvaises réponses proches
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

    return { promptHtml, choices, answer: correctIndex, a, b, showHands: !!config.showHands };
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

    // Afficher les doigts si mode doigts
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
        updateStarsDisplay();
        saveState();
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
        feedback.textContent = randomItem(ENCOURAGEMENTS_ERROR);
        feedback.className = 'feedback error';
        state.stats.maths++;
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
    state.currentExercises = shuffle([...data.exercises]).slice(0, 5);
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

    // Afficher le prompt avec le bouton haut-parleur si un son est disponible
    const promptDiv = document.getElementById('sons-prompt');
    if (ex.speak) {
        promptDiv.innerHTML = ex.prompt + ' <button class="speak-btn" onclick="speakFrench(\'' + ex.speak.replace(/'/g, "\\'") + '\')">🔊</button>';
        // Jouer le son automatiquement
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
        updateStarsDisplay();
        saveState();
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
        feedback.textContent = randomItem(ENCOURAGEMENTS_ERROR);
        feedback.className = 'feedback error';
        state.stats.sons++;
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
        state.stars += 3; // Bonus pour série parfaite
        updateStarsDisplay();
        saveState();
    }

    checkTrophees();

    // Afficher la modal
    const modal = document.getElementById('bravo-modal');
    const animation = document.getElementById('bravo-animation');
    const title = document.getElementById('bravo-title');
    const message = document.getElementById('bravo-message');
    const starsDiv = document.getElementById('bravo-stars');

    if (isPerfect) {
        animation.textContent = '🎉';
        title.textContent = 'Parfait, Baptiste ! 🏆';
        message.textContent = `${correct}/${total} — Incroyable, aucune erreur ! +3 étoiles bonus !`;
    } else if (correct >= 3) {
        animation.textContent = '👏';
        title.textContent = 'Bravo Baptiste ! 😊';
        message.textContent = `${correct}/${total} — C'est très bien, continue comme ça !`;
    } else {
        animation.textContent = '💪';
        title.textContent = 'Courage Baptiste ! 🌈';
        message.textContent = `${correct}/${total} — Tu vas y arriver, on réessaie !`;
    }

    starsDiv.textContent = '⭐'.repeat(correct);
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('bravo-modal').classList.add('hidden');
    // Relancer la même section
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

function showTrophees() {
    checkTrophees();

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

    const statsDiv = document.getElementById('stats-content');
    statsDiv.innerHTML = `
        <div class="stat-row">
            <span class="stat-label">Étoiles gagnées</span>
            <span class="stat-value">${state.stars} ⭐</span>
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
            <span class="stat-label">Séries parfaites</span>
            <span class="stat-value">${state.stats.perfectSeries} 🏅</span>
        </div>
        <div class="stat-row">
            <span class="stat-label">Trophées débloqués</span>
            <span class="stat-value">${state.trophees.length}/${TROPHEES.length}</span>
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
            <span class="next-btn-label">Suivant ▶</span>
        </button>
    `;

    const btn = document.getElementById(`${containerId}-btn`);
    const progress = container.querySelector('.next-timer-progress');

    // Lancer l'animation du cercle
    progress.style.animationDuration = NEXT_TIMER_MS + 'ms';
    progress.classList.add('next-timer-animate');

    // Auto-passer au bout de 15s
    state.pendingTimeout = setTimeout(() => {
        state.pendingTimeout = null;
        hideNextButton(containerId);
        callback();
    }, NEXT_TIMER_MS);

    // Clic pour passer tout de suite
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

// === SYNTHÈSE VOCALE ===

function speakFrench(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.8; // Un peu plus lent pour un enfant
    utterance.pitch = 1.0;

    // Essayer de trouver une voix française
    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find(v => v.lang.startsWith('fr'));
    if (frVoice) utterance.voice = frVoice;

    window.speechSynthesis.speak(utterance);
}

// === UTILITAIRES ===

function colorizeNumber(n) {
    const str = String(n);
    if (str === '0') return '<span class="digit-zero">0</span>';
    if (str.length === 1) return `<span class="digit-unit">${str}</span>`;

    let html = '';
    for (let i = 0; i < str.length; i++) {
        const digit = str[i];
        const position = str.length - 1 - i; // 0 = unités, 1 = dizaines, 2 = centaines...
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

loadState();

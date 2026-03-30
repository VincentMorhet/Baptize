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
    histoires: {
        exercises: [
            { prompt: "Le chat dort sur le canapé. Maman ouvre la porte. Le chat se réveille et court vers elle.", question: "Où dort le chat ?", choices: ["sur le lit", "sur le canapé", "par terre", "sur la table"], answer: 1 },
            { prompt: "Tom met ses bottes. Il prend son parapluie. Il sort sous la pluie.", question: "Quel temps fait-il ?", choices: ["il neige", "il fait soleil", "il pleut", "il y a du vent"], answer: 2 },
            { prompt: "Léa cueille une pomme dans le jardin. Elle la lave. Elle la mange avec plaisir.", question: "Que fait Léa avec la pomme ?", choices: ["elle la donne", "elle la mange", "elle la jette", "elle la cache"], answer: 1 },
            { prompt: "Le chien joue dans le parc. Il court après un ballon. Il est très content.", question: "Après quoi court le chien ?", choices: ["un chat", "un oiseau", "un ballon", "un os"], answer: 2 },
            { prompt: "Il fait nuit. Les étoiles brillent dans le ciel. Hugo va au lit.", question: "Quand se passe l'histoire ?", choices: ["le matin", "le midi", "l'après-midi", "la nuit"], answer: 3 },
            { prompt: "Papa prépare un gâteau. Il casse deux œufs. Il met du chocolat.", question: "Que prépare papa ?", choices: ["une soupe", "un gâteau", "une salade", "un sandwich"], answer: 1 },
            { prompt: "Marie dessine un soleil. Elle prend des crayons jaunes. Son dessin est très joli.", question: "Que dessine Marie ?", choices: ["une fleur", "une maison", "un soleil", "un arbre"], answer: 2 },
            { prompt: "Le bus arrive à l'école. Les enfants descendent. Ils vont dans la classe.", question: "Où vont les enfants ?", choices: ["au parc", "à la maison", "dans la classe", "au magasin"], answer: 2 },
            { prompt: "Mamie tricote une écharpe. Elle est rouge et douce. C'est un cadeau pour Léo.", question: "Pour qui est l'écharpe ?", choices: ["pour maman", "pour Léo", "pour mamie", "pour papa"], answer: 1 },
            { prompt: "Le petit oiseau est tombé du nid. Une fille le trouve. Elle le remet dans l'arbre.", question: "Où la fille remet l'oiseau ?", choices: ["dans une cage", "dans l'arbre", "dans la maison", "dans le jardin"], answer: 1 },
        ]
    },
    phrases: {
        exercises: [
            { prompt: "Le chat dort sur le ___.", question: "Quel mot complète la phrase ?", choices: ["canapé", "ciel", "eau", "vent"], answer: 0 },
            { prompt: "Le ___ aboie fort.", question: "Quel mot complète la phrase ?", choices: ["chat", "poisson", "chien", "oiseau"], answer: 2 },
            { prompt: "Le poisson nage dans l'___.", question: "Quel mot complète la phrase ?", choices: ["arbre", "eau", "herbe", "air"], answer: 1 },
            { prompt: "La ___ donne du lait.", question: "Quel mot complète la phrase ?", choices: ["poule", "vache", "chèvre", "brebis"], answer: 1 },
            { prompt: "Le lapin mange une ___.", question: "Quel mot complète la phrase ?", choices: ["carotte", "pomme", "pizza", "soupe"], answer: 0 },
            { prompt: "L'oiseau ___ dans le ciel.", question: "Quel mot complète la phrase ?", choices: ["mange", "dort", "vole", "nage"], answer: 2 },
            { prompt: "Le papillon a de jolies ___.", question: "Quel mot complète la phrase ?", choices: ["pattes", "dents", "ailes", "cornes"], answer: 2 },
            { prompt: "La poule pond un ___.", question: "Quel mot complète la phrase ?", choices: ["lait", "oeuf", "pain", "fruit"], answer: 1 },
            { prompt: "Maman prépare le ___.", question: "Quel mot complète la phrase ?", choices: ["soleil", "repas", "livre", "arbre"], answer: 1 },
            { prompt: "Papa lit un ___.", question: "Quel mot complète la phrase ?", choices: ["chien", "livre", "arbre", "mur"], answer: 1 },
            { prompt: "Ma soeur joue dans le ___.", question: "Quel mot complète la phrase ?", choices: ["jardin", "nuage", "vent", "soleil"], answer: 0 },
            { prompt: "Je dors dans mon ___.", question: "Quel mot complète la phrase ?", choices: ["école", "lit", "vélo", "sac"], answer: 1 },
            { prompt: "On regarde la ___ le soir.", question: "Quel mot complète la phrase ?", choices: ["porte", "fenêtre", "télévision", "chaise"], answer: 2 },
            { prompt: "Je me brosse les ___.", question: "Quel mot complète la phrase ?", choices: ["pieds", "yeux", "dents", "bras"], answer: 2 },
            { prompt: "Je mets mes ___ pour sortir.", question: "Quel mot complète la phrase ?", choices: ["lunettes", "chaussures", "gants", "cahiers"], answer: 1 },
            { prompt: "Mamie fait un gros ___.", question: "Quel mot complète la phrase ?", choices: ["câlin", "bruit", "dessin", "saut"], answer: 0 },
            { prompt: "Je vais à l'___.", question: "Quel mot complète la phrase ?", choices: ["voiture", "école", "maison", "chat"], answer: 1 },
            { prompt: "J'écris avec un ___.", question: "Quel mot complète la phrase ?", choices: ["ballon", "crayon", "couteau", "peigne"], answer: 1 },
            { prompt: "La maîtresse lit une ___.", question: "Quel mot complète la phrase ?", choices: ["chanson", "histoire", "table", "fenêtre"], answer: 1 },
            { prompt: "Je dessine avec des ___.", question: "Quel mot complète la phrase ?", choices: ["ciseaux", "feutres", "livres", "règles"], answer: 1 },
            { prompt: "Je range mes affaires dans mon ___.", question: "Quel mot complète la phrase ?", choices: ["sac", "lit", "bain", "plat"], answer: 0 },
            { prompt: "À la récré, on joue au ___.", question: "Quel mot complète la phrase ?", choices: ["ballon", "piano", "puzzle", "livre"], answer: 0 },
            { prompt: "Il fait ___ dehors.", question: "Quel mot complète la phrase ?", choices: ["livre", "table", "beau", "poisson"], answer: 2 },
            { prompt: "Le ___ est bleu.", question: "Quel mot complète la phrase ?", choices: ["herbe", "terre", "ciel", "feu"], answer: 2 },
            { prompt: "La ___ brille la nuit.", question: "Quel mot complète la phrase ?", choices: ["lune", "pluie", "fleur", "route"], answer: 0 },
            { prompt: "Il ___ des flocons blancs.", question: "Quel mot complète la phrase ?", choices: ["pleut", "neige", "vente", "grêle"], answer: 1 },
            { prompt: "Les fleurs poussent au ___.", question: "Quel mot complète la phrase ?", choices: ["hiver", "automne", "printemps", "soir"], answer: 2 },
            { prompt: "L'arbre a perdu ses ___.", question: "Quel mot complète la phrase ?", choices: ["racines", "branches", "feuilles", "fleurs"], answer: 2 },
            { prompt: "Le soleil se ___ le matin.", question: "Quel mot complète la phrase ?", choices: ["couche", "cache", "lève", "dort"], answer: 2 },
            { prompt: "La pluie tombe sur le ___.", question: "Quel mot complète la phrase ?", choices: ["toit", "ciel", "soleil", "vent"], answer: 0 },
            { prompt: "Je mange une ___.", question: "Quel mot complète la phrase ?", choices: ["chaise", "pomme", "table", "route"], answer: 1 },
            { prompt: "Je bois un verre de ___.", question: "Quel mot complète la phrase ?", choices: ["pain", "eau", "fromage", "salade"], answer: 1 },
            { prompt: "Le matin, je mange du ___.", question: "Quel mot complète la phrase ?", choices: ["dîner", "goûter", "pain", "soir"], answer: 2 },
            { prompt: "Le gâteau est très ___.", question: "Quel mot complète la phrase ?", choices: ["salé", "bon", "froid", "dur"], answer: 1 },
            { prompt: "On coupe le pain avec un ___.", question: "Quel mot complète la phrase ?", choices: ["stylo", "couteau", "balai", "livre"], answer: 1 },
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
    "sons-simples": {
        exercises: [
            { prompt: "[a]", instruction: "Quel mot contient le son « a » ?", choices: ["chat", "loup", "jeu", "feu"], answer: 0 },
            { prompt: "[i]", instruction: "Quel mot contient le son « i » ?", choices: ["bout", "four", "tapis", "moule"], answer: 2 },
            { prompt: "[u]", instruction: "Quel mot contient le son « u » (comme dans lune) ?", choices: ["mur", "mot", "bras", "vent"], answer: 0 },
            { prompt: "[o]", instruction: "Quel mot contient le son « o » ?", choices: ["lit", "sac", "mur", "vélo"], answer: 3 },
            { prompt: "[é]", instruction: "Quel mot contient le son « é » ?", choices: ["bébé", "chat", "loup", "dur"], answer: 0 },
            { prompt: "[è]", instruction: "Quel mot contient le son « è » ?", choices: ["mur", "forêt", "doux", "goût"], answer: 1 },
            { prompt: "[f]", instruction: "Quel mot contient le son « f » ?", choices: ["girafe", "chat", "loup", "banane"], answer: 0 },
            { prompt: "[s]", instruction: "Quel mot contient le son « s » ?", choices: ["cerise", "table", "four", "arbre"], answer: 0 },
            { prompt: "[k]", instruction: "Quel mot contient le son « k » ?", choices: ["journal", "sable", "école", "lune"], answer: 2 },
            { prompt: "[j]", instruction: "Quel mot contient le son « j » (comme dans jeu) ?", choices: ["gilet", "balle", "pomme", "robe"], answer: 0 },
            { prompt: "[on]", instruction: "Quel mot contient le son « on » ?", choices: ["maison", "lapin", "salade", "vélo"], answer: 0 },
            { prompt: "[an]", instruction: "Quel mot contient le son « an » ?", choices: ["maman", "souris", "tapis", "loup"], answer: 0 },
            { prompt: "[in]", instruction: "Quel mot contient le son « in » ?", choices: ["pomme", "lapin", "mouton", "gâteau"], answer: 1 },
            { prompt: "[ou]", instruction: "Quel mot contient le son « ou » ?", choices: ["mouton", "matin", "sapin", "balai"], answer: 0 },
            { prompt: "[oi]", instruction: "Quel mot contient le son « oi » ?", choices: ["jardin", "fleur", "voiture", "ballon"], answer: 2 },
            { prompt: "[ch]", instruction: "Quel mot contient le son « ch » ?", choices: ["garçon", "cheval", "ballon", "table"], answer: 1 },
        ]
    },
    "graphemes": {
        exercises: [
            { prompt: "eau", speak: "gâteau", instruction: "Quel mot s'écrit avec « eau » ?", choices: ["gâteau", "vélo", "auto", "moto"], answer: 0 },
            { prompt: "au", speak: "château", instruction: "Quel mot s'écrit avec « au » ?", choices: ["château", "bateau", "beau", "vélo"], answer: 0 },
            { prompt: "ph", speak: "photo", instruction: "Quel mot s'écrit avec « ph » ?", choices: ["photo", "girafe", "café", "soif"], answer: 0 },
            { prompt: "f", speak: "forêt", instruction: "Quel mot s'écrit avec « f » (pas « ph ») ?", choices: ["éléphant", "phare", "forêt", "pharmacie"], answer: 2 },
            { prompt: "ss", speak: "poisson", instruction: "Quel mot s'écrit avec « ss » ?", choices: ["poisson", "garçon", "cerise", "sable"], answer: 0 },
            { prompt: "ç", speak: "garçon", instruction: "Quel mot s'écrit avec « ç » ?", choices: ["garçon", "singe", "salade", "poisson"], answer: 0 },
            { prompt: "c", speak: "cerise", instruction: "Quel mot a le son « s » écrit avec un « c » ?", choices: ["cerise", "sable", "tasse", "garçon"], answer: 0 },
            { prompt: "qu", speak: "quatre", instruction: "Quel mot s'écrit avec « qu » ?", choices: ["quatre", "carotte", "koala", "classe"], answer: 0 },
            { prompt: "k", speak: "koala", instruction: "Quel mot s'écrit avec « k » ?", choices: ["koala", "quatre", "coq", "carte"], answer: 0 },
            { prompt: "en", speak: "enfant", instruction: "Quel mot s'écrit avec « en » ?", choices: ["enfant", "maman", "chambre", "lampe"], answer: 0 },
            { prompt: "an", speak: "maman", instruction: "Quel mot s'écrit avec « an » ?", choices: ["maman", "enfant", "vent", "temps"], answer: 0 },
            { prompt: "am", speak: "chambre", instruction: "Quel mot s'écrit avec « am » ?", choices: ["chambre", "maman", "enfant", "vent"], answer: 0 },
            { prompt: "ain", speak: "pain", instruction: "Quel mot s'écrit avec « ain » ?", choices: ["pain", "lapin", "timbre", "plein"], answer: 0 },
            { prompt: "ein", speak: "peinture", instruction: "Quel mot s'écrit avec « ein » ?", choices: ["peinture", "sapin", "main", "simple"], answer: 0 },
            { prompt: "g", speak: "girafe", instruction: "Quel mot a le son « j » écrit avec un « g » ?", choices: ["girafe", "jardin", "jouet", "jupe"], answer: 0 },
            { prompt: "ai", speak: "maison", instruction: "Quel mot s'écrit avec « ai » ?", choices: ["maison", "forêt", "fête", "mère"], answer: 0 },
            { prompt: "ê", speak: "forêt", instruction: "Quel mot s'écrit avec « ê » ?", choices: ["forêt", "maison", "balai", "neige"], answer: 0 },
        ]
    },
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
    "Super ! 👏",
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

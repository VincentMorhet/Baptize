-- =============================================
-- Table des exercices (lecture + sons)
-- =============================================
CREATE TABLE exercises (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    section     TEXT NOT NULL CHECK (section IN ('lecture', 'sons')),
    difficulty  TEXT NOT NULL,
    sort_order  INT NOT NULL DEFAULT 0,

    prompt      TEXT NOT NULL,
    choices     JSONB NOT NULL,
    answer      INT NOT NULL,

    question    TEXT,
    instruction TEXT,
    speak       TEXT,

    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

    UNIQUE (section, difficulty, sort_order)
);

CREATE INDEX idx_exercises_section_difficulty ON exercises (section, difficulty);

ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exercises are readable by everyone"
    ON exercises FOR SELECT
    USING (true);


-- =============================================
-- Table des définitions de trophées
-- =============================================
CREATE TABLE trophy_definitions (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    icon        TEXT NOT NULL,
    condition   TEXT NOT NULL,
    threshold   INT NOT NULL,
    type        TEXT NOT NULL CHECK (type IN ('stars', 'lecture', 'maths', 'sons', 'perfect')),
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE trophy_definitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trophy definitions are readable by everyone"
    ON trophy_definitions FOR SELECT
    USING (true);


-- =============================================
-- Données : LECTURE - Syllabes (10)
-- =============================================
INSERT INTO exercises (section, difficulty, sort_order, prompt, question, choices, answer) VALUES
('lecture', 'syllabes', 1,  'ba',  'Quel mot commence par « ba » ?',  '["bateau", "château", "maison", "jardin"]', 0),
('lecture', 'syllabes', 2,  'cha', 'Quel mot commence par « cha » ?', '["soleil", "chapeau", "papillon", "bouton"]', 1),
('lecture', 'syllabes', 3,  'ma',  'Quel mot commence par « ma » ?',  '["pomme", "livre", "maman", "nuage"]', 2),
('lecture', 'syllabes', 4,  'pa',  'Quel mot commence par « pa » ?',  '["chien", "papa", "rouge", "table"]', 1),
('lecture', 'syllabes', 5,  'to',  'Quel mot commence par « to » ?',  '["tomate", "fleur", "arbre", "lune"]', 0),
('lecture', 'syllabes', 6,  'lu',  'Quel mot commence par « lu » ?',  '["chat", "soleil", "pont", "lune"]', 3),
('lecture', 'syllabes', 7,  'po',  'Quel mot commence par « po » ?',  '["pomme", "dent", "voiture", "fille"]', 0),
('lecture', 'syllabes', 8,  'li',  'Quel mot commence par « li » ?',  '["maison", "table", "livre", "porte"]', 2),
('lecture', 'syllabes', 9,  'sa',  'Quel mot commence par « sa » ?',  '["roi", "sapin", "vent", "eau"]', 1),
('lecture', 'syllabes', 10, 'ro',  'Quel mot commence par « ro » ?',  '["bleu", "vert", "robot", "jaune"]', 2);

-- =============================================
-- Données : LECTURE - Mots (10)
-- =============================================
INSERT INTO exercises (section, difficulty, sort_order, prompt, question, choices, answer) VALUES
('lecture', 'mots', 1,  '🐱', 'Quel est ce mot ?', '["chien", "chat", "souris", "lapin"]', 1),
('lecture', 'mots', 2,  '🌞', 'Quel est ce mot ?', '["lune", "étoile", "soleil", "nuage"]', 2),
('lecture', 'mots', 3,  '🏠', 'Quel est ce mot ?', '["école", "maison", "magasin", "jardin"]', 1),
('lecture', 'mots', 4,  '🐶', 'Quel est ce mot ?', '["chat", "oiseau", "poisson", "chien"]', 3),
('lecture', 'mots', 5,  '🌳', 'Quel est ce mot ?', '["fleur", "herbe", "arbre", "feuille"]', 2),
('lecture', 'mots', 6,  '⭐', 'Quel est ce mot ?', '["étoile", "soleil", "lune", "comète"]', 0),
('lecture', 'mots', 7,  '🚗', 'Quel est ce mot ?', '["bus", "train", "vélo", "voiture"]', 3),
('lecture', 'mots', 8,  '🍎', 'Quel est ce mot ?', '["orange", "banane", "pomme", "fraise"]', 2),
('lecture', 'mots', 9,  '📚', 'Quel est ce mot ?', '["cahier", "livre", "stylo", "crayon"]', 1),
('lecture', 'mots', 10, '🐟', 'Quel est ce mot ?', '["poisson", "baleine", "dauphin", "crabe"]', 0);

-- =============================================
-- Données : LECTURE - Phrases (40)
-- =============================================
INSERT INTO exercises (section, difficulty, sort_order, prompt, question, choices, answer) VALUES
('lecture', 'phrases', 1,  'Le chat dort sur le ___.', 'Quel mot complète la phrase ?', '["canapé", "ciel", "eau", "vent"]', 0),
('lecture', 'phrases', 2,  'Le ___ aboie fort.', 'Quel mot complète la phrase ?', '["chat", "poisson", "chien", "oiseau"]', 2),
('lecture', 'phrases', 3,  'Le poisson nage dans l''___.', 'Quel mot complète la phrase ?', '["arbre", "eau", "herbe", "air"]', 1),
('lecture', 'phrases', 4,  'La ___ donne du lait.', 'Quel mot complète la phrase ?', '["poule", "vache", "chèvre", "brebis"]', 1),
('lecture', 'phrases', 5,  'Le lapin mange une ___.', 'Quel mot complète la phrase ?', '["carotte", "pomme", "pizza", "soupe"]', 0),
('lecture', 'phrases', 6,  'L''oiseau ___ dans le ciel.', 'Quel mot complète la phrase ?', '["mange", "dort", "vole", "nage"]', 2),
('lecture', 'phrases', 7,  'Le papillon a de jolies ___.', 'Quel mot complète la phrase ?', '["pattes", "dents", "ailes", "cornes"]', 2),
('lecture', 'phrases', 8,  'La poule pond un ___.', 'Quel mot complète la phrase ?', '["lait", "oeuf", "pain", "fruit"]', 1),
('lecture', 'phrases', 9,  'Maman prépare le ___.', 'Quel mot complète la phrase ?', '["soleil", "repas", "livre", "arbre"]', 1),
('lecture', 'phrases', 10, 'Papa lit un ___.', 'Quel mot complète la phrase ?', '["chien", "livre", "arbre", "mur"]', 1),
('lecture', 'phrases', 11, 'Ma soeur joue dans le ___.', 'Quel mot complète la phrase ?', '["jardin", "nuage", "vent", "soleil"]', 0),
('lecture', 'phrases', 12, 'Je dors dans mon ___.', 'Quel mot complète la phrase ?', '["école", "lit", "vélo", "sac"]', 1),
('lecture', 'phrases', 13, 'On regarde la ___ le soir.', 'Quel mot complète la phrase ?', '["porte", "fenêtre", "télévision", "chaise"]', 2),
('lecture', 'phrases', 14, 'Je me brosse les ___.', 'Quel mot complète la phrase ?', '["pieds", "yeux", "dents", "bras"]', 2),
('lecture', 'phrases', 15, 'Je mets mes ___ pour sortir.', 'Quel mot complète la phrase ?', '["lunettes", "chaussures", "gants", "cahiers"]', 1),
('lecture', 'phrases', 16, 'Mamie fait un gros ___.', 'Quel mot complète la phrase ?', '["câlin", "bruit", "dessin", "saut"]', 0),
('lecture', 'phrases', 17, 'Je vais à l''___.', 'Quel mot complète la phrase ?', '["voiture", "école", "maison", "chat"]', 1),
('lecture', 'phrases', 18, 'J''écris avec un ___.', 'Quel mot complète la phrase ?', '["ballon", "crayon", "couteau", "peigne"]', 1),
('lecture', 'phrases', 19, 'La maîtresse lit une ___.', 'Quel mot complète la phrase ?', '["chanson", "histoire", "table", "fenêtre"]', 1),
('lecture', 'phrases', 20, 'Je dessine avec des ___.', 'Quel mot complète la phrase ?', '["ciseaux", "feutres", "livres", "règles"]', 1),
('lecture', 'phrases', 21, 'Je range mes affaires dans mon ___.', 'Quel mot complète la phrase ?', '["sac", "lit", "bain", "plat"]', 0),
('lecture', 'phrases', 22, 'À la récré, on joue au ___.', 'Quel mot complète la phrase ?', '["ballon", "piano", "puzzle", "livre"]', 0),
('lecture', 'phrases', 23, 'Il fait ___ dehors.', 'Quel mot complète la phrase ?', '["livre", "table", "beau", "poisson"]', 2),
('lecture', 'phrases', 24, 'Le ___ est bleu.', 'Quel mot complète la phrase ?', '["herbe", "terre", "ciel", "feu"]', 2),
('lecture', 'phrases', 25, 'La ___ brille la nuit.', 'Quel mot complète la phrase ?', '["lune", "pluie", "fleur", "route"]', 0),
('lecture', 'phrases', 26, 'Il ___ des flocons blancs.', 'Quel mot complète la phrase ?', '["pleut", "neige", "vente", "grêle"]', 1),
('lecture', 'phrases', 27, 'Les fleurs poussent au ___.', 'Quel mot complète la phrase ?', '["hiver", "automne", "printemps", "soir"]', 2),
('lecture', 'phrases', 28, 'L''arbre a perdu ses ___.', 'Quel mot complète la phrase ?', '["racines", "branches", "feuilles", "fleurs"]', 2),
('lecture', 'phrases', 29, 'Le soleil se ___ le matin.', 'Quel mot complète la phrase ?', '["couche", "cache", "lève", "dort"]', 2),
('lecture', 'phrases', 30, 'La pluie tombe sur le ___.', 'Quel mot complète la phrase ?', '["toit", "ciel", "soleil", "vent"]', 0),
('lecture', 'phrases', 31, 'Je mange une ___.', 'Quel mot complète la phrase ?', '["chaise", "pomme", "table", "route"]', 1),
('lecture', 'phrases', 32, 'Je bois un verre de ___.', 'Quel mot complète la phrase ?', '["pain", "eau", "fromage", "salade"]', 1),
('lecture', 'phrases', 33, 'Le matin, je mange du ___.', 'Quel mot complète la phrase ?', '["dîner", "goûter", "pain", "soir"]', 2),
('lecture', 'phrases', 34, 'Le gâteau est très ___.', 'Quel mot complète la phrase ?', '["salé", "bon", "froid", "dur"]', 1),
('lecture', 'phrases', 35, 'On coupe le pain avec un ___.', 'Quel mot complète la phrase ?', '["stylo", "couteau", "balai", "livre"]', 1),
('lecture', 'phrases', 36, 'Le soir, je prends mon ___.', 'Quel mot complète la phrase ?', '["bain", "vélo", "sac", "ballon"]', 0),
('lecture', 'phrases', 37, 'Je ___ mes mains avant de manger.', 'Quel mot complète la phrase ?', '["coupe", "lave", "cache", "montre"]', 1),
('lecture', 'phrases', 38, 'Il faut ___ avant de traverser.', 'Quel mot complète la phrase ?', '["courir", "chanter", "regarder", "sauter"]', 2),
('lecture', 'phrases', 39, 'Je ___ un bisou à maman.', 'Quel mot complète la phrase ?', '["fais", "mange", "lis", "jette"]', 0),
('lecture', 'phrases', 40, 'On ___ les bougies sur le gâteau.', 'Quel mot complète la phrase ?', '["mange", "souffle", "coupe", "jette"]', 1);

-- =============================================
-- Données : SONS - Sons simples (16)
-- =============================================
INSERT INTO exercises (section, difficulty, sort_order, prompt, instruction, choices, answer) VALUES
('sons', 'sons-simples', 1,  '[a]',  'Quel mot contient le son « a » ?',                       '["chat", "loup", "jeu", "feu"]', 0),
('sons', 'sons-simples', 2,  '[i]',  'Quel mot contient le son « i » ?',                       '["bout", "four", "tapis", "moule"]', 2),
('sons', 'sons-simples', 3,  '[u]',  'Quel mot contient le son « u » (comme dans lune) ?',     '["mur", "mot", "bras", "vent"]', 0),
('sons', 'sons-simples', 4,  '[o]',  'Quel mot contient le son « o » ?',                       '["lit", "sac", "mur", "vélo"]', 3),
('sons', 'sons-simples', 5,  '[é]',  'Quel mot contient le son « é » ?',                       '["bébé", "chat", "loup", "dur"]', 0),
('sons', 'sons-simples', 6,  '[è]',  'Quel mot contient le son « è » ?',                       '["mur", "forêt", "doux", "goût"]', 1),
('sons', 'sons-simples', 7,  '[f]',  'Quel mot contient le son « f » ?',                       '["girafe", "chat", "loup", "banane"]', 0),
('sons', 'sons-simples', 8,  '[s]',  'Quel mot contient le son « s » ?',                       '["cerise", "table", "four", "arbre"]', 0),
('sons', 'sons-simples', 9,  '[k]',  'Quel mot contient le son « k » ?',                       '["journal", "sable", "école", "lune"]', 2),
('sons', 'sons-simples', 10, '[j]',  'Quel mot contient le son « j » (comme dans jeu) ?',      '["gilet", "balle", "pomme", "robe"]', 0),
('sons', 'sons-simples', 11, '[on]', 'Quel mot contient le son « on » ?',                      '["maison", "lapin", "salade", "vélo"]', 0),
('sons', 'sons-simples', 12, '[an]', 'Quel mot contient le son « an » ?',                      '["maman", "souris", "tapis", "loup"]', 0),
('sons', 'sons-simples', 13, '[in]', 'Quel mot contient le son « in » ?',                      '["pomme", "lapin", "mouton", "gâteau"]', 1),
('sons', 'sons-simples', 14, '[ou]', 'Quel mot contient le son « ou » ?',                      '["mouton", "matin", "sapin", "balai"]', 0),
('sons', 'sons-simples', 15, '[oi]', 'Quel mot contient le son « oi » ?',                      '["jardin", "fleur", "voiture", "ballon"]', 2),
('sons', 'sons-simples', 16, '[ch]', 'Quel mot contient le son « ch » ?',                      '["garçon", "cheval", "ballon", "table"]', 1);

-- =============================================
-- Données : SONS - Graphèmes (17)
-- =============================================
INSERT INTO exercises (section, difficulty, sort_order, prompt, instruction, choices, answer, speak) VALUES
('sons', 'graphemes', 1,  'eau', 'Quel mot s''écrit avec « eau » ?',                        '["gâteau", "vélo", "auto", "moto"]', 0, 'gâteau'),
('sons', 'graphemes', 2,  'au',  'Quel mot s''écrit avec « au » ?',                         '["château", "bateau", "beau", "vélo"]', 0, 'château'),
('sons', 'graphemes', 3,  'ph',  'Quel mot s''écrit avec « ph » ?',                         '["photo", "girafe", "café", "soif"]', 0, 'photo'),
('sons', 'graphemes', 4,  'f',   'Quel mot s''écrit avec « f » (pas « ph ») ?',             '["éléphant", "phare", "forêt", "pharmacie"]', 2, 'forêt'),
('sons', 'graphemes', 5,  'ss',  'Quel mot s''écrit avec « ss » ?',                         '["poisson", "garçon", "cerise", "sable"]', 0, 'poisson'),
('sons', 'graphemes', 6,  'ç',   'Quel mot s''écrit avec « ç » ?',                          '["garçon", "singe", "salade", "poisson"]', 0, 'garçon'),
('sons', 'graphemes', 7,  'c',   'Quel mot a le son « s » écrit avec un « c » ?',           '["cerise", "sable", "tasse", "garçon"]', 0, 'cerise'),
('sons', 'graphemes', 8,  'qu',  'Quel mot s''écrit avec « qu » ?',                         '["quatre", "carotte", "koala", "classe"]', 0, 'quatre'),
('sons', 'graphemes', 9,  'k',   'Quel mot s''écrit avec « k » ?',                          '["koala", "quatre", "coq", "carte"]', 0, 'koala'),
('sons', 'graphemes', 10, 'en',  'Quel mot s''écrit avec « en » ?',                         '["enfant", "maman", "chambre", "lampe"]', 0, 'enfant'),
('sons', 'graphemes', 11, 'an',  'Quel mot s''écrit avec « an » ?',                         '["maman", "enfant", "vent", "temps"]', 0, 'maman'),
('sons', 'graphemes', 12, 'am',  'Quel mot s''écrit avec « am » ?',                         '["chambre", "maman", "enfant", "vent"]', 0, 'chambre'),
('sons', 'graphemes', 13, 'ain', 'Quel mot s''écrit avec « ain » ?',                        '["pain", "lapin", "timbre", "plein"]', 0, 'pain'),
('sons', 'graphemes', 14, 'ein', 'Quel mot s''écrit avec « ein » ?',                        '["peinture", "sapin", "main", "simple"]', 0, 'peinture'),
('sons', 'graphemes', 15, 'g',   'Quel mot a le son « j » écrit avec un « g » ?',           '["girafe", "jardin", "jouet", "jupe"]', 0, 'girafe'),
('sons', 'graphemes', 16, 'ai',  'Quel mot s''écrit avec « ai » ?',                         '["maison", "forêt", "fête", "mère"]', 0, 'maison'),
('sons', 'graphemes', 17, 'ê',   'Quel mot s''écrit avec « ê » ?',                          '["forêt", "maison", "balai", "neige"]', 0, 'forêt');

-- =============================================
-- Données : SONS - Confusions (17)
-- =============================================
INSERT INTO exercises (section, difficulty, sort_order, prompt, instruction, choices, answer, speak) VALUES
('sons', 'confusions', 1,  'b ou d ?',   'Comment s''écrit « __anane » ?',                           '["banane", "danane"]', 0, 'banane'),
('sons', 'confusions', 2,  'b ou d ?',   'Comment s''écrit « __ouche » ?',                           '["douche", "bouche"]', 1, 'bouche'),
('sons', 'confusions', 3,  'b ou d ?',   'Comment s''écrit « __omino » ?',                           '["bomino", "domino"]', 1, 'domino'),
('sons', 'confusions', 4,  'b ou d ?',   'Comment s''écrit « __ille » (petite boule ronde) ?',       '["dille", "bille"]', 1, 'bille'),
('sons', 'confusions', 5,  'p ou q ?',   'Comment s''écrit « __oule » (un oiseau) ?',                '["poule", "qoule"]', 0, 'poule'),
('sons', 'confusions', 6,  'p ou q ?',   'Comment s''écrit « __atre » (le chiffre 4) ?',             '["patre", "quatre"]', 1, 'quatre'),
('sons', 'confusions', 7,  'f ou v ?',   'Comment s''écrit « __oiture » ?',                          '["foiture", "voiture"]', 1, 'voiture'),
('sons', 'confusions', 8,  'f ou v ?',   'Comment s''écrit « __leur » (dans le jardin) ?',           '["fleur", "vleur"]', 0, 'fleur'),
('sons', 'confusions', 9,  'f ou v ?',   'Comment s''écrit « __élo » ?',                             '["félo", "vélo"]', 1, 'vélo'),
('sons', 'confusions', 10, 't ou d ?',   'Comment s''écrit « __able » (un meuble) ?',                '["dable", "table"]', 1, 'table'),
('sons', 'confusions', 11, 't ou d ?',   'Comment s''écrit « __ent » (dans la bouche) ?',            '["dent", "tent"]', 0, 'dent'),
('sons', 'confusions', 12, 'm ou n ?',   'Comment s''écrit « __aman » ?',                            '["maman", "naman"]', 0, 'maman'),
('sons', 'confusions', 13, 'm ou n ?',   'Comment s''écrit « __uage » (dans le ciel) ?',             '["muage", "nuage"]', 1, 'nuage'),
('sons', 'confusions', 14, 'on ou an ?', 'J''entends « on » ou « an » dans « mout____ » ?',          '["mouton", "moutan"]', 0, 'mouton'),
('sons', 'confusions', 15, 'on ou an ?', 'J''entends « on » ou « an » dans « mam____ » ?',           '["mamon", "maman"]', 1, 'maman'),
('sons', 'confusions', 16, 'in ou an ?', 'J''entends « in » ou « an » dans « lap____ » ?',           '["lapan", "lapin"]', 1, 'lapin'),
('sons', 'confusions', 17, 'in ou an ?', 'J''entends « in » ou « an » dans « élèph____ » ?',         '["éléphint", "éléphant"]', 1, 'éléphant');

-- =============================================
-- Données : Trophées (9)
-- =============================================
INSERT INTO trophy_definitions (id, name, icon, condition, threshold, type, sort_order) VALUES
('first_star',  'Première étoile', '⭐', 'Gagner 1 étoile',           1,  'stars',   1),
('ten_stars',   '10 étoiles !',    '🌟', 'Gagner 10 étoiles',         10, 'stars',   2),
('fifty_stars', 'Super étoile',    '💫', 'Gagner 50 étoiles',         50, 'stars',   3),
('lecture_5',   'Petit lecteur',   '📖', '5 exercices de lecture',     5,  'lecture',  4),
('lecture_20',  'Grand lecteur',   '📚', '20 exercices de lecture',    20, 'lecture',  5),
('maths_5',     'Petit matheux',   '🔢', '5 exercices de maths',      5,  'maths',   6),
('maths_20',    'Grand matheux',   '🧮', '20 exercices de maths',     20, 'maths',   7),
('sons_5',      'Bonne oreille',   '👂', '5 exercices de sons',       5,  'sons',    8),
('perfect',     'Sans faute !',    '🏅', 'Série parfaite (5/5)',      1,  'perfect', 9);

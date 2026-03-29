// === DONNÉES DU JEU ===

const LECTURE_DATA = {
    syllabes: {
        exercises: [
            // Original 10
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
            // bo, bu, be, bi, bou, bra, bri
            { prompt: "bo", question: "Quel mot commence par « bo » ?", choices: ["bonbon", "renard", "chaise", "fenêtre"], answer: 0 },
            { prompt: "bu", question: "Quel mot commence par « bu » ?", choices: ["table", "bureau", "maison", "porte"], answer: 1 },
            { prompt: "be", question: "Quel mot commence par « be » ?", choices: ["rouge", "jardin", "bébé", "soleil"], answer: 2 },
            { prompt: "bi", question: "Quel mot commence par « bi » ?", choices: ["bille", "tasse", "nappe", "plume"], answer: 0 },
            { prompt: "bou", question: "Quel mot commence par « bou » ?", choices: ["crayon", "bouton", "lapin", "tigre"], answer: 1 },
            { prompt: "bra", question: "Quel mot commence par « bra » ?", choices: ["mouton", "plage", "bras", "forêt"], answer: 2 },
            { prompt: "bri", question: "Quel mot commence par « bri » ?", choices: ["brique", "sable", "herbe", "nuage"], answer: 0 },
            // ca, co, cu, cra, cro
            { prompt: "ca", question: "Quel mot commence par « ca » ?", choices: ["fleur", "canard", "rideau", "peigne"], answer: 1 },
            { prompt: "co", question: "Quel mot commence par « co » ?", choices: ["cochon", "panier", "lampe", "drapeau"], answer: 0 },
            { prompt: "cu", question: "Quel mot commence par « cu » ?", choices: ["souris", "ballon", "cuisine", "menton"], answer: 2 },
            { prompt: "cra", question: "Quel mot commence par « cra » ?", choices: ["peigne", "crayon", "mouche", "feuille"], answer: 1 },
            { prompt: "cro", question: "Quel mot commence par « cro » ?", choices: ["crocodile", "girafe", "étoile", "parapluie"], answer: 0 },
            // da, de, di, do, dou, dra
            { prompt: "da", question: "Quel mot commence par « da » ?", choices: ["tigre", "dauphin", "papier", "bougie"], answer: 1 },
            { prompt: "de", question: "Quel mot commence par « de » ?", choices: ["dessin", "cheval", "rivière", "salade"], answer: 0 },
            { prompt: "di", question: "Quel mot commence par « di » ?", choices: ["fourchette", "montagne", "dinosaure", "écharpe"], answer: 2 },
            { prompt: "do", question: "Quel mot commence par « do » ?", choices: ["domino", "panier", "sabot", "girafe"], answer: 0 },
            { prompt: "dou", question: "Quel mot commence par « dou » ?", choices: ["lumière", "douche", "violon", "cahier"], answer: 1 },
            { prompt: "dra", question: "Quel mot commence par « dra » ?", choices: ["balcon", "cerise", "drapeau", "poisson"], answer: 2 },
            // fa, fi, fo, fu, fla, fro
            { prompt: "fa", question: "Quel mot commence par « fa » ?", choices: ["famille", "grenouille", "tortue", "miroir"], answer: 0 },
            { prompt: "fi", question: "Quel mot commence par « fi » ?", choices: ["jardin", "ficelle", "chapeau", "arrosoir"], answer: 1 },
            { prompt: "fo", question: "Quel mot commence par « fo » ?", choices: ["oiseau", "rivière", "forêt", "château"], answer: 2 },
            { prompt: "fu", question: "Quel mot commence par « fu » ?", choices: ["fusée", "lapin", "cabane", "assiette"], answer: 0 },
            { prompt: "fla", question: "Quel mot commence par « fla » ?", choices: ["chaussure", "flamme", "voiture", "montagne"], answer: 1 },
            { prompt: "fro", question: "Quel mot commence par « fro » ?", choices: ["planète", "coussin", "fromage", "rideau"], answer: 2 },
            // ga, go, gu, gra, gri
            { prompt: "ga", question: "Quel mot commence par « ga » ?", choices: ["gâteau", "étoile", "miroir", "ballon"], answer: 0 },
            { prompt: "go", question: "Quel mot commence par « go » ?", choices: ["plume", "gobelet", "fenêtre", "ceinture"], answer: 1 },
            { prompt: "gu", question: "Quel mot commence par « gu » ?", choices: ["souris", "pingouin", "guitare", "cheval"], answer: 2 },
            { prompt: "gra", question: "Quel mot commence par « gra » ?", choices: ["graine", "lézard", "bonnet", "fourmi"], answer: 0 },
            { prompt: "gri", question: "Quel mot commence par « gri » ?", choices: ["papier", "grille", "tapis", "chemise"], answer: 1 },
            // ja, jo, ju
            { prompt: "ja", question: "Quel mot commence par « ja » ?", choices: ["jardin", "lunettes", "voiture", "assiette"], answer: 0 },
            { prompt: "jo", question: "Quel mot commence par « jo » ?", choices: ["panier", "jouet", "rideau", "bateau"], answer: 1 },
            { prompt: "ju", question: "Quel mot commence par « ju » ?", choices: ["peigne", "tigre", "jupe", "marteau"], answer: 2 },
            // la, le, lo
            { prompt: "la", question: "Quel mot commence par « la » ?", choices: ["lapin", "citron", "nuage", "rideau"], answer: 0 },
            { prompt: "le", question: "Quel mot commence par « le » ?", choices: ["miroir", "lettre", "fourmi", "cloche"], answer: 1 },
            { prompt: "lo", question: "Quel mot commence par « lo » ?", choices: ["chameau", "branche", "loup", "serviette"], answer: 2 },
            // mo, mu, mi, mou
            { prompt: "mo", question: "Quel mot commence par « mo » ?", choices: ["mouton", "poisson", "salade", "biscuit"], answer: 0 },
            { prompt: "mu", question: "Quel mot commence par « mu » ?", choices: ["raisin", "musique", "armoire", "cabane"], answer: 1 },
            { prompt: "mi", question: "Quel mot commence par « mi » ?", choices: ["seau", "parapluie", "miroir", "crayon"], answer: 2 },
            { prompt: "mou", question: "Quel mot commence par « mou » ?", choices: ["mouche", "feuille", "étoile", "hibou"], answer: 0 },
            // na, no, nu, ni
            { prompt: "na", question: "Quel mot commence par « na » ?", choices: ["tulipe", "nature", "violon", "bouton"], answer: 1 },
            { prompt: "no", question: "Quel mot commence par « no » ?", choices: ["tigre", "cerise", "noisette", "ballon"], answer: 2 },
            { prompt: "nu", question: "Quel mot commence par « nu » ?", choices: ["nuage", "panier", "sifflet", "guitare"], answer: 0 },
            { prompt: "ni", question: "Quel mot commence par « ni » ?", choices: ["oiseau", "niche", "citron", "flûte"], answer: 1 },
            // pi, pla, pou, pra, pri
            { prompt: "pi", question: "Quel mot commence par « pi » ?", choices: ["dragon", "miroir", "pirate", "chaise"], answer: 2 },
            { prompt: "pla", question: "Quel mot commence par « pla » ?", choices: ["plage", "mouton", "hibou", "feuille"], answer: 0 },
            { prompt: "pou", question: "Quel mot commence par « pou » ?", choices: ["jardin", "poule", "salade", "cabane"], answer: 1 },
            { prompt: "pra", question: "Quel mot commence par « pra » ?", choices: ["tapis", "hibou", "prairie", "lampe"], answer: 2 },
            { prompt: "pri", question: "Quel mot commence par « pri » ?", choices: ["prince", "rivière", "étoile", "fourmi"], answer: 0 },
            // ra, re, ri, ru
            { prompt: "ra", question: "Quel mot commence par « ra » ?", choices: ["souris", "raisin", "plume", "bouton"], answer: 1 },
            { prompt: "re", question: "Quel mot commence par « re » ?", choices: ["dragon", "cheval", "renard", "coussin"], answer: 2 },
            { prompt: "ri", question: "Quel mot commence par « ri » ?", choices: ["rivière", "ballon", "chaise", "panier"], answer: 0 },
            { prompt: "ru", question: "Quel mot commence par « ru » ?", choices: ["rideau", "ruban", "jardin", "fenêtre"], answer: 1 },
            // si, so, su
            { prompt: "si", question: "Quel mot commence par « si » ?", choices: ["tortue", "étoile", "sifflet", "marteau"], answer: 2 },
            { prompt: "so", question: "Quel mot commence par « so » ?", choices: ["soleil", "cheval", "mouton", "rideau"], answer: 0 },
            { prompt: "su", question: "Quel mot commence par « su » ?", choices: ["pantalon", "sucre", "chameau", "ballon"], answer: 1 },
            // ta, te, ti, tou, tra, tri
            { prompt: "ta", question: "Quel mot commence par « ta » ?", choices: ["bougie", "lézard", "table", "plume"], answer: 2 },
            { prompt: "te", question: "Quel mot commence par « te » ?", choices: ["terre", "coussin", "ballon", "fenêtre"], answer: 0 },
            { prompt: "ti", question: "Quel mot commence par « ti » ?", choices: ["cheval", "tigre", "mouton", "jardin"], answer: 1 },
            { prompt: "tou", question: "Quel mot commence par « tou » ?", choices: ["poisson", "étoile", "toucan", "miroir"], answer: 2 },
            { prompt: "tra", question: "Quel mot commence par « tra » ?", choices: ["train", "souris", "bateau", "coussin"], answer: 0 },
            { prompt: "tri", question: "Quel mot commence par « tri » ?", choices: ["étoile", "triangle", "poisson", "feuille"], answer: 1 },
            // va, ve, vi, vo, vou
            { prompt: "va", question: "Quel mot commence par « va » ?", choices: ["crayon", "rideau", "vache", "peigne"], answer: 2 },
            { prompt: "ve", question: "Quel mot commence par « ve » ?", choices: ["ventilateur", "chaussure", "papillon", "mouton"], answer: 0 },
            { prompt: "vi", question: "Quel mot commence par « vi » ?", choices: ["coussin", "village", "grenouille", "ballon"], answer: 1 },
            { prompt: "vo", question: "Quel mot commence par « vo » ?", choices: ["peigne", "rideau", "voiture", "mouton"], answer: 2 },
            { prompt: "vou", question: "Quel mot commence par « vou » ?", choices: ["bougie", "plume", "écharpe", "vouloir"], answer: 3 },
            // blan, bleu, bro, cou, cha, che, chi, cho, cla, clo, cri, dé, é, en, ou, pho
            { prompt: "blan", question: "Quel mot commence par « blan » ?", choices: ["blanc", "rouge", "jaune", "violet"], answer: 0 },
            { prompt: "bleu", question: "Quel mot commence par « bleu » ?", choices: ["rouge", "bleuet", "jaune", "violet"], answer: 1 },
            { prompt: "bro", question: "Quel mot commence par « bro » ?", choices: ["coussin", "cheval", "brosse", "fenêtre"], answer: 2 },
            { prompt: "cou", question: "Quel mot commence par « cou » ?", choices: ["couteau", "ballon", "rideau", "fenêtre"], answer: 0 },
            { prompt: "che", question: "Quel mot commence par « che » ?", choices: ["mouton", "cheval", "bateau", "coussin"], answer: 1 },
            { prompt: "chi", question: "Quel mot commence par « chi » ?", choices: ["ballon", "rideau", "chien", "plume"], answer: 2 },
            { prompt: "cho", question: "Quel mot commence par « cho » ?", choices: ["chocolat", "grenouille", "coussin", "rideau"], answer: 0 },
            { prompt: "cla", question: "Quel mot commence par « cla » ?", choices: ["mouton", "classe", "bateau", "rideau"], answer: 1 },
            { prompt: "clo", question: "Quel mot commence par « clo » ?", choices: ["ballon", "chaise", "cloche", "coussin"], answer: 2 },
            { prompt: "cri", question: "Quel mot commence par « cri » ?", choices: ["crise", "ballon", "rideau", "mouton"], answer: 0 },
            { prompt: "dé", question: "Quel mot commence par « dé » ?", choices: ["cheval", "déjeuner", "ballon", "rideau"], answer: 1 },
            { prompt: "é", question: "Quel mot commence par « é » ?", choices: ["ballon", "mouton", "éléphant", "rideau"], answer: 2 },
            { prompt: "en", question: "Quel mot commence par « en » ?", choices: ["enfant", "ballon", "rideau", "coussin"], answer: 0 },
            { prompt: "ou", question: "Quel mot commence par « ou » ?", choices: ["ballon", "ourson", "rideau", "coussin"], answer: 1 },
            { prompt: "pho", question: "Quel mot commence par « pho » ?", choices: ["ballon", "rideau", "photo", "coussin"], answer: 2 },
            // Extra syllables
            { prompt: "feu", question: "Quel mot commence par « feu » ?", choices: ["feuille", "rideau", "mouton", "coussin"], answer: 0 },
            { prompt: "gla", question: "Quel mot commence par « gla » ?", choices: ["ballon", "glace", "rideau", "fleur"], answer: 1 },
            { prompt: "plu", question: "Quel mot commence par « plu » ?", choices: ["fenêtre", "coussin", "plume", "cheval"], answer: 2 },
            { prompt: "fru", question: "Quel mot commence par « fru » ?", choices: ["mouton", "ballon", "rideau", "fruit"], answer: 3 },
            { prompt: "cou", question: "Quel mot commence par « cou » ?", choices: ["couleur", "panier", "rideau", "tapis"], answer: 0 },
            { prompt: "dou", question: "Quel mot commence par « dou » ?", choices: ["plume", "doudou", "fenêtre", "ballon"], answer: 1 },
            { prompt: "tro", question: "Quel mot commence par « tro » ?", choices: ["coussin", "rideau", "trottinette", "chaise"], answer: 2 },
            { prompt: "gro", question: "Quel mot commence par « gro » ?", choices: ["ballon", "coussin", "fenêtre", "gros"], answer: 3 },
            { prompt: "flo", question: "Quel mot commence par « flo » ?", choices: ["flocon", "rideau", "coussin", "panier"], answer: 0 },
        ]
    },
    mots: {
        exercises: [
            // Original 10
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
            // Animaux
            { prompt: "🐸", question: "Quel est ce mot ?", choices: ["grenouille", "tortue", "lézard", "serpent"], answer: 0 },
            { prompt: "🦋", question: "Quel est ce mot ?", choices: ["mouche", "papillon", "abeille", "libellule"], answer: 1 },
            { prompt: "🐛", question: "Quel est ce mot ?", choices: ["fourmi", "mouche", "chenille", "araignée"], answer: 2 },
            { prompt: "🐝", question: "Quel est ce mot ?", choices: ["mouche", "guêpe", "papillon", "abeille"], answer: 3 },
            { prompt: "🐞", question: "Quel est ce mot ?", choices: ["coccinelle", "fourmi", "mouche", "scarabée"], answer: 0 },
            { prompt: "🐢", question: "Quel est ce mot ?", choices: ["grenouille", "tortue", "lézard", "escargot"], answer: 1 },
            { prompt: "🐴", question: "Quel est ce mot ?", choices: ["vache", "mouton", "cheval", "cochon"], answer: 2 },
            { prompt: "🐷", question: "Quel est ce mot ?", choices: ["mouton", "vache", "chèvre", "cochon"], answer: 3 },
            { prompt: "🐑", question: "Quel est ce mot ?", choices: ["mouton", "chèvre", "vache", "lapin"], answer: 0 },
            { prompt: "🐘", question: "Quel est ce mot ?", choices: ["girafe", "éléphant", "hippopotame", "rhinocéros"], answer: 1 },
            { prompt: "🦁", question: "Quel est ce mot ?", choices: ["tigre", "ours", "lion", "loup"], answer: 2 },
            { prompt: "🐻", question: "Quel est ce mot ?", choices: ["loup", "renard", "tigre", "ours"], answer: 3 },
            { prompt: "🐰", question: "Quel est ce mot ?", choices: ["lapin", "souris", "hamster", "écureuil"], answer: 0 },
            { prompt: "🐔", question: "Quel est ce mot ?", choices: ["canard", "poule", "pigeon", "perroquet"], answer: 1 },
            { prompt: "🦆", question: "Quel est ce mot ?", choices: ["poule", "pigeon", "canard", "cygne"], answer: 2 },
            { prompt: "🦅", question: "Quel est ce mot ?", choices: ["pigeon", "perroquet", "mouette", "aigle"], answer: 3 },
            { prompt: "🐍", question: "Quel est ce mot ?", choices: ["serpent", "lézard", "ver", "anguille"], answer: 0 },
            { prompt: "🐜", question: "Quel est ce mot ?", choices: ["mouche", "fourmi", "puce", "abeille"], answer: 1 },
            { prompt: "🕷️", question: "Quel est ce mot ?", choices: ["mouche", "fourmi", "araignée", "moustique"], answer: 2 },
            // Nature
            { prompt: "🌺", question: "Quel est ce mot ?", choices: ["arbre", "herbe", "feuille", "fleur"], answer: 3 },
            { prompt: "🌹", question: "Quel est ce mot ?", choices: ["rose", "tulipe", "marguerite", "violette"], answer: 0 },
            { prompt: "🍄", question: "Quel est ce mot ?", choices: ["fleur", "champignon", "feuille", "mousse"], answer: 1 },
            { prompt: "🌈", question: "Quel est ce mot ?", choices: ["soleil", "nuage", "arc-en-ciel", "étoile"], answer: 2 },
            { prompt: "🌊", question: "Quel est ce mot ?", choices: ["rivière", "lac", "pluie", "vague"], answer: 3 },
            { prompt: "🏔️", question: "Quel est ce mot ?", choices: ["montagne", "colline", "volcan", "rocher"], answer: 0 },
            // Fruits et légumes
            { prompt: "🍌", question: "Quel est ce mot ?", choices: ["pomme", "banane", "poire", "citron"], answer: 1 },
            { prompt: "🍊", question: "Quel est ce mot ?", choices: ["citron", "pomme", "orange", "cerise"], answer: 2 },
            { prompt: "🍓", question: "Quel est ce mot ?", choices: ["cerise", "raisin", "pomme", "fraise"], answer: 3 },
            { prompt: "🍇", question: "Quel est ce mot ?", choices: ["raisin", "cerise", "mûre", "prune"], answer: 0 },
            { prompt: "🍒", question: "Quel est ce mot ?", choices: ["fraise", "cerise", "framboise", "groseille"], answer: 1 },
            { prompt: "🍋", question: "Quel est ce mot ?", choices: ["orange", "banane", "citron", "poire"], answer: 2 },
            { prompt: "🍉", question: "Quel est ce mot ?", choices: ["melon", "pomme", "ananas", "pastèque"], answer: 3 },
            { prompt: "🍐", question: "Quel est ce mot ?", choices: ["poire", "pomme", "banane", "citron"], answer: 0 },
            { prompt: "🥕", question: "Quel est ce mot ?", choices: ["pomme de terre", "carotte", "navet", "radis"], answer: 1 },
            { prompt: "🥔", question: "Quel est ce mot ?", choices: ["oignon", "navet", "pomme de terre", "radis"], answer: 2 },
            { prompt: "🧅", question: "Quel est ce mot ?", choices: ["ail", "radis", "navet", "oignon"], answer: 3 },
            // Nourriture
            { prompt: "🍞", question: "Quel est ce mot ?", choices: ["pain", "gâteau", "biscuit", "brioche"], answer: 0 },
            { prompt: "🧀", question: "Quel est ce mot ?", choices: ["beurre", "fromage", "crème", "lait"], answer: 1 },
            { prompt: "🍫", question: "Quel est ce mot ?", choices: ["bonbon", "biscuit", "chocolat", "gâteau"], answer: 2 },
            { prompt: "🍪", question: "Quel est ce mot ?", choices: ["gâteau", "tarte", "brioche", "biscuit"], answer: 3 },
            { prompt: "🍕", question: "Quel est ce mot ?", choices: ["pizza", "crêpe", "tarte", "galette"], answer: 0 },
            { prompt: "🍔", question: "Quel est ce mot ?", choices: ["sandwich", "hamburger", "croque-monsieur", "hot-dog"], answer: 1 },
            // Transports
            { prompt: "🚂", question: "Quel est ce mot ?", choices: ["bus", "voiture", "train", "avion"], answer: 2 },
            { prompt: "🚌", question: "Quel est ce mot ?", choices: ["voiture", "camion", "moto", "bus"], answer: 3 },
            { prompt: "🚲", question: "Quel est ce mot ?", choices: ["vélo", "moto", "trottinette", "voiture"], answer: 0 },
            { prompt: "✈️", question: "Quel est ce mot ?", choices: ["fusée", "avion", "hélicoptère", "planeur"], answer: 1 },
            { prompt: "🚀", question: "Quel est ce mot ?", choices: ["avion", "satellite", "fusée", "étoile"], answer: 2 },
            { prompt: "🛶", question: "Quel est ce mot ?", choices: ["radeau", "surf", "kayak", "bateau"], answer: 3 },
            { prompt: "🏍️", question: "Quel est ce mot ?", choices: ["moto", "vélo", "scooter", "voiture"], answer: 0 },
            { prompt: "🚁", question: "Quel est ce mot ?", choices: ["avion", "hélicoptère", "fusée", "drone"], answer: 1 },
            { prompt: "🚜", question: "Quel est ce mot ?", choices: ["camion", "voiture", "tracteur", "bus"], answer: 2 },
            // Musique et loisirs
            { prompt: "⚽", question: "Quel est ce mot ?", choices: ["balle", "raquette", "filet", "ballon"], answer: 3 },
            { prompt: "🎸", question: "Quel est ce mot ?", choices: ["guitare", "violon", "piano", "flûte"], answer: 0 },
            { prompt: "🎹", question: "Quel est ce mot ?", choices: ["guitare", "piano", "violon", "tambour"], answer: 1 },
            { prompt: "🎨", question: "Quel est ce mot ?", choices: ["dessin", "musique", "peinture", "sculpture"], answer: 2 },
            { prompt: "🎭", question: "Quel est ce mot ?", choices: ["chapeau", "perruque", "couronne", "masque"], answer: 3 },
            { prompt: "🎪", question: "Quel est ce mot ?", choices: ["cirque", "cinéma", "théâtre", "fête"], answer: 0 },
            // Objets
            { prompt: "👑", question: "Quel est ce mot ?", choices: ["chapeau", "couronne", "casque", "bonnet"], answer: 1 },
            { prompt: "🗝️", question: "Quel est ce mot ?", choices: ["serrure", "cadenas", "clé", "porte"], answer: 2 },
            { prompt: "💡", question: "Quel est ce mot ?", choices: ["bougie", "torche", "lampe", "ampoule"], answer: 3 },
            { prompt: "🔔", question: "Quel est ce mot ?", choices: ["cloche", "tambour", "trompette", "sifflet"], answer: 0 },
            { prompt: "⏰", question: "Quel est ce mot ?", choices: ["montre", "réveil", "pendule", "horloge"], answer: 1 },
            { prompt: "🕯️", question: "Quel est ce mot ?", choices: ["lampe", "torche", "bougie", "allumette"], answer: 2 },
            // École
            { prompt: "✏️", question: "Quel est ce mot ?", choices: ["stylo", "feutre", "règle", "crayon"], answer: 3 },
            { prompt: "📏", question: "Quel est ce mot ?", choices: ["règle", "équerre", "compas", "crayon"], answer: 0 },
            { prompt: "✂️", question: "Quel est ce mot ?", choices: ["couteau", "ciseaux", "colle", "pince"], answer: 1 },
            { prompt: "🖊️", question: "Quel est ce mot ?", choices: ["crayon", "feutre", "stylo", "pinceau"], answer: 2 },
            { prompt: "📐", question: "Quel est ce mot ?", choices: ["règle", "compas", "crayon", "équerre"], answer: 3 },
            { prompt: "🎒", question: "Quel est ce mot ?", choices: ["cartable", "valise", "sac", "panier"], answer: 0 },
            // Maison
            { prompt: "🪑", question: "Quel est ce mot ?", choices: ["table", "chaise", "banc", "tabouret"], answer: 1 },
            { prompt: "🛏️", question: "Quel est ce mot ?", choices: ["canapé", "coussin", "lit", "tapis"], answer: 2 },
            { prompt: "🚪", question: "Quel est ce mot ?", choices: ["mur", "fenêtre", "rideau", "porte"], answer: 3 },
            { prompt: "🪟", question: "Quel est ce mot ?", choices: ["fenêtre", "porte", "mur", "rideau"], answer: 0 },
            { prompt: "🛁", question: "Quel est ce mot ?", choices: ["douche", "baignoire", "lavabo", "évier"], answer: 1 },
            { prompt: "🚰", question: "Quel est ce mot ?", choices: ["douche", "tuyau", "robinet", "évier"], answer: 2 },
            // Corps
            { prompt: "👀", question: "Quel est ce mot ?", choices: ["oreille", "bouche", "nez", "yeux"], answer: 3 },
            { prompt: "👃", question: "Quel est ce mot ?", choices: ["nez", "bouche", "oreille", "joue"], answer: 0 },
            { prompt: "👄", question: "Quel est ce mot ?", choices: ["nez", "bouche", "joue", "menton"], answer: 1 },
            { prompt: "👂", question: "Quel est ce mot ?", choices: ["nez", "joue", "oreille", "oeil"], answer: 2 },
            { prompt: "🦶", question: "Quel est ce mot ?", choices: ["main", "doigt", "genou", "pied"], answer: 3 },
            { prompt: "🤚", question: "Quel est ce mot ?", choices: ["main", "poing", "doigt", "bras"], answer: 0 },
            // Météo et ciel
            { prompt: "🌙", question: "Quel est ce mot ?", choices: ["étoile", "lune", "soleil", "nuage"], answer: 1 },
            { prompt: "☀️", question: "Quel est ce mot ?", choices: ["lune", "étoile", "soleil", "nuage"], answer: 2 },
            { prompt: "⛅", question: "Quel est ce mot ?", choices: ["pluie", "vent", "brouillard", "nuage"], answer: 3 },
            { prompt: "🌧️", question: "Quel est ce mot ?", choices: ["pluie", "neige", "grêle", "orage"], answer: 0 },
            { prompt: "❄️", question: "Quel est ce mot ?", choices: ["glace", "neige", "givre", "grêle"], answer: 1 },
            { prompt: "⚡", question: "Quel est ce mot ?", choices: ["tonnerre", "orage", "éclair", "foudre"], answer: 2 },
            { prompt: "🌪️", question: "Quel est ce mot ?", choices: ["vent", "ouragan", "tempête", "tornade"], answer: 3 },
            { prompt: "🐊", question: "Quel est ce mot ?", choices: ["crocodile", "lézard", "serpent", "tortue"], answer: 0 },
            { prompt: "🦊", question: "Quel est ce mot ?", choices: ["loup", "renard", "chien", "chat"], answer: 1 },
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
            // Vêtements
            { prompt: "Je mets un ___ sur ma tête.", question: "Quel mot complète la phrase ?", choices: ["gant", "chapeau", "sac", "livre"], answer: 1 },
            { prompt: "Il fait froid, je mets mon ___.", question: "Quel mot complète la phrase ?", choices: ["maillot", "short", "manteau", "chapeau"], answer: 2 },
            { prompt: "En hiver, je porte une ___.", question: "Quel mot complète la phrase ?", choices: ["écharpe", "jupe", "casquette", "robe"], answer: 0 },
            { prompt: "Quand il neige, je mets des ___.", question: "Quel mot complète la phrase ?", choices: ["lunettes", "bagues", "colliers", "gants"], answer: 3 },
            { prompt: "Pour marcher dans la neige, je mets des ___.", question: "Quel mot complète la phrase ?", choices: ["sandales", "bottes", "tongs", "chaussons"], answer: 1 },
            { prompt: "Le garçon porte un ___ bleu.", question: "Quel mot complète la phrase ?", choices: ["robe", "jupe", "pantalon", "collier"], answer: 2 },
            { prompt: "La princesse porte une belle ___.", question: "Quel mot complète la phrase ?", choices: ["robe", "casquette", "ceinture", "botte"], answer: 0 },
            { prompt: "J'ai froid, je mets un ___.", question: "Quel mot complète la phrase ?", choices: ["short", "maillot", "chapeau", "pull"], answer: 3 },
            // Couleurs
            { prompt: "La tomate est ___.", question: "Quel mot complète la phrase ?", choices: ["bleue", "rouge", "verte", "jaune"], answer: 1 },
            { prompt: "Le ciel est ___.", question: "Quel mot complète la phrase ?", choices: ["rouge", "vert", "bleu", "rose"], answer: 2 },
            { prompt: "L'herbe est ___.", question: "Quel mot complète la phrase ?", choices: ["verte", "bleue", "rouge", "jaune"], answer: 0 },
            { prompt: "Le soleil est ___.", question: "Quel mot complète la phrase ?", choices: ["bleu", "vert", "rouge", "jaune"], answer: 3 },
            { prompt: "La neige est ___.", question: "Quel mot complète la phrase ?", choices: ["noire", "blanche", "rouge", "bleue"], answer: 1 },
            { prompt: "La nuit, le ciel est ___.", question: "Quel mot complète la phrase ?", choices: ["blanc", "jaune", "noir", "vert"], answer: 2 },
            { prompt: "Le flamant est ___.", question: "Quel mot complète la phrase ?", choices: ["rose", "bleu", "vert", "noir"], answer: 0 },
            { prompt: "La carotte est ___.", question: "Quel mot complète la phrase ?", choices: ["bleue", "verte", "rose", "orange"], answer: 3 },
            // Corps
            { prompt: "Je porte un chapeau sur la ___.", question: "Quel mot complète la phrase ?", choices: ["tête", "main", "jambe", "épaule"], answer: 0 },
            { prompt: "Je lance la balle avec mon ___.", question: "Quel mot complète la phrase ?", choices: ["pied", "bras", "genou", "nez"], answer: 1 },
            { prompt: "Je cours avec mes ___.", question: "Quel mot complète la phrase ?", choices: ["mains", "oreilles", "jambes", "yeux"], answer: 2 },
            { prompt: "Je tiens le crayon avec ma ___.", question: "Quel mot complète la phrase ?", choices: ["jambe", "tête", "oreille", "main"], answer: 3 },
            { prompt: "Je montre avec mon ___.", question: "Quel mot complète la phrase ?", choices: ["doigt", "coude", "genou", "pied"], answer: 0 },
            { prompt: "Je suis tombé, j'ai mal au ___.", question: "Quel mot complète la phrase ?", choices: ["cheveu", "genou", "ongle", "sourcil"], answer: 1 },
            { prompt: "Je me suis cogné le ___.", question: "Quel mot complète la phrase ?", choices: ["cheveu", "ongle", "coude", "cil"], answer: 2 },
            // Saisons
            { prompt: "En ___, il fait très chaud.", question: "Quel mot complète la phrase ?", choices: ["hiver", "automne", "printemps", "été"], answer: 3 },
            { prompt: "En ___, il neige souvent.", question: "Quel mot complète la phrase ?", choices: ["hiver", "été", "printemps", "automne"], answer: 0 },
            { prompt: "Au ___, les fleurs poussent.", question: "Quel mot complète la phrase ?", choices: ["hiver", "printemps", "automne", "été"], answer: 1 },
            { prompt: "En ___, les feuilles tombent.", question: "Quel mot complète la phrase ?", choices: ["été", "printemps", "automne", "hiver"], answer: 2 },
            // Transports
            { prompt: "Le ___ roule sur les rails.", question: "Quel mot complète la phrase ?", choices: ["vélo", "camion", "bateau", "train"], answer: 3 },
            { prompt: "Je prends le ___ pour aller à l'école.", question: "Quel mot complète la phrase ?", choices: ["bus", "avion", "bateau", "tracteur"], answer: 0 },
            { prompt: "L'___ vole dans le ciel.", question: "Quel mot complète la phrase ?", choices: ["voiture", "avion", "vélo", "bus"], answer: 1 },
            { prompt: "Le ___ navigue sur la mer.", question: "Quel mot complète la phrase ?", choices: ["train", "camion", "bateau", "bus"], answer: 2 },
            { prompt: "Je fais du ___ avec deux roues.", question: "Quel mot complète la phrase ?", choices: ["train", "bateau", "avion", "vélo"], answer: 3 },
            { prompt: "La ___ fait beaucoup de bruit.", question: "Quel mot complète la phrase ?", choices: ["moto", "trottinette", "poussette", "luge"], answer: 0 },
            // Jeux
            { prompt: "On joue au ___ dans la cour.", question: "Quel mot complète la phrase ?", choices: ["livre", "ballon", "crayon", "verre"], answer: 1 },
            { prompt: "Ma petite soeur joue à la ___.", question: "Quel mot complète la phrase ?", choices: ["gomme", "règle", "poupée", "clé"], answer: 2 },
            { prompt: "Je fais un ___ de cent pièces.", question: "Quel mot complète la phrase ?", choices: ["puzzle", "ballon", "dessin", "gâteau"], answer: 0 },
            { prompt: "Je fais un ___ avec mes crayons.", question: "Quel mot complète la phrase ?", choices: ["repas", "lit", "bain", "dessin"], answer: 3 },
            { prompt: "On joue à ___ dans le jardin.", question: "Quel mot complète la phrase ?", choices: ["dormir", "cache-cache", "manger", "lire"], answer: 1 },
            // Émotions
            { prompt: "Je suis ___ car c'est mon anniversaire.", question: "Quel mot complète la phrase ?", choices: ["triste", "fatigué", "content", "malade"], answer: 2 },
            { prompt: "Mon ami est ___ car il a perdu son jouet.", question: "Quel mot complète la phrase ?", choices: ["triste", "content", "drôle", "fort"], answer: 0 },
            { prompt: "J'ai ___ du noir.", question: "Quel mot complète la phrase ?", choices: ["faim", "soif", "sommeil", "peur"], answer: 3 },
            { prompt: "Il est en ___ car on a pris son ballon.", question: "Quel mot complète la phrase ?", choices: ["joie", "colère", "rire", "fête"], answer: 1 },
            { prompt: "Quelle ___ ! Je ne m'y attendais pas.", question: "Quel mot complète la phrase ?", choices: ["fatigue", "faim", "surprise", "soif"], answer: 2 },
            // Lieux
            { prompt: "On joue au ___ après l'école.", question: "Quel mot complète la phrase ?", choices: ["parc", "lit", "bain", "repas"], answer: 0 },
            { prompt: "En été, on va à la ___.", question: "Quel mot complète la phrase ?", choices: ["montagne", "plage", "cave", "classe"], answer: 1 },
            { prompt: "On se promène dans la ___.", question: "Quel mot complète la phrase ?", choices: ["piscine", "cuisine", "forêt", "classe"], answer: 2 },
            { prompt: "On fait du ski à la ___.", question: "Quel mot complète la phrase ?", choices: ["plage", "rivière", "prairie", "montagne"], answer: 3 },
            { prompt: "Il y a beaucoup de voitures en ___.", question: "Quel mot complète la phrase ?", choices: ["ville", "forêt", "mer", "champ"], answer: 0 },
            { prompt: "Mamie habite dans un petit ___.", question: "Quel mot complète la phrase ?", choices: ["océan", "village", "nuage", "volcan"], answer: 1 },
            // Temps
            { prompt: "Le ___, je me lève pour l'école.", question: "Quel mot complète la phrase ?", choices: ["soir", "nuit", "matin", "minuit"], answer: 2 },
            { prompt: "Le ___, maman lit une histoire.", question: "Quel mot complète la phrase ?", choices: ["soir", "midi", "matin", "dimanche"], answer: 0 },
            { prompt: "La ___, tout le monde dort.", question: "Quel mot complète la phrase ?", choices: ["récré", "fête", "journée", "nuit"], answer: 3 },
            { prompt: "À ___, on mange à la cantine.", question: "Quel mot complète la phrase ?", choices: ["minuit", "midi", "aube", "soir"], answer: 1 },
            { prompt: "___, nous sommes allés au zoo.", question: "Quel mot complète la phrase ?", choices: ["demain", "bientôt", "hier", "jamais"], answer: 2 },
            { prompt: "___, on ira au parc.", question: "Quel mot complète la phrase ?", choices: ["demain", "hier", "avant", "jadis"], answer: 0 },
            { prompt: "___, c'est mercredi.", question: "Quel mot complète la phrase ?", choices: ["hier", "demain", "jamais", "aujourd'hui"], answer: 3 },
            // Divers
            { prompt: "C'est mon ___, j'ai six ans.", question: "Quel mot complète la phrase ?", choices: ["repas", "anniversaire", "réveil", "cahier"], answer: 1 },
            { prompt: "J'ouvre mon ___ de Noël.", question: "Quel mot complète la phrase ?", choices: ["livre", "repas", "cadeau", "lit"], answer: 2 },
            { prompt: "En ___, on va à la mer.", question: "Quel mot complète la phrase ?", choices: ["vacances", "classe", "cuisine", "cantine"], answer: 0 },
            { prompt: "On danse et on chante à la ___.", question: "Quel mot complète la phrase ?", choices: ["classe", "nuit", "sieste", "fête"], answer: 3 },
            { prompt: "Mon meilleur ___ s'appelle Lucas.", question: "Quel mot complète la phrase ?", choices: ["jouet", "ami", "livre", "chien"], answer: 1 },
            { prompt: "Mon ___ et moi, on joue ensemble.", question: "Quel mot complète la phrase ?", choices: ["cahier", "crayon", "copain", "cartable"], answer: 2 },
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

    // Niveau 2 : Reconnaître comment un son S'ÉCRIT (graphème)
    // speakMode: "wiki" (par défaut) → joue le mot depuis Wikimedia Commons
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
    "Super, {name} ! 👏",
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

function withName(text) {
    return text.replace('{name}', getPlayerName());
}

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

// === PRÉNOM ===

function getPlayerName() {
    return localStorage.getItem('baptize_name') || '';
}

function submitName() {
    const input = document.getElementById('name-input');
    const name = input.value.trim();
    if (!name) {
        input.focus();
        return;
    }
    localStorage.setItem('baptize_name', name);
    showMainApp(name);
}

function showMainApp(name) {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    document.getElementById('player-name').textContent = name;
}

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

// === CONSIGNES ===

const CONSIGNES = {
    // Lecture
    syllabes: "Trouve le mot qui commence par la syllabe affichée.",
    mots: "Regarde l'image et trouve le bon mot.",
    phrases: "Lis la phrase et choisis le mot qui manque.",
    // Maths
    doigts: "Compte les ronds et trouve le résultat.",
    facile: "Trouve le résultat du calcul.",
    moyen: "Trouve le résultat du calcul.",
    difficile: "Trouve le résultat du calcul.",
    // Sons
    "sons-simples": "Trouve le mot qui contient le son affiché.",
    graphemes: "Écoute le mot et trouve comment le son s'écrit.",
    confusions: "Écoute le mot et choisis la bonne écriture.",
};

function updateConsigne(section, difficulty) {
    const el = document.getElementById(section + '-consigne');
    if (el) el.textContent = CONSIGNES[difficulty] || '';
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
    updateConsigne('lecture', state.lectureDifficulty);
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
        feedback.textContent = withName(randomItem(ENCOURAGEMENTS));
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
    updateConsigne('maths', state.mathsDifficulty);
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
        feedback.textContent = withName(randomItem(ENCOURAGEMENTS));
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
    updateConsigne('sons', state.sonsDifficulty);
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
        feedback.textContent = withName(randomItem(ENCOURAGEMENTS));
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

    const name = getPlayerName();
    if (isPerfect) {
        animation.textContent = '🎉';
        title.textContent = `Parfait, ${name} ! 🏆`;
        message.textContent = `${correct}/${total} — Incroyable, aucune erreur ! +3 étoiles bonus !`;
    } else if (correct >= 3) {
        animation.textContent = '👏';
        title.textContent = `Bravo ${name} ! 😊`;
        message.textContent = `${correct}/${total} — C'est très bien, continue comme ça !`;
    } else {
        animation.textContent = '💪';
        title.textContent = `Courage ${name} ! 🌈`;
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

// === AUDIO VIA WIKIMEDIA COMMONS ===

// Cache des URLs audio résolues
const audioCache = {};
let currentAudio = null;

function speakFrench(word) {
    // Arrêter l'audio en cours
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

// Si un prénom est déjà enregistré, aller directement à l'app
const savedName = getPlayerName();
if (savedName) {
    showMainApp(savedName);
}

// Permettre de valider avec Entrée
document.getElementById('name-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitName();
});

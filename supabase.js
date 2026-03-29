// === CONFIGURATION SUPABASE ===
// Remplace ces valeurs par celles de ton projet Supabase
// (Settings > API dans le dashboard Supabase)
const SUPABASE_URL = 'https://tcozyqurpozcbefxcfcr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_TYhiOqGceVuy2wDXnRvnkQ_olWhIk-j';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let currentProfile = null;

// === AUTHENTIFICATION ===

function showAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-tab-content').forEach(c => c.classList.add('hidden'));

    document.querySelector(`[onclick="showAuthTab('${tab}')"]`).classList.add('active');
    document.getElementById('tab-' + tab).classList.remove('hidden');
    hideAuthMessages();
}

function hideAuthMessages() {
    document.getElementById('auth-error').classList.add('hidden');
    document.getElementById('auth-success').classList.add('hidden');
}

function showAuthError(msg) {
    const el = document.getElementById('auth-error');
    el.textContent = msg;
    el.classList.remove('hidden');
    document.getElementById('auth-success').classList.add('hidden');
}

function showAuthSuccess(msg) {
    const el = document.getElementById('auth-success');
    el.textContent = msg;
    el.classList.remove('hidden');
    document.getElementById('auth-error').classList.add('hidden');
}

async function registerUser() {
    hideAuthMessages();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;

    if (!name) return showAuthError("Entre le prénom de l'enfant.");
    if (!email) return showAuthError("Entre l'email du parent.");
    if (password.length < 6) return showAuthError('Le mot de passe doit faire au moins 6 caractères.');

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { child_name: name } }
    });

    if (error) return showAuthError(error.message);

    if (data.user && !data.session) {
        showAuthSuccess('Inscription réussie ! Vérifie les emails pour confirmer le compte.');
    } else if (data.session) {
        await onAuthSuccess(data.user, name);
    }
}

async function loginUser() {
    hideAuthMessages();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) return showAuthError('Remplis tous les champs.');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return showAuthError('Email ou mot de passe incorrect.');

    const name = data.user.user_metadata?.child_name || 'Ami';
    await onAuthSuccess(data.user, name);
}

async function onAuthSuccess(user, name) {
    currentUser = user;
    currentProfile = { name };

    // Créer ou récupérer le profil
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!profile) {
        await supabase.from('profiles').insert({
            id: user.id,
            name: name,
            parent_email: user.email,
        });
    } else {
        currentProfile = profile;
    }

    // Synchroniser les données cloud vers l'app
    await syncFromCloud();

    enterApp(currentProfile.name);
}

function skipAuth() {
    currentUser = null;
    currentProfile = null;
    enterApp(null);
}

function enterApp(childName) {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');

    // Personnaliser le sous-titre
    const subtitle = document.querySelector('.subtitle');
    if (childName) {
        subtitle.textContent = `Apprends en t'amusant, ${childName} !`;
    }

    // Ajouter la barre utilisateur si connecté
    if (currentUser) {
        const header = document.querySelector('header');
        if (!document.querySelector('.user-bar')) {
            const bar = document.createElement('div');
            bar.className = 'user-bar';
            bar.innerHTML = `<span>${currentProfile.name}</span> <button onclick="logoutUser()">Déconnexion</button>`;
            header.appendChild(bar);
        }
    }

    loadState();
}

async function logoutUser() {
    await supabase.auth.signOut();
    currentUser = null;
    currentProfile = null;
    location.reload();
}

// === SYNCHRONISATION CLOUD ===

async function syncToCloud() {
    if (!currentUser) return;

    await supabase.from('scores').upsert({
        user_id: currentUser.id,
        category: 'all',
        stars: state.stars,
        exercises_done: state.stats.lecture + state.stats.maths + state.stats.sons,
        perfect_series: state.stats.perfectSeries,
        stats: state.stats,
        updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,category' });

    // Sync trophées
    for (const trophyId of state.trophees) {
        await supabase.from('trophies').upsert({
            user_id: currentUser.id,
            trophy_id: trophyId,
            unlocked_at: new Date().toISOString(),
        }, { onConflict: 'user_id,trophy_id' });
    }
}

async function syncFromCloud() {
    if (!currentUser) return;

    const { data: scoreData } = await supabase
        .from('scores')
        .select('*')
        .eq('user_id', currentUser.id)
        .eq('category', 'all')
        .single();

    if (scoreData) {
        state.stars = scoreData.stars || 0;
        if (scoreData.stats) {
            state.stats = scoreData.stats;
        }
    }

    const { data: trophyData } = await supabase
        .from('trophies')
        .select('trophy_id')
        .eq('user_id', currentUser.id);

    if (trophyData) {
        state.trophees = trophyData.map(t => t.trophy_id);
    }

    saveState();
    updateStarsDisplay();
}

// === AUTO-LOGIN AU CHARGEMENT ===

async function initAuth() {
    // Vérifier si une session existe déjà
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        const name = session.user.user_metadata?.child_name || 'Ami';
        await onAuthSuccess(session.user, name);
    }
}

// Ne pas appeler loadState() au chargement global si auth est configuré
// (il sera appelé dans enterApp)
if (SUPABASE_URL !== 'https://VOTRE_PROJECT_ID.supabase.co') {
    initAuth();
}

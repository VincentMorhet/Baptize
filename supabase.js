// === CONFIGURATION SUPABASE ===
const SUPABASE_URL = 'https://tcozyqurpozcbefxcfcr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb3p5cXVycG96Y2JlZnhjZmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTc0NTAsImV4cCI6MjA5MDM3MzQ1MH0.N0Bkyl1vDmY12vtObmmP0KmGUu6beha1ErXRKNQ2xMU';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let currentChild = null;

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
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;

    if (!email) return showAuthError("Entre l'email du parent.");
    if (password.length < 6) return showAuthError('Le mot de passe doit faire au moins 6 caractères.');

    const { data, error } = await supabaseClient.auth.signUp({ email, password });

    if (error) return showAuthError(error.message);

    if (data.user && !data.session) {
        showAuthSuccess('Inscription réussie ! Vérifie les emails pour confirmer le compte.');
    } else if (data.session) {
        currentUser = data.user;
        showChildSelector();
    }
}

async function loginUser() {
    hideAuthMessages();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) return showAuthError('Remplis tous les champs.');

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) return showAuthError('Email ou mot de passe incorrect.');

    currentUser = data.user;
    showChildSelector();
}

// === GESTION DES ENFANTS ===

async function showChildSelector() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
    document.getElementById('child-screen').classList.remove('hidden');
    document.getElementById('child-error').classList.add('hidden');
    document.getElementById('new-child-name').value = '';

    const { data: children, error } = await supabaseClient
        .from('children')
        .select('*')
        .eq('parent_id', currentUser.id)
        .order('created_at', { ascending: true });

    const list = document.getElementById('children-list');
    list.innerHTML = '';

    if (children && children.length > 0) {
        children.forEach(child => {
            const btn = document.createElement('button');
            btn.className = 'child-select-btn';
            btn.innerHTML = `<span class="child-avatar">${child.name.charAt(0).toUpperCase()}</span><span class="child-btn-name">${child.name}</span>`;
            btn.onclick = () => selectChild(child);
            list.appendChild(btn);
        });
    } else {
        list.innerHTML = '<p class="no-children">Ajoute ton premier enfant pour commencer !</p>';
    }
}

async function addChild() {
    const nameInput = document.getElementById('new-child-name');
    const name = nameInput.value.trim();
    const errorEl = document.getElementById('child-error');
    errorEl.classList.add('hidden');

    if (!name) {
        errorEl.textContent = "Entre le prénom de l'enfant.";
        errorEl.classList.remove('hidden');
        return;
    }

    const { data, error } = await supabaseClient.from('children').insert({
        parent_id: currentUser.id,
        name: name,
    }).select().single();

    if (error) {
        errorEl.textContent = "Erreur lors de l'ajout. Réessaie.";
        errorEl.classList.remove('hidden');
        return;
    }

    nameInput.value = '';
    showChildSelector();
}

async function selectChild(child) {
    currentChild = child;
    await syncFromCloud();
    enterApp();
}

// === ENTRÉE DANS L'APP ===

function enterApp() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('child-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');

    // Afficher le nom de l'enfant dans le header
    if (currentChild) {
        const bar = document.getElementById('child-bar');
        bar.classList.remove('hidden');
        document.getElementById('child-name-display').textContent = currentChild.name;
    }

    loadState();
}

function skipAuth() {
    currentUser = null;
    currentChild = null;
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('child-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    loadState();
}

async function logoutUser() {
    await supabaseClient.auth.signOut();
    currentUser = null;
    currentChild = null;
    location.reload();
}

// === SYNCHRONISATION CLOUD ===

async function syncToCloud() {
    if (!currentUser || !currentChild) return;

    await supabaseClient.from('scores').upsert({
        child_id: currentChild.id,
        category: 'all',
        stars: state.stars,
        exercises_done: state.stats.lecture + state.stats.maths + state.stats.sons,
        perfect_series: state.stats.perfectSeries,
        stats: state.stats,
        updated_at: new Date().toISOString(),
    }, { onConflict: 'child_id,category' });

    for (const trophyId of state.trophees) {
        await supabaseClient.from('trophies').upsert({
            child_id: currentChild.id,
            trophy_id: trophyId,
            unlocked_at: new Date().toISOString(),
        }, { onConflict: 'child_id,trophy_id' });
    }
}

async function syncFromCloud() {
    if (!currentUser || !currentChild) return;

    const { data: scoreData } = await supabaseClient
        .from('scores')
        .select('*')
        .eq('child_id', currentChild.id)
        .eq('category', 'all')
        .single();

    if (scoreData) {
        state.stars = scoreData.stars || 0;
        if (scoreData.stats) {
            state.stats = scoreData.stats;
        }
    } else {
        // Nouveau profil enfant, reset state
        state.stars = 0;
        state.stats = { lecture: 0, maths: 0, sons: 0, perfectSeries: 0 };
        state.trophees = [];
    }

    const { data: trophyData } = await supabaseClient
        .from('trophies')
        .select('trophy_id')
        .eq('child_id', currentChild.id);

    if (trophyData) {
        state.trophees = trophyData.map(t => t.trophy_id);
    }

    saveState();
    updateStarsDisplay();
}

// === AUTO-LOGIN AU CHARGEMENT ===

async function initAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        currentUser = session.user;
        showChildSelector();
    }
}

if (SUPABASE_URL !== 'https://VOTRE_PROJECT_ID.supabase.co') {
    initAuth();
}

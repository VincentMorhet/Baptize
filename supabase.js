// === CONFIGURATION SUPABASE ===
const SUPABASE_URL = 'https://tcozyqurpozcbefxcfcr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb3p5cXVycG96Y2JlZnhjZmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTc0NTAsImV4cCI6MjA5MDM3MzQ1MH0.N0Bkyl1vDmY12vtObmmP0KmGUu6beha1ErXRKNQ2xMU';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let currentChild = null;

// === UTILITAIRES ÉCRANS ===

function hideAllScreens() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('child-screen').classList.add('hidden');
    document.getElementById('config-auth-screen').classList.add('hidden');
    document.getElementById('config-screen').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
}

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

// === SÉLECTION D'ENFANT (écran simple, sans gestion) ===

async function showChildSelector() {
    hideAllScreens();
    document.getElementById('child-screen').classList.remove('hidden');
    document.getElementById('child-error').classList.add('hidden');

    const { data: children, error } = await supabaseClient
        .from('children')
        .select('*')
        .eq('parent_id', currentUser.id)
        .order('created_at', { ascending: true });

    const list = document.getElementById('children-list');
    list.innerHTML = '';

    const noChildrenMsg = document.getElementById('no-children-msg');
    const configLink = document.querySelector('.config-link');

    if (children && children.length > 0) {
        noChildrenMsg.classList.add('hidden');
        configLink.classList.remove('hidden');
        children.forEach(child => {
            const btn = document.createElement('button');
            btn.className = 'child-select-btn';
            btn.innerHTML = `<span class="child-avatar">${child.name.charAt(0).toUpperCase()}</span><span class="child-btn-name">${child.name}</span>`;
            btn.onclick = () => selectChild(child);
            list.appendChild(btn);
        });
    } else {
        noChildrenMsg.classList.remove('hidden');
        configLink.classList.add('hidden');
    }
}

async function selectChild(child) {
    currentChild = child;
    await syncFromCloud();
    enterApp();
}

// === VÉRIFICATION MOT DE PASSE POUR CONFIG ===

function showConfigAuth() {
    hideAllScreens();
    document.getElementById('config-auth-screen').classList.remove('hidden');
    document.getElementById('config-password').value = '';
    document.getElementById('config-auth-error').classList.add('hidden');
    document.getElementById('config-password').focus();
}

async function verifyConfigPassword() {
    const password = document.getElementById('config-password').value;
    const errorEl = document.getElementById('config-auth-error');
    errorEl.classList.add('hidden');

    if (!password) {
        errorEl.textContent = 'Entre ton mot de passe.';
        errorEl.classList.remove('hidden');
        return;
    }

    const email = currentUser.email;
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        errorEl.textContent = 'Mot de passe incorrect.';
        errorEl.classList.remove('hidden');
        return;
    }

    showConfigScreen();
}

// === ÉCRAN DE CONFIGURATION DES ENFANTS ===

async function showConfigScreen() {
    hideAllScreens();
    document.getElementById('config-screen').classList.remove('hidden');
    document.getElementById('config-error').classList.add('hidden');
    document.getElementById('config-success').classList.add('hidden');
    document.getElementById('new-child-name').value = '';

    const { data: children, error } = await supabaseClient
        .from('children')
        .select('*')
        .eq('parent_id', currentUser.id)
        .order('created_at', { ascending: true });

    const list = document.getElementById('config-children-list');
    list.innerHTML = '';

    if (children && children.length > 0) {
        children.forEach(child => {
            const row = document.createElement('div');
            row.className = 'child-row';

            const info = document.createElement('div');
            info.className = 'child-config-info';
            info.innerHTML = `<span class="child-avatar">${child.name.charAt(0).toUpperCase()}</span><span class="child-btn-name">${child.name}</span>`;

            const actions = document.createElement('div');
            actions.className = 'child-actions';

            const editBtn = document.createElement('button');
            editBtn.className = 'child-action-btn';
            editBtn.textContent = '✏️';
            editBtn.title = 'Renommer';
            editBtn.onclick = () => openRenameModal(child);

            const delBtn = document.createElement('button');
            delBtn.className = 'child-action-btn child-action-delete';
            delBtn.textContent = '🗑️';
            delBtn.title = 'Supprimer';
            delBtn.onclick = () => openDeleteModal(child);

            actions.appendChild(editBtn);
            actions.appendChild(delBtn);
            row.appendChild(info);
            row.appendChild(actions);
            list.appendChild(row);
        });
    } else {
        list.innerHTML = '<p class="no-children-text">Aucun enfant pour le moment.</p>';
    }
}

async function addChild() {
    const nameInput = document.getElementById('new-child-name');
    const name = nameInput.value.trim();
    const errorEl = document.getElementById('config-error');
    const successEl = document.getElementById('config-success');
    errorEl.classList.add('hidden');
    successEl.classList.add('hidden');

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
    successEl.textContent = `${name} a été ajouté !`;
    successEl.classList.remove('hidden');
    showConfigScreen();
}

function backToChildSelector() {
    showChildSelector();
}

// === RENOMMER / SUPPRIMER UN ENFANT ===

let childToEdit = null;

function openRenameModal(child) {
    childToEdit = child;
    document.getElementById('rename-child-input').value = child.name;
    document.getElementById('rename-error').classList.add('hidden');
    document.getElementById('rename-modal').classList.remove('hidden');
    document.getElementById('rename-child-input').focus();
}

function closeRenameModal() {
    document.getElementById('rename-modal').classList.add('hidden');
    childToEdit = null;
}

async function confirmRenameChild() {
    const newName = document.getElementById('rename-child-input').value.trim();
    const errorEl = document.getElementById('rename-error');
    errorEl.classList.add('hidden');

    if (!newName) {
        errorEl.textContent = 'Le prénom ne peut pas être vide.';
        errorEl.classList.remove('hidden');
        return;
    }

    const { error } = await supabaseClient
        .from('children')
        .update({ name: newName })
        .eq('id', childToEdit.id);

    if (error) {
        errorEl.textContent = 'Erreur lors du renommage. Réessaie.';
        errorEl.classList.remove('hidden');
        return;
    }

    if (currentChild && currentChild.id === childToEdit.id) {
        currentChild.name = newName;
        document.getElementById('child-name-display').textContent = newName;
    }

    closeRenameModal();
    showConfigScreen();
}

function openDeleteModal(child) {
    childToEdit = child;
    document.getElementById('delete-child-message').textContent =
        `Veux-tu vraiment supprimer le profil de « ${child.name} » ?`;
    document.getElementById('delete-modal').classList.remove('hidden');
}

function closeDeleteModal() {
    document.getElementById('delete-modal').classList.add('hidden');
    childToEdit = null;
}

async function confirmDeleteChild() {
    await supabaseClient.from('trophies').delete().eq('child_id', childToEdit.id);
    await supabaseClient.from('scores').delete().eq('child_id', childToEdit.id);
    const { error } = await supabaseClient.from('children').delete().eq('id', childToEdit.id);

    if (error) {
        closeDeleteModal();
        const errorEl = document.getElementById('config-error');
        errorEl.textContent = 'Erreur lors de la suppression. Réessaie.';
        errorEl.classList.remove('hidden');
        return;
    }

    if (currentChild && currentChild.id === childToEdit.id) {
        currentChild = null;
    }

    closeDeleteModal();
    showConfigScreen();
}

// === ENTRÉE DANS L'APP ===

function enterApp() {
    hideAllScreens();
    document.getElementById('app').classList.remove('hidden');

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
    hideAllScreens();
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

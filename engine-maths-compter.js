// === MATHS : COMPTER ===

var COUNTING_EMOJIS = [
    // Fruits
    '\uD83C\uDF4E', '\uD83C\uDF4A', '\uD83C\uDF4B', '\uD83C\uDF4D', '\uD83C\uDF53',
    '\uD83C\uDF52', '\uD83C\uDF51', '\uD83C\uDF49', '\uD83C\uDF47', '\uD83C\uDF50',
    // Légumes
    '\uD83E\uDD55', '\uD83C\uDF3D', '\uD83E\uDD66', '\uD83C\uDF46', '\uD83C\uDF45',
    '\uD83E\uDD52', '\uD83E\uDD6C',
    // Objets
    '\u2B50', '\uD83C\uDF1F', '\uD83D\uDC1D', '\uD83E\uDD8B', '\uD83C\uDF3B',
    '\uD83C\uDF3A', '\uD83C\uDF38', '\uD83C\uDF40',
];

function getCountingEmojis(n, emoji) {
    if (n <= 0) return '';
    var html = '';
    for (var i = 0; i < n; i++) {
        html += '<span class="counting-item">' + emoji + '</span>';
    }
    return html;
}

function pickCountingEmoji() {
    return COUNTING_EMOJIS[Math.floor(Math.random() * COUNTING_EMOJIS.length)];
}

MATHS_TYPES.compter = {
    instruction: 'Compte les objets de chaque groupe puis trouve le r\u00e9sultat.',
    renderHands: function(ex, handsDiv) {
        // Pick one emoji per exercise so both groups use the same item
        var emoji = pickCountingEmoji();
        handsDiv.classList.remove('hidden');
        handsDiv.innerHTML =
            '<div class="hands-group">' +
                '<div class="hands-label">' + ex.a + '</div>' +
                '<div class="hands-dots">' + getCountingEmojis(ex.a, emoji) + '</div>' +
            '</div>' +
            '<div class="hands-plus">+</div>' +
            '<div class="hands-group">' +
                '<div class="hands-label">' + ex.b + '</div>' +
                '<div class="hands-dots">' + getCountingEmojis(ex.b, emoji) + '</div>' +
            '</div>';
    },
};

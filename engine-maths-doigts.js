// === MATHS : DOIGTS ===

MATHS_TYPES.doigts = {
    instruction: 'Compte les points de chaque groupe puis trouve le r\u00e9sultat.',
    renderHands: function(ex, handsDiv) {
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
    },
};

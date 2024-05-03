const hbs = require('hbs');

// Helper que checa se é professor
hbs.registerHelper('isProfessor', function(tipoUsuario, options) {
    if (tipoUsuario === 'Prof') {
        return options.fn(this);
    }
    // Se tipoUsuario não for igual a 'Prof', retorna vazio
    return '';
})

module.exports = hbs
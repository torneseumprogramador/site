var SobreController = {
  index: function(request, response) {
    response.render('sobre/index');
  },
  alunos: function(request, response) {
    response.render('sobre/alunos');
  },
  empresas: function(request, response) {
    response.render('sobre/empresas');
  },
  objetivo: function(request, response) {
    response.render('sobre/objetivo');
  }
}

module.exports = SobreController;
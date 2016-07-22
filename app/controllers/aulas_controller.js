var AulasController = {
  index: function(request, response) {
    response.render('aulas/index');
  },

  aula: function(request, response) {
    response.render('aulas/show');
  }
}

module.exports = AulasController;
var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/home_controller');
var AulasController = require('../controllers/aulas_controller');
var SobreController = require('../controllers/sobre_controller');
var VagasController = require('../controllers/vagas_controller');

router.get('/', HomeController.index);

router.get('/aula', AulasController.aula);
router.get('/aulas', AulasController.index);

router.get('/vagas', VagasController.index);

router.get('/sobre', SobreController.index);
router.get('/sobre/alunos', SobreController.alunos);
router.get('/sobre/empresas', SobreController.empresas);
router.get('/sobre/objetivo', SobreController.objetivo);

module.exports = router;
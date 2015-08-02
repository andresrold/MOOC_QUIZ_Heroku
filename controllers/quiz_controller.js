var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye el :quizId
exports.load = function(req, res, next, quizId) {
    models.Quiz.findById(quizId).then(
        function(quiz) {
	    if(quiz) {
	        req.quiz = quiz;
	        next();
	    } else { next(new Error('No existe el quizId = ' + quizId)); }
        }
    ).catch( function(error) { next(error); });
};


// GET /quizes
exports.index = function(req, res) {

    if(req.query.search != null) {
        var search = "%" + req.query.search.replace(" ", "%") + "%";
        models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes) {
		res.render('quizes/index', { quizes: quizes});
	    }
        ).catch(function(error){ next(error); });
    } else {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', { quizes: quizes});
	    }
        ).catch(function(error){ next(error); });
    }
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', { quiz: req.quiz});    
};

// GET /quizes/answer
exports.answer = function(req, res) {
    if(req.query.respuesta === req.quiz.respuesta) {
        res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Correcto'});
    } else {
    	res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Incorrecto'});
    }
};

// GET /quizes/new
exports.new = function(req, res) {
    var quiz = models.Quiz.build( // crea un objeto Quiz
        { pregunta: "Pregunta", respuesta: "Respuesta" }
    );

    res.render('quizes/new', {quiz: quiz});
};
// POST /quizes/create
exports.create = function(req, res) {
    var quiz = models.Quiz.build( req.body.quiz );
    quiz.save(
        {fields: ["pregunta", "respuesta"]
    }).then(function() {
        res.redirect('/quizes');
    });
};


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
		res.render('quizes/index', { quizes: quizes, errors: []});
	    }
        ).catch(function(error){ next(error); });
    } else {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', { quizes: quizes, errors: []});
	    }
        ).catch(function(error){ next(error); });
    }
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', { quiz: req.quiz, errors: []});    
};

// GET /quizes/answer
exports.answer = function(req, res) {
    if(req.query.respuesta === req.quiz.respuesta) {
        res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Correcto', errors: []});
    } else {
    	res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Incorrecto', errors: []});
    }
};

// GET /quizes/new
exports.new = function(req, res) {
    var quiz = models.Quiz.build( // crea un objeto Quiz
        { pregunta: "Pregunta", respuesta: "Respuesta", tema: "otro" }
    );

    res.render('quizes/new', {quiz: quiz, errors: []});
};
// POST /quizes/create
exports.create = function(req, res) {
    var quiz = models.Quiz.build( req.body.quiz );
    
    quiz
    .validate()
    .then(function(error) {
        if(error) {
            res.render('quizes/new', {quiz: quiz, errors: error.errors});
        } else {
            quiz.save(
                {fields: ["pregunta", "respuesta", "tema"]
            }).then(function() {
                res.redirect('/quizes');
            });
        }
    });
    
};
// GET /quizes/:id/edit
exports.edit = function(req, res) {
   var quiz = req.quiz; // Tomará quiz precargado del autoload

    res.render('quizes/edit', {quiz: quiz, errors: []});
};
// PUT /quizes/:id
exports.update = function (req, res) {
    // Lo primero es asignar al elemento quiz del autoload, los valores que nos vienen del formulario
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;
    // Hacemos validación y actualizado en su caso
    req.quiz
    .validate()
    .then(function(error) {
        if(error) {
            res.render('quizes/edit', {quiz: req.quiz, errors: error.errors});
        } else {
            req.quiz.save(
                {fields: ["pregunta", "respuesta", "tema"]
            }).then(function() {
                res.redirect('/quizes');
            });
        }
    });
}
// DELETE /quizes/:id
exports.destroy = function (req, res) {
    req.quiz.destroy().then( function() {
        res.redirect('/quizes');
    }).catch( function (error) { next(error); });
};

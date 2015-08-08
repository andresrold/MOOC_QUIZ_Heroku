var models = require('../models/models.js');

// GET /quizes/statistics
exports.index = function(req, res) {

    models.Quiz.count()
	.then(function(numQuiz) {
	    
	 models.Comment.count()
	    .then(function(numComment) {
		
	    var numMedio = numComment / numQuiz;

	    models.Quiz.findAndCountAll({ include: [{ model: models.Comment, required: true }] })
	        .then(function(quizWithComment) {
		var numQuizWithComment = quizWithComment.count;
	    	var numQuizWithOutComment = numQuiz - numQuizWithComment;
	    
	    	res.render('quizes/statistics', 
		    { errors: [],
	  		numQuiz: numQuiz,
			numComment: numComment,
			numMedio: numMedio,
			numQuizWithOutComment: numQuizWithOutComment,
			numQuizWithComment: numQuizWithComment
	    	});

	   }).catch(function(error1){ next(error1); });

	}).catch(function(error2){ next(error2); });
	
    }).catch(function(error3){ next(error3); });

};

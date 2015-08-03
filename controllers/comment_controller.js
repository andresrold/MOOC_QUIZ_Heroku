var models = require('../models/models.js');

// GET /quizes/:id/comments/new
exports.new = function(req, res) {
    res.render('comments/new', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:id/comments
exports.create = function(req, res) {
    var comment = models.Comment.build(
        { texto: req.body.comment.texto,
          QuizId: req.params.quizId
        }
    );
    
    comment
    .validate()
    .then(function(error) {
        if(error) {
            res.render('comments/new', {comment: comment, quizid: req.params.quizId, errors: error.errors});
        } else {
            comment.save(
                {fields: ["texto", "QuizId"]
            }).then(function() {
                res.redirect('/quizes/' + req.params.quizId);
            });
        }
    });
    
};

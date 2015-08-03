// Definición del modelo de comentarios a los quiz, Base de datos

module.exports = function(sequelize, DataType) {
    return sequelize.define(
        'Comment',
        { texto:
            { type: DataType.STRING,
              validate: { notEmpty: {msg: "-> Falta el texto"}}
            }
        }
    );
}

// Definición del modelo de QUIZ, Base de datos

module.exports = function(sequelize, DataType) {
    return sequelize.define(
        'Quiz',
        { pregunta:
            { type: DataType.STRING,
              validate: { notEmpty: {msg: "-> Falta la pregunta"}}
            },
          respuesta:
            { type: DataType.STRING,
              validate: { notEmpty: {msg: "-> Falta la respuesta"}}
            }
        }
    );
}

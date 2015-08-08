// Definición del modelo de QUIZ, Base de datos

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'Quiz',
        { pregunta:
            { type: DataTypes.STRING,
              validate: { notEmpty: {msg: "-> Falta la pregunta"}}
            },
          respuesta:
            { type: DataTypes.STRING,
              validate: { notEmpty: {msg: "-> Falta la respuesta"}}
            },
          tema:
            { type: DataTypes.STRING,
              validate: { notEmpty: {msg: "-> Falta el tema"}}
            }
        }
    );
}

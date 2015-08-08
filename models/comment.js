// Definición del modelo de comentarios a los quiz, Base de datos

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'Comment',
        { texto:
            { type: DataTypes.STRING,
              validate: { notEmpty: {msg: "-> Falta el texto"}}
            },
	  publicado:
	    { type: DataTypes.BOOLEAN,
	      defaultValue: false
	    }
        }
    );
}

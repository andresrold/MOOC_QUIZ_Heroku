// Definición del modelo de QUIZ, Base de datos

module.exports = function(sequelize, DataType) {
	return sequelize.define('Quiz',
		{
			pregunta: DataType.STRING,
			respuesta: DataType.STRING
		});
}

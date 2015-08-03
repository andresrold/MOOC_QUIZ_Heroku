var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Módulo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o PostGres
var sequelize = new Sequelize(DB_name, user, pwd,
			{ dialect: protocol,
			  protocol: protocol,
			  port: port,
			  host: host,
			  storage: storage, 	// Solo sqlite (.env)
			  omitNull: true	// Solo Postgres
			}
		);

// Importar la definición de la tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Crea e inicializa la tabla preguntas
sequelize.sync().then(function() {
	// Una vez creada con éxito, ejecuta el manejador
	Quiz.count().then(function(count) {
		if(count === 0) { // si la tabla está vacía
			Quiz.create({ 	pregunta: 'Capital de Italia',
					respuesta: 'Roma',
					tema: 'humanidades'
				});
			Quiz.create({ 	pregunta: 'Capital de Portugal',
					respuesta: 'Lisboa',
					tema: 'humanidades'
				})
			.then(function() {console.log('Base de datos inicializada')});
		};
	});
});

// Importar la definición de la tabla Comment y sus relaciones con la tabla Quiz
var Comment = sequelize.import(path.join(__dirname, 'comment'));
// Definición de relación 1-a-n entre pregunta y comentario
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// exportar definición de la tablas, para que se pueda usar en otros sitios de la aplicación
exports.Quiz = Quiz; 	
exports.Comment = Comment;

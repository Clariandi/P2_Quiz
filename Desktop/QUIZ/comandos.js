const {log, biglog, errorlog, colorize} = require("./out");
const model = require('./model');


/** Ayuda
*
*/

exports.helpComando = rl =>  {
		log("Comandos:");
  		log(" h|help - Muestra esta ayuda");
  		log(" list - Listar los quizzes existentes");
  		log(" show <id> - Muestra la pregunta y la respuesta el quiz indicado");
  		log(" add - Añadir un nuevo quiz interactivamente ");
  		log(" delete <id> - Borrar el quiz indicado ");
  		log(" edit <id> - Editar el quiz indicado");
  		log(" test <id> - Probar el quiz indicado ");
  		log(" p|play - Jugar a preguntar aleatoriamente todos los quizzes");
  		log(" Credits - Créditos");
  		log(" q|quit - Salir del programa");
  		rl.prompt();
};

exports.listComando = rl => {
	model.getAll().forEach((quiz, id) => {
		log(`  [${ colorize(id,'magenta')}]: ${quiz.question}`);
	});

	rl.prompt();

};


exports.showComando = (rl, id) => {
	if (typeof id === "undefined") {
		errorlog(`Falta el parámetro id.`);
	} else {
		try {
			const quiz = model.getByIndex(id);
			log(`[${colorize(id, 'magenta')}]: ${quiz.question} ${colorize('=>', 'magenta')} ${quiz.answer}`);
		} catch(error) {
			errorlog(error.message);
		}
	}

	rl.prompt();
};

exports.addComando = rl => {
	rl.question(colorize(' Introduzca una pregunta: ', 'red'), question => {
		rl.question(colorize(' Introduzca la respuesta ', 'red'), answer => {
			model.add(question, answer);
			log(` ${colorize('Se ha añadido', 'magenta')}: ${question} ${colorize('=>', 'magenta')} ${answer}`);
			rl.prompt();
		});
	});
	
};

exports.deleteComando = (rl, id) => {
	if (typeof id === "undefined") {
		errorlog(`Falta el parámetro id.`);
	} else {
		try {
			model.deleteByIndex(id);
		} catch(error) {
			errorlog(error.message);
		}
	}
	rl.prompt();
};

exports.editComando = (rl, id) => {
	if  (typeof id === "undefined") {
		errorlog(`Falta el parámetro id`);
		rl.prompt();
	} else {
		try {
			const quiz = model.getByIndex(id);
			process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)}, 0);

			rl.question(colorize(' Introduzca una pregunta: ', 'red'), question => {
				process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)}, 0);
				rl.question(colorize( 'Introduzca la respuesta ', 'red'), answer => {
					model.update(id, question, answer);
					log(` Se ha cambiado el quiz ${colorize(id, 'magenta')} por: ${question} ${colorize('=>', 'magenta')} ${answer}`);
					rl.prompt();
				});
			});
		} catch (error) {
			errorlog(error.message);
			rl.prompt();
		}
	}
};

exports.testComando = (rl, id) => {
	if  (typeof id === "undefined") {
		errorlog(`Falta el parámetro id`);
		rl.prompt();
	} else {
		try {
			const quiz = model.getByIndex(id);
			rl.question(colorize(`${quiz.question} `, 'red'), respuesta => {
				
				if(respuesta.toUpperCase().trim()  === quiz.answer.toUpperCase()) {
					log('CORRECTO');
				} else {
					log('INCORRECTO');
				}
				rl.prompt();

			});
		} catch (error) {
			errorlog(error.message);
			rl.prompt();
		}
	}
};

exports.playComando = rl => {
	let score = 0;
	let toBeResolved = [];
	let arrayQuestion = [];

	for (let i = 0; i < model.count(); i++) {
		toBeResolved[i] = i;
	}

	arrayQuestion = model.getAll();

	const playQuiz = () => {

		if (toBeResolved.length === 0) {
			log('¡Ya no hay más preguntas!');
			log('Tu puntuación es...');
			biglog(score, "yellow");
			log('¡Enhorabuena!')

			rl.prompt();
		} else {
			try {
				let indice = Math.floor(model.count()*Math.random());
				if (indice > arrayQuestion.length-1) {
					playQuiz();
				}
				toBeResolved.splice(indice, 1);
				rl.question(colorize(arrayQuestion[indice].question, 'red'), answer => {
					if(answer.toUpperCase().trim() === arrayQuestion[indice].answer.toUpperCase()) {
						score++;
						arrayQuestion.splice(indice,1);
						log('CORRECTO');
						log(`Llevas ${score} aciertos`);
						playQuiz();
					} else {
						log('INCORRECTO');
						log('Game Over', 'blue');
						biglog(score, "yellow");
						if (score<5) {
							log('Vaya, hay que mejorar...');
						} else {
							log('¡Enhorabuena!');
						}
					rl.prompt();

					}	
					
				});

			} catch (error) {
				errorlog(error.message);
				rl.prompt();
			}
		}


	};

	playQuiz();
};

exports.creditsComando = rl => {
	log('Autora de la práctica:');
  	log('Clara Andina Sierra');
  	rl.prompt();
};

exports.qComando = rl => {
	rl.close();
};


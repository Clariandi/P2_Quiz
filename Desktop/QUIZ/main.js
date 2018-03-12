const readline = require('readline');
const comandos = require('./comandos');

const {log, biglog, errorlog, colorize} = require("./out");


// Mensaje inicial
biglog('CORE QUIZ', 'green');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: colorize("quiz > ",'yellow'),
	completer: (line) => {
  	const completions = 'h help add delete edit list p play credits q quit'.split(' ');
  	const hits = completions.filter((c) => c.startsWith(line));
  	//show all completions if none found
  	return [hits.length ? hits : completions, line];

 }


});

rl.prompt();

rl
.on('line', (line) => {

	let args = line.split(" ");
	let cmd = args[0].toLowerCase().trim();

  switch (cmd) {
  	case (' '):
  		rl.prompt();
  		break;
  	case 'h':
  	case 'help':
  		comandos.helpComando(rl);
  		break;

  	case 'quit':
  	case 'q':
  		comandos.qComando(rl);
  		break;

  	case 'add':
  		comandos.addComando(rl);
  		
  		break;

  	case 'list':
  		comandos.listComando(rl);
  		break;

  	case 'show':
  		comandos.showComando(rl, args[1]);
  		break;

  	case 'test':
  		comandos.testComando(rl, args[1]);
  		break;

  	case 'play':
  	case 'p':
  		comandos.playComando(rl);
  		break;

  	case 'delete':
  		comandos.deleteComando(rl, args[1]);
  		break;

  	case 'edit':
  		comandos.editComando(rl, args[1]);
  		break;

  	case 'credits':
  		comandos.creditsComando(rl);
  		break;

    default:
      log(`Comando desconocido: '${colorize(cmd, 'red')}'`);
      log(`Use ${colorize('help', 'red')} para ver todos los comandos conocidos`);
      rl.prompt();
      break;

  }
  
}).on('close', () => {
  log('¡Hasta luego!');
  process.exit(0);
});



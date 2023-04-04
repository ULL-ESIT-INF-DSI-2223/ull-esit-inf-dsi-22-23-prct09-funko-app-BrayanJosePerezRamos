import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { FileModifier } from './fileModifier.js';
import { Funko } from './funko.js';
import { FunkoType } from './enums/funkoType.js';
import { FunkoGenre } from './enums/funkoGenre.js';
import { FunkoFranchise } from './enums/funkoFranchise.js';
import chalk from "chalk"


yargs(hideBin(process.argv))
  // Comando para añadir un funko a la colección de un usuario
  .command('add', 'Add a new funko', (yargs) => {
    yargs
        .option('userName', { describe: 'User name', type: 'string', demandOption: true })
        .option('id', { describe: 'Funko ID', type: 'number', demandOption: true })
        .option('name', { describe: 'Funko name', type: 'string', demandOption: true })
        .option('description', { describe: 'Funko description', type: 'string', demandOption: true })
        .option('type', { describe: 'Funko type', type: 'string', demandOption: true })
        .option('genre', { describe: 'Funko genre', type: 'string', demandOption: true })
        .option('franchise', { describe: 'Funko franchise', type: 'string', demandOption: true })
        .option('franchiseId', { describe: 'Funko franchise ID', type: 'number', demandOption: true })
        .option('exclusive', { describe: 'Funko exclusive', type: 'boolean', demandOption: true })
        .option('specialCaracteristics', { describe: 'Funko special characteristics', type: 'string', demandOption: true })
        .option('value', { describe: 'Funko value', type: 'number', demandOption: true });
    }, (argv) => {
    // comprobar si hay un funko con el mismo id
    if (FileModifier.checkFunkoId(argv.userName as string, argv.id as number)) {
      console.log(chalk.red('There is already a funko with ID: ' + argv.id));
      return;
    }
    // bloque try catch para manejar los posibles errores
    try {
      const FunkoNuevo = new Funko(
        argv.id as number,
        argv.name as string,
        argv.description as string,
        argv.type as FunkoType,
        argv.genre as FunkoGenre,
        argv.franchise as FunkoFranchise,
        argv.franchiseId as number,
        argv.exclusive as boolean,
        argv.specialCaracteristics as string,
        argv.value as number
      );
      FileModifier.createFunkoFile(argv.userName as string, FunkoNuevo);
      console.log(chalk.green('Funko added successfully'));
    } catch (error: any) {
      console.log(chalk.red('Error adding funko: ' + error.message));
      return;
    }  
  })
  // Comando para eliminar un funko de la colección de un usuario
  .command('update', 'Updates a funko from the user collection', (yargs) => {
    yargs
      .option('userName', { describe: 'User name', type: 'string', demandOption: true })
      .option('ID', { describe: 'Funko ID', type: 'number', demandOption: true })
      .option('name', { describe: 'Funko name', type: 'string', demandOption: false })
      .option('description', { describe: 'Funko description', type: 'string', demandOption: false })
      .option('type', { describe: 'Funko type', type: 'string', demandOption: false })
      .option('genre', { describe: 'Funko genre', type: 'string', demandOption: false })
      .option('franchise', { describe: 'Funko franchise', type: 'string', demandOption: false })
      .option('franchiseId', { describe: 'Funko franchise ID', type: 'number', demandOption: false })
      .option('exclusive', { describe: 'Funko exclusive', type: 'boolean', demandOption: false })
      .option('specialCaracteristics', { describe: 'Funko special characteristics', type: 'string', demandOption: false })
      .option('value', { describe: 'Funko value', type: 'number', demandOption: false })
      .check((argv) => {
        // Chequeamos que al menos una opción no demandada sea proporcionada
        const nonDemandedOptions = [
          'name',
          'description',
          'type',
          'genre',
          'franchise',
          'franchiseId',
          'exclusive',
          'specialCaracteristics',
          'value',
        ];
        const hasOption = nonDemandedOptions.some((option) => argv[option] !== undefined);
        if (!hasOption) {
          throw new Error('At least one non-demanded option must be provided');
        }
        return true;
      });  
    }, (argv) => {
    // comprobamos primero si existe el id
    if (!FileModifier.checkFunkoId(argv.userName as string, argv.ID as number)) {
      console.log(chalk.red('There is no funko with ID: ' + argv.ID));
      return;
    }

    const path = FileModifier.getPathFromId(argv.userName as string, argv.ID as number);
    try {
      const funko = FileModifier.readFunkoFile(path);
      if (argv.name) funko.setName(argv.name as string);
      if (argv.description) funko.setDescription(argv.description as string);
      if (argv.type) funko.setType(argv.type as FunkoType);
      if (argv.genre) funko.setGenre(argv.genre as FunkoGenre);
      if (argv.franchise) funko.setFranchise(argv.franchise as FunkoFranchise);
      if (argv.franchiseId) funko.setFranchiseId(argv.franchiseId as number);
      if (argv.exclusive) funko.setExclusive(argv.exclusive as boolean);
      if (argv.specialCaracteristics) funko.setSpecialCaracteristics(argv.specialCaracteristics as string);
      if (argv.value) funko.setValue(argv.value as number);
  
      FileModifier.updateFunkoFile(path, funko);
      console.log(chalk.green('Funko updated successfully'));
    } catch (error: any) {
      console.log(chalk.red('Error updating funko: ' + error.message));
      return;
    }
  })
  // Comando para eliminar un funko de la colección de un usuario
  .command('read', 'Reads a funko from the user collection', (yargs) => {
    yargs
      .option('userName', { describe: 'User name', type: 'string', demandOption: true })
      .option('ID', { describe: 'Funko ID', type: 'number', demandOption: true });
  }, (argv) => {
    // comprobamos primero si existe el id
    if (!FileModifier.checkFunkoId(argv.userName as string, argv.ID as number)) {
      console.log(chalk.red('There is no funko with ID: ' + argv.ID));
      return;
    }
    const path = FileModifier.getPathFromId(argv.userName as string, argv.ID as number);
    try {
      const funko = FileModifier.readFunkoFile(path);
      console.log(chalk.green('Mostrando la información del funko con ID ' + argv.ID + ', del usuario: ' + argv.userName));
      funko.print();
    } catch (error: any) {
      console.log(chalk.red('Error reading funko: ' + error.message));
      return;
    }
  })
  // Comando para eliminar un funko de la colección de un usuario
  .command('delete', 'Deletes a funko from the user collection', (yargs) => {
    yargs
      .option('userName', { describe: 'User name', type: 'string', demandOption: true })
      .option('ID', { describe: 'Funko ID', type: 'number', demandOption: true });
  }, (argv) => {
    // comprobamos si existe el usuario
    if (!FileModifier.checkUserName(argv.userName as string)) {
      console.log(chalk.red('There is no user with name: ' + argv.userName));
      return;
    }
    // comprobamos primero si existe el id
    if (!FileModifier.checkFunkoId(argv.userName as string, argv.ID as number)) {
      console.log(chalk.red('There is no funko with ID: ' + argv.ID + ' in the user: ' + argv.userName + ' collection'));
      return;
    }
    const path = FileModifier.getPathFromId(argv.userName as string, argv.ID as number);
    FileModifier.deleteFunkoFile(path);
    console.log(chalk.green('Funko deleted successfully from ' + argv.userName + '\'s collection'));
  })
  // Comando para listar los funkos de un usuario
  .command('CreateUser', 'Creates a user directory', {
    userName: {
      description: 'User name',
      type: 'string',
      demandOption: true,
    },
  }, (argv) => {
    // comprobamos primero si existe el usuario
    if (FileModifier.checkUserName(argv.userName)) {
      console.log(chalk.red('There is already a user with name: ' + argv.userName));
      return;
    }
    FileModifier.createUserDirectory(argv.userName);
  })
  .command('listFunkos', 'Lists all the funkos from a user', {
    userName: {
      description: 'User name',
      type: 'string',
      demandOption: true,
    },
  }, (argv) => {
    // comprobamos primero si existe el usuario
    if (!FileModifier.checkUserName(argv.userName)) {
      console.log(chalk.red('There is no user with name: ' + argv.userName));
      return;
    }
    const funkos = FileModifier.listFunkos(argv.userName);
    // crear array de los funkos
    const funkosArray: Funko[] = [];
    try {
      for (const file of funkos) {
        const funk = FileModifier.readFunkoFile(argv.userName + '/' + file);
        funkosArray.push(funk);
      }
    } catch (error: any) {
      console.log(chalk.red('Error reading the funkos files: ', error.message));
      return;
    }
    // ordenar de mayor a menor
    const funkosSorted = funkosArray.sort((a, b) => b.getValue() - a.getValue());
    console.log(chalk.green('Mostrando la información de la FunkoColeccion del usuario: ' + argv.userName));
    for (const funko of funkosSorted) {
      funko.print();
      // salto de linea
      console.log();
      console.log(chalk.greenBright('--------------------------------'));
      console.log();
    }
  })
  // Con esto obligamos a que se introduzca al menos un comando
  .demandCommand(1, 'Debes introducir al menos un comando')
  .help()
  .argv;


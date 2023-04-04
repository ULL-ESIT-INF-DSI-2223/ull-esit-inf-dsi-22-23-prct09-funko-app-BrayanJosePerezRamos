# Practica 9: Funko App

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-BrayanJosePerezRamos/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-BrayanJosePerezRamos/actions/workflows/node.js.yml)

[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-BrayanJosePerezRamos/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-BrayanJosePerezRamos/actions/workflows/coveralls.yml)

En el desarrollo de esta práctica, se nos ha encomendado la tarea de implementar una aplicación destinada a almacenar información de los Funko Pops pertenecientes a la colección de un usuario. Para ello, se nos ha pedido que se implementen funcionalidades que permitan agregar, modificar, eliminar, listar y leer la información asociada a cada Funko en cuestión. Todo esto se llevará a cabo mediante la utilización de archivos JSON que se almacenarán en el sistema de ficheros de la máquina donde se ejecute la aplicación, cada usuario tendrá una carpeta con su colección de funkos. Es importante mencionar que la interacción con la aplicación se realiza mediante la línea de comandos, es decir los comandos se los pasamos como parametros en la ejecución del programa.

Para la implementación de la aplicación se debe utilizar los paquetes `yargs` y `chalk` para la gestión de los argumentos y la salida por consola respectivamente. Además, se trabajará con el API síncrona de `fs` para la gestión de los ficheros. Puede consultar mas a profundidad los requerimientos de la practica en el [enunciado](https://ull-esit-inf-dsi-2223.github.io/prct09-filesystem-funko-app/).

## Implementación.

Para la implementación de la aplicación, he decidido crear una clase funko, la cual se utiliza para crear objetos de tipo funko y almacenar la información de cada uno de ellos. Tambien se ha implementado una clase fileModifier la cual se encarga de la gestión de los archivos y base de datos de la aplicación. Esta clase se encarga de leer, escribir, modificar y eliminar los archivos JSON y carpetas de los usuarios. Por último, se ha implementado en un fichero `app.ts` con todo el manejo de los argumentos y la salida por consola de la aplicación.

### Enumerados 

Se han implementado diferentes enumerados para diferentes caracteristicas que pueden tener los funkos. Estos enumerados son:

- `FunkoType`: Enumerado que contiene los diferentes tipos de funkos que existen.
- `FunkoGenre`: Enumerado que contiene los diferentes generos de funkos que existen.
- `FunkoFranchise`: Enumerado que contiene las diferentes franquicias de funkos que existen.
- `ValueRange`: Enumerado que contiene los diferentes rangos de valores que pueden tener los funkos, en este caso se han determinado 4 rangos: `cheap`, `medium`, `high` y `expensive`.

### Clase Funko

Esta clase se ha diseñado para almacenar la información de cada funko. Para ello, se han definido los siguientes atributos:

```typescript
class Funko {	
  private id: number, // identificador del funko
  private name: string, // nombre del funko
  private description: string, // descripción del funko
  private type: FunkoType, // tipo de funko
  private genre: FunkoGenre, // género del funko
  private franchise: FunkoFranchise, // franquicia del funko
  private franchiseId: number, // identificador de la franquicia
  private exclusive: boolean, // si es exclusivo o no
  private specialCaracteristics: string, // características especiales
  private value: number // valor del funko
...
```

En el constructor de la clase se inicializan los atributos con los valores que se le pasan como parámetros. Además, se comprueba que los parámetros que se le pasan son correctos, en caso de que no lo sean se lanza una excepción, he tenido en cuenta que al leer los archivos JSON, los valores que se leen pueden ser null o undefined y demás, por lo que he tenido que contemplar estos casos. 

Además, se han implementado getters y setters para cada uno de los atributos de la clase. Estos métodos se utilizan para obtener y modificar los valores de los atributos de la clase pues estos son privados, cabe destacar que en los setters se comprueba que los valores que se le pasan son correctos, en caso de que no lo sean se lanza una excepción.

Por ultimo, se ha implementado el método `print` el cual se encarga de imprimir por consola la información del funko, tiene la característica de que el atributo `value` se imprime de un color u otro (utilizando chalk) en función del enumerado `ValueRange` al que pertenezca dicho valor. En este método se imprime la información por pantalla y tambien se devuelve en forma de string para poder hacer pruebas con este método.

### Clase FileModifier

La clase `FileModifier` se encarga de la gestión de los archivos y base de datos de la aplicación. Esta clase se encarga de leer, escribir, modificar y eliminar los archivos JSON y carpetas de los usuarios. Para ello, se han definido solo un atributo, que es la ruta a la carpeta de la base de datos de la aplicación.

```typescript
class FileModifier {
  private static readonly filePath = './FunkoAppDB/';
  constructor() {}
...
```

Se puede observar que el atributo es estático y es de solo lectura, esto se debe a que la ruta a la carpeta de la base de datos no debe cambiar durante la ejecución de la aplicación. Además, se ha definido como `private` para que no se pueda acceder a este atributo desde fuera de la clase.

El constructor de la clase no recibe ningún parámetro, ya que no es necesario inicializar ningún atributo.

Además en la clase se han definido diferentes métodos estáticos, estos métodos se utilizan para realizar las diferentes operaciones para trabajar con los archivos y la base de datos de la aplicación, son estáticos para que no sea necesario crear un objeto de la clase para poder utilizarlos.

#### Método `createUserDirectory`

Este método se encarga de crear la carpeta del usuario en la base de datos de la aplicación. Este método recibe como parámetro el nombre del usuario y crea la carpeta con el nombre del usuario en la ruta de la base de datos.

```typescript
  public static createUserDirectory(UserName: string): void {
    fs.mkdirSync(FileModifier.filePath + UserName);
  }
```

En este método se utiliza el método síncrono `mkdirSync` del paquete `fs` para crear la carpeta del usuario en la ruta de la base de datos, concatenando la ruta de la base de datos con el nombre del usuario que será el nombre de la carpeta.

#### Método `createFunkoFile`

Este método se encarga de crear el archivo JSON del funko en la base de datos de la aplicación. Este método recibe como parámetros el nombre del usuario y el objeto de tipo funko que se quiere guardar en el archivo JSON.

```typescript
  public static createFunkoFile(userName: string, funko: Funko): void {
    // comprobar que hay una carpeta con el nombre del usuario
    if (!fs.existsSync(FileModifier.filePath + userName)) {
      FileModifier.createUserDirectory(userName);
    }
    const data = JSON.stringify(funko, null, 2);
    fs.writeFileSync(FileModifier.filePath + userName + '/' + 'funko' + funko.getId() + '.json', data);
  }
```

En este método lo primero que se hace es comprobar que existe una carpeta con el nombre del usuario en la base de datos, en caso de que no exista se crea la carpeta con el método `createUserDirectory`. Después, se crea un string con la información del funko en formato JSON, para ello se utiliza el método `JSON.stringify` del paquete `fs`. Por último, se utiliza el método síncrono `writeFileSync` del paquete `fs` para escribir la información del funko en el archivo JSON.

#### Método `readFunkoFile`

Para leer un archivo JSON se ha implementado el método `readFunkoFile`, este método recibe como parámetros el nombre del fichero a leer y retorna el objeto Funko con la información leida del JSON.

``` Typescript
  public static readFunkoFile(fileName: string): Funko {
    const data = fs.readFileSync(FileModifier.filePath + fileName).toString();
    const jsonData = JSON.parse(data);
  
    const funko: Funko = new Funko(
      jsonData.id,
      jsonData.name,
      jsonData.description,
      jsonData.type,
      jsonData.genre,
      jsonData.franchise,
      jsonData.franchiseId,
      jsonData.exclusive,
      jsonData.specialCaracteristics,
      jsonData.value
    );  
    return funko;
  }
```

En este método se utiliza el método síncrono `readFileSync` del paquete `fs` para leer el archivo JSON, se utiliza el método `toString` para convertir el buffer leido a string. Después, se utiliza el método `JSON.parse` para convertir el string leido a un objeto JSON. Por último, se crea un objeto de tipo Funko con la información leida del JSON y se retorna.

#### Método `updateFunkoFile`

Para actualizar un archivo JSON se ha implementado el método `updateFunkoFile`, este método recibe como parámetros el nombre del fichero a actualizar y el objeto de tipo funko que se quiere guardar en el archivo JSON.

```typescript
  public static updateFunkoFile(path: string, funko: Funko): void {
    // comprobar primero si existe la carpeta del usuario
    if (FileModifier.checkUserName(path)) {
      const data = JSON.stringify(funko, null, 2);
      fs.writeFileSync(FileModifier.filePath + path, data);
    }
  }
```

En este método primero comprueba que existe la carpeta del usuario en la base de datos, en caso de que no exista se lanza una excepción. Después, se crea un string con la información del funko en formato JSON, para ello se utiliza el método `JSON.stringify` del paquete `fs`. Por último, se utiliza el método síncrono `writeFileSync` del paquete `fs` para escribir la información del funko en el archivo JSON.

#### Método `deleteFunkoFile`

Para borrar un fichero de funko, se ha implementado el método `deleteFunkoFile`, este método recibe como parámetro el nombre del fichero a borrar.

```typescript
  public static deleteFunkoFile(path: string): void {
    // comprobar primero si existe la carpeta del usuario
    if (FileModifier.checkUserName(path)) {
      fs.unlinkSync(FileModifier.filePath + path);
    }
  }
```

Basicamente este método primero comprueba que existe la carpeta del usuario en la base de datos, en caso de que no exista se lanza una excepción. Después, se utiliza el método síncrono `unlinkSync` del paquete `fs` para borrar el archivo JSON.

#### Método `deleteUserDirectory`

Para borrar una carpeta de usuario, se ha implementado el método `deleteUserDirectory`, este método recibe como parámetro el nombre del usuario a borrar.

```typescript
  public static deleteUserDirectory(userName: string): void {
    // comprobar primero si existe la carpeta del usuario
    if (FileModifier.checkUserName(userName)) {
      fs.rmdirSync(FileModifier.filePath + userName);
    }
  }
```

Lo que hace este método es primero comprobar que existe la carpeta del usuario en la base de datos, en caso de que no exista se lanza una excepción. Después, se utiliza el método síncrono `rmdirSync` del paquete `fs` para borrar la carpeta del usuario.

#### Método `checkFunkoId`

Se ha implementado este método para comprobar que el id del funko no existe ya en la base de datos, este método recibe como parámetro el id del funko a comprobar y retorna un booleano indicando si el id existe o no.

```typescript
  public static checkFunkoId(userName: string, funkoId: number): boolean {
    // comprobar primero si existe la carpeta del usuario
    if (!FileModifier.checkUserName(userName)) {
      return false;
    }
    const files = fs.readdirSync(FileModifier.filePath + userName);
    for (const file of files) {
      const funko = FileModifier.readFunkoFile(userName + '/' + file);
      if (funko.getId() === funkoId) {
        return true;
      }
    }
    return false;
  }
```

En este método primero se comprueba que existe la carpeta del usuario en la base de datos, en caso de que no exista se lanza una excepción. Después, se utiliza el método síncrono `readdirSync` del paquete `fs` para leer los archivos de la carpeta del usuario. Por último, se recorre el array de archivos y se lee cada archivo con el método `readFunkoFile`, se comprueba si el id del funko leido es igual al id del funko que se quiere comprobar y se retorna un booleano indicando si el id existe o no.

#### Método `checkUserName`

Se ha implementado este método para comprobar que el nombre del usuario existe en la base de datos, este método recibe como parámetro el nombre del usuario a comprobar y retorna un booleano indicando si el nombre existe o no.

```typescript
  public static checkUserName(userName: string): boolean {
    if (fs.existsSync(FileModifier.filePath + userName)) {
      return true;
    }
    return false;
  }
```

En este método se utiliza el método síncrono `existsSync` del paquete `fs` para comprobar si existe la carpeta del usuario en la base de datos, se retorna un booleano indicando si el nombre existe o no.

#### Método `getPathFromId`

Este método lo que hace es buscar el path de un funko a partir de su id, este método recibe como parámetros el nombre del usuario y el id del funko y retorna el path del funko.

```typescript
  public static getPathFromId(userName: string, funkoId: number): string {
    const files = fs.readdirSync(FileModifier.filePath + userName);
    let path = '';
    for (const file of files) {
      const funko = FileModifier.readFunkoFile(userName + '/' + file);
      if (funko.getId() === funkoId) {
        path = userName + '/' + file;
        return path;
      }
    }
    return path;
  }
```

En este método se utiliza el método síncrono `readdirSync` del paquete `fs` para leer los archivos de la carpeta del usuario. Por último, se recorre el array de archivos y se lee cada archivo con el método `readFunkoFile`, se comprueba si el id del funko leido es igual al id del funko que se quiere comprobar y se retorna el path del funko.

#### Método `listFunkos`

Este método lo que hace es listar todos los funkos de un usuario, este método recibe como parámetro el nombre del usuario y retorna un array de strings con el nombre de los ficheros.

```typescript
  public static listFunkos(userName: string): string[] {
    const files = fs.readdirSync(FileModifier.filePath + userName);
    return files;
  }
```

En este método se utiliza el método síncrono `readdirSync` del paquete `fs` para leer los archivos de la carpeta del usuario y se retorna un array de strings con el nombre de los ficheros.


### App

En el fichero `app.ts` se ha impolementado todos los comandos de la aplicación utilizando yargs, se ha implementado un comando para cada una de las operaciones que se pueden realizar con la aplicación. Además se utiliza el paquete `chalk` para darle color a los mensajes de la aplicación, los mensajes informativos se muestran en color verde y los mensajes de error en color rojo.

Cabe destacar que se utiliza `demandCommand` para obligar a que se introduzca al menos un comando en la aplicación, en caso de que no se introduzca ningún comando se muestra un mensaje de error y la ayuda de la aplicación.

```typescript
  // Con esto obligamos a que se introduzca al menos un comando
  .demandCommand(1, 'Debes introducir al menos un comando')
  .help()
  .argv;
```


#### Comando `add`

El comando `add` se utiliza para añadir un nuevo funko a la base de datos, este comando recibe como opciones el nombre de usuario a agregar el funko y la id única del nuevo funko, además recibe también todos los atributos que posee un funko. Todos y cada uno de los atributos son obligatorios, al igual que el userName y el id, que es algo común a todos los comandos.

```typescript
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
```

Se aprecia que lo que se hace es primero comprobar si hay un funko con el mismo id, en caso de que exista se muestra un mensaje de error y se sale del comando. Después, se crea un nuevo objeto de tipo `Funko` con los atributos que se han pasado como parámetros al comando estando esto dentro de un bloque `try catch` para manejar los posibles errores al crear el objeto que se lanzan en el constructor de la clase `Funko`. Por último, se crea el fichero del funko con el método `createFunkoFile` y se muestra un mensaje de éxito. En caso de que se produzca algún error se muestra un mensaje de error en rojo.

#### Comando `update`

Este comando tiene la función de actualizar un funko, este comando recibe como opciones el nombre de usuario a actualizar el funko y la id única del funko a actualizar, estos dos son las únicas opciones obligatorias, luego se puede pasar como opción cualquiera de los atributos del funko que se desee actualizar, pero debe pasarse al menos uno de estos.

``` Typescript
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
```

Se puede observar como despues de todas las opciones tenemos un bloque `check` que comprueba que al menos una opción no demandada sea proporcionada, esto es para que como mencioné previamente, se pase una o mas opciones para actualizar el funko. Después, se comprueba si existe el funko con la id proporcionada, en caso de que no exista se muestra un mensaje de error y se sale del comando. Después, se lee el fichero del funko con el método `readFunkoFile` y se actualizan los atributos del funko con los que se han pasado como parámetros al comando, en caso de que no se haya pasado un parámetro para actualizar un atributo, este no se actualiza. Después, se actualiza el fichero del funko con el método `updateFunkoFile` y se muestra un mensaje de éxito. En caso de que se produzca algún error se muestra un mensaje de error en rojo.

#### Comando `read` 

Este comando lo que hace es un funko en concreto, este comando recibe como opciones el nombre de usuario a leer el funko y la id única del funko a leer, estos dos son las únicas opciones y son obligatorias.

``` Typescript
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
```

Basicamente lo que hace el comando es comprobar si existe el funko con la id proporcionada, en caso de que no exista se muestra un mensaje de error y se sale del comando. Después, se lee el fichero del funko con el método `readFunkoFile` y se muestra la información del funko con el método `print` de la clase `Funko`.

#### Comando `delete`

Este comando lo que hace es eliminar un funko de la colección de un usuario, este comando recibe como opciones el nombre de usuario a eliminar el funko y la id única del funko a eliminar, estos dos son las únicas opciones y son obligatorias.

``` Typescript
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
```

Lo que hace el comando es comprobar si existe el usuario con el nombre proporcionado, en caso de que no exista se muestra un mensaje de error y se sale del comando. Después, se comprueba si existe el funko con la id proporcionada, en caso de que no exista se muestra un mensaje de error y se sale del comando. Después, se elimina el fichero del funko con el método `deleteFunkoFile` y se muestra un mensaje de éxito.

#### Comando `listFunkos`

Este comando lo que hace es listar todos los funkos de la colección de un usuario, recibe como opciones el nombre de usuario a listar los funkos, esta opción es obligatoria.

``` Typescript
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
```

Lo que hace el comando es comprobar si existe el usuario con el nombre proporcionado, en caso de que no exista se muestra un mensaje de error y se sale del comando. Después, se listan todos los ficheros de funkos del usuario con el método `listFunkos` y se crea un array de funkos con el método `readFunkoFile`, esto desntro de un try catch para controlar los errores. Después, se ordena el array de funkos de mayor a menor valor y se muestra la información de cada funko con el método `print`.

#### Comando `CreateUser`

Este comando basicamente crea el directorio del usuario en la base de datos, recibe como opciones el nombre de usuario a crear, esta opción es obligatoria.

``` Typescript
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
```

Basicamente, primero se comprueba si existe el usuario con el nombre proporcionado, en caso de que exista se muestra un mensaje de error y se sale del comando. Después, se crea el directorio del usuario con el método `createUserDirectory`.

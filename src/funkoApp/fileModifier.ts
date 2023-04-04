import fs from 'fs';
import { Funko } from './funko.js';

/**
 * Clase que se encarga de todo lo relacionado con el sistema de ficheros
 */
export class FileModifier {
  /**
   * Ruta de la carpeta donde se guardan los ficheros
   * Es una propiedad estática porque no cambia y compartida por todos los objetos de la clase
   */
  private static readonly filePath = './FunkoAppDB/';
  constructor() {}

  /**
   * Método que crea una carpeta con el nombre del usuario
   * @param UserName Nombre del usuario a crear
   */
  public static createUserDirectory(UserName: string): void {
    fs.mkdirSync(FileModifier.filePath + UserName);
  }

  /**
   * Método que crea un fichero con los datos del funko
   * @param userName Nombre del usuario que crea el funko
   * @param funko Objeto funko que se va a guardar en el fichero
   */
  public static createFunkoFile(userName: string, funko: Funko): void {
    // comprobar que hay una carpeta con el nombre del usuario
    if (!fs.existsSync(FileModifier.filePath + userName)) {
      FileModifier.createUserDirectory(userName);
    }
    const data = JSON.stringify(funko, null, 2);
    fs.writeFileSync(FileModifier.filePath + userName + '/' + 'funko' + funko.getId() + '.json', data);
  }

  /**
   * Método que lee los datos de un fichero y los devuelve en un objeto funko
   * @param fileName Nombre del fichero a leer
   * @returns Objeto funko con los datos del fichero
   */
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

  /**
   * Método que actualiza los datos de un fichero con los datos de un objeto funko
   * @param path ruta del fichero a modificar
   * @param funko objeto funko con los datos a modificar
   */
  public static updateFunkoFile(path: string, funko: Funko): void {
    // comprobar primero si existe la carpeta del usuario
    if (FileModifier.checkUserName(path)) {
      const data = JSON.stringify(funko, null, 2);
      fs.writeFileSync(FileModifier.filePath + path, data);
    }
  }

  /**
   * Método que elimina un fichero de un objeto funko
   * @param path ruta del fichero a eliminar
   */
  public static deleteFunkoFile(path: string): void {
    // comprobar primero si existe la carpeta del usuario
    if (FileModifier.checkUserName(path)) {
      fs.unlinkSync(FileModifier.filePath + path);
    }
  }

  /**
   * Método que elimina una carpeta de un usuario
   */
  public static deleteUserDirectory(userName: string): void {
    // comprobar primero si existe la carpeta del usuario
    if (FileModifier.checkUserName(userName)) {
      fs.rmdirSync(FileModifier.filePath + userName);
    }
  }

  /**
   * Método que comprueba si existe un funko con un id determinado para un usuario
   * @param userName Nombre del usuario
   * @param funkoId Id del funko a buscar
   * @returns true si el funko existe, false si no existe
   */
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

  /**
   * Método que comprueba si existe una carpeta con el nombre del usuario
   * @param userName Nombre del usuario
   * @returns true si existe la carpeta del usuario, false si no existe
   */
  public static checkUserName(userName: string): boolean {
    if (fs.existsSync(FileModifier.filePath + userName)) {
      return true;
    }
    return false;
  }
  
  /**
   * Método que devuelve la ruta de un fichero a partir de su id
   * @param userName Nombre del usuario
   * @param funkoId Id del funko a buscar
   * @returns Ruta del fichero del funko si existe, cadena vacía si no existe
   */
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

  /**
   * Método que devuelve una lista de ficheros de un usuario
   * @param userName Nombre del usuario
   * @returns Lista de ficheros del usuario
   */
  public static listFunkos(userName: string): string[] {
    const files = fs.readdirSync(FileModifier.filePath + userName);
    return files;
  }
}

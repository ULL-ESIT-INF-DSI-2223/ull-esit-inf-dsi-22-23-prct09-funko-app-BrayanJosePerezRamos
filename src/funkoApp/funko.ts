import { FunkoFranchise } from './enums/funkoFranchise.js';
import { FunkoGenre } from './enums/funkoGenre.js';
import { FunkoType } from './enums/funkoType.js';
import chalk from "chalk"
import { ValueRange } from './enums/valueRange.js';

export class Funko {
  /**
   * Constructor de la clase Funko, se encarga de crear un nuevo objeto de tipo Funko
   * así como de comprobar que los parámetros son correctos tanto al crearlo como al 
   * actualizarlo y lanzar los errores correspondientes
   * @param id ID del funko (unico para cada usuario)
   * @param name Nombre del funko
   * @param description Descripción del funko
   * @param type Tipo de funko
   * @param genre Género del funko
   * @param franchise Franquicia del funko
   * @param franchiseId ID de la franquicia
   * @param exclusive Si es exclusivo o no
   * @param specialCaracteristics Características especiales
   * @param value Valor del funko (precio de mercado)
   */
  constructor(
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
    ) {
    // si algun parametro es null o undefined, lanzar un error
    if (id === null || id === undefined) {
      throw new Error('ID must not be null or undefined');
    }

    if (name === null || name === undefined) {
      throw new Error('Name must not be null or undefined');
    }

    if (description === null || description === undefined) {
      throw new Error('Description must not be null or undefined');
    }

    if (type === null || type === undefined) {
      throw new Error('Type must not be null or undefined');
    }

    // comprobar que el tipo es un valor válido
    if (!Object.values(FunkoType).includes(type)) {
      throw new Error('Type must be a valid type');
    }

    if (genre === null || genre === undefined) {
      throw new Error('Genre must not be null or undefined');
    }

    // comprobar que el género es un valor válido
    if (!Object.values(FunkoGenre).includes(genre)) {
      throw new Error('Genre must be a valid genre');
    }

    if (franchise === null || franchise === undefined) {
      throw new Error('Franchise must not be null or undefined');
    }

    // comprobar que la franquicia es un valor válido
    if (!Object.values(FunkoFranchise).includes(franchise)) {
      throw new Error('Franchise must be a valid franchise');
    }

    if (franchiseId === null || franchiseId === undefined) {
      throw new Error('Franchise ID must not be null or undefined');
    }

    if (exclusive === null || exclusive === undefined) {
      throw new Error('Exclusive must not be null or undefined');
    }

    if (specialCaracteristics === null || specialCaracteristics === undefined) {
      throw new Error('Special Caracteristics must not be null or undefined');
    }

    if (specialCaracteristics === '') {
      throw new Error('Special characteristics must not be empty');
    }

    if (value === null || value === undefined) {
      throw new Error('Value must not be null or undefined');
    }

    // comprobar que el id es un numero entero positivo
    if (id < 0 || !Number.isInteger(id)) {
      throw new Error('ID must be a positive integer');
    }

    if (name === '') {
      throw new Error('Name must not be empty');
    }

    if (description === '') {
      throw new Error('Description must not be empty');
    }

    if (franchiseId < 0 || !Number.isInteger(franchiseId)) {
      throw new Error('FranchiseID must be a positive integer');
    }

    // comprobar si value es positivo y un numero(puede ser decimal) pero que no sea string
    if (value < 0 || typeof value !== 'number') {
      throw new Error('Value must be a positive number');
    }
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.genre = genre;
    this.franchise = franchise;
    this.franchiseId = franchiseId;
    this.exclusive = exclusive;
    this.specialCaracteristics = specialCaracteristics;
    this.value = value;
  }

  /**
   * getter del id
   * @returns id del funko
   */
  public getId(): number { return this.id; }

  /**
   * setter del id
   * @param id id del funko
   */
  public setId(id: number) { 
    // comprobar que el id es un numero entero positivo
    if (id < 0 || !Number.isInteger(id)) {
      throw new Error('ID must be a positive integer');
    }
    this.id = id; 
  }

  /**
   * getter del nombre
   * @returns nombre del funko
   */
  public getName(): string { return this.name; }

  /**
   * setter del nombre
   * @param name nombre del funko
   */
  public setName(name: string) {
    // comprobar que el nombre no es vacio
    if (name === '') {
      throw new Error('Name must not be empty');
    } 
    this.name = name; 
  }

  /**
   * getter de la descripción
   * @returns descripción del funko
   */
  public getDescription(): string { return this.description; }

  /**
   * setter de la descripción
   * @param description descripción del funko
   */
  public setDescription(description: string) { 
    // comprobar que la descripción no es vacia
    if (description === '') {
      throw new Error('Description must not be empty');
    }
    this.description = description; }

  /**
   * getter del tipo
   * @returns tipo del funko
   */
  public getType(): FunkoType { return this.type; }

  /**
   * setter del tipo
   * @param type tipo del funko
   */
  public setType(type: FunkoType) { 
    // comprobar que el tipo es un valor válido
    if (!Object.values(FunkoType).includes(type)) {
      throw new Error('Type must be a valid type');
    }
    this.type = type; 
  }

  /**
   * getter del género
   * @returns género del funko
   */
  public getGenre(): string { return this.genre; }

  /**
   * setter del género
   * @param genre género del funko
   */
  public setGenre(genre: FunkoGenre) { 
    // comprobar que el género es un valor válido
    if (!Object.values(FunkoGenre).includes(genre)) {
      throw new Error('Genre must be a valid genre');
    }
    this.genre = genre; 
  }

  /**
   * getter de la franquicia
   * @returns franquicia del funko
   */
  public getFranchise(): string { return this.franchise; }

  /**
   * setter de la franquicia
   * @param franchise franquicia del funko
   */
  public setFranchise(franchise: FunkoFranchise) { 
    // comprobar que la franquicia es un valor válido
    if (!Object.values(FunkoFranchise).includes(franchise)) {
      throw new Error('Franchise must be a valid franchise');
    }
    this.franchise = franchise; 
  }

  /**
   * getter del id de la franquicia
   * @returns id de la franquicia
   */
  public getFranchiseId(): number { return this.franchiseId; }

  /**
   * setter del id de la franquicia
   * @param franchiseId id de la franquicia
   */
  public setFranchiseId(franchiseId: number) { 
    // comprobar que el id de la franquicia es un numero entero positivo
    if (franchiseId < 0 || !Number.isInteger(franchiseId)) {
      throw new Error('Franchise ID must be a positive integer');
    }
    this.franchiseId = franchiseId;
  }

  /**
   * getter de si es exclusivo o no
   */
  public getExclusive(): boolean { return this.exclusive; }

  /**
   * setter de si es exclusivo o no
   * @param exclusive si es exclusivo o no
   */
  public setExclusive(exclusive: boolean) { 
    // comprobar que exclusive es un booleano
    if (typeof exclusive !== 'boolean') {
      throw new Error('Exclusive must be a boolean');
    }
    this.exclusive = exclusive;
  }

  /**
   * getter de las características especiales
   * @returns características especiales
   */
  public getSpecialCaracteristics(): string { return this.specialCaracteristics; }

  /**
   * setter de las características especiales
   * @param specialCaracteristics características especiales
   */
  public setSpecialCaracteristics(specialCaracteristics: string) {
    // comprobar que las características especiales no son vacias
    if (specialCaracteristics === '') {
      throw new Error('Special characteristics must not be empty');
    }
    this.specialCaracteristics = specialCaracteristics; 
  }

  /**
   * getter del valor de mercado
   */
  public getValue(): number { return this.value; }

  /**
   * setter del valor de mercado
   * @param value valor de mercado
   */
  public setValue(value: number) { 
    // comprobar que el valor de mercado es un numero entero positivo
    if (value < 0 || !Number.isInteger(value)) {
      throw new Error('Value must be a positive integer');
    }
    this.value = value; 
  }

  /**
   * Metodo print para mostrar los datos del funko, tambien se encarga de 
   * imprimir de un color u otro el valor de mercado segun su rango
   */
  public print(): string {
    let funkoString = '';
    funkoString += `ID: ${this.id}\n`;
    funkoString += `Name: ${this.name}\n`;
    funkoString += `Description: ${this.description}\n`;
    funkoString += `Type: ${this.type}\n`;
    funkoString += `Genre: ${this.genre}\n`;
    funkoString += `Franchise: ${this.franchise}\n`;
    funkoString += `Franchise ID: ${this.franchiseId}\n`;
    funkoString += `Exclusive: ${this.exclusive}\n`;
    funkoString += `Special Characteristics: ${this.specialCaracteristics}\n`;
    if (this.value >= ValueRange.Expensive) {
      funkoString += `Value: ${chalk.red(this.value)}\n`;
    }
    else if (this.value >= ValueRange.High) {
      funkoString += `Value: ${chalk.yellow(this.value)}\n`;
    }
    else if (this.value >= ValueRange.Medium) {
      funkoString += `Value: ${chalk.blue(this.value)}\n`;
    }
    else if (this.value >= ValueRange.Cheap) {
      funkoString += `Value: ${chalk.green(this.value)}\n`;
    }
    console.log(funkoString);
    return funkoString;
  }
}

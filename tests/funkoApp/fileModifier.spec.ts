import 'mocha';
import {expect} from 'chai';
import {FileModifier} from '../../src/funkoApp/fileModifier.js';
import {Funko} from '../../src/funkoApp/funko.js';
import {FunkoGenre} from '../../src/funkoApp/enums/funkoGenre.js';
import {FunkoType} from '../../src/funkoApp/enums/funkoType.js';
import {FunkoFranchise} from '../../src/funkoApp/enums/funkoFranchise.js';

describe('FileModifier createFunkoFile', () => {
  it('should create a file with the correct data', () => {
    const funko = new Funko(1, 'Batman', 'DC Comics Batman', FunkoType.Pop, FunkoGenre.Movies, FunkoFranchise.DCComics, 1, false, 'none', 10);
    FileModifier.createFunkoFile('testUser', funko);
    const fileData = FileModifier.readFunkoFile('testUser/funko1.json');
    expect(fileData.getName()).to.equal(funko.getName());
    expect(fileData.getDescription()).to.equal(funko.getDescription());
    expect(fileData.getType()).to.equal(funko.getType());
    expect(fileData.getGenre()).to.equal(funko.getGenre());
    expect(fileData.getFranchise()).to.equal(funko.getFranchise());
    expect(fileData.getFranchiseId()).to.equal(funko.getFranchiseId());
    expect(fileData.getExclusive()).to.equal(funko.getExclusive());
    expect(fileData.getSpecialCaracteristics()).to.equal(funko.getSpecialCaracteristics());
    expect(fileData.getValue()).to.equal(funko.getValue());
  });
});


describe('Filemodifier readFunkoFile', () => {
  it('should read the funko data from a file', () => {
    const funko = new Funko(1, 'Batman', 'DC Comics Batman', FunkoType.Pop, FunkoGenre.Movies, FunkoFranchise.DCComics, 1, false, 'none', 10);
    const readFunko = FileModifier.readFunkoFile('testUser/funko1.json');
    expect(readFunko.getId()).to.equal(funko.getId());
    expect(readFunko.getName()).to.equal(funko.getName());
    expect(readFunko.getDescription()).to.equal(funko.getDescription());
    expect(readFunko.getType()).to.equal(funko.getType());
    expect(readFunko.getGenre()).to.equal(funko.getGenre());
    expect(readFunko.getFranchise()).to.equal(funko.getFranchise());
    expect(readFunko.getFranchiseId()).to.equal(funko.getFranchiseId());
    expect(readFunko.getExclusive()).to.equal(funko.getExclusive());
    expect(readFunko.getSpecialCaracteristics()).to.eql(funko.getSpecialCaracteristics());
    expect(readFunko.getValue()).to.equal(funko.getValue());
  });
});

describe('FileModifier updateFunkoFile', () => {
  it('should update a funko file', () => {
    const funko = new Funko(1, 'Batman', 'DC Comics Batman', FunkoType.Pop, FunkoGenre.Movies, FunkoFranchise.DCComics, 1, false, 'none', 20);
    FileModifier.updateFunkoFile('testUser/funko1.json', funko);
    const fileData = FileModifier.readFunkoFile('testUser/funko1.json');
    expect(fileData.getValue()).to.equal(funko.getValue());
  });
});

// checkFunkoId
describe('FileModifier checkFunkoId', () => {
  it('should return true if the funko id exists', () => {
    const result = FileModifier.checkFunkoId('testUser', 1);
    expect(result).to.be.true;
  });
  it('should return false if the funko id does not exist', () => {
    const result = FileModifier.checkFunkoId('testUser', 2);
    expect(result).to.be.false;
  });
});

// getPathFromId
describe('FileModifier getPathFromId', () => {
  it('should return the correct path', () => {
    const result = FileModifier.getPathFromId('testUser', 1);
    expect(result).to.equal('testUser/funko1.json');
  });
});

// getPathFromId vacio
describe('FileModifier getPathFromId empty', () => {
  it('should return an empty string if the funko id does not exist', () => {
    const result = FileModifier.getPathFromId('testUser', 2);
    expect(result).to.equal('');
  });
});

// listFunkos
describe('FileModifier listFunkos', () => {
  it('should return an array with the funko ids', () => {
    const result = FileModifier.listFunkos('testUser');
    expect(result).to.eql([1]);
  });
});

describe('FileModifier deleteFunkoFile', () => {
  it('should delete a funko file', () => {
    FileModifier.deleteFunkoFile('testUser/funko1.json');
    // leer el archivo deberia lanzar un error porque no existe
    expect(() => FileModifier.readFunkoFile('testUser/funko1.json')).to.throw();
  });
});


describe('FileModifier createUserDirectory', () => {
  it('should create a user directory', () => {
    FileModifier.createUserDirectory('testUser2');
    const result = FileModifier.checkUserName('testUser2');
    expect(result).to.be.true;
  });
})

describe('FileModifier checkUserName false', () => {
  it('should return false if the user does not exist', () => {
    // borramos el directorio de testUser1
    FileModifier.deleteUserDirectory('testUser');
    // borramos el directorio de testUser2
    FileModifier.deleteUserDirectory('testUser2');
    // comprobamos que no existen los directorios
    const result1 = FileModifier.checkUserName('testUser');
    const result2 = FileModifier.checkUserName('testUser2');
    expect(result1).to.be.false;
    expect(result2).to.be.false;
  });
});





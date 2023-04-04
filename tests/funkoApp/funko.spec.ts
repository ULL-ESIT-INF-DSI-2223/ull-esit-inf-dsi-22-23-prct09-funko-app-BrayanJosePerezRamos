import 'mocha';
import {expect} from 'chai';
import { Funko } from '../../src/funkoApp/funko.js';
import { FunkoFranchise } from '../../src/funkoApp/enums/funkoFranchise.js';
import { FunkoGenre } from '../../src/funkoApp/enums/funkoGenre.js';
import { FunkoType } from '../../src/funkoApp/enums/funkoType.js';

describe('Funko instance', () => {
  it('should be an instance of funko class', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(funko).to.be.instanceOf(Funko);
  });
})

describe('Funko constructor result', () => {
  it('should return the correct values', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(funko.getId()).to.equal(1);
    expect(funko.getName()).to.equal('name');
    expect(funko.getDescription()).to.equal('description');
    expect(funko.getType()).to.equal(FunkoType.PocketPop);
    expect(funko.getGenre()).to.equal(FunkoGenre.Movies);
    expect(funko.getFranchise()).to.equal(FunkoFranchise.StarWars);
    expect(funko.getFranchiseId()).to.equal(1);
    expect(funko.getExclusive()).to.equal(true);
    expect(funko.getSpecialCaracteristics()).to.equal('special characteristics');
    expect(funko.getValue()).to.equal(10);
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in value', () => {
    expect(() => new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', -10)).to.throw('Value must be a positive number');
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in Special Characteristics', () => {
    expect(() => new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, '', 10)).to.throw('Special characteristics must not be empty');
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in description', () => {
    expect(() => new Funko(1, 'name', '', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10)).to.throw('Description must not be empty');
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in name', () => {
    expect(() => new Funko(1, '', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10)).to.throw('Name must not be empty');
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in franchiseId', () => {
    expect(() => new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, -2, true, 'special characteristics', -10)).to.throw('FranchiseID must be a positive integer');
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in id', () => {
    expect(() => new Funko(1.5, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10)).to.throw('ID must be a positive integer');
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in id', () => {
    expect(() => new Funko(-1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10)).to.throw('ID must be a positive integer');
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in franchiseId', () => {
    expect(() => new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, -2.5, true, 'special characteristics', 10)).to.throw('FranchiseID must be a positive integer');
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in type', () => {
    expect(() => new Funko(1, 'name', 'description', 'invalid' as FunkoType, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10)).to.throw('Type must be a valid type');
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in genre', () => {
    expect(() => new Funko(1, 'name', 'description', FunkoType.PocketPop, 'invalido' as FunkoGenre, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10)).to.throw('Genre must be a valid genre');
  });
})

describe('Funko constructor error', () => {
  it('should throw an error in franchise', () => {
    expect(() => new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, 'invalid' as FunkoFranchise, 1, true, 'special characteristics', 10)).to.throw('Franchise must be a valid franchise');
  });
})


// -----Pruebas con los setters-----

describe('Funko setter result', () => {
  it('should return the correct values', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    funko.setId(2);
    funko.setName('name2');
    funko.setDescription('description2');
    funko.setType(FunkoType.PopVinyl);
    funko.setGenre(FunkoGenre.Sports);
    funko.setFranchise(FunkoFranchise.DCComics);
    funko.setFranchiseId(2);
    funko.setExclusive(false);
    funko.setSpecialCaracteristics('special characteristics2');
    funko.setValue(20);
    expect(funko.getId()).to.equal(2);
    expect(funko.getName()).to.equal('name2');
    expect(funko.getDescription()).to.equal('description2');
    expect(funko.getType()).to.equal(FunkoType.PopVinyl);
    expect(funko.getGenre()).to.equal(FunkoGenre.Sports);
    expect(funko.getFranchise()).to.equal(FunkoFranchise.DCComics);
    expect(funko.getFranchiseId()).to.equal(2);
    expect(funko.getExclusive()).to.equal(false);
    expect(funko.getSpecialCaracteristics()).to.equal('special characteristics2');
    expect(funko.getValue()).to.equal(20);
  });
})

describe('Funko setter error', () => {
  it('should throw an error in value', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setValue(-10)).to.throw('Value must be a positive integer');
  });
})

describe('Funko setter error', () => {
  it('should throw an error in Special Characteristics', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setSpecialCaracteristics('')).to.throw('Special characteristics must not be empty');
  });
})

describe('Funko setter error', () => {
  it('should throw an error in FranchiseId', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setFranchiseId(-1)).to.throw('Franchise ID must be a positive integer');
  });
})

describe('Funko setter error', () => {
  it('should throw an error in FranchiseId', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setFranchiseId(1.5)).to.throw('Franchise ID must be a positive integer');
  });
})

describe('Funko setter error', () => {
  it('should throw an error in Franchise', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setFranchise('invalid' as FunkoFranchise)).to.throw('Franchise must be a valid franchise');
  });
})

describe('Funko setter error', () => {
  it('should throw an error in Genre', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setGenre('invalid' as FunkoGenre)).to.throw('Genre must be a valid genre');
  });
})

describe('Funko setter error', () => {
  it('should throw an error in Type', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setType('invalid' as FunkoType)).to.throw('Type must be a valid type');
  });
})

describe('Funko setter error', () => {
  it('should throw an error in Description', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setDescription('')).to.throw('Description must not be empty');
  });
})

describe('Funko setter error', () => {
  it('should throw an error in Name', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setName('')).to.throw('Name must not be empty');
  });
})

describe('Funko setter error', () => {
  it('should throw an error in Id', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setId(-1)).to.throw('ID must be a positive integer');
  });
})

describe('Funko setter error', () => {
  it('should throw an error in Id', () => {
    const funko = new Funko(1, 'name', 'description', FunkoType.PocketPop, FunkoGenre.Movies, FunkoFranchise.StarWars, 1, true, 'special characteristics', 10);
    expect(() => funko.setId(1.5)).to.throw('ID must be a positive integer');
  });
})

// prueba de print 
describe('Funko print', () => {
  it('should print the funko', () => {
    let funko: Funko;

    beforeEach(() => {
      funko = new Funko(
        1,
        'Batman',
        'Cool Batman Funko Pop!',
        FunkoType.Pop,
        FunkoGenre.Movies,
        FunkoFranchise.DCComics,
        123,
        true,
        'Glow in the Dark',
        15
      );
    });
  
    it('should print the funko data and return a string', () => {
      const expectedOutput = `ID: 1
  Name: Batman
  Description: Cool Batman Funko Pop!
  Type: Pop
  Genre: Heroes
  Franchise: DC Comics
  Franchise ID: 123
  Exclusive: true
  Special Characteristics: Glow in the Dark
  Value: 15\n`;
  
    expect(funko.print()).to.equal(expectedOutput);
    });
  });
})


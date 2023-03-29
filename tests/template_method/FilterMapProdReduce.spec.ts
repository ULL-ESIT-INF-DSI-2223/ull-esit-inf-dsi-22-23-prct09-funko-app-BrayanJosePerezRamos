import 'mocha';
import {expect} from 'chai';
import {FilterMapProdReduce} from '../../src/template_method/filterMapProdReduce.js';

describe('FilterMapProdReduce instance', () => {
  it('should run', () => {
    const fmr = new FilterMapProdReduce([1, 2, 3, 4, 5]);
    expect(fmr).to.be.instanceOf(FilterMapProdReduce);
  });
})

// describe('FilterMapProdReduce result', () => {
//   it('should run', () => {
//     const fmr = new FilterMapProdReduce([1, 2]);
//     expect(fmr.run()).to.equal(4);
//   });
// })

// describe('FilterMapProdReduce afterInit', () => {
//   it('should run', () => {
//     const fmr = new FilterMapProdReduce([1, 2]);
//     expect(fmr.afterInitiali()).to.equal(4);
//   });
// }
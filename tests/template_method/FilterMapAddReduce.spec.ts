import 'mocha';
import {expect} from 'chai';
import {FilterMapAddReduce} from '../../src/template_method/filterMapAddReduce.js';

describe('FilterMapSubReduce instance', () => {
  it('should run', () => {
    const fmr = new FilterMapAddReduce([1, 2, 3, 4, 5]);
    expect(fmr).to.be.instanceOf(FilterMapAddReduce);
  });
})

describe('FilterMapAddReduce result', () => {
  it('should run', () => {
    const fmr = new FilterMapAddReduce([1, 2, 3, 4, 5]);
    expect(fmr.run()).to.equal(20);
  });
})

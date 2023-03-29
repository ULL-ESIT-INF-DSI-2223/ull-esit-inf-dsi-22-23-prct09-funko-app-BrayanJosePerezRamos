import 'mocha';
import {expect} from 'chai';
import {FilterMapSubReduce} from '../../src/template_method/filterMapSubReduce.js';

describe('FilterMapSubReduce instance', () => {
  it('should run', () => {
    const fmr = new FilterMapSubReduce([1, 2, 3, 4, 5]);
    expect(fmr).to.be.instanceOf(FilterMapSubReduce);
  });
})

describe('FilterMapSubReduce result', () => {
  it('should run', () => {
    const fmr = new FilterMapSubReduce([1, 2, 3, 4, 5]);
    expect(fmr.run()).to.equal(-20);
  });
})
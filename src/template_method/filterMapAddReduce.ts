import { FilterMapReduce } from "./filterMapReduce.js";

export class FilterMapAddReduce extends FilterMapReduce {
  constructor (list: number[]) {
    super(list);
  }

  protected reduce(): number {
    let reduced = 0;
    for (let i = 0; i < this.list.length; i++) {
      reduced += this.list[i];
    }
    this.setlist([reduced]);
    return reduced;
  }

  protected afterInitialisation(): number[] {
    console.log("FilterMapAddReduce: after initialisation");
    return this.list;
  }
  protected afterfilter(): number[] {
    console.log("FilterMapAddReduce: after filter");
    return this.list;
  }

  protected afterMap(): number[] {
    console.log("FilterMapAddReduce: after map");
    return this.list;
  }

  protected afterReduce(): number[] {
    console.log("FilterMapAddReduce: after reduce");
    return this.list;
  }
}
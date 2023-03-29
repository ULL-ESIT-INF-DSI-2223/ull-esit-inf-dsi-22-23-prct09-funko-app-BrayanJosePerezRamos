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

  protected afterInitialisation():void {
    console.log("FilterMapAddReduce: after initialisation");
  }
  protected afterfilter(): void {
    console.log("FilterMapAddReduce: after filter");
  }

  protected afterMap(): void {
    console.log("FilterMapAddReduce: after map");
  }

  protected afterReduce(): void {
    console.log("FilterMapAddReduce: after reduce");
  }
}
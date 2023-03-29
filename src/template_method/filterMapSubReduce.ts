import { FilterMapReduce } from "./filterMapReduce.js";

export class FilterMapSubReduce extends FilterMapReduce {
  constructor (list: number[]) {
    super(list);
  }

  protected reduce(): number {
    let reduced = 0;
    for (let i = 0; i < this.list.length; i++) {
      reduced -= this.list[i];
    }
    this.setlist([reduced]);
    return reduced;
  }

  protected afterInitialisation(): void {
    console.log("FilterMapSubReduce: after initialisation");
  }

  protected afterfilter(): void {
    console.log("FilterMapSubReduce: after filter");
  }

  protected afterMap(): void {
    console.log("FilterMapSubReduce: after map");
  }

  protected afterReduce(): void {
    console.log("FilterMapSubReduce: after reduce");
  }
}
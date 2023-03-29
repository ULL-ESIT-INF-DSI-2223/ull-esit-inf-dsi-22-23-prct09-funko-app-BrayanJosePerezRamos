import { FilterMapReduce } from "./filterMapReduce.js";

export class FilterMapProdReduce extends FilterMapReduce {
  constructor (list: number[]) {
    super(list);
  }

  protected reduce(): number {
    let reduced = 1;
    for (let i = 0; i < this.list.length; i++) {
      reduced *= this.list[i];
    }
    this.setlist([reduced]);
    return reduced;
  }

  protected afterInitialisation(): void {
    console.log("FilterMapProdReduce: after initialisation");
  }

  protected afterfilter(): void {
    console.log("FilterMapProdReduce: after filter");
  }

  protected afterMap(): void {
    console.log("FilterMapProdReduce: after map");
  }

  protected afterReduce(): void {
    console.log("FilterMapProdReduce: after reduce");
  }
}
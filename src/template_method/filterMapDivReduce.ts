import { FilterMapReduce } from "./filterMapReduce.js";

export class FilterMapDivReduce extends FilterMapReduce {
  constructor (list: number[]) {
    super(list);
  }

  protected reduce(): number {
    let reduced = 1;
    for (let i = 0; i < this.list.length; i++) {
      reduced /= this.list[i];
    }
    this.setlist([reduced]);
    return reduced;
  }

  protected afterInitialisation(): void {
    console.log("FilterMapDivReduce: after initialisation");
  }

  protected afterfilter(): void {
    console.log("FilterMapDivReduce: after filter");
  }

  protected afterMap(): void {
    console.log("FilterMapDivReduce: after map");
  }

  protected afterReduce(): void {
    console.log("FilterMapDivReduce: after reduce");
  }
}
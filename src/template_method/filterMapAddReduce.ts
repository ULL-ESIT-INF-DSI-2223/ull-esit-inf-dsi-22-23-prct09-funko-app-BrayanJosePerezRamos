import { FilterMapReduce } from "./filterMapReduce.js";

/**
 * @class FilterMapAddReduce
 * Clase que extiende de FilterMapReduce y que implementa el método reduce con la suma
 */
export class FilterMapAddReduce extends FilterMapReduce {
  /**
   * @constructor
   * @param list Lista de números a procesar
   */
  constructor (list: number[]) {
    super(list);
  }

  /**
   * @method reduce
   * @returns resultado de la suma de los números de la lista
   */
  protected reduce(): number {
    let reduced = 0;
    for (let i = 0; i < this.list.length; i++) {
      reduced += this.list[i];
    }
    this.setlist([reduced]);
    return reduced;
  }

  /**
   * @method afterInitialisation
   * @returns lista de números después de la inicialización
   */
  protected afterInitialisation(): number[] {
    console.log("FilterMapAddReduce: after initialisation");
    return this.list;
  }

  /**
   * @method afterfilter
   * @returns lista de números después del filtrado
   */
  protected afterfilter(): number[] {
    console.log("FilterMapAddReduce: after filter");
    return this.list;
  }

  /**
   * @method afterMap
   * @returns lista de números después del mapeo
   */
  protected afterMap(): number[] {
    console.log("FilterMapAddReduce: after map");
    return this.list;
  }

  /**
   * @method afterReduce
   * @returns lista de números después de la reducción
   */
  protected afterReduce(): number[] {
    console.log("FilterMapAddReduce: after reduce");
    return this.list;
  }
}
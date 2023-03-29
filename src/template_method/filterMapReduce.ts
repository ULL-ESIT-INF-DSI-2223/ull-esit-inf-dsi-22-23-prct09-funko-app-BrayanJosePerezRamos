/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * Clase abstracta de un algoritmo de filter map reduce
 */
export abstract class FilterMapReduce {
  /**
   * Lista de números a procesar
   */
  protected list: number[];
  /**
   * Constructor de la clase
   * @param list Lista de números a procesar
   */
  constructor(list: number[]) {
    this.list = list;
  }

  /**
   * 
   * @param list setter de la lista de números a procesar
   */
  protected setlist(list: number[]) {
    this.list = list;
  }
  
  /**
   * metodo run de la clase, que ejecuta el algoritmo
   * @returns resultado del algoritmo
   */
  public run(): number {
    // hook
    this.afterInitialisation();
    // filter
    this.filter((n) => n % 2 === 0);
    // hook
    this.afterfilter();
    // map
    this.Map((n) => n * n);
    // hook
    this.afterMap();
    // reduce
    const result = this.reduce();
    // hook
    this.afterReduce();
    return result;
  }

  /**
   * Método que filtra la lista de números
   * @param filterFunction función de filtrado de la lista de números
   * @returns lista de números filtrada
   */
  protected filter(filterFunction: (n: number) => boolean = (n: number) => n % 2 === 0): number[] {
    const filteredNumbers: number[] = [];
    for (const num of this.list) {
      if (filterFunction(num)) {
        filteredNumbers.push(num);
      }
    }
    this.setlist(filteredNumbers);
    return filteredNumbers;
  }

  /**
   * Método que mapea la lista de números
   * @param callback función de mapeo de la lista de números
   * @returns lista de números mapeada
   */
  protected Map(callback: (value: number) => number = (value: number) => value * value): number[] {
    const mapped: number[] = [];
    for (let i = 0; i < this.list.length; i++) {
      mapped.push(callback(this.list[i]));
    }
    this.setlist(mapped);
    return mapped;
  }

  /**
   * Método abstracto que reduce la lista de números a un único valor, debe ser implementado por las clases hijas
   */
  protected abstract reduce(): number;

  /**
   * Métodos hook que se ejecutan en distintos puntos del algoritmo, deben ser implementados por las clases hijas
   */
  protected afterInitialisation() {}
  protected afterfilter() {}
  protected afterMap() {}
  protected afterReduce() {}
}
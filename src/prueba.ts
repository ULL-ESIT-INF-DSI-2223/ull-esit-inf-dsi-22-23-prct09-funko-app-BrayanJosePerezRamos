// /* eslint-disable @typescript-eslint/no-empty-function */
// /**
//  * Own type to describe an individual, i.e., a solution
//  * of our problem.
//  */
// export type Individual = {
//   decisionVariables: number[];
//   evaluate: () => void;
// }

// /**
//  * Abstract class of an Evolutionary Algorithm, which must be
//  * extended by subclasses that implement a particular approach.
//  */
// export abstract class EvolutionaryAlgorithm {
//   protected population: Individual[];

//   constructor(
//       protected mutationRate: number,
//       protected crossoverRate: number,
//       protected maxNumberGenerations: number) {
//     this.population = [];
//   }

//   /**
//    * Template method that defines the skeleton of an Evolutionary Algorithm.
//    */
//   public run() {
//     // Population initialisation
//     this.initPopulation();
//     // Hook
//     this.afterInitialisation();
//     // Initial population evaluation
//     this.evaluatePopulation();
//     // Hook
//     this.afterEvaluation();

//     // Run the generations of the algorithm
//     let currentNumberGenerations = 0;
//     while (currentNumberGenerations < this.maxNumberGenerations) {
//       // Generates the children
//       const childPopulation = this.generateAndEvaluateChildPopulation();
//       // Hook
//       this.afterChildrenGeneration();
//       // Selects the fittest individuals from among parents and children
//       this.population = this.selectFromParentsAndChildren(childPopulation);
//       // Hook
//       this.afterSurvivorSelection();
//       // New generation performed
//       currentNumberGenerations++;
//     }
//   }

//   /**
//    * Operations that already have implementations in the skeleton.
//    */
//   protected evaluatePopulation() {
//     console.log('Template: evaluating population');
//     this.population.forEach((individual) => {
//       individual.evaluate();
//     });
//   }

//   protected generateAndEvaluateChildPopulation() {
//     console.log('Template: generating children');

//     const childPopulation: Individual[] = [];

//     this.population.forEach((individual) => {
//       const otherIndividual =
//         this.population[Math.floor(Math.random() * this.population.length)];

//       const [newIndividual, otherNewIndividual] =
//         this.crossover(individual, otherIndividual, this.crossoverRate);

//       this.mutation(newIndividual, this.mutationRate);
//       this.mutation(otherNewIndividual, this.mutationRate);

//       newIndividual.evaluate();
//       otherNewIndividual.evaluate();

//       childPopulation.push(newIndividual, otherNewIndividual);
//     });

//     return childPopulation;
//   }

//   /**
//    * Operations that must be implemented by subclasses
//    */
//   protected abstract initPopulation(): void;
//   protected abstract crossover(firstIndividual: Individual,
//     secondIndividual: Individual, crossoverRate: number):
//     [Individual, Individual];
//   protected abstract mutation(individual: Individual,
//     mutationRate: number): void;
//   protected abstract selectFromParentsAndChildren(
//     childPopulation: Individual[]): Individual[];

//   /**
//    * Empty operations that could be implemented by subclasses (not
//    * mandatory)
//    */
//   protected afterInitialisation() {}
//   protected afterEvaluation() {}
//   protected afterChildrenGeneration() {}
//   protected afterSurvivorSelection() {}
// }

// /**
//  * Concrete classes have to implement all abstract operations
//  * and could override some operations with a default behaviour
//  */
// export class GeneticAlgorithm extends EvolutionaryAlgorithm {
//   constructor(protected mutationRate: number, protected crossoverRate: number,
//       protected maxNumberGenerations: number) {
//     super(mutationRate, crossoverRate, maxNumberGenerations);
//   }

//   /**
//    * Particular implementation of the population initialisation
//    */
//   protected initPopulation() {
//     console.log(`GA: initialising population`);
//     const firstInd = {
//       decisionVariables: [1, 2],
//       evaluate: () => {},
//     };
//     const secondInd = {
//       decisionVariables: [3, 4],
//       evaluate: () => {},
//     };

//     this.population.push(firstInd, secondInd);
//   }

//   /**
//    * Particular implementation of the crossover operator
//    */
//   protected crossover(firstIndividual: Individual,
//       secondIndividual: Individual, crossoverRate: number):
//       [Individual, Individual] {
//     console.log(`GA: applying crossover with crossover rate ${crossoverRate}`);
//     return [firstIndividual, secondIndividual];
//   }

//   /**
//    * Particular implementation of the mutation operator
//    */
//   protected mutation(_: Individual, mutationRate: number) {
//     console.log(`GA: applying mutation with mutation rate ${mutationRate}`);
//   }

//   /**
//    * Particular implementation of the survivor operator
//    */
//   protected selectFromParentsAndChildren(_: Individual[]) {
//     console.log(`GA: Selecting survivors for next generation`);
//     return this.population;
//   }

//   /**
//    * Particular implementation of a non-mandatory operation
//    */
//   protected afterSurvivorSelection() {
//     console.log(`GA: I have just selected survivors for the next generation`);
//   }
// }

// /**
//  * Client code
//  */
// export function clientCode(evolutionaryAlgorithm: EvolutionaryAlgorithm) {
//   evolutionaryAlgorithm.run();
// }

// clientCode(new GeneticAlgorithm(0.1, 1.0, 10));
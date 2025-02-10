class BenchmarkSuite {
    constructor(name) {
      this.name = name;
      this.tests = [];
    }
  
    // Ajouter une version d'un algorithme
    addTest(name, func) {
      this.tests.push({ name, func });
    }
  
    // Exécuter le benchmark
    run(params, iterations = 1000) {
      console.log(`Exécution du benchmark: ${this.name}`);
  
      let results = this.tests.map(({ name, func }) => {
        let times = [];
  
        for (let i = 0; i < iterations; i++) {
          let start = performance.now();
          func(...params); // Exécute l'algorithme avec les mêmes paramètres
          let end = performance.now();
          times.push(end - start);
        }
  
        let avgTime = times.reduce((sum, t) => sum + t, 0) / iterations;
        return { name, avgTime };
      });
  
      results.sort((a, b) => a.avgTime - b.avgTime);
  
      console.log("\nRésultats:");
      results.forEach((r) =>
        console.log(`${r.name}: ${r.avgTime.toFixed(4)} ms`)
      );
  
      console.log(
        `\nVersion la plus rapide: ${results[0].name} (${results[0].avgTime.toFixed(4)} ms)`
      );
      console.log(
        `Version la plus lente: ${results[results.length - 1].name} (${results[results.length - 1].avgTime.toFixed(4)} ms)\n`
      );
    }
  }
  
  function containsDuplicateNaive(array) {
    
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[i] === array[j]) {
          return true;
        }
      }
    }
    return false;
  }
  
  // Version optimisée O(n) avec Set
  function containsDuplicateOptimized(array) {
    
    let seen = new Set(); // O(1) - Complexité spatiale: O(n)
    for (let i = 0; i < array.length; i++) { // O(n)
      if (seen.has(array[i])) { // O(1)
        return true; // O(1)
      }
      seen.add(array[i]); // O(1)
    }
    return false; // O(1)
    // Complexité spatiale totale: O(n)
  }
  
  // Algorithme findCommonElements
  
  // Version naïve O(n^2)
  function findCommonElementsNaive(array1, array2) {
    let commonElements = [];
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
          commonElements.push(array1[i]);
        }
      }
    }
    return commonElements;
  }
  
  // Version optimisée O(n) avec Set
  function findCommonElementsOptimized(array1, array2) {
    let set1 = new Set(array1);
    return array2.filter((num) => set1.has(num));
  }
  
  // Algorithme Fibonacci
  
  // Version récursive O(2^n)
  function fibonacciRecursive(n) {
    if (n <= 1) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
  }
  
  // Version optimisée O(n) avec mémoïsation
  function fibonacciIterative(n) {
    if (n <= 1) return n;
    let a = 0,
      b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  }
  
  //Lancer les benchmarks
  
  console.log("creating test array...");
  const testArray1 = [];
  for (let index = 0; index < 100000; index++) {
    testArray1[index] = index;
  }
  testArray1[testArray1.length - 1] = 100000 - 2;

  const testArray2 = [];
  for (let index = 0; index < 100000; index++) {
    testArray2[index] = index;
  }
  testArray2[testArray2.length - 1] = 100000 - 2;
  console.log("test array created");
  const fiboNumber = 30;
  
  // Benchmark pour containsDuplicate
  const benchmarkContainsDuplicate = new BenchmarkSuite("Test de containsDuplicate");
  benchmarkContainsDuplicate.addTest("Naïve", containsDuplicateNaive);
  benchmarkContainsDuplicate.addTest("Optimisé", containsDuplicateOptimized);
  benchmarkContainsDuplicate.run([testArray1], 10);
  
  // Benchmark pour findCommonElements
  const benchmarkFindCommonElements = new BenchmarkSuite("Test de findCommonElements");
  benchmarkFindCommonElements.addTest("Naïve", findCommonElementsNaive);
  benchmarkFindCommonElements.addTest("Optimisé", findCommonElementsOptimized);
  benchmarkFindCommonElements.run([testArray1, testArray2], 10);
  
  // Benchmark pour Fibonacci
  const benchmarkFibonacci = new BenchmarkSuite("Test de Fibonacci");
  benchmarkFibonacci.addTest("Naïve", fibonacciRecursive);
  benchmarkFibonacci.addTest("Optimisé", fibonacciIterative);
  benchmarkFibonacci.run([fiboNumber], 10);
  
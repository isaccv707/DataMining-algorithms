
import { useState } from 'react';

export const NaiveBayes = () => {
  // Estado para almacenar el conjunto de datos ingresado por el usuario
  const [userDataset, setUserDataset] = useState('');
  // Estado para almacenar la instancia ingresada por el usuario
  const [userInstance, setUserInstance] = useState('');
  // Estado para almacenar la predicción
  const [prediction, setPrediction] = useState('');

  // Función para calcular la probabilidad de cada clase
  const calculateClassProbabilities = (dataset) => {
    let classCounts = {};
    let totalInstances = dataset.length;

    // Contar cuántas veces aparece cada clase en el conjunto de datos
    dataset.forEach((instance) => {
      let label = instance.label;
      if (classCounts[label]) {
        classCounts[label]++;
      } else {
        classCounts[label] = 1;
      }
    });

    // Calcular la probabilidad de cada clase
    let probabilities = {};
    for (let label in classCounts) {
      probabilities[label] = classCounts[label] / totalInstances;
    }
    return probabilities;
  };

  // Función para calcular la probabilidad de cada valor de atributo dado una clase
  const calculateAttributeProbabilities = (dataset, attribute, label) => {
    let attributeCounts = {};
    let totalInstances = 0;

    // Contar cuántas veces aparece cada valor de atributo para la clase dada
    dataset.forEach((instance) => {
      if (instance.label === label) {
        let value = instance.features[attribute];
        if (!attributeCounts[value]) {
          attributeCounts[value] = 1;
        } else {
          attributeCounts[value]++;
        }
        totalInstances++;
      }
    });

    // Calcular la probabilidad de cada valor de atributo dado la clase
    let probabilities = {};
    for (let value in attributeCounts) {
      probabilities[value] = attributeCounts[value] / totalInstances;
    }
    return probabilities;
  };

  // Función para realizar una predicción utilizando el algoritmo Naïve Bayes
  const naiveBayesPredict = (dataset, instance) => {
    let classProbabilities = calculateClassProbabilities(dataset);
    let bestLabel = null;
    let bestProbability = -1;

    // Calcular la probabilidad de cada clase para la instancia dada
    for (let label in classProbabilities) {
      let classProbability = classProbabilities[label];
      let attributeProbabilities = {};

      // Calcular la probabilidad de cada valor de atributo dado la clase
      for (let attribute in instance.features) {
        let attributeProbability = calculateAttributeProbabilities(dataset, attribute, label)[instance.features[attribute]];
        attributeProbabilities[attribute] = attributeProbability;
      }

      // Calcular la probabilidad total usando la regla de probabilidad condicional
      let totalProbability = Object.values(attributeProbabilities).reduce((acc, curr) => acc * curr, 1) * classProbability;

      // Actualizar la mejor clase y probabilidad si encontramos una mejor opción
      if (totalProbability > bestProbability) {
        bestProbability = totalProbability;
        bestLabel = label;
      }
    }
    return bestLabel;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Analizar el conjunto de datos ingresado por el usuario
    let parsedDataset;
    try {
      parsedDataset = JSON.parse(userDataset);
    } catch (error) {
      alert(
        'Error al analizar el conjunto de datos. Por favor, asegúrese de que esté en formato JSON válido.'
      );
      return;
    }

    // Analizar la instancia ingresada por el usuario
    let parsedInstance;
    try {
      parsedInstance = JSON.parse(userInstance);
    } catch (error) {
      alert(
        'Error al analizar la instancia. Por favor, asegúrese de que esté en formato JSON válido.'
      );
      return;
    }

    // Realizar la predicción usando el algoritmo Naïve Bayes
    const predictionResult = naiveBayesPredict(parsedDataset, parsedInstance);
    setPrediction(predictionResult);
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Naïve Bayes</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4">
          <label className="mb-2">
            Ingrese el conjunto de datos (en formato JSON):
            <textarea
              value={userDataset}
              onChange={(e) => setUserDataset(e.target.value)}
              rows={10}
              cols={50}
              className="border border-gray-400 rounded-md p-2 mt-2"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="mb-2">
            Ingrese la instancia para predecir (en formato JSON):
            <textarea
              value={userInstance}
              onChange={(e) => setUserInstance(e.target.value)}
              rows={3}
              cols={50}
              className="border border-gray-400 rounded-md p-2 mt-2"
              required
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Realizar predicción
        </button>
      </form>
      {prediction && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Predicción:</h3>
          <p className="text-lg">{prediction}</p>
        </div>
      )}
    </div>
  );
};


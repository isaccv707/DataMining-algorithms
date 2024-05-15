import { useState } from 'react';

const Knn = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [instanceToClassify, setInstanceToClassify] = useState('');
  const [kValue, setKValue] = useState(1);
  const [predictedClass, setPredictedClass] = useState('');

  const euclideanDistance = (instance1, instance2) => {
    let sum = 0;
    for (let i = 0; i < instance1.length; i++) {
      sum += Math.pow(instance1[i] - instance2[i], 2);
    }
    return Math.sqrt(sum);
  };

  const classifyInstance = () => {
    if (trainingData.length === 0 || instanceToClassify === '') {
      alert('Por favor, ingresa datos de entrenamiento y una instancia para clasificar.');
      return;
    }

    const instanceArray = instanceToClassify.split(',').map(Number);

    if (instanceArray.length === 0) {
      alert('La instancia a clasificar no es válida.');
      return;
    }

    const distances = trainingData.map(data => {
      return {
        label: data.label,
        distance: euclideanDistance(instanceArray, data.features)
      };
    });

    if (distances.length === 0) {
      alert('No hay datos de entrenamiento disponibles.');
      return;
    }

    distances.sort((a, b) => a.distance - b.distance);

    const nearestNeighbors = distances.slice(0, kValue);

    const classCounts = {};
    nearestNeighbors.forEach(neighbor => {
      if (classCounts[neighbor.label]) {
        classCounts[neighbor.label]++;
      } else {
        classCounts[neighbor.label] = 1;
      }
    });

    let mostCommonClass = null;
    let maxCount = 0;
    for (let label in classCounts) {
      if (classCounts[label] > maxCount) {
        mostCommonClass = label;
        maxCount = classCounts[label];
      }
    }

    setPredictedClass(mostCommonClass);
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">k-Nearest Neighbors (k-NN)</h2>
      <div className="flex flex-col items-center">
        <label className="mb-2">
          Ingresa los datos de entrenamiento (formato JSON):
          <textarea
            value={JSON.stringify(trainingData, null, 2)}
            onChange={e => setTrainingData(JSON.parse(e.target.value))}
            rows={10}
            cols={50}
            className="border border-gray-400 rounded-md p-2 mt-2"
            required
          />
        </label>
        <label className="mb-2">
          Ingresa la instancia a clasificar (formato: feature1, feature2, ):
          <input
            type="text"
            value={instanceToClassify}
            onChange={e => setInstanceToClassify(e.target.value)}
            className="border border-gray-400 rounded-md p-2 mt-2"
            required
          />
        </label>
        <label className="mb-2">
          Valor de k:
          <input
            type="number"
            value={kValue}
            onChange={e => setKValue(e.target.value)}
            min={1}
            className="border border-gray-400 rounded-md p-2 mt-2"
            required
          />
        </label>
        <button onClick={classifyInstance} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2">
          Clasificar Instancia
        </button>
      </div>
      {predictedClass && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Clase Predicha:</h3>
          <p className="text-lg">{predictedClass}</p>
        </div>
      )}
    </div>
  );
};

export default Knn;

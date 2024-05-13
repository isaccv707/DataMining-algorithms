import React, { useState } from 'react'

export const ZeroRule = () => {
  const [userDataset, setUserDataset] = useState('')
  const [prediction, setPrediction] = useState('')

  // Función que implementa el algoritmo zero-r
  const zeroRAlgorithm = data => {
    // Objeto para contar la frecuencia de cada clase
    let classCounts = {}

    // Contamos la frecuencia de cada clase en el conjunto de datos
    data.forEach(row => {
      let label = row.label
      if (classCounts[label]) {
        classCounts[label]++
      } else {
        classCounts[label] = 1
      }
    })

    // Encontramos la clase más común
    let mostCommonClass = null
    let maxCount = 0
    for (let label in classCounts) {
      if (classCounts[label] > maxCount) {
        mostCommonClass = label
        maxCount = classCounts[label]
      }
    }

    return mostCommonClass // Devolvemos la clase más común como predicción
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Analizar el conjunto de datos ingresado por el usuario
    let parsedDataset
    try {
      parsedDataset = JSON.parse(userDataset)
    } catch (error) {
      alert(
        'Error al analizar el conjunto de datos. Por favor, asegúrese de que esté en formato JSON válido.'
      )
      return
    }

    // Realizar la predicción usando el algoritmo zero-r
    const predictionResult = zeroRAlgorithm(parsedDataset)
    setPrediction(predictionResult)
  }

  return (
    <div className='container mx-auto mt-10'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Zero Rule</h2>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <div>
          <div>
            <label className='mb-2'>
              Ingrese el conjunto de datos (en formato JSON):
            </label>
          </div>
          <div>
            <textarea
              value={userDataset}
              onChange={e => setUserDataset(e.target.value)}
              rows={10}
              cols={50}
              className='border border-gray-400 rounded-md p-2 mt-2'
              required
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4'
            >
              Realizar predicción
            </button>
          </div>
        </div>
      </form>
      <div className='flex justify-center'>
        {prediction && (
          <div className='mt-8 flex'>
            <h3 className='text-xl font-bold mb-2 mr-3'>Predicción:</h3>
            <p className='text-lg'>{prediction}</p>
          </div>
        )}
      </div>
    </div>
  )
}

import React, { useState } from 'react'

export const OneRule = () => {
  // Estado para almacenar el conjunto de datos ingresado por el usuario
  const [userDataset, setUserDataset] = useState('')
  // Estado para almacenar la regla generada
  const [rule, setRule] = useState('')

  // Función que implementa el algoritmo One Rule
  const oneRuleAlgorithm = data => {
    // Objeto para almacenar las frecuencias de las combinaciones de atributos y clases
    let attributeValueCounts = {}

    // Calcular las frecuencias
    data.forEach(row => {
      for (let attribute in row.features) {
        let value = row.features[attribute]
        if (!attributeValueCounts[attribute]) {
          attributeValueCounts[attribute] = {}
        }
        if (!attributeValueCounts[attribute][value]) {
          attributeValueCounts[attribute][value] = {}
        }
        let label = row.label // Suponiendo que 'label' es el atributo de clase
        if (attributeValueCounts[attribute][value][label]) {
          attributeValueCounts[attribute][value][label]++
        } else {
          attributeValueCounts[attribute][value][label] = 1
        }
      }
    })

    // Encontrar el atributo y valor con la clasificación más precisa
    let bestAttribute = null
    let bestValue = null
    let maxCorrect = 0
    for (let attribute in attributeValueCounts) {
      for (let value in attributeValueCounts[attribute]) {
        let counts = attributeValueCounts[attribute][value]
        let total = Object.values(counts).reduce((acc, curr) => acc + curr, 0)
        let correct = Math.max(...Object.values(counts))
        if (correct > maxCorrect) {
          bestAttribute = attribute
          bestValue = value
          maxCorrect = correct
        }
      }
    }

    return { attribute: bestAttribute, value: bestValue } // Devolvemos la mejor regla
  }

  // Función para manejar el envío del formulario
  const handleSubmit = event => {
    event.preventDefault()
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

    // Realizar la predicción usando el algoritmo One Rule
    const ruleResult = oneRuleAlgorithm(parsedDataset)
    setRule(ruleResult)
  }

  return (
    <div className='container mx-auto mt-10'>
      <h2 className='text-2xl font-bold mb-4 text-center'>One Rule</h2>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <label className='mb-2'>
          Ingrese el conjunto de datos (en formato JSON):
        </label>
        <textarea
          value={userDataset}
          onChange={e => setUserDataset(e.target.value)}
          rows={10}
          cols={50}
          className='border border-gray-400 rounded-md p-2 mt-2'
          required
        />

        <button
          type='submit'
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4'
        >
          Generar regla
        </button>
      </form>
      <div className='flex justify-center'>
        {rule && (
        <div className='mt-8'>
          <h3 className='text-xl font-bold mb-2'>Regla generada:</h3>
          <p className='text-lg'>
            Si <span className='font-bold'>{rule.attribute}</span> es{' '}
            <span className='font-bold'>{rule.value}</span>, entonces la clase
            es <span className='font-bold'>{rule.attribute}</span>.
          </p>
        </div>
      )}
      </div>
    </div>
  )
}

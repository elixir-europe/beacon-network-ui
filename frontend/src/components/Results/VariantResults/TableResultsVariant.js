import './TableResultsVariant.css'
import { useState, useEffect } from 'react'

function TableResultsVariant (props) {
  const [resultsJSON, setResultsJSON] = useState([])
  const [results, setResults] = useState('')
  const [trigger, setTrigger] = useState(false)
  const [trigger2, setTrigger2] = useState(false)
  const [stringDataToCopy, setStringDataToCopy] = useState('')
  const [arrayBeaconsIds, setArrayBeaconsIds] = useState([])
  const [showDatsets, setShowDatasets] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [resultsSelected, setResultsSelected] = useState(props.results)
  const [resultsSelectedFinal, setResultsSelectedFinal] = useState([])

  const [beaconsArrayResults, setBeaconsArrayResults] = useState([])

  const [beaconsArrayResultsOrdered, setBeaconsArrayResultsOrdered] = useState(
    []
  )

  const copyData = e => {
    navigator.clipboard
      .writeText(stringDataToCopy)
      .then(() => {
        alert('successfully copied')
      })
      .catch(() => {
        alert('something went wrong')
      })
    console.log('COPY DONE')
  }

  const handleSeeResults = e => {
    resultsSelected.forEach(element => {
      if (element[0] === e) {
        resultsSelectedFinal.push(element)
      }
    })
   
    setShowResults(true)
    setShowDatasets(false)
    setTrigger(true)
  }

  function getOccurrence (array, value) {
    var count = 0
    array.forEach(v => v === value && count++)
    return count
  }

  useEffect(() => {
    
    props.results.forEach((element, index) => {
      resultsJSON.push([
        JSON.stringify(element[1], null, 2).replace('[', '').replace(']', '')
      ])

      arrayBeaconsIds.push(element[0])
    })
    setTrigger2(true)
    setStringDataToCopy(resultsJSON)
  }, [trigger, resultsSelectedFinal])

  useEffect(() => {
    let count = 0
    props.beaconsList.forEach((element2, index2) => {
      count = getOccurrence(arrayBeaconsIds, element2.meta.beaconId)
      if (count > 0) {
        beaconsArrayResults.push([element2, count, true])
      } else {
        beaconsArrayResults.push([element2, count, false])
      }
    })
    beaconsArrayResults.forEach(element => {
      if (element[2] === true) {
        beaconsArrayResultsOrdered.push(element)
      }
    })
    beaconsArrayResults.forEach(element => {
      if (element[2] === false) {
        beaconsArrayResultsOrdered.push(element)
      }
    })

    setShowDatasets(true)
  }, [])

  return (
    <div className='resultsVariantsContainer'>
      <div className='datasetsResultsVariants'>
        {showDatsets === true &&
          beaconsArrayResultsOrdered.length > 0 &&
          beaconsArrayResultsOrdered.map(result => {
            return (
              <div className='datasetCardResults'>
                <div className='tittleResults'>
                  <div className='tittle2'>
                    <img
                      className='logoBeacon'
                      src={result[0].response.organization.logoUrl}
                      alt={result[0].meta.beaconId}
                    />
                  </div>
                  <h2>{result[0].response.organization.name}</h2>
                  {result[2] === true && <h6>FOUND </h6>}
                  {result[2] === false && <h5>NOT FOUND</h5>}
                  <h1>{result[1]} results</h1>
                  <button
                    onClick={() => {
                      handleSeeResults(result[0].meta.beaconId)
                    }}
                  >
                    <h7>See results</h7>
                  </button>
                </div>
              </div>
            )
          })}
      </div>

      {showDatsets === false && showResults === true && trigger === true && (
        <div className='copyDivVariants'>
          <button className='buttonCopy' onClick={copyData}>
            <h7>COPY ALL RESULTS</h7>
            <img className='copyLogo' src='../copy.png' alt='copyIcon'></img>
          </button>
        </div>
      )}

      {showDatsets === false &&
        showResults === true &&
        trigger === true &&
        resultsJSON.map(element => {
          return (
            <pre className='resultsVariants'>
              <p>{element}</p>
            </pre>
          )
        })}
    </div>
  )
}

export default TableResultsVariant

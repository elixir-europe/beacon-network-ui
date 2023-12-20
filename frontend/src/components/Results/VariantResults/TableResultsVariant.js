import './TableResultsVariant.css'
import '../IndividualsResults/TableResultsIndividuals.css'
import '../../Datasets/ResultsDatasets.css'
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
  const [triggerArray, setTriggerArray] = useState([])

  const [openDatasetArray, setOpenDataset] = useState([])

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

  const handleClickDatasets = e => {
    triggerArray.forEach((element, index) => {
      if (index !== e) {
        triggerArray[index] = false
      }
    })
    openDatasetArray.forEach((element, index) => {
      if (index !== e) {
        triggerArray[index] = false
      }
    })

    openDatasetArray[e] = true
    triggerArray[e] = true
    setTrigger(!trigger)
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
              <>
                {props.show !== 'full' && (
                  <div className='datasetCardResults'>
                    <div className='tittleResults'>
                      <div className='tittle2'>
                        <img
                          className='logoBeacon'
                          src={result[0].response.organization.logoUrl}
                          alt={result[0].meta.beaconId}
                        />
                        <h4>{result[0].response.organization.name}</h4>
                      </div>

                      {props.resultsPerDataset.map((element, index) => {
                        return (
                          <>
                            {element[0] === result[0].meta.beaconId && (
                              <div className='resultSetsContainer'>
                                <button
                                  className='resultSetsButton'
                                  onClick={() => handleClickDatasets(index)}
                                >
                                  <h7>{element[1].replaceAll('_', ' ')}</h7>
                                </button>
                                {openDatasetArray[index] === true &&
                                  triggerArray[index] === true &&
                                  element[2] === true &&
                                  props.show === 'boolean' && <h6>FOUND</h6>}
                                {openDatasetArray[index] === true &&
                                  triggerArray[index] === true &&
                                  element[2] === false &&
                                  props.show === 'boolean' && (
                                    <h5>NOT FOUND</h5>
                                  )}
                                {props.show === 'count' &&
                                  triggerArray[index] === true && (
                                    <h6>{element[3]}</h6>
                                  )}
                              </div>
                            )}
                          </>
                        )
                      })}

                      {props.resultsNotPerDataset.map(element => {
                        return (
                          <>
                            {result[2] === true &&
                              props.show === 'boolean' &&
                              element[0] === result[0].meta.beaconId && (
                                <div className='resultSetsContainer'>
                                  <h7>No datasets available</h7>
                                  <h6>FOUND </h6>
                                </div>
                              )}
                            {result[2] === false &&
                              props.show === 'boolean' &&
                              element[0] === result[0].meta.beaconId && (
                                <div className='resultSetsContainer'>
                                  <h7>No datasets available</h7>
                                  <h5 className='buttonResults'>NOT FOUND</h5>
                                </div>
                              )}
                            {props.show === 'count' &&
                              element[0] === result[0].meta.beaconId && (
                                <div className='resultSetsContainer'>
                                  <h7>No datasets available</h7>
                                  <h6 className='buttonResults'>
                                    {result[1]} results
                                  </h6>
                                </div>
                              )}
                          </>
                        )
                      })}

                      <button
                        className='buttonResults'
                        onClick={() => {
                          handleSeeResults(result[0].meta.beaconId)
                        }}
                      >
                        {result[2] === true && props.show === 'full' && (
                          <h7>See results</h7>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {props.show === 'full' && result[2] === true && (
                  <div className='datasetCardResults'>
                    <div className='tittleResults'>
                      <div className='tittle4'>
                        <img
                          className='logoBeacon'
                          src={result[0].response.organization.logoUrl}
                          alt={result[0].meta.beaconId}
                        />
                        <h2>{result[0].response.organization.name}</h2>
                      </div>
                      <div className='seeResultsContainer'>
                        <button
                          className='buttonResults'
                          onClick={() => {
                            handleSeeResults(result[0].meta.beaconId)
                          }}
                        >
                          {result[2] === true && props.show === 'full' && (
                            <h7>See results</h7>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
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

import './TableResultsVariant.css'
import '../IndividualsResults/TableResultsIndividuals.css'
import '../../Datasets/ResultsDatasets.css'
import { useState, useEffect } from 'react'

function TableResultsVariant (props) {
  const [showDatsets, setShowDatasets] = useState(false)

  const [showResults, setShowResults] = useState(false)

  const [arrayBeaconsIds, setArrayBeaconsIds] = useState([])
  const [rows, setRows] = useState([])
  const [ids, setIds] = useState([])

  const [resultsJSON, setResultsJSON] = useState([])

  const [stringDataToCopy, setStringDataToCopy] = useState('')
  
  const [beaconsArrayResults, setBeaconsArrayResults] = useState([])

  const [beaconsArrayResultsOrdered, setBeaconsArrayResultsOrdered] = useState(
    []
  )

  const [resultsSelected, setResultsSelected] = useState(props.results)
  const [resultsSelectedFinal, setResultsSelectedFinal] = useState([])

  const [openDatasetArray, setOpenDataset] = useState([])

  const [editable, setEditable] = useState([])

  const [trigger, setTrigger] = useState(false)
  const [trigger2, setTrigger2] = useState(false)

  const [triggerArray, setTriggerArray] = useState([])

 

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
    console.log(e)
  

    openDatasetArray[e] = true
    console.log(openDatasetArray)
    triggerArray[e] = true
    console.log(triggerArray)
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
    setRows([])
    setIds([])

    resultsSelected.forEach((element, index) => {
      arrayBeaconsIds.push(element[0])
    })
    resultsSelectedFinal.forEach((element, index) => {
      if (element[1] !== undefined) {
        let eth_id = ''
        let eth_label = ''
        let stringEth = ''

        if (element[1].ethnicity !== '' && element[1].ethnicity !== undefined) {
          if (element[1].ethnicity.id !== undefined) {
            eth_id = element[1].ethnicity.id
          }

          eth_label = element[1].ethnicity.label
          stringEth = `${eth_id} / ${eth_label} `
        } else {
          stringEth = ''
        }

        let sex_id = ''
        let sex_label = ''
        let stringSex = ''

        if (element[1].sex !== '') {
          sex_id = element[1].sex.id
          sex_label = element[1].sex.label
          stringSex = `${element[1].sex.label} / ${element[1].sex.id}`
        } else {
          stringSex = ''
        }

        let geographic_id = ''
        let geographic_label = ''
        let stringGeographic = ''

        if (
          element[1].geographicOrigin !== '' &&
          element[1].geographicOrigin !== undefined
        ) {
          geographic_id = element[1].geographicOrigin.id
          geographic_label = element[1].geographicOrigin.label
          stringGeographic = `${geographic_id} / ${geographic_label}`
        } else {
          stringGeographic = ''
        }

        let measuresJson = []
        if (element[1].measures !== '' && element[1].measures !== undefined) {
          if (typeof element[1].measures === 'object') {
            element[1].measures.forEach(element2 => {
              measuresJson.push(
                JSON.stringify(element2, null, 2)
                  .replaceAll('[', '')
                  .replaceAll(']', '')
                  .replaceAll('{', '')
                  .replaceAll('}', '')
                  .replaceAll(',', '')
                  .replaceAll(' ,', '')
                  .replaceAll(', ', '')
                  .replaceAll('"', '')
              )
            })
            measuresJson = measuresJson.toString()
            measuresJson = measuresJson
              .replaceAll(', ', ',')
              .replaceAll(' ,', ',')
            measuresJson = measuresJson.replaceAll(',', '')
          } else {
            measuresJson = JSON.stringify(element[1].measures, null, 2)
              .replaceAll('[', '')
              .replaceAll(']', '')
              .replaceAll('{', '')
              .replaceAll('}', '')
              .replaceAll(',', '')
              .replaceAll(' ,', '')
              .replaceAll(', ', '')
              .replaceAll('"', '')

            measuresJson = measuresJson.toString()
            measuresJson = measuresJson
              .replaceAll(', ', ',')
              .replaceAll(' ,', ',')
            measuresJson = measuresJson.replaceAll(',', '')
          }
        }

        let interventionsProcedures = []

        if (
          element[1].interventionsOrProcedures !== '' &&
          element[1].interventionsOrProcedures !== undefined
        ) {
          if (typeof element[1].interventionsOrProcedures === 'object') {
            element[1].interventionsOrProcedures.forEach(element2 => {
              interventionsProcedures.push(
                JSON.stringify(element2, null, 2)
                  .replaceAll('[', '')
                  .replaceAll(']', '')
                  .replaceAll('{', '')
                  .replaceAll('}', '')
                  .replaceAll(',', '')
                  .replaceAll(' ,', '')
                  .replaceAll(', ', '')
                  .replaceAll('"', '')
              )
            })
            interventionsProcedures = interventionsProcedures.toString()
            interventionsProcedures = interventionsProcedures
              .replaceAll(', ', ',')
              .replaceAll(' ,', ',')
            interventionsProcedures = interventionsProcedures.replaceAll(
              ',',
              ''
            )
          } else {
            interventionsProcedures = JSON.stringify(
              element[1].interventionsOrProcedures,
              null,
              2
            )
              .replaceAll('[', '')
              .replaceAll(']', '')
              .replaceAll('{', '')
              .replaceAll('}', '')
              .replaceAll(',', '')
              .replaceAll(' ,', '')
              .replaceAll(', ', '')
              .replaceAll('"', '')
            interventionsProcedures = interventionsProcedures.toString()
            interventionsProcedures = interventionsProcedures
              .replaceAll(', ', ',')
              .replaceAll(' ,', ',')
            interventionsProcedures = interventionsProcedures.replaceAll(
              ',',
              ''
            )
          }
        }

        let diseases = []

        if (element[1].diseases !== '' && element[1].diseases !== undefined) {
          if (typeof element[1].diseases === 'object') {
            element[1].diseases.forEach(element2 => {
              diseases.push(
                JSON.stringify(element2, null, 2)
                  .replaceAll('[', '')
                  .replaceAll(']', '')
                  .replaceAll('{', '')
                  .replaceAll('}', '')
                  .replaceAll(',', '')
                  .replaceAll(' ,', '')
                  .replaceAll(', ', '')
                  .replaceAll('"', '')
              )
            })
            diseases = diseases.toString()
            diseases = diseases.replaceAll(', ', ',').replaceAll(' ,', ',')
            diseases = diseases.replaceAll(',', '')
          } else {
            diseases = JSON.stringify(element[1].diseases, null, 2)
              .replaceAll('[', '')
              .replaceAll(']', '')
              .replaceAll('{', '')
              .replaceAll('}', '')
              .replaceAll(',', '')
              .replaceAll(' ,', '')
              .replaceAll(', ', '')
              .replaceAll('"', '')
            diseases = diseases.toString()
            diseases = diseases.replaceAll(', ', ',').replaceAll(' ,', ',')
            diseases = diseases.replaceAll(',', '')
          }
        }

        rows.push({
          id: index,
          IndividualId: element[1].id,
          Beacon: element[0],
          ethnicity: stringEth,
          geographicOrigin: stringGeographic,
          interventionsOrProcedures: interventionsProcedures,
          measures: measuresJson,
          sex: stringSex,
          diseases: diseases
        })

        if (index === resultsSelectedFinal.length - 1) {
          setEditable(rows.map(o => ({ ...o })))
          setTrigger2(true)
        }
      }
    })
  }, [trigger, resultsSelectedFinal])

  useEffect(() => {
    console.log(props.resultsPerDataset)
    console.log(props.beaconsList)
    console.log(arrayBeaconsIds)
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
    <div className='containerBeaconResults'>
      {showDatsets === true &&
        beaconsArrayResultsOrdered.length > 0 &&
        beaconsArrayResultsOrdered.map(result => {
          return (
            <>
              {props.show !== 'full' && (
                <>
                  {props.resultsPerDataset.map((element, index) => {
                    return (
                      <>
                        {element[0] === result[0].meta.beaconId && (
                          <div className='datasetCardResults'>
                            <div className='tittleResults'>
                              <div className='tittle4'>
                                <img
                                  className='logoBeacon'
                                  src={result[0].response.organization.logoUrl}
                                  alt={result[0].meta.beaconId}
                                />
                                <h4>{result[0].response.organization.name}</h4>
                              </div>

                              {element[1].map((datasetObject, indexDataset) => {
                                return (
                                  <div className='resultSetsContainer'>
                                    <button
                                      className='resultSetsButton'
                                      onClick={() =>
                                        handleClickDatasets([
                                          index,
                                          indexDataset
                                        ])
                                      }
                                    >
                                      <h7>
                                        {datasetObject.replaceAll('_', ' ')}
                                      </h7>
                                    </button>
                                    {openDatasetArray[[index, indexDataset]] ===
                                      true &&
                                      triggerArray[[index, indexDataset]] ===
                                        true &&
                                      element[2][indexDataset] === true &&
                                      props.show === 'boolean' && (
                                        <h6>FOUND</h6>
                                      )}
                                    {openDatasetArray[[index, indexDataset]] ===
                                      true &&
                                      triggerArray[[index, indexDataset]] ===
                                        true &&
                                      element[2][indexDataset] === false &&
                                      props.show === 'boolean' && (
                                        <h5>NOT FOUND</h5>
                                      )}
                                    {props.show === 'count' &&
                                      triggerArray[[index, indexDataset]] ===
                                        true && (
                                        <h6>{element[3][indexDataset]} RESULTS</h6>
                                      )}
                                  </div>
                                )
                              })}
                            </div>
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
                            <div className='datasetCardResults'>
                              <div className='tittleResults'>
                                <div className='tittle4'>
                                  <img
                                    className='logoBeacon'
                                    src={
                                      result[0].response.organization.logoUrl
                                    }
                                    alt={result[0].meta.beaconId}
                                  />
                                  <h4>
                                    {result[0].response.organization.name}
                                  </h4>
                                </div>

                                <div className='resultSetsContainer'>
                                  <h7>No datasets available</h7>
                                  <h6>FOUND </h6>
                                </div>
                              </div>
                            </div>
                          )}
                        {result[2] === false &&
                          props.show === 'boolean' &&
                          element[0] === result[0].meta.beaconId && (
                            <div className='datasetCardResults'>
                              <div className='tittleResults'>
                                <div className='tittle4'>
                                  <img
                                    className='logoBeacon'
                                    src={
                                      result[0].response.organization.logoUrl
                                    }
                                    alt={result[0].meta.beaconId}
                                  />
                                  <h4>
                                    {result[0].response.organization.name}
                                  </h4>
                                </div>
                                <div className='resultSetsContainer'>
                                  <h7>No datasets available</h7>
                                  <h5 className='buttonResults'>NOT FOUND</h5>
                                </div>
                              </div>
                            </div>
                          )}

                        {props.show === 'count' &&
                          element[0] === result[0].meta.beaconId && (
                            <div className='datasetCardResults'>
                              <div className='tittleResults'>
                                <div className='tittle4'>
                                  <img
                                    className='logoBeacon'
                                    src={
                                      result[0].response.organization.logoUrl
                                    }
                                    alt={result[0].meta.beaconId}
                                  />
                                  <h4>
                                    {result[0].response.organization.name}
                                  </h4>
                                </div>
                                <div className='resultSetsContainer'>
                                  <h7>No datasets available</h7>
                                  <h6 className='buttonResults'>
                                    {result[1]} results
                                  </h6>
                                </div>
                                <button
                                  className='buttonResults'
                                  onClick={() => {
                                    handleSeeResults(result[0].meta.beaconId)
                                  }}
                                >
                                  
                                </button>
                              </div>
                            </div>
                          )}
                      </>
                    )
                  })}
                </>
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

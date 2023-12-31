import './TableResultsIndividuals.css'
import '../../Datasets/ResultsDatasets.css'
import * as React from 'react'
import {
  DataGrid,
  GridToolbar,
  selectedGridRowsSelector,
  gridFilteredSortedRowIdsSelector,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function CustomToolbar () {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}
function TableResultsIndividuals (props) {
  const [showDatsets, setShowDatasets] = useState(false)

  const [showResults, setShowResults] = useState(false)

  const [arrayBeaconsIds, setArrayBeaconsIds] = useState([])
  const [rows, setRows] = useState([])
  const [ids, setIds] = useState([])

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

  const getSelectedRowsToExport = ({ apiRef }) => {
    const selectedRowIds = selectedGridRowsSelector(apiRef)
    if (selectedRowIds.size > 0) {
      return Array.from(selectedRowIds.keys())
    }

    return gridFilteredSortedRowIdsSelector(apiRef)
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

  const columns = [
    {
      field: 'id',
      headerName: 'Row',
      width: 100,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'IndividualId',
      headerName: 'Individual ID',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: params => (
        <Link to={`cross-queries/individuals/${params.row.IndividualId}`}>
          {params.row.IndividualId}
        </Link>
      )
    },
    {
      field: 'Beacon',
      headerName: 'Beacon ID',
      width: 340,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'ethnicity',
      headerName: 'ethnicity',
      width: 240,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'geographicOrigin',
      headerName: 'geographicOrigin',
      width: 250,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'interventionsOrProcedures',
      headerName: 'interventionsOrProcedures',
      width: 350,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'measures',
      headerName: 'measures',
      width: 350,
      headerClassName: 'super-app-theme--header',
      cellClass: 'pre'
    },
    {
      field: 'sex',
      headerName: 'sex',
      width: 200,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'diseases',
      headerName: 'diseases',
      width: 350,
      headerClassName: 'super-app-theme--header'
    }
    //   { field: 'pedigrees', headerName: 'pedigrees', width: 150 },
    // { field: 'treatments', headerName: 'treatments', width: 150 },
    //{ field: 'interventionsOrProcedures', headerName: 'interventionsOrProcedures', width: 150 },
    // { field: 'exposures', headerName: 'exposures', width: 150 },
    // { field: 'karyotypicSex', headerName: 'karyotypicSex', width: 150 },
  ]

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
                                props.show === 'boolean' && <h5>NOT FOUND</h5>}
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

      {showDatsets === false && showResults === true && trigger2 === true && (
        <DataGrid
          getRowHeight={() => 'auto'}
          checkboxSelection
          columns={columns}
          rows={editable}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              printOptions: { getRowsToExport: getSelectedRowsToExport }
            }
          }}
        />
      )}
    </div>
  )
}

export default TableResultsIndividuals

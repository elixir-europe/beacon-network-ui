import './TableResultsVariant.scss'
import { useState, useEffect } from 'react'

function TableResultsIndividuals (props) {
  const [resultsJSON, setResultsJSON] = useState([])
  const [results, setResults] = useState('')
  const [trigger, setTrigger] = useState(false)
  useEffect(() => {
    console.log(props.results)
    props.results.forEach((element, index) => {
      console.log(element)
      //    element.forEach(element2 => {
      //    console.log(element2)
      // element2[1].results.forEach(element3 => {
      // resultsJSON.push([
      // element2[0],
      //JSON.stringify(element3, null, 2).replace('[', '').replace(']', '')
      //])
      resultsJSON.push([
        element[0],
        JSON.stringify(element[1], null, 2).replace('[', '').replace(']', '')
      ])
    })
    setTrigger(true)
    console.log(resultsJSON)
  }, [])

  return (
    <div class='CSSgal'>
      <div class='bullets'>
        {trigger === true &&
          resultsJSON.map((element, index) => {
            let index2 = '#' + 's' + index
            console.log(index2)
            return <a href={index2}>{index}</a>
          })}
      </div>
      {trigger === true &&
        resultsJSON.map((element, index) => {
            let index_aux = 's'+ index
          return <s id={index_aux}></s>
        })}
      <div class='slider'>
        {trigger === true &&
          resultsJSON.map(element => {
            return (
              <pre className='resultsVariants'>
                <p>{element[1]}</p>
              </pre>
            )
          })}
      </div>
    </div>
  )
}

export default TableResultsIndividuals

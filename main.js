const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

function Counter(props) {
  console.log(props)

  return (
    <div className='counter'>
      <button onClick={() => props.hdlUpdate(props.item.id, -1)}> - </button>
      <h3>{props.item.number}</h3>
      <button onClick={() => props.hdlUpdate(props.item.id, 1)}> + </button>
      <button onClick={() => props.hdlUpdate(props.item.id, -props.item.number)}> C </button>
      <button onClick={() => props.removeCounter(props.item.id,-props.item.number)}> X </button>
    </div>
  )
}



let total = 0
function App() {

  const [counters, setCounters] = React.useState([{ id: 1, number: 0 }])
  // let allCounter = Array(counters).fill(<Counter />)

  const hdlUpdate = (id, num) => {
    const cloneCounters = [...counters]
    let idx = cloneCounters.findIndex(el => el.id === id)
    if (cloneCounters[idx].number + num < 0) {
      return
    }
    cloneCounters[idx].number += num
    setCounters(cloneCounters)
    total += num
    return total
  }


  const removeCounter = (id,num1) => {
    setCounters((prevCounters) => prevCounters.filter((el) => el.id !== id));
     total += num1
    return total
  };

  const hdlAddCounter = () => {
    let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1
    // setCounter([...counters, {id: newId, number : 0}])
    const cloneCounters = [...counters]
    cloneCounters.push({ id: newId, number: 0 })
    setCounters(cloneCounters)
  }

  return (
    <>
      <h1 className='text-center'>Codecamp Academy 01</h1>
      <br/>
      <h1 className ='suminfo'>Sum = {total}</h1>
      <button className='btn-center' onClick={hdlAddCounter}>Add Counter</button>
      {counters.map(el => {
        return <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} removeCounter={removeCounter}/>
      })}

    </>
  )
}
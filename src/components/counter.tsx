import React from 'react'
import { actions, useStore } from '../store'

export default function Counter () {
  const count = useStore(state => state.count)

  return (
        <div style={styles.container}>
            <h2 style={styles.counter}>{ count }</h2>
            <div style={styles.buttons}>
                <button style={styles.button} onClick={actions.decrement}>
                    Decrement
                </button>
                <button style={styles.button} onClick={() => { actions.setValue(0) }}>
                    Reset
                </button>
                <button style={styles.button} onClick={actions.increment}>
                    Increment
                </button>
            </div>
        </div>
  )
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: 'center',
    margin: '50px auto'
  },
  counter: {
    fontSize: '3em',
    margin: '10px 0',
    color: '#333'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    fontSize: '1em',
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.3s ease'
  }
}

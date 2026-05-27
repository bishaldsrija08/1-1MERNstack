import { useState } from "react"

const Test = () => {
    const [count, setCount] = useState(0)
    // const count = 0
    // setCount is a function that updates the count state
    function increment() {
        setCount(count + 1)
    }

    function decrement() {
        setCount(count - 1)
    }

    return (
        <>
            <h1>Test Page</h1>
            <p>This is a test page.</p>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </>
    )
}

export default Test

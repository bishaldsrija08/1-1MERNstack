import { useEffect, useState } from "react"
import Test2 from "./Test2"

const Test = () => {
    const [count, setCount] = useState(10)
    // const count = 0
    // setCount is a function that updates the count state
    function increment() {
        setCount(count + 1)
    }

    function decrement() {
        setCount(count - 1)
    }

    useEffect(()=>{
        console.log("Count has changed:", count)
    })
    return (
        <>
            <h1>Test Page</h1>
            <p>This is a test page.</p>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>

            <Test2 title= "Hello"/>
        </>
    )
}

export default Test

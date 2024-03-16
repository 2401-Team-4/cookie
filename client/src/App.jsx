import "./App.css";

function App() {
  const handleClick = () => {
    fetch("http://localhost:3000/target-endpoint", {
      credentials: "include", // Include cookies with the request
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <p>Hello world!</p>
      <button onClick={handleClick}>Send Request</button>
    </>
  );
}

export default App;

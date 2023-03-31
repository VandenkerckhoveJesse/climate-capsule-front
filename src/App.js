import './App.css';

function App() {
    const handleSubmit = event => {
        if (event.key === 'Enter') {
            alert(event.target.value);
        }
    }

  return (
    <div className="App">
      <h1>home page</h1>
      <div>
        {/*  write a basic search field */}
        <input type="text" placeholder="search" onKeyDown={handleSubmit} />
        <h1>map container</h1>
      </div>
    </div>
  );
}

export default App;

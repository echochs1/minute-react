// import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";

import ForYou from './screens/ForYouScreen';
import Learn from './screens/LearnScreen';

function App() {
  return (
    <div className="App">
     {useLocation().pathname == "/" ? <></> : <ForYou />}
        <Routes>
          <Route path="/" element={<ForYou/>} />
          <Route path="/learn" element={<Learn/>} />
        </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

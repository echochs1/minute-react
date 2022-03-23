// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import ForYou from './screens/ForYouScreen';
import Learn from './screens/LearnScreen';

function App() {
  return (
    <Router>
      <div className="App">
          <BottomNavBar/>
          {/* {useLocation().pathname == "/" ? <></> : <BottomNavBar />} */}
          <Routes>
            <Route path="/" element={<ForYou/>} />
            <Route path="/learn" element={<Learn/>} />
            {/* ADD OTHER PAGES HERE */}
          </Routes>
      </div>
    </Router>
  );
}

export default App;

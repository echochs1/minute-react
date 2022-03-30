// import logo from './logo.svg';
import './App.css';
// import ButtonRecord from './components/ButtonRecord';
import ApplicationRoutes from './config/ApplicationRoutes';
import LandingPageRoutes from './config/LandingRoutes';

function App() {
  return (
    <div className="App">
      <LandingPageRoutes />
      {/* <ApplicationRoutes /> */}
    </div>
  );
}

export default App;

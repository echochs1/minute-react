// import logo from './logo.svg';
import './App.css';
// import ButtonRecord from './components/ButtonRecord';
import ApplicationRoutes from './config/ApplicationRoutes';
import {FirebaseProvider} from './firebase/fbContext';

function App() {
  return (
    <FirebaseProvider>
      <ApplicationRoutes />
    </FirebaseProvider>
    // <div className="App">
    //   <ApplicationRoutes />
    // </div>
  );
}

export default App;

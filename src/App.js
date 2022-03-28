// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import ForYou from './screens/ForYouScreen';
import Learn from './screens/LearnScreen';
import SignIn from "./firebase/signIn.js";

function App() {
  // const [authUser, setAuthUser] = useState({loggedIn:false, uid:null, email:null});
  // const [error, setError] = useState(null);
  // const firebase = new Firebase();

  // useEffect(() => {
  //   const getCurrentUser = firebase.auth.onAuthStateChanged(
  //     authUser => {
  //       authUser
  //         ? setAuthUser({loggedIn:true, uid: authUser.uid, email:authUser.email})
  //         : doCreateAnonymousUser()
  //         .then(authUser => {
  //           setAuthUser({loggedIn:false, uid:authUser.uid, email:null});
  //         })
  //         .catch(error => {
  //           setAuthUser({loggedIn:false, uid:null, email:null});
  //           setError(error);
  //         });
  //     },
  //  );
  //  getCurrentUser();
  // }, []);

  return (
    <Router>
      <div className="App">
          <BottomNavBar/>
          {/* {useLocation().pathname == "/" ? <></> : <BottomNavBar />} */}
          <Routes>
            <Route path="/" element={<ForYou/>} />
            <Route path="/learn" element={<Learn/>} />
            <Route path="/signin" element={<SignIn/>} />
            {/* ADD OTHER PAGES HERE */}
          </Routes>
      </div>
    </Router>
  );
}

export default App;

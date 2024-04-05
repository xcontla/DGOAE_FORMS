import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0, User } from "@auth0/auth0-react";
import Welcome from "./components/Welcome";
import Forms from "./components/Forms";
import UserForm from "./components/UserForm";
import ViewUserForm from "./components/ViewUserForm";
import LoginButton from "./auth/Login";
import Submitted from "./components/Submitted";
import SaveForm from "./components/SaveForm";
import Credits from "./pages/Credits";
import Contact from "./pages/Contact";


import { APP_URL2 } from "./constants";


function App() {
  
  const { 
    isAuthenticated} = useAuth0();

  return (
    <div className="App">
      {!isAuthenticated && 
        (<>

            <Routes>
              <Route path="/" element={<LoginButton />} />
              <Route path="/responseform/:global_id" element={<UserForm />} />
              <Route path="/submitted/:global_id" element={<Submitted />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
        </>
        )}


      {isAuthenticated &&  (
        <>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/form/:id" element={<Forms />} />
              <Route path="/viewresponse/:id" element={<ViewUserForm />} />
              <Route path="/saveform/:id" element={<SaveForm />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>

        </>)
      }



    </div>
  );
}

export default App;



/*

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Welcome from "./components/Welcome";
import Forms from "./components/Forms";
import UserForm from "./components/UserForm";
import ViewUserForm from "./components/ViewUserForm";
import LoginButton from "./auth/Login";
import Submitted from "./components/Submitted";
import SaveForm from "./components/SaveForm";
import Credits from "./pages/Credits";
import Contact from "./pages/Contact";

import { APP_URL2 } from "./constants";


function App() {
  const { isAuthenticated} = useAuth0();
  return (
    <div className="App">
      {!isAuthenticated && 
        (<>
          <Router basename={APP_URL2}>
            <Routes>
              <Route path="/" element={<LoginButton />} />
              <Route path="/responseform/:global_id" element={<UserForm />} />
              <Route path="/submitted/:global_id" element={<Submitted />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Router>
        </>
        )}


      {isAuthenticated &&  (
        <>
          <Router basename={APP_URL2}>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/form/:id" element={<Forms />} />
              <Route path="/viewresponse/:id" element={<ViewUserForm />} />
              <Route path="/saveform/:id" element={<SaveForm />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Router>
        </>)
      }



    </div>
  );
}

export default App;
*/

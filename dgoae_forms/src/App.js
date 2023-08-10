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
import Test from "./pages/Test";

function App() {

  return (
    <div className="App">
   
        <>
          <Router>
            <Routes>
              <Route path="/" element={<Test />} />
              
            </Routes>
          </Router>
        </>

     
    </div>
  );
}

export default App;


// function App() {
//   const { isAuthenticated } = useAuth0();
//   return (
//     <div className="App">
//       {isAuthenticated ? (
//         <>
//           <Router>
//             <Routes>
//               <Route path="/" element={<Welcome />} />
//               <Route path="/form/:id" element={<Forms />} />
//               <Route path="/viewresponse/:id" element={<ViewUserForm />} />
//               <Route path="/saveform/:id" element={<SaveForm />} />
//               <Route path="/credits" element={<Credits />} />
//               <Route path="/contact" element={<Contact />} />
//             </Routes>
//           </Router>
//         </>
//       ) : (
//         <>
//           <Router>
//             <Routes>
//               <Route path="/" element={<LoginButton />} />
//               <Route path="/response/:global_id" element={<UserForm />} />
//               <Route path="/submitted/:global_id" element={<Submitted />} />
//             </Routes>
//           </Router>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;


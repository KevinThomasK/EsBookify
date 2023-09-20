import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login/Login";
import PrivateRoute from "./PrivateRoute";
import CreateTournament from "./pages/CreateTournament";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import OrgHome from "./OrgHome";

function App(props) {
  const [loginIsShown, setLoginIsShown] = useState(false);

  const showLoginHandler = () => {
    setLoginIsShown(true);
  };

  const hideLoginHandler = () => {
    setLoginIsShown(false);
  };

  return (
    <>
      <Router>
        {loginIsShown && <Login onClose={hideLoginHandler} {...props} />}
        <Header onShowLogin={showLoginHandler} />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/create-tournament" element={<PrivateRoute />}>
            <Route path="/create-tournament" element={<CreateTournament />} />
          </Route>
          <Route path="/Organization" element={<OrgHome />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

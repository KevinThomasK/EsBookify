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
import UserScrimList from "./User/UserScrimList";
import UserDailyMatch from "./User/UserDailymatch";
import UserOpenRoom from "./User/UserOpenRoom";
import EditTournament from "./pages/EditTournament";
import UserSlotList from "./User/UserSlotList";
import OrganizationHomepage from "./Organization/OrganizatiomHomepage";
import OrgHome from "./Organization/OrgHome";
import UnAuthorized from "./pages/UnAuthorized";

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
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/create-tournament" element={<PrivateRoute />}>
            <Route path="/create-tournament" element={<CreateTournament />} />
          </Route>
          <Route path="/updatetournament" element={<PrivateRoute />}>
            <Route
              path="/updatetournament/:tournamentId"
              element={<EditTournament />}
            />
          </Route>
          <Route path="/Organization" element={<OrgHome />} />
          <Route path="/UserScrimList" element={<UserScrimList />} />
          <Route path="/UserDailyMatch" element={<UserDailyMatch />} />
          <Route path="/UserOpenRoom" element={<UserOpenRoom />} />
          <Route path="/UserSlotList" element={<UserSlotList />} />
          <Route
            path="/OrganizationHomepage"
            element={<OrganizationHomepage />}
          />
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

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
import UserTournamentList from "./UserTournamentList";
import OrgCreateScrims from "./Organization/OrgCreateScrims";
import OrgCreateDailyMatch from "./Organization/OrgDailymatch";
import OrgCreateOpenRoom from "./Organization/OrgOpenRoom";
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
         
          <Route path="/OrgCreateScrims" element={<PrivateRoute />}>
            <Route path="/OrgCreateScrims" element={<OrgCreateScrims />} />
          </Route>
          <Route path="/OrgCreateDailyMatch" element={<PrivateRoute />}>
            <Route path="/OrgCreateDailyMatch" element={<OrgCreateDailyMatch />} />
          </Route>
          <Route path="/OrgCreateOpenRoom" element={<PrivateRoute />}>
            <Route path="/OrgCreateOpenRoom" element={<OrgCreateOpenRoom />} />
          </Route>
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

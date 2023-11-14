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
import UserSlotList from "./User/UserTournamentSlotBox";
import OrganizationHomepage from "./Organization/OrganizatiomHomepage";
import OrgCreateScrims from "./Organization/OrgCreateScrims";
import CreateDailyMatch from "./Organization/CreateDailyMatch";
import CreateOpenRoom from "./Organization/CreateOpenRooms";
import OrgHome from "./Organization/OrgHome";
import UnAuthorized from "./pages/UnAuthorized";
import UserTournaments from "./User/UserTournaments";
import UserTournamentSlotBox from "./User/UserTournamentSlotBox";
import EditScrims from "./pages/EditScrims";
import EditDailyMatch from "./pages/EditDailyMatch";
import EditOpenRooms from "./pages/EditOpenRooms";
import UserScrimSlotBox from "./User/UserScrimSlotBox";
import UserDailyMatchSlot from "./User/UserDailyMatchSlot";
import UserOpenRoomSlotBox from "./User/UserOpenRoomSlotBox";
import UserTournamentPlayerRegisterForm from "./User/UserTournamentPlayerRegisterForm";
import UserScrimPlayerRegisterForm from "./User/UserScrimPlayerRegistrationForm";
import UserDailyMatchPlayerRegisterForm from "./User/UserDailyMatchPlayerRegistrationForm";
import UserOpenRoomPlayerRegisterForm from "./User/UserOpenRoomPlayerRegistrationForm";
import TournamentSlots from "./Slots/TournamentSlots";
import ScrimSlots from "./Slots/ScrimSlots";
import DailyMatchSlots from "./Slots/DailyMatchSlots";
import OpenRoomSlots from "./Slots/OpenRoomSlots";
import NotificationList from "./User/NotificationList";

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
          <Route path="/updatescrim" element={<PrivateRoute />}>
            <Route path="/updatescrim/:scrimId" element={<EditScrims />} />
          </Route>
          <Route path="/updatedailymatch" element={<PrivateRoute />}>
            <Route
              path="/updatedailymatch/:dailymatchId"
              element={<EditDailyMatch />}
            />
          </Route>
          <Route path="/updateopenroom" element={<PrivateRoute />}>
            <Route
              path="/updateopenroom/:openroomId"
              element={<EditOpenRooms />}
            />
          </Route>
          <Route path="/Organization" element={<PrivateRoute />}>
            <Route path="/Organization" element={<OrgHome />} />{" "}
          </Route>

          <Route path="/UserScrimList" element={<PrivateRoute />}>
            <Route path="/UserScrimList" element={<UserScrimList />} />{" "}
          </Route>

          <Route path="/UserDailyMatch" element={<PrivateRoute />}>
            <Route path="/UserDailyMatch" element={<UserDailyMatch />} />{" "}
          </Route>

          <Route path="/UserOpenRoom" element={<PrivateRoute />}>
            <Route path="/UserOpenRoom" element={<UserOpenRoom />} />{" "}
          </Route>

          <Route path="/UserSlotList" element={<PrivateRoute />}>
            <Route path="/UserSlotList" element={<UserSlotList />} />{" "}
          </Route>

          <Route path="/UserTournaments" element={<PrivateRoute />}>
            <Route path="/UserTournaments" element={<UserTournaments />} />{" "}
          </Route>

          <Route path="/OrgCreateScrims" element={<PrivateRoute />}>
            <Route path="/OrgCreateScrims" element={<OrgCreateScrims />} />
          </Route>
          <Route path="/OrgCreateDailyMatch" element={<PrivateRoute />}>
            <Route path="/OrgCreateDailyMatch" element={<CreateDailyMatch />} />
          </Route>
          <Route path="/OrgCreateOpenRoom" element={<PrivateRoute />}>
            <Route path="/OrgCreateOpenRoom" element={<CreateOpenRoom />} />
          </Route>

          <Route
            path="/OrganizationHomepage"
            element={<OrganizationHomepage />}
          />

          <Route path="/UserTournamentSlotBox" element={<PrivateRoute />}>
            <Route
              path="/UserTournamentSlotBox"
              element={<UserTournamentSlotBox />}
            />
          </Route>
          <Route path="/UserScrimSlotBox" element={<PrivateRoute />}>
            <Route path="/UserScrimSlotBox" element={<UserScrimSlotBox />} />
          </Route>
          <Route path="/UserDailyMatchSlotBox" element={<PrivateRoute />}>
            <Route
              path="/UserDailyMatchSlotBox"
              element={<UserDailyMatchSlot />}
            />
          </Route>
          <Route path="/UserOpenRoomSlotBox" element={<PrivateRoute />}>
            <Route
              path="/UserOpenRoomSlotBox"
              element={<UserOpenRoomSlotBox />}
            />
          </Route>

          <Route
            path="/OrganizationHomepage"
            element={<OrganizationHomepage />}
          />
          <Route
            path="/UserTournamentPlayerRegisterForm"
            element={<PrivateRoute />}
          >
            <Route
              path="/UserTournamentPlayerRegisterForm/:tournamentId/:userId"
              element={<UserTournamentPlayerRegisterForm />}
            />
            <Route
              path="/UserTournamentPlayerRegisterForm/:tournamentId"
              element={<TournamentSlots />}
            />
          </Route>

          <Route path="/UserScrimPlayerRegisterForm" element={<PrivateRoute />}>
            <Route
              path="/UserScrimPlayerRegisterForm/:scrimId/:userId"
              element={<UserScrimPlayerRegisterForm />}
            />
            <Route
              path="/UserScrimPlayerRegisterForm/:scrimId"
              element={<ScrimSlots />}
            />
          </Route>

          <Route
            path="/UserDailyMatchPlayerRegisterForm"
            element={<PrivateRoute />}
          >
            <Route
              path="/UserDailyMatchPlayerRegisterForm/:dailymatchId/:userId"
              element={<UserDailyMatchPlayerRegisterForm />}
            />
            <Route
              path="/UserDailyMatchPlayerRegisterForm/:dailymatchId"
              element={<DailyMatchSlots />}
            />
          </Route>

          <Route
            path="/UserOpenRoomPlayerRegisterForm"
            element={<PrivateRoute />}
          >
            <Route
              path="/UserOpenRoomPlayerRegisterForm/:openroomId/:userId"
              element={<UserOpenRoomPlayerRegisterForm />}
            />
            <Route
              path="/UserOpenRoomPlayerRegisterForm/:openroomId"
              element={<OpenRoomSlots />}
            />
          </Route>

          <Route path="/NotificationList" element={<PrivateRoute />}>
            <Route path="/NotificationList" element={<NotificationList />} />
          </Route>
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

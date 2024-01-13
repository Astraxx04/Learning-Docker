import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Home,
  Landing,
  QRGenerator,
  TrackDashboard,
  ManageInventory,
  Login,
  AddItem,
  UpdateItem,
  Register,
  DeleteItem,
  Tracker,
} from "./pages";
import { Provider } from "react-redux";
import store from "./features/store";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App bg-background">
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard/Login" element={<Login />} />
              <Route path="/dashboard/Register" element={<Register />} />

              <Route path="/dashboard" element={<Dashboard />}>
                <Route
                  path="/dashboard/QRGenerator"
                  element={<QRGenerator />}
                />
                <Route path="/dashboard/Track" element={<TrackDashboard />} />
                <Route path="/dashboard/Home" element={<Home />} />

                <Route
                  path="/dashboard/ManageInventory"
                  element={<ManageInventory />}
                />
              </Route>
            </Routes>
            <Routes>
              <Route path="/item/add" element={<AddItem />} />
              <Route path="/item/update" element={<UpdateItem />} />
              <Route path="/item/delete" element={<DeleteItem />} />
            </Routes>
            <Routes>
              <Route path="/tracker" element={<Tracker />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;

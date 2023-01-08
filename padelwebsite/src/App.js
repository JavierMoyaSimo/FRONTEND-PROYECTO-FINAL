
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./containers/Home/Home";
import Header from "./components/Header/Header";
import Login from "./containers/User/Login/Login";
import Register from "./containers/User/Register/Register";
import Sportscenter from "./containers/Sportscenters/Sportscenters";
import Profile from "./containers/User/Profile/Profile";
import UserSettings from "./containers/User/UserSettings/userSettings";
import UserBooking from "./containers/User/UserBooking/UserBooking";
import Game from "./containers/Game/Game";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sportscenter" element={<Sportscenter />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userSettings" element={<UserSettings />} />
          <Route path="/userBooking" element={<UserBooking />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddRecord from "./Components/AddRecord";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Pages/Home";
import ShowAll from "./Components/ShowAll";
import SearchRecord from "./Components/SearchRecord";
import AddCard from "./Components/AddCard";
import VisitingCardsList from "./Components/VisitingCardsList";

const App = () => {
   return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />

          <Route path="/add-record" element={<AddRecord />} />
          <Route path="/show-all-records" element={<ShowAll />} />
          <Route path="/search-records/:Id" element={<SearchRecord />} />

          <Route path="/add-card" element={<AddCard />} />
          <Route path="/show-all-cards" element={<VisitingCardsList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

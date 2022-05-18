import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Calender from "./component/Calender";
import Record from "./component/Record";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Teaminf from "./component/Teaminf";
import Playerinf from "./component/Playerinf";
import Reservation from "./component/Reservation";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/calender" element={<Calender />} />
        <Route path="/record" element={<Record />} />
        <Route path="/Teaminf" element={<Teaminf />} />
        <Route path="/Playerinf" element={<Playerinf />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;
import { BrowserRouter,Routes,Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import AllUsers from "./Components/AllUsers";
import AddUser from "./Components/AddUser";
import Homepage from "./Components/Homepage";
import NotFound from "./Components/NotFound";
import EditUser from "./Components/EditUser";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/create" element={<AddUser />} />
          <Route path="/update/:userId" element={<EditUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

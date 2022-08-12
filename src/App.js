import { Route, Routes } from "react-router-dom";
import Data from "./pages/data";
import Login from "./pages/login";

function App() {
  return (
    <div>
      <title>OctoSketch</title>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/:id" element={<Data />} />
      </Routes>
    </div>
    // <div className='h-full w-full flex justify-center '>
    // </div>
  );
}

export default App;

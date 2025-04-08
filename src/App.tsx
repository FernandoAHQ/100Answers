import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./pages/menu/Menu";

import Play from "./pages/play/Play";
import Host from "./pages/host/Host";
import Spectate from "./pages/spectate/Spectate";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/play" element={<Play />} />
        <Route path="/host" element={<Host />} />
        <Route path="/spectate" element={<Spectate />} />
      </Routes>
    </BrowserRouter>
  );
}

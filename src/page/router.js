import { Route, Routes } from "react-router-dom";
import { HOME_ROUTE, GASTHAUS_ROUTE, GETRÄNKEKARTE_ROUTE, RESERVIEREN_ROUTE } from "../constanten/const";

// Importiere hier deine Komponenten
import Home from "../components/home";
import Gasthaus from "../components/gasthaus";
import Getränkekarte from "../components/getränkekarte";
import Reservieren from "../components/reservieren";

const AppRouter = () => (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={GASTHAUS_ROUTE} element={<Gasthaus />} />
      <Route path={GETRÄNKEKARTE_ROUTE} element={<Getränkekarte />} />
      <Route path={RESERVIEREN_ROUTE} element={<Reservieren />} />
    </Routes>
);

export default AppRouter;
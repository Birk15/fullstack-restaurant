import MyNavbar from "./page/navbar";
import AppRouter from "./page/router";
import Bottom from "./page/bottom";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavbar />
        <AppRouter />
        <Bottom />
      </BrowserRouter>
    </div>
  );
}

export default App;

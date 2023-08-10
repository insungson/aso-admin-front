import { BrowserRouter } from "react-router-dom";
import MainRoute from "./routers/mainRouter";

function App() {
  return (
    <BrowserRouter>
      <MainRoute />
    </BrowserRouter>
  );
}

export default App;

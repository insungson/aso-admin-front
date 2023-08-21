import { BrowserRouter } from "react-router-dom";
import MainRoute from "./routers/mainRouter";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

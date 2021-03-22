import SwapComponent from "./components/swap/swap";
// Context
import { ConnectionProvider } from "./utils/connection";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ConnectionProvider>
          <SwapComponent />
        </ConnectionProvider>
      </header>
    </div>
  );
}

export default App;

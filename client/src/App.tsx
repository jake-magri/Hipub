import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import { SoundProvider } from "./components/SoundProvider";

function App() {
  return (
    <SoundProvider>
      <div>
        <Navbar />
        <main className="container pt-5">
          <Outlet />
        </main>
      </div>
    </SoundProvider>
  );
}

export default App;

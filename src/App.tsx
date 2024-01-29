import "./App.css";
import AgeGroupPriceList from "./components/ageGroupPrice/AgeGroupPriceList";

import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="h-[100dvh] grid place-items-center">
      <AgeGroupPriceList />
      <Toaster />
    </div>
  );
}

export default App;

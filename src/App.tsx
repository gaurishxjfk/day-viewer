import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DateDisplay } from "./date-display";  

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/:date" element={<DateDisplay />} />
        <Route path="/" element={<DateDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

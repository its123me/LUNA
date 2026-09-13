import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import LittleStars from "./pages/LittleStars";
import Love from "./pages/Love";
import ThoseWeMiss from "./pages/ThoseWeMiss";
import ThoseWhoLeft from "./pages/ThoseWhoLeft";
import CandleRoom from "./pages/CandleRoom";
import Memories from "./pages/Memories";
import Stories from "./pages/Stories";
import Healing from "./pages/Healing";
import QuietRoom from "./pages/QuietRoom";
import Privacy from "./pages/Privacy";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/little-stars"
          element={<LittleStars />}
        />

        <Route
          path="/love"
          element={<Love />}
        />

        <Route
          path="/those-we-miss"
          element={<ThoseWeMiss />}
        />

        <Route
          path="/those-who-left"
          element={<ThoseWhoLeft />}
        />

        <Route
          path="/candle-room"
          element={<CandleRoom />}
        />

        <Route
          path="/memories"
          element={<Memories />}
        />

        <Route
          path="/stories"
          element={<Stories />}
        />

        <Route
          path="/healing"
          element={<Healing />}
        />

        <Route
          path="/quiet-room"
          element={<QuietRoom />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />
      </Routes>

      <Footer />

      <BackToTop />
    </BrowserRouter>
  );
}
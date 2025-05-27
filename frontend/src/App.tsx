import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-slate-500 text-cyan-500">Test</div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

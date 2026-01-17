import Navbar from "./components/Navbar"

const App = () => {
  return (
    <main className="bg-[#f9f9f9] flex flex-col items-center min-h-screen">
      <Navbar />
      <h1 className="text-black text-4xl font-bold">Hello, CA Monk!</h1>
    </main>
  )
}

export default App
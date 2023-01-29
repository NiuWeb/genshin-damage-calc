import { CalcContext, useCalcProvider } from "@calc/context"
import { LanguageContext, useLanguageProvider } from "./strings/context"
import { HashRouter } from "react-router-dom"
import { AppContent } from "./content"
import { RotationsContext, useRotationsProvider } from "./components/genshin/rotations/context"

function App() {
  const calc = useCalcProvider()
  const lang = useLanguageProvider()
  const rots = useRotationsProvider()
  return (
    <HashRouter>
      <CalcContext.Provider value={calc}>
        <LanguageContext.Provider value={lang}>
          <RotationsContext.Provider value={rots}>
            <AppContent />
          </RotationsContext.Provider>
        </LanguageContext.Provider>
      </CalcContext.Provider>
    </HashRouter>
  )
}

export default App
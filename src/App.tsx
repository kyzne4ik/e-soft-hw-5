import type { ReactNode } from "react";
import "./App.css";
import { ThemeProvider, ThemeSwitcherButton } from "./tasks/1.1.UseContext";
import { Counter } from "./tasks/1.2.UseCallback";
import { HardCalculate } from "./tasks/1.3.UseMemo";
import { ControlledMiniForma } from "./tasks/1.4.UseRef";

function AppProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function App() {
  return (
    <AppProviders>
      <div className="1.1-use-context">
        <p>1.1. useContext — Тёмная/светлая тема</p>
        <ThemeSwitcherButton />
      </div>

      <div className="1.2-use-callback">
        <p>1.2. useCallback — Оптимизация обработчиков</p>
        <Counter />
      </div>

      <div className="1.3-use-memo">
        <p>1.3. useMemo — Оптимизация вычислений</p>
        <HardCalculate />
      </div>

      <div className="1.4-use-ref">
        <p>1.4. useRef — Фокус и предыдущее значение</p>
        <div style={{ marginLeft: 10 }}>
          <ControlledMiniForma />
        </div>
      </div>
    </AppProviders>
  );
}

export default App;

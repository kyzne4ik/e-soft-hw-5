import "./App.css";
import { useState, type ReactNode } from "react";
import { ThemeProvider, ThemeSwitcherButton } from "./tasks/1.1.UseContext";
import { Counter } from "./tasks/1.2.UseCallback";
import { HardCalculate } from "./tasks/1.3.UseMemo";
import { ControlledMiniForma } from "./tasks/1.4.UseRef";
import { TodoList } from "./tasks/1.5.UseReducer";
import { Parent } from "./tasks/1.6.React.memo";

function AppProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

type RenderTasksType = Array<{
  buttonText: string;
  paragraph: string;
  component: ReactNode;
}>;

const RENDER_TASKS: RenderTasksType = [
  {
    buttonText: "1.1-use-context",
    paragraph: "1.1. useContext — Тёмная/светлая тема",
    component: <ThemeSwitcherButton />,
  },
  {
    buttonText: "1.2-use-callback",
    paragraph: "1.2. useCallback — Оптимизация обработчиков",
    component: <Counter />,
  },
  {
    buttonText: "1.3-use-memo",
    paragraph: "1.3. useMemo — Оптимизация вычислений",
    component: <HardCalculate />,
  },
  {
    buttonText: "1.4-use-ref",
    paragraph: "1.4. useRef — Фокус и предыдущее значение",
    component: <ControlledMiniForma />,
  },
  {
    buttonText: "1.5-use-reducer",
    paragraph: "1.5. useReducer — Todo List",
    component: <TodoList />,
  },
  {
    buttonText: "1.6-react-memo",
    paragraph: "1.6. React.memo — Оптимизация рендеринга",
    component: <Parent />,
  },
];

function App() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeTask = RENDER_TASKS[activeIndex];

  return (
    <AppProviders>
      {RENDER_TASKS.map((task, taskIndex) => {
        return (
          <button
            key={taskIndex}
            onClick={() => setActiveIndex(taskIndex)}
            style={
              taskIndex === activeIndex
                ? {
                    background: "lightgreen",
                  }
                : {}
            }
          >
            {task.buttonText}
          </button>
        );
      })}
      <div>
        <p>{activeTask.paragraph}</p>
        <div
          style={{
            marginLeft: 10,
          }}
        >
          {activeTask.component}
        </div>
      </div>
    </AppProviders>
  );
}

export default App;

import "./App.css";
import Select from "./components/Select/Select";

const selectItems = [
  {
    id: 0,
    name: "Account",
  },
  {
    id: 1,
    name: "Wallet",
  },
  {
    id: 2,
    name: "Bonuses",
  },
  {
    id: 3,
    name: "Bets",
  },
  {
    id: 4,
    name: "History",
  },
];

function App() {
  return (
    <>
      <Select items={selectItems} />
    </>
  );
}

export default App;

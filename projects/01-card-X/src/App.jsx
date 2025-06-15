import "./App.css";
import XFollowCard from "./XFollowCard";

const x = 5
console.log(x)



function App() {
  const nami = { username: "namigonewild", meSigue: true };
  const mia = { username: "miakhalifa", meSigue: true };

  return (
    <div className="App">
      <XFollowCard username="manuelito18" meSigue={false}>
        Manuel Fernández
      </XFollowCard>

      <XFollowCard {...nami}>Nami Gone Wild</XFollowCard>

      <XFollowCard {...mia}>Mia Khalifa</XFollowCard>
    </div>
  );
}

export default App;

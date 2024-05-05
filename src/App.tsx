import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './routes/error-page';
import GameBoard from './routes/GameBoard';
import GameSetup from './routes/GameSetup';
import Layout from './routes/Layout';

export default function App(): JSX.Element {

  // const namesToUse = ["Player 1", "Player 2", "Player 3", "Player 4"]
  // const otherNames = ["Aristotle", "Boethius", "Charlemagne", "Donatello", "Euripides", "Fibonacci", "Genghis Khan", "Homer", "Isaac Newton", "Julius Caesar", "Kublai Khan", "Leonardo da Vinci", "Machiavelli", "Napoleon", "Ovid", "Plato", "Quintilian", "Raphael", "Socrates", "Thucydides", "Ulysses", "Virgil", "William Shakespeare", "Xenophon", "Yoda", "Zeno of Citium"];
  // function newPlayer(playerIndex: number) {
  //   return {
  //     index: playerIndex, key: playerIndex, name: namesToUse[playerIndex] || "Player" + playerIndex,
  //     correctCategories: [], wonPlace: 0
  //   };
  // }

  // Now that we have figured out what the game will look like, initialize the gameState
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/trivial-endeavor-2/" element={<Layout />} errorElement={<ErrorPage />} >
          <Route path="/trivial-endeavor-2/:playerNames/:devModeEntered" element={<GameBoard />} errorElement={<ErrorPage />} />
          <Route path="/trivial-endeavor-2/:playerNames/" element={<GameBoard />} errorElement={<ErrorPage />} />
          <Route path="/trivial-endeavor-2/" element={<GameSetup />} errorElement={<ErrorPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
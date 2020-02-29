import React, { createContext, Dispatch, useReducer, useContext } from "react";
import { AsyncStorage } from "react-native";

export type Game = {
  turn: number;
  value: number;
  strike: number;
  ball: number;
};

type GameState = {
  target: number[];
  game: Game[];
  totalTurn: number;
  correct: boolean;
  bestTurn: number;
  isBest: boolean;
};

const getData = async () => {
  try {
    const value: string = await AsyncStorage.getItem("BEST_TURN");
    if (value !== null) {
      // We have data!!
      return parseInt(value);
    } else {
      console.log("there is no data");
      return 0;
    }
  } catch (error) {
    // Error retrieving data
    console.error(error);
  }
};

const setData = async (turn: number) => {
  try {
    await AsyncStorage.setItem("BEST_TURN", turn.toString());
  } catch (error) {
    // Error saving data
    console.error(error);
  }
};

const clearAsyncStorage = async () => {
  AsyncStorage.clear();
};

const GameStateContext = createContext<GameState | undefined>(undefined);

type Action = { type: "CHECK"; value: number[] } | { type: "RESET" };
type GameDispatch = Dispatch<Action>;
const GameDispatchContext = createContext<GameDispatch | undefined>(undefined);

const generateTarget = (): number[] => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const target = [];
  for (let i = 0; i < 3; i++) {
    target.push(arr.splice(Math.floor(Math.random() * (9 - i)), 1));
  }
  return target;
};

let best = 1000000;
getData().then(val => {
  best = val;
});

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "CHECK": {
      let strikeCount = 0;
      let ballCount = 0;
      state.target.forEach((val, index) => {
        if (val[0] === action.value[index]) {
          strikeCount++;
        } else if (
          val[0] === action.value[(index + 1) % 3] ||
          val[0] === action.value[(index + 2) % 3]
        ) {
          ballCount++;
        }
      });
      if (strikeCount === 3) {
        let isBest = false;
        if (!best) {
          setData(state.totalTurn);
          isBest = true;
        } else {
          if (best > state.totalTurn) {
            setData(state.totalTurn);
            best = state.totalTurn;
            isBest = true;
          }
        }
        return {
          ...state,
          correct: true,
          bestTurn: best,
          isBest: isBest
        };
      } else {
        const mystring = parseInt(
          action.value.map(val => val.toString()).join("")
        );
        const myturn = Math.max(0, ...state.game.map(val => val.turn)) + 1;
        state.game.unshift({
          turn: myturn,
          value: mystring,
          strike: strikeCount,
          ball: ballCount
        });
        return {
          ...state,
          game: state.game,
          totalTurn: state.totalTurn + 1,
          correct: false
        };
      }
    }
    case "RESET":
      return {
        ...state,
        target: generateTarget(),
        game: [],
        totalTurn: 1,
        correct: false,
        isBest: false
      };
    default:
      return state;
  }
}

export function GameContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [games, dispatch] = useReducer(gameReducer, {
    target: generateTarget(),
    game: [],
    totalTurn: 1,
    correct: false,
    bestTurn: 0,
    isBest: false
  });

  return (
    <GameDispatchContext.Provider value={dispatch}>
      <GameStateContext.Provider value={games}>
        {children}
      </GameStateContext.Provider>
    </GameDispatchContext.Provider>
  );
}

export function useGameState() {
  const state = useContext(GameStateContext);
  if (!state) throw new Error("GameProvider not found!");
  return state;
}

export function useGameDispatch() {
  const dispatch = useContext(GameDispatchContext);
  if (!dispatch) throw new Error("GameProvider not found");
  return dispatch;
}

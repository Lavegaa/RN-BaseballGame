import React, { createContext, Dispatch, useReducer, useContext } from "react";

export type Game = {
  value: number;
  strike: number;
  ball: number;
};

type GameState = {
  target: number[];
  game: Game[];
  turn: number;
  correct: boolean;
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
        return {
          ...state,
          correct: true
        };
      } else {
        const mystring = parseInt(
          action.value.map(val => val.toString()).join("")
        );
        state.game.unshift({
          value: mystring,
          strike: strikeCount,
          ball: ballCount
        });
        return {
          ...state,
          game: state.game,
          turn: state.turn++,
          correct: false
        };
      }
    }
    case "RESET":
      return {
        ...state,
        target: generateTarget(),
        game: [],
        turn: 0,
        correct: false
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
    turn: 0,
    correct: false
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

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

type Action = { type: "CEHCK"; value: number } | { type: "RESET" };

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
    case "CEHCK": {
      const arrValue = action.value
        .toString()
        .split("")
        .map(val => parseInt(val));
      let strikeContext = 0;
      let ballContext = 0;
      state.target.forEach((val, index) => {
        if (val === arrValue[index]) {
          strikeContext++;
        } else if (
          val === arrValue[(index + 1) % 3] ||
          val === arrValue[(index + 2) % 3]
        ) {
          ballContext++;
        }
      });
      if (strikeContext === 3) {
        return {
          ...state,
          correct: true
        };
      } else {
        return {
          ...state,
          game: state.game.concat({
            value: action.value,
            strike: strikeContext,
            ball: ballContext
          }),
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
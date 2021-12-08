import React from "react";
import {v4 as uuid} from "uuid";

const styles = {
  container: "p-2 flex flex-col w-80 gap-y-2",
};

interface FunctionListProps {
  functions: {
    [key: string]: string;
  };
  setFunctions: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
}

export default function FunctionList({
  functions,
  setFunctions,
}: FunctionListProps) {
  function addFunction() {
    setFunctions((functions) => ({...functions, [uuid()]: ""}));
  }

  function setFunction(id: string, newFunction: string) {
    setFunctions((functions) => ({...functions, [id]: newFunction}));
  }

  return (
    <div className={styles.container}>
      {Object.entries(functions).map(([id, func]) => (
        <input
          key={id}
          type="text"
          value={func}
          onChange={(event) => {
            setFunction(id, event.target.value);
          }}
        />
      ))}
      <button
        onClick={() => {
          addFunction();
        }}
      >
        Add function
      </button>
    </div>
  );
}

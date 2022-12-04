import React from "react";

interface Props {
  addTable: () => void;
}

export const ControlButtons: React.FC<Props> = ({ addTable }) => {
  return (
    <div>
      <button onClick={addTable}>表を追加</button>
    </div>
  );
};

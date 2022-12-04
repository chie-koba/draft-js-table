import { EditorBlock } from "draft-js";
import React from "react";
import { tablePositionLabel } from "../../controlTable/utils";
import { TableShape } from "../../types";

interface Props {
  tableKey: string;
  tableShape: TableShape;
}

export const TableBlock: React.FC<Props> = (props) => {
  return (
    <table
      key={props.tableKey}
      id={props.tableKey}
      style={{ border: "1px solid #000" }}
    >
      <tbody>
        {props.tableShape.map((row, rowIndex) => {
          const cells = row.map((_, columnIndex) => {
            const position = tablePositionLabel({
              tableKey: props.tableKey,
              index: { row: rowIndex, column: columnIndex },
            });
            return (
              <td
                key={position}
                data-position={position}
                style={{ border: "1px solid #000", minWidth: "200px" }}
              >
                {rowIndex === 0 && columnIndex === 0 && (
                  <EditorBlock {...props} />
                )}
              </td>
            );
          });
          return <tr key={`${props.tableKey}-${rowIndex}`}>{cells}</tr>;
        })}
      </tbody>
    </table>
  );
};

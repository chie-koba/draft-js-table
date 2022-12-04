import {
  ContentBlock,
  ContentState,
  EditorChangeType,
  EditorState,
  genKey,
} from "draft-js";
import { Map } from "immutable";
import { BLOCK_TYPE_TABLE } from "../constants";
import { TableShape } from "../types";

export const updateEditorState = (
  editorState: EditorState,
  blocks: ContentBlock[],
  changeType: EditorChangeType
) => {
  const contentState = editorState.getCurrentContent();
  const entityMap = contentState.getEntityMap();
  const newContentState = ContentState.createFromBlockArray(blocks, entityMap);
  return EditorState.push(editorState, newContentState, changeType);
};

export const tablePositionLabel = ({
  tableKey,
  index,
}: {
  tableKey: string;
  index: {
    row: number;
    column: number;
  };
}) => `${tableKey}-${index.row}-${index.column}`;

export const createTableBlocks = (tableShape: TableShape) => {
  const tableKey = genKey();
  const tableBlocks: ContentBlock[] = [];
  tableShape.forEach((row, rowIndex) => {
    row.forEach((_, columnIndex) => {
      const tablePosition = tablePositionLabel({
        tableKey,
        index: { row: rowIndex, column: columnIndex },
      });
      const data = Map(
        rowIndex === 0 && columnIndex === 0
          ? { tableKey, tablePosition, tableShape }
          : { tableKey, tablePosition }
      );
      const newBlock = new ContentBlock({
        key: genKey(),
        type: BLOCK_TYPE_TABLE,
        data,
        text: "",
      });
      tableBlocks.push(newBlock);
    });
  });

  return tableBlocks;
};

export const insertTableBlocks = (
  blockArray: ContentBlock[],
  insertStartIndex: number,
  tableBlocks: ContentBlock[]
) => {
  const firstBlocks = blockArray.slice(0, insertStartIndex + 1);
  const endBlocks = blockArray.slice(insertStartIndex + 1, blockArray.length);
  if (!endBlocks.length)
    endBlocks.push(
      new ContentBlock({ key: genKey(), type: "unstyles", text: "" })
    );
  return [...firstBlocks, ...tableBlocks, ...endBlocks];
};

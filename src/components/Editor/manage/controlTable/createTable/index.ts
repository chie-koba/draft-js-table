import { ContentBlock, EditorState, RichUtils, SelectionState } from "draft-js";
import { BLOCK_TYPE_TABLE } from "../../constants";
import {
  createTableBlocks,
  insertTableBlocks,
  updateEditorState,
} from "../utils";

const currentBlockIndex = (selectionKey: string, blockArray: ContentBlock[]) =>
  blockArray.findIndex((block) => block.getKey() === selectionKey);

export const createTable =
  (editorState: EditorState) =>
  (tableSize: { rows: number; columns: number }) => {
    // tableの中にtableを追加させない
    if (RichUtils.getCurrentBlockType(editorState) === BLOCK_TYPE_TABLE)
      return null;

    const talbeShape = [...new Array(tableSize.rows)].map(() =>
      [...new Array(tableSize.columns)].map(() => ({ element: "td" }))
    );
    const tableBlocks = createTableBlocks(talbeShape);

    const currentContentState = editorState.getCurrentContent();
    const blocksAsArray = currentContentState.getBlocksAsArray();
    const currentIndex = currentBlockIndex(
      editorState.getSelection().getAnchorKey(),
      blocksAsArray
    );
    const blocksArrayWithTable = insertTableBlocks(
      blocksAsArray,
      currentIndex,
      tableBlocks
    );

    return updateEditorState(
      editorState,
      blocksArrayWithTable,
      "insert-fragment"
    );
  };

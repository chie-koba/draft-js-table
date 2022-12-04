import { DraftHandleValue, EditorState, RichUtils } from "draft-js";
import React from "react";
import { BLOCK_TYPE_TABLE } from "../constants";

export const handleReturn =
  (updateEditorState: (editorState: EditorState) => void) =>
  (_e: React.KeyboardEvent<{}>, editorState: EditorState): DraftHandleValue => {
    if (RichUtils.getCurrentBlockType(editorState) === BLOCK_TYPE_TABLE) {
      updateEditorState(RichUtils.insertSoftNewline(editorState));
      return "handled";
    }
    return "not-handled";
  };

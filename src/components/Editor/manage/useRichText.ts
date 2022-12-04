import { convertFromRaw, EditorState, genKey } from "draft-js";
import { useCallback, useState } from "react";
import { createTable } from "./controlTable/createTable";

export const useRichText = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const updateEditorState = useCallback((state: EditorState) => {
    setEditorState(state);
  }, []);

  const addTable = useCallback(() => {
    const state = createTable(editorState)({ rows: 2, columns: 3 });
    if (!state) return;
    updateEditorState(state);
  }, [editorState, updateEditorState]);

  return { addTable, editorState, onChange: updateEditorState };
};

import React, { useCallback, useState } from "react";
import { Editor as DraftJsEditor, EditorState } from "draft-js";

export const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = useCallback((state: EditorState) => {
    setEditorState(state);
  }, []);

  return <DraftJsEditor editorState={editorState} onChange={onChange} />;
};

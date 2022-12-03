import React, { useCallback, useState } from "react";
import {
  convertFromRaw,
  Editor as DraftJsEditor,
  EditorState,
  genKey,
} from "draft-js";

export const Editor: React.FC = () => {
  // see: https://github.com/facebook/draft-js/issues/2332
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw({
        entityMap: {},
        blocks: [
          {
            text: "",
            key: genKey(),
            type: "unstyled",
            entityRanges: [],
            depth: 0,
            inlineStyleRanges: [],
          },
        ],
      })
    )
  );

  const onChange = useCallback((state: EditorState) => {
    setEditorState(state);
  }, []);

  return (
    <div>
      <DraftJsEditor editorState={editorState} onChange={onChange} />
    </div>
  );
};

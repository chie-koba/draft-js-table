import React from "react";
import { Editor as DraftJsEditor } from "draft-js";
import { useRichText } from "./manage/useRichText";
import { ControlButtons } from "./ControlButtons";
import { blockRenderFn } from "./manage/blockRenderFn";

const Editor: React.FC = () => {
  const { editorState, addTable, onChange, handleReturn } = useRichText();

  return (
    <div>
      <ControlButtons addTable={addTable} />
      <div style={{ border: "1px solid #000" }}>
        <DraftJsEditor
          placeholder="テキストを入力"
          editorState={editorState}
          onChange={onChange}
          blockRendererFn={blockRenderFn}
          handleReturn={handleReturn}
        />
      </div>
    </div>
  );
};

export default Editor;

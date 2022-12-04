import { ContentBlock, ContentState, EditorBlock } from "draft-js";
import { createPortal } from "react-dom";
import { TableShape } from "../../types";
import { TableBlock } from "./TableBlock";

interface Props {
  contetnState: ContentState;
  block: ContentBlock;
}

export const Component: React.FC<Props> = (props) => {
  const data = props.block.getData();
  const tableKey: undefined | string = data.get("tableKey");
  const tableShape: undefined | TableShape = data.get("tableShape");
  const tablePosition: undefined | string = data.get("tablePosition");

  if (!tableKey) return null;

  if (tablePosition && !tableShape) {
    const target = document.querySelector(`[data-position="${tablePosition}"]`);
    if (target) return createPortal(<EditorBlock {...props} />, target);
  }

  if (Array.isArray(tableShape)) {
    return (
      <TableBlock {...props} tableKey={tableKey} tableShape={tableShape} />
    );
  }

  return null;
};

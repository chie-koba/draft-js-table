import { ContentBlock } from "draft-js";
import { BLOCK_TYPE_TABLE } from "../constants";
import { Component } from "./Component";

export const blockRenderFn = (block: ContentBlock) => {
  if (block.getType() !== BLOCK_TYPE_TABLE) return null;

  return {
    component: Component,
  };
};

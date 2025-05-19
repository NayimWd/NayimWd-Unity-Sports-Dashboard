import { Heading } from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

export const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = this.options.levels.includes(node.attrs.level)
      ? node.attrs.level
      : this.options.levels[0];

    const levelClassMap: Record<number, string> = {
      1: "text-3xl font-bold my-4 text-font",
      2: "text-2xl font-semibold my-3 text-font",
      3: "text-xl font-medium my-2 text-font",
    };

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: levelClassMap[level] || "",
      }),
      0,
    ];
  },
});

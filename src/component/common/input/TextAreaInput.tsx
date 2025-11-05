import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import cn from "../../../utils/cn";
import { CustomHeading } from "./inputUtils/CustomHeading";
import { BadgeAlert } from "lucide-react";


interface TextAreaProps {
  name: string,
  label: string,
  placeholder?: string,
  height?: string,
  className?: string
}

const TextAreaInput = ({ name, label, height = " min-h-[150px]", className, placeholder }: TextAreaProps) => {
  // import formContext to get the form method
  const { control, trigger } = useFormContext();

  const {
    field: { value = "", onChange },
    fieldState: { error },
  } = useController({ name, control });

  const [focused, setFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      CustomHeading.configure({
        levels: [1, 2, 3],
      }),
      StarterKit.configure({
        heading: false,
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4 my-2",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4 my-2",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 pl-4 italic text-muted my-2",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-muted px-3 py-2 font-mono text-sm rounded my-2",
          },
        },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: cn(
          `w-full rounded border  px-4 py-2 font-inter text-font outline-none transition-all bg-surface focus:outline-none prose max-w-none ${height}`,
          (error && focused) ? "border-red-500" : (!error && focused && value) ? "border-green-500" : focused ? "border-primary" : "border-border",
          className
        ),
        placeholder: placeholder ?? "Write Your Thoughts",
        title: "text-area",

        //  Disable Grammarly
        "data-gramm": "false",
        "data-gramm_editor": "false",
        "data-enable-grammarly": "false",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false);
      trigger(name);
    },
  });


  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const buttonBase =
    "px-2 py-1 rounded text-sm font-medium border border-border text-font transition";

  const getButtonClass = (isActive: boolean) =>
    `${buttonBase} ${isActive ? "bg-primary text-white" : "bg-white dark:bg-surface"}`;

  return (
    <div className="relative space-y-2">
      <label className="block text-font font-medium" htmlFor={name}>
        {label}
      </label>
      <div className="flex items-center gap-2 flex-wrap mb-2">
        {/* Text Styling */}
        <button type="button" title="Paragraph" onClick={() => editor?.chain().focus().setParagraph().run()}
          className={getButtonClass(editor?.isActive("paragraph") ?? false)}>P</button>

        <button type="button" title="Bold" onClick={() => editor?.chain().focus().toggleBold().run()}
          className={getButtonClass(editor?.isActive("bold") ?? false)}><strong className="text-font">B</strong></button>

        <button type="button" title="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={getButtonClass(editor?.isActive("italic") ?? false)}><em>I</em></button>

        <button type="button" title="Underline" onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={getButtonClass(editor?.isActive("underline") ?? false)}><u>U</u></button>

        <button type="button" title="Strike" onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={getButtonClass(editor?.isActive("strike") ?? false)}><s>S</s></button>

        {/* Headings */}
        <button type="button" title="Heading 1" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={getButtonClass(editor?.isActive("heading", { level: 1 }) ?? false)}>H1</button>

        <button type="button" title="Heading 2" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={getButtonClass(editor?.isActive("heading", { level: 2 }) ?? false)}>H2</button>

        <button type="button" title="Heading 3" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={getButtonClass(editor?.isActive("heading", { level: 3 }) ?? false)}>H3</button>

        {/* Lists */}
        <button type="button" title="Bullet List" onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={getButtonClass(editor?.isActive("bulletList") ?? false)}>• List</button>

        <button type="button" title="Ordered List" onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={getButtonClass(editor?.isActive("orderedList") ?? false)}>1. List</button>

        {/* Blockquote, Code, Rule */}
        <button type="button" title="Blockquote" onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={getButtonClass(editor?.isActive("blockquote") ?? false)}>❝</button>

        <button type="button" title="Code Block" onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={getButtonClass(editor?.isActive("codeBlock") ?? false)}>Code</button>

        <button type="button" title="Horizontal Rule" onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          className={buttonBase}>―</button>

        {/* Align */}
        <button type="button" title="Align Left" onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className={getButtonClass(editor?.isActive({ textAlign: "left" }) ?? false)}>Left</button>

        <button type="button" title="Align Center" onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className={getButtonClass(editor?.isActive({ textAlign: "center" }) ?? false)}>Center</button>

        <button type="button" title="Align Right" onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className={getButtonClass(editor?.isActive({ textAlign: "right" }) ?? false)}>Right</button>

        {/* Utility */}
        <button type="button" title="Clear Formatting" onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}
          className={buttonBase}>Clear</button>

        <button type="button" title="Undo" onClick={() => editor?.chain().focus().undo().run()} className={buttonBase}>Undo</button>

        <button type="button" title="Redo" onClick={() => editor?.chain().focus().redo().run()} className={buttonBase}>Redo</button>
      </div>

      <div>
        {editor ? (
          <EditorContent editor={editor} />
        ) : (
          <div className="text-sm text-muted-foreground p-2 border rounded bg-muted">
            Loading editor...
          </div>
        )}
         {error && <p className="errorText flex items-center justify-center gap-1"> <BadgeAlert size={14}/> {error.message}</p>
        }
      </div>
    </div>
  )
}

export default TextAreaInput;
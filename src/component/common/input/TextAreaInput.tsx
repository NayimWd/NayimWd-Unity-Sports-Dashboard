import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import cn from "../../../utils/cn";


interface TextAreaProps {
  name: string,
  label: string,
  placeholder?: string,
  height?: string,
  className?: string
}

const TextAreaInput = ({ name, label, height = "min-h-[150px]", className, placeholder }: TextAreaProps) => {
  // import formContext to get the form method
  const { control, trigger } = useFormContext();

  const {
    field: { value = "", onChange },
    fieldState: { error },
  } = useController({ name, control });

  const [focused, setFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: { keepMarks: true, keepAttributes: false } }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: cn(
          `w-full rounded border-2 px-4 py-2 font-inter outline-none transition-all bg-surface focus:outline-none prose max-w-none ${height}`,
          error ? "border-red-500" : focused ? "border-primary" : "border-border",
          className
        ),
        placeholder: placeholder ?? "Write Your Thoughts",
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
    `${buttonBase} ${isActive ? "bg-primary" : "bg-white dark:bg-surface"}`;

  return (
    <div className="relative space-y-2">
      <label className="block text-font font-medium" htmlFor={name}>
        {label}
      </label>
     <div className="flex items-center gap-2 flex-wrap mb-2">
  <button
    title="Paragraph"
    aria-label="Paragraph"
    type="button"
    onClick={() => editor?.chain().focus().setParagraph().run()}
    className={getButtonClass(editor?.isActive("paragraph") ?? false)}
  >
    P
  </button>

  <button
    title="Bold"
    aria-label="Bold"
    type="button"
    onClick={() => editor?.chain().focus().toggleBold().run()}
    className={getButtonClass(editor?.isActive("bold") ?? false)}
  >
    <strong>B</strong>
  </button>

  <button
    title="Italic"
    aria-label="Italic"
    type="button"
    onClick={() => editor?.chain().focus().toggleItalic().run()}
    className={getButtonClass(editor?.isActive("italic") ?? false)}
  >
    <em>I</em>
  </button>

  <button
    title="Underline"
    aria-label="Underline"
    type="button"
    onClick={() => editor?.chain().focus().toggleUnderline().run()}
    className={getButtonClass(editor?.isActive("underline") ?? false)}
  >
    <u>U</u>
  </button>

  <button
    title="Bullet List"
    aria-label="Bullet List"
    aria-labelledby="list"
    type="button"
    onClick={() => editor?.chain().focus().toggleBulletList().run()}
    className={getButtonClass(editor?.isActive("bulletList") ?? false)}
  >
    • List
  </button>

  <button
    title="Align Left"
    aria-label="Align Left"
    type="button"
    onClick={() => editor?.chain().focus().setTextAlign("left").run()}
    className={getButtonClass(editor?.isActive({ textAlign: "left" }) ?? false)}
  >
    Left
  </button>

  <button
    title="Align Center"
    aria-label="Align Center"
    type="button"
    onClick={() => editor?.chain().focus().setTextAlign("center").run()}
    className={getButtonClass(editor?.isActive({ textAlign: "center" }) ?? false)}
  >
    Center
  </button>

  <button
    title="Align Right"
    aria-label="Align Right"
    type="button"
    onClick={() => editor?.chain().focus().setTextAlign("right").run()}
    className={getButtonClass(editor?.isActive({ textAlign: "right" }) ?? false)}
  >
    Right
  </button>

  <button
    title="Heading 1"
    aria-label="Heading 1"
    type="button"
    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
    className={getButtonClass(editor?.isActive("heading", { level: 1 }) ?? false )}
  >
    H1
  </button>

  <button
    title="Heading 2"
    aria-label="Heading 2"
    type="button"
    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
    className={getButtonClass(editor?.isActive("heading", { level: 2 }) ?? false )}
  >
    H2
  </button>
</div>

      <div>
        {editor ? (
          <EditorContent editor={editor} />
        ) : (
          <div className="text-sm text-muted-foreground p-2 border rounded bg-muted">
            Loading editor...
          </div>
        )}
        {error && <p className="errorText">{error.message}</p>}
      </div>
    </div>
  )
}

export default TextAreaInput;
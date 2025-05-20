/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  Quote,
  Code,
  Copy,
  Check,
} from "lucide-react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Create lowlight instance with common languages
const lowlight = createLowlight(common);

// Define available languages for the dropdown
const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "markdown", label: "Markdown" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "bash", label: "Bash" },
  { value: "sql", label: "SQL" },
];

// Custom extension for code blocks with line numbers
const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement("div");
      dom.classList.add("code-block-with-line-numbers");

      const pre = document.createElement("pre");
      pre.setAttribute("spellcheck", "false");

      const code = document.createElement("code");

      // Add line numbers container
      const lineNumbers = document.createElement("div");
      lineNumbers.classList.add("line-numbers");

      pre.appendChild(code);
      dom.appendChild(lineNumbers);
      dom.appendChild(pre);

      // Update line numbers when content changes
      const updateLineNumbers = () => {
        const content = node.textContent;
        const lines = content.split("\n");
        const count = lines.length;

        lineNumbers.innerHTML = "";
        for (let i = 1; i <= count; i++) {
          const lineNumber = document.createElement("span");
          lineNumber.textContent = i.toString();
          lineNumbers.appendChild(lineNumber);
        }
      };

      updateLineNumbers();

      return {
        dom,
        contentDOM: code,
        update: (updatedNode) => {
          if (updatedNode.type !== node.type) return false;
          updateLineNumbers();
          return true;
        },
      };
    };
  },
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");
  const [copied, setCopied] = useState(false);

  // Define all callbacks at the top level before using the editor
  // This ensures hooks are called in the same order on every render
  const handleUpdateCodeBlockLanguage = useCallback(
    (editor: any, language: string) => {
      if (editor) {
        editor
          .chain()
          .focus()
          .updateAttributes("codeBlock", { language })
          .run();
      }
    },
    []
  );

  const handleCopyCodeBlock = useCallback((editor: any) => {
    if (editor?.isActive("codeBlock")) {
      const codeBlock = editor.state.selection.$anchor.node();
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.textContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable the default code block
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      CustomCodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
      Placeholder.configure({
        placeholder: "Start writing your blog post...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Enter the image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter the URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const isCodeBlockActive = editor.isActive("codeBlock");

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-1 p-2 border-b">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 1 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          aria-label="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 3 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          aria-label="Bullet List"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          aria-label="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("blockquote")}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          aria-label="Quote"
        >
          <Quote className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("codeBlock")}
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label="Code Block"
        >
          <Code className="h-4 w-4" />
        </Toggle>
        <Button variant="outline" size="sm" onClick={setLink} className="h-8">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={addImage} className="h-8">
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 ml-auto"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Language selector and copy button for code blocks */}
      {isCodeBlockActive && (
        <div className="flex items-center gap-2 p-2 bg-muted border-b">
          <div className="text-sm text-muted-foreground">Language:</div>
          <Select
            value={selectedLanguage}
            onValueChange={(value) => {
              setSelectedLanguage(value);
              handleUpdateCodeBlockLanguage(editor, value);
            }}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopyCodeBlock(editor)}
            className="h-8 ml-auto"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
          </Button>
        </div>
      )}

      <div className="p-4 min-h-[300px]">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none code-editor"
        />
      </div>
    </div>
  );
}

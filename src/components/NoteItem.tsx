import React, { useEffect, useRef, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { StorageManager } from "../storage";
import { Note } from "../types";
import { debounce, formatDate } from "../utils";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (note: Note) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const [isDeleting, setIsDeleting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const storageManager = StorageManager.getInstance();

  // Debounced save function
  const debouncedSave = debounce(async (newContent: string) => {
    if (newContent.trim() !== note.content) {
      const updatedNote: Note = {
        ...note,
        content: newContent.trim(),
        updatedAt: Date.now(),
      };
      await storageManager.updateNote(updatedNote);
      onUpdate(updatedNote);
    }
  }, 500);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    debouncedSave(newContent);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (content.trim() === "") {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(async () => {
      await storageManager.deleteNote(note.id);
      onDelete(note.id);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false);
      setContent(note.content);
    } else if (e.key === "Enter" && e.metaKey) {
      setIsEditing(false);
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "note-yellow":
        return "bg-note-yellow";
      case "note-blue":
        return "bg-note-blue";
      case "note-green":
        return "bg-note-green";
      case "note-pink":
        return "bg-note-pink";
      case "note-purple":
        return "bg-note-purple";
      case "note-orange":
        return "bg-note-orange";
      case "note-red":
        return "bg-note-red";
      case "note-teal":
        return "bg-note-teal";
      case "note-indigo":
        return "bg-note-indigo";
      case "note-cyan":
        return "bg-note-cyan";
      case "note-lime":
        return "bg-note-lime";
      case "note-emerald":
        return "bg-note-emerald";
      case "note-rose":
        return "bg-note-rose";
      case "note-violet":
        return "bg-note-violet";
      case "note-sky":
        return "bg-note-sky";
      case "note-amber":
        return "bg-note-amber";
      case "note-slate":
        return "bg-note-slate";
      case "note-stone":
        return "bg-note-stone";
      case "note-zinc":
        return "bg-note-zinc";
      case "note-neutral":
        return "bg-note-neutral";
      default:
        return "bg-note-yellow";
    }
  };

  if (isDeleting) {
    return (
      <div
        className={`animate-slide-out ${getColorClass(
          note.color
        )} rounded-lg p-4 mb-3 shadow-sm border border-gray-200`}
      >
        <div className="text-gray-500 text-sm">Deleting...</div>
      </div>
    );
  }

  return (
    <div
      className={`animate-slide-in ${getColorClass(
        note.color
      )} rounded-lg p-4 mb-3 shadow-sm border border-gray-200 note-item hover:shadow-md transition-all duration-200 cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-600 font-medium">
          {formatDate(note.updatedAt)}
        </span>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded"
          title="Delete note"
        >
          <HiOutlineTrash className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none resize-none focus:outline-none text-gray-800 placeholder-gray-500"
          placeholder="Start typing your note..."
          rows={Math.max(3, content.split("\n").length)}
          style={{ minHeight: "60px" }}
        />
      ) : (
        <div className="text-gray-800 whitespace-pre-wrap break-words cursor-text">
          {content || <span className="text-gray-500 italic">Empty note</span>}
        </div>
      )}
    </div>
  );
};

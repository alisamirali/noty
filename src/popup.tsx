import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { NoteItem } from "./components/NoteItem";
import { StorageToggle } from "./components/StorageToggle";
import "./popup.css";
import { StorageManager } from "./storage";
import { Note, StorageMode } from "./types";
import { generateId, getRandomColor } from "./utils";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [storageMode, setStorageMode] = useState<StorageMode>("persistent");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const storageManager = StorageManager.getInstance();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const [loadedNotes, mode] = await Promise.all([
        storageManager.getNotes(),
        storageManager.getStorageMode(),
      ]);
      setNotes(loadedNotes);
      setStorageMode(mode);
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async () => {
    setIsAddingNote(true);
    const newNote: Note = {
      id: generateId(),
      content: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      color: getRandomColor(),
    };

    try {
      await storageManager.addNote(newNote);
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const handleStorageModeChange = async (newMode: StorageMode) => {
    try {
      await storageManager.setStorageMode(newMode);
      setStorageMode(newMode);

      // Reload notes from the new storage
      const newNotes = await storageManager.getNotes();
      setNotes(newNotes);
    } catch (error) {
      console.error("Error changing storage mode:", error);
    }
  };

  const handleClearAll = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all notes? This action cannot be undone."
      )
    ) {
      try {
        await storageManager.clearAllNotes();
        setNotes([]);
      } catch (error) {
        console.error("Error clearing notes:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img src="icons/quill-pen.png" alt="Noty" className="w-6 h-6" />
          <h1 className="text-lg font-semibold text-gray-800">Noty</h1>
        </div>
        <div className="flex items-center space-x-2">
          {notes.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded"
              title="Clear all notes"
            >
              <HiOutlineTrash className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Storage Toggle */}
      <StorageToggle
        mode={storageMode}
        onModeChange={handleStorageModeChange}
      />

      {/* Notes Container */}
      <div className="notes-container max-h-96 overflow-y-auto p-4">
        {notes.length === 0 ? (
          <div className="text-center py-8">
            <img
              src="icons/quill-pen.png"
              alt="Noty"
              className="w-12 h-12 mx-auto mb-4 opacity-30"
            />
            <p className="text-gray-500 text-sm">No notes yet</p>
            <p className="text-gray-400 text-xs mt-1">
              Click "New Note" to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer with New Note Button */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={handleAddNote}
          disabled={isAddingNote}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isAddingNote ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <HiOutlinePlus className="w-4 h-4" aria-hidden="true" />
              <span>New Note</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// Initialize the app
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);

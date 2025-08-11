import { Note, StorageMode } from "./types";

const STORAGE_KEY = "quickNotes";

export class StorageManager {
  private static instance: StorageManager;
  private currentMode: StorageMode = "persistent";

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  async getStorageMode(): Promise<StorageMode> {
    try {
      const result = await chrome.storage.local.get("storageMode");
      return result.storageMode || "persistent";
    } catch (error) {
      console.error("Error getting storage mode:", error);
      return "persistent";
    }
  }

  async setStorageMode(mode: StorageMode): Promise<void> {
    this.currentMode = mode;
    try {
      await chrome.storage.local.set({ storageMode: mode });
    } catch (error) {
      console.error("Error setting storage mode:", error);
    }
  }

  async getNotes(): Promise<Note[]> {
    try {
      const mode = await this.getStorageMode();
      this.currentMode = mode;

      if (mode === "session") {
        const sessionData = sessionStorage.getItem(STORAGE_KEY);
        return sessionData ? JSON.parse(sessionData) : [];
      } else {
        const result = await chrome.storage.local.get(STORAGE_KEY);
        return result[STORAGE_KEY] || [];
      }
    } catch (error) {
      console.error("Error getting notes:", error);
      return [];
    }
  }

  async saveNotes(notes: Note[]): Promise<void> {
    try {
      if (this.currentMode === "session") {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } else {
        await chrome.storage.local.set({ [STORAGE_KEY]: notes });
      }
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  }

  async addNote(note: Note): Promise<void> {
    const notes = await this.getNotes();
    notes.unshift(note); // Add to beginning
    await this.saveNotes(notes);
  }

  async updateNote(updatedNote: Note): Promise<void> {
    const notes = await this.getNotes();
    const index = notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      notes[index] = updatedNote;
      // Move to top since it was updated
      notes.unshift(notes.splice(index, 1)[0]);
      await this.saveNotes(notes);
    }
  }

  async deleteNote(noteId: string): Promise<void> {
    const notes = await this.getNotes();
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    await this.saveNotes(filteredNotes);
  }

  async clearAllNotes(): Promise<void> {
    await this.saveNotes([]);
  }
}

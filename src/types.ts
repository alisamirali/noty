export interface Note {
  id: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  color: string;
}

export interface StorageData {
  notes: Note[];
  storageMode: "persistent" | "session";
}

export type StorageMode = "persistent" | "session";

export interface NoteCreateDTO {
  /** Plain text */
  title: string;
  /** in HTML */
  body: string;
}

export interface Note extends NoteCreateDTO {
  id: number;
  /** ISO string */
  createdAt: string;
}

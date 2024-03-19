import { Note, NoteCreateDTO } from "./model";

const storageKey = "list";

export const noteService = {
  getList(): Promise<Note[]> {
    return new Promise((res) => {
      setTimeout(() => {
        res(
          JSON.parse(
            localStorage.getItem(storageKey) ??
              '[{"title":"Title","body":"body","createdAt":"2024-03-19T12:51:03.355Z","id":1}]',
          ),
        );
      }, 500);
    });
  },
  updateById(id: number, data: NoteCreateDTO): void {
    const newState: Note[] = JSON.parse(localStorage.getItem("list") ?? "[]");
    newState.forEach((n, i) => {
      if (n.id !== id) return;
      newState[i] = {
        ...newState[i],
        title: data.title,
        body: data.body,
      };
    });
    localStorage.setItem(storageKey, JSON.stringify(newState));
  },
  deleteById(id: number): void {
    const currentState: Note[] = JSON.parse(
      localStorage.getItem("list") ?? "[]",
    );
    const newState = currentState.filter((n) => n.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(newState));
  },
  create(data: NoteCreateDTO) {
    const newState: Note[] = JSON.parse(localStorage.getItem("list") ?? "[]");
    newState.push({
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(storageKey, JSON.stringify(newState));
  },
};

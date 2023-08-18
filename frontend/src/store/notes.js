import { defineStore } from "pinia";

export const noteStore = defineStore("noteStore", {
  state: () => ({
    notes: [],
    rowLayout: null,
    menuItems: [
      {
        linkName: "notes",
        name: "Notes",
        icon: "fa-solid fa-table-list",
      },
      {
        linkName: "reminder",
        name: "Reminders",
        icon: "fa-solid fa-bell",
      },
      { linkName: "starred", name: "Starred", icon: "fa-solid fa-star" },
      { linkName: "weather", name: "Weather", icon: "fa-solid fa-sun" },
      { linkName: "map", name: "Map", icon: "fa-solid fa-map" },
      { linkName: "chat", name: "Chat", icon: "fa-solid fa-comments" },
    ],
  }),

  getters: {
    starNotes(state) {
      return state.notes.filter((note) => note.starred);
    },

    starNotesLength(state) {
      return state.notes.filter((note) => note.starred).length;
    },

    notesLength(state) {
      return state.notes.length;
    },
  },

  actions: {
    initCount(id, count) {
      this.menuItems.find((el) => el.linkName === id).count = count;
    },

    updateLocalStorage() {
      localStorage.notes = JSON.stringify(this.notes);
      localStorage.noteLayout = JSON.stringify(this.rowLayout);
    },

    initStoreNotes() {
      if (localStorage.notes) {
        this.notes = JSON.parse(localStorage.notes);
      } else {
        this.notes = [];
      }

      if (localStorage.noteLayout) {
        this.rowLayout = JSON.parse(localStorage.noteLayout);
      } else {
        this.rowLayout = false;
      }
    },

    editNoteAction(note) {
      let findNote = this.notes.find((el) => el === note);
      findNote.time = new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      findNote.edited = true;

      this.updateLocalStorage();
    },

    addNoteAction(note) {
      this.notes.unshift({
        ...note,
        starred: false,
        time: new Date().toLocaleString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      });

      this.initCount("notes", this.notes.length);

      this.updateLocalStorage();
    },

    deleteNoteAction(note) {
      const noteToDelete = this.notes.map((el) => el).indexOf(note);
      this.notes.splice(noteToDelete, 1);
      this.updateLocalStorage();
    },

    updateNoteAction() {
      this.updateLocalStorage();
    },

    toggleLayoutAction() {
      this.rowLayout = !this.rowLayout;
      this.updateLocalStorage();
    },
  },
});

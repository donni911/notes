import { defineStore } from "pinia";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../services/tasksApi";

import debounce from "../modules/helpers/debounce.js";

import { setAuthToken } from "../services/http.js";

export const noteStore = defineStore("noteStore", {
  state: () => ({
    notes: [],
    isLoading: false,
    rowLayout: false,
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
    initVisibilityNotes() {
      this.rowLayout = JSON.parse(localStorage.getItem("noteLayout")) || false;
    },

    // TOGGLE LAYOUT VISIBILITY
    toggleLayoutAction() {
      this.rowLayout = !this.rowLayout;
      localStorage.noteLayout = JSON.stringify(this.rowLayout);
    },

    initCount(id, count) {
      this.menuItems.find((el) => el.linkName === id).count = count;
    },

    // GET
    async initStoreNotes() {
      if (this.notes.length) {
        this.isLoading = false;
        return;
      } else {
        this.isLoading = true;
        setAuthToken(localStorage.getItem("jwt"));
        this.notes = await getTasks();
        this.isLoading = false;
      }
    },
    //GET BY TEXT
    getByText: debounce(async function (query) {
      this.notes = await getTasks(query);
    }, 300),
    // PATCH
    async editNoteAction(note) {
      const newNote = await updateTask(note._id, note);
      return newNote;
    },
    //POST
    async addNoteAction(note) {
      const updatedTask = {
        ...note,
        starred: false,
      };
      const res = await addTask(updatedTask);

      this.notes.push(res);
    },
    // DELETE
    async deleteNoteAction(note) {
      try {
        const noteToDelete = this.notes.find((el) => el._id === note._id);

        this.notes.splice(this.notes.indexOf(noteToDelete), 1);

        await deleteTask(note._id);
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    },
  },
});

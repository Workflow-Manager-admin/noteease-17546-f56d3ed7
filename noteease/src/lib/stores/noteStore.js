// NoteEase store for managing notes state
import { writable, derived } from 'svelte/store';

// Load notes from localStorage or initialize with empty array
const storedNotes = typeof localStorage !== 'undefined' 
  ? JSON.parse(localStorage.getItem('notes') || '[]') 
  : [];

// Create the writable store
const notesStore = writable(storedNotes);

// Create derived store for filtered notes
const createFilteredNotesStore = () => {
  // Store for search text
  const searchText = writable('');
  
  // Store for selected category filter
  const selectedCategory = writable('');

  // Derived store that filters notes based on search text and category
  const filteredNotes = derived(
    [notesStore, searchText, selectedCategory],
    ([$notes, $searchText, $selectedCategory]) => {
      return $notes.filter(note => {
        // Filter by search text
        const matchesSearch = $searchText === '' || 
          note.title.toLowerCase().includes($searchText.toLowerCase()) || 
          note.content.toLowerCase().includes($searchText.toLowerCase());
        
        // Filter by category
        const matchesCategory = $selectedCategory === '' || note.category === $selectedCategory;
        
        return matchesSearch && matchesCategory;
      });
    }
  );

  return {
    subscribe: filteredNotes.subscribe,
    setSearchText: (text) => searchText.set(text),
    setCategory: (category) => selectedCategory.set(category),
    reset: () => {
      searchText.set('');
      selectedCategory.set('');
    }
  };
};

// Create the filtered notes store
const filteredNotes = createFilteredNotesStore();

// Create a store for all unique categories
const categories = derived(
  notesStore,
  $notes => {
    const categoriesSet = new Set($notes.map(note => note.category).filter(Boolean));
    return Array.from(categoriesSet);
  }
);

// Helper function to save notes to localStorage
const saveToLocalStorage = (notes) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('notes', JSON.stringify(notes));
  }
};

// Create the main notes store with CRUD operations
const notesApi = {
  subscribe: notesStore.subscribe,
  
  // Create a new note
  addNote: (note) => {
    notesStore.update(notes => {
      // Generate a unique ID
      const id = Date.now().toString();
      
      // Create new note with timestamp
      const newNote = {
        id,
        title: note.title,
        content: note.content,
        category: note.category || '',
        createdAt: new Date().toISOString(),
      };
      
      const updatedNotes = [...notes, newNote];
      saveToLocalStorage(updatedNotes);
      return updatedNotes;
    });
  },
  
  // Update an existing note
  updateNote: (id, updatedNote) => {
    notesStore.update(notes => {
      const updatedNotes = notes.map(note => 
        note.id === id ? { ...note, ...updatedNote } : note
      );
      saveToLocalStorage(updatedNotes);
      return updatedNotes;
    });
  },
  
  // Delete a note
  deleteNote: (id) => {
    notesStore.update(notes => {
      const updatedNotes = notes.filter(note => note.id !== id);
      saveToLocalStorage(updatedNotes);
      return updatedNotes;
    });
  },
  
  // Get a single note by ID
  getNote: (id) => {
    let result = null;
    notesStore.subscribe(notes => {
      result = notes.find(note => note.id === id);
    })();
    return result;
  }
};

export { notesApi, filteredNotes, categories };

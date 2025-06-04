<script>
  /**
   * Main Container for NoteEase
   * 
   * A simple and intuitive notes application that allows users to create, edit,
   * and organize their personal notes with features for categorization and search.
   */
  import { onMount } from 'svelte';
  import { notesApi, filteredNotes, categories } from '$lib/stores/noteStore';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import CategoryChip from '$lib/components/CategoryChip.svelte';
  import NoteCard from '$lib/components/NoteCard.svelte';
  import NoteEditor from '$lib/components/NoteEditor.svelte';
  import FloatingActionButton from '$lib/components/FloatingActionButton.svelte';
  
  // Import global styles
  import '$lib/styles.css';
  
  // State for search and filtering
  let searchText = '';
  let selectedCategory = '';
  
  // State for note editor
  let isEditorOpen = false;
  let currentNote = null;
  
  // Handle search input
  function handleSearch(event) {
    searchText = event.detail;
    filteredNotes.setSearchText(searchText);
  }
  
  // Handle category selection
  function handleCategorySelect(event) {
    const category = event.detail;
    
    // Toggle selection - if already selected, clear it
    if (selectedCategory === category) {
      selectedCategory = '';
    } else {
      selectedCategory = category;
    }
    
    filteredNotes.setCategory(selectedCategory);
  }
  
  // Open editor to create a new note
  function handleAddNote() {
    currentNote = null; // No existing note to edit
    isEditorOpen = true;
  }
  
  // Open editor to edit an existing note
  function handleEditNote(event) {
    currentNote = event.detail;
    isEditorOpen = true;
  }
  
  // Handle save note (create or update)
  function handleSaveNote(event) {
    const noteData = event.detail;
    
    if (noteData.id) {
      // Update existing note
      notesApi.updateNote(noteData.id, {
        title: noteData.title,
        content: noteData.content,
        category: noteData.category
      });
    } else {
      // Create new note
      notesApi.addNote({
        title: noteData.title,
        content: noteData.content,
        category: noteData.category
      });
    }
    
    isEditorOpen = false;
  }
  
  // Handle delete note
  function handleDeleteNote(event) {
    const noteId = event.detail;
    notesApi.deleteNote(noteId);
  }
  
  // Initialize default notes if the store is empty
  onMount(() => {
    // Subscribe to the notes store
    const unsubscribe = notesApi.subscribe(notes => {
      // If there are no notes, add default notes
      if (notes.length === 0) {
        const defaultNotes = [
          {
            title: "Welcome to NoteEase",
            content: "This is a simple note-taking application. You can create, edit, delete, and search for notes. Try it out!",
            category: "Important"
          },
          {
            title: "How to use categories",
            content: "Assign categories to your notes for better organization. Click on category chips to filter notes by category.",
            category: "Tips"
          },
          {
            title: "Search functionality",
            content: "Use the search bar at the top to find notes by title or content. The results update as you type.",
            category: "Tips"
          }
        ];
        
        // Add default notes to the store
        defaultNotes.forEach(note => {
          notesApi.addNote(note);
        });
      }
    });
    
    // Clean up subscription on component destroy
    return unsubscribe;
  });
</script>

<svelte:head>
  <title>NoteEase - Simple Note Taking</title>
</svelte:head>

<main class="note-app">
  <header class="app-header">
    <h1>NoteEase</h1>
    <p>Simple note taking app</p>
  </header>

  <section class="search-section">
    <SearchBar value={searchText} on:search={handleSearch} />
  </section>
  
  <section class="categories-section">
    <div class="categories-wrapper">
      <CategoryChip 
        category="" 
        selected={selectedCategory === ''} 
        on:select={handleCategorySelect} 
      />
      
      {#each $categories as category}
        <CategoryChip 
          {category} 
          selected={selectedCategory === category} 
          on:select={handleCategorySelect} 
        />
      {/each}
    </div>
  </section>

  <section class="notes-section">
    {#if $filteredNotes.length > 0}
      <div class="notes-grid">
        {#each $filteredNotes as note (note.id)}
          <NoteCard 
            {note} 
            on:edit={handleEditNote} 
            on:delete={handleDeleteNote}
          />
        {/each}
      </div>
    {:else}
      <div class="empty-state">
        {#if searchText || selectedCategory}
          <p>No notes match your filters</p>
          <button 
            class="btn btn-primary" 
            on:click={() => {
              searchText = '';
              selectedCategory = '';
              filteredNotes.reset();
            }}
          >
            Clear filters
          </button>
        {:else}
          <p>No notes yet. Create your first note!</p>
          <button class="btn btn-primary" on:click={handleAddNote}>
            Create Note
          </button>
        {/if}
      </div>
    {/if}
  </section>
  
  <FloatingActionButton on:click={handleAddNote} />
  
  <NoteEditor 
    note={currentNote} 
    isOpen={isEditorOpen}
    on:close={() => isEditorOpen = false}
    on:save={handleSaveNote}
  />
</main>

<style>
  .note-app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: var(--spacing-md);
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .app-header {
    text-align: center;
    margin-bottom: var(--spacing-lg);
  }
  
  .app-header h1 {
    color: var(--primary-color);
    font-size: 2.5rem;
    margin-bottom: var(--spacing-xs);
  }
  
  .app-header p {
    color: var(--gray);
    font-size: var(--font-size-md);
  }
  
  .search-section {
    margin-bottom: var(--spacing-md);
  }
  
  .categories-section {
    margin-bottom: var(--spacing-lg);
    overflow-x: auto;
  }
  
  .categories-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: var(--spacing-xs) 0;
  }
  
  .notes-section {
    flex: 1;
  }
  
  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-md);
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--spacing-xl) 0;
    color: var(--gray);
  }
  
  .empty-state p {
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-lg);
  }
  
  @media (max-width: 768px) {
    .notes-grid {
      grid-template-columns: 1fr;
    }
    
    .app-header h1 {
      font-size: 2rem;
    }
  }
</style>

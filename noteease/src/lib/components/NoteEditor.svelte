<script>
  /**
   * NoteEditor component - Modal for creating and editing notes
   */
  import { createEventDispatcher } from 'svelte';
  import { categories } from '../stores/noteStore';
  
  // Props
  /**
   * @type {import('../types').Note | null}
   */
  export let note = null;
  export let isOpen = false;
  
  // Local state
  let noteForm = {
    id: '',
    title: '',
    content: '',
    category: ''
  };
  
  // Reset form when opening the editor
  $: if (isOpen) {
    if (note) {
      // Editing existing note
      noteForm = {
        id: note.id,
        title: note.title,
        content: note.content,
        category: note.category
      };
    } else {
      // Creating new note
      noteForm = {
        id: '',
        title: '',
        content: '',
        category: ''
      };
    }
  }
  
  // New category input
  let newCategory = '';
  let showNewCategoryInput = false;
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Close the modal
  function closeModal() {
    isOpen = false;
    dispatch('close');
  }
  
  // Handle form submission
  function handleSubmit() {
    // Validate form
    if (!noteForm.title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    // If new category is being added
    if (showNewCategoryInput && newCategory.trim()) {
      noteForm.category = newCategory.trim();
    }
    
    // Submit form
    dispatch('save', noteForm);
    closeModal();
  }
  
  // Handle category selection
  function handleCategoryChange(e) {
    const value = e.target.value;
    if (value === 'new') {
      showNewCategoryInput = true;
    } else {
      showNewCategoryInput = false;
      noteForm.category = value;
    }
  }
  
  // Handle click outside to close
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
  
  // Handle escape key to close
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if isOpen}
  <div class="modal-backdrop" on:click={handleBackdropClick}>
    <div class="modal-content" role="dialog" aria-labelledby="note-editor-title">
      <div class="modal-header">
        <h2 id="note-editor-title">{note ? 'Edit Note' : 'Create Note'}</h2>
        <button class="btn-close" on:click={closeModal} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
          <label for="note-title">Title</label>
          <input
            type="text"
            id="note-title"
            bind:value={noteForm.title}
            placeholder="Enter note title"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="note-content">Content</label>
          <textarea
            id="note-content"
            bind:value={noteForm.content}
            placeholder="Enter note content"
            rows="6"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label for="note-category">Category</label>
          <select 
            id="note-category" 
            on:change={handleCategoryChange}
            value={noteForm.category}
          >
            <option value="">No category</option>
            {#each $categories as category}
              <option value={category}>{category}</option>
            {/each}
            <option value="new">+ Add new category</option>
          </select>
        </div>
        
        {#if showNewCategoryInput}
          <div class="form-group">
            <label for="new-category">New Category</label>
            <input
              type="text"
              id="new-category"
              bind:value={newCategory}
              placeholder="Enter new category name"
            />
          </div>
        {/if}
        
        <div class="modal-footer">
          <button type="button" class="btn" on:click={closeModal}>Cancel</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: var(--card-background);
    border-radius: var(--border-radius-md);
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
  }
  
  .modal-header h2 {
    margin: 0;
    font-size: var(--font-size-xl);
    color: var(--primary-color);
  }
  
  .btn-close {
    background: transparent;
    border: none;
    color: var(--gray-dark);
    cursor: pointer;
    display: flex;
  }
  
  form {
    padding: var(--spacing-md);
  }
  
  .form-group {
    margin-bottom: var(--spacing-md);
  }
  
  label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: var(--font-weight-medium);
    color: var(--gray-dark);
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-md);
    color: var(--text-color);
    background-color: var(--secondary-color);
  }
  
  textarea {
    resize: vertical;
  }
  
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
  }
</style>

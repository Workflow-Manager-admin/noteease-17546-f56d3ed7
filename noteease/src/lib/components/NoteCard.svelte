<script>
  /**
   * NoteCard component - Displays a single note in the list view
   */
  import { createEventDispatcher } from 'svelte';
  
  // Props
  /** @type {import('../types').Note} */
  export let note;
  
  // Event dispatcher to notify parent components
  const dispatch = createEventDispatcher();
  
  // Truncate text to a specific length with ellipsis
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  // Handle edit click
  const handleEdit = () => {
    dispatch('edit', note);
  };
  
  // Handle delete click
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      dispatch('delete', note.id);
    }
  };
</script>

<div class="note-card card">
  <div class="note-header">
    <h3 class="note-title">{note.title}</h3>
    <div class="note-actions">
      <button class="btn-icon" on:click={handleEdit} aria-label="Edit note">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>
      <button class="btn-icon" on:click={handleDelete} aria-label="Delete note">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  </div>
  
  {#if note.category}
    <div class="note-category">
      <span class="category-chip">{note.category}</span>
    </div>
  {/if}
  
  <p class="note-content">
    {truncateText(note.content)}
  </p>
  
  <div class="note-footer">
    <span class="note-date">{formatDate(note.createdAt)}</span>
  </div>
</div>

<style>
  .note-card {
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .note-card:hover {
    transform: translateY(-2px);
  }
  
  .note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
  }
  
  .note-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    margin: 0;
  }
  
  .note-actions {
    display: flex;
    gap: var(--spacing-sm);
  }
  
  .btn-icon {
    background: transparent;
    border: none;
    color: var(--gray-dark);
    cursor: pointer;
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-xs);
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .btn-icon:hover {
    background-color: var(--gray-light);
    color: var(--primary-color);
  }
  
  .note-category {
    margin-bottom: var(--spacing-sm);
  }
  
  .category-chip {
    font-size: var(--font-size-xs);
    background-color: var(--primary-color);
    color: white;
    padding: 2px var(--spacing-sm);
    border-radius: 12px;
    display: inline-block;
  }
  
  .note-content {
    color: var(--gray-dark);
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-md);
  }
  
  .note-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-xs);
    color: var(--gray);
  }
  
  .note-date {
    font-style: italic;
  }
</style>

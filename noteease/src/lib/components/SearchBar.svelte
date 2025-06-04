<script>
  /**
   * SearchBar component - Search input for filtering notes by text
   */
  import { createEventDispatcher } from 'svelte';
  
  // Props
  /** @type {string} */
  export let value = '';
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Handle input changes
  function handleInput(event) {
    value = event.target.value;
    dispatch('search', value);
  }
  
  // Clear search
  function clearSearch() {
    value = '';
    dispatch('search', '');
  }
</script>

<div class="search-bar">
  <div class="search-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </div>
  
  <input
    type="text"
    placeholder="Search notes..."
    bind:value
    on:input={handleInput}
    aria-label="Search notes"
  />
  
  {#if value}
    <button class="clear-button" on:click={clearSearch} aria-label="Clear search">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  {/if}
</div>

<style>
  .search-bar {
    display: flex;
    align-items: center;
    background-color: var(--card-background);
    border-radius: var(--border-radius-md);
    padding: 0 var(--spacing-sm);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-md);
    position: relative;
  }
  
  .search-icon {
    display: flex;
    align-items: center;
    color: var(--gray);
    padding: var(--spacing-sm);
  }
  
  input {
    flex: 1;
    border: none;
    padding: var(--spacing-md) var(--spacing-sm);
    font-size: var(--font-size-md);
    color: var(--text-color);
    background: transparent;
    outline: none;
  }
  
  input::placeholder {
    color: var(--gray);
  }
  
  .clear-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--gray);
    padding: var(--spacing-sm);
    cursor: pointer;
  }
  
  .clear-button:hover {
    color: var(--primary-color);
  }
</style>

<script>
  /**
   * CategoryChip component - Displays category filters at the top of the main view
   */
  import { createEventDispatcher } from 'svelte';
  
  // Props
  /** @type {string} */
  export let category = '';
  /** @type {boolean} */
  export let selected = false;
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Handle click to toggle selection
  function handleClick() {
    dispatch('select', category);
  }
</script>

<button 
  class="category-chip" 
  class:selected
  on:click={handleClick}
  aria-pressed={selected}
>
  {category || 'All'}
</button>

<style>
  .category-chip {
    font-size: var(--font-size-sm);
    background-color: var(--gray-light);
    color: var(--text-color);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: 16px;
    margin-right: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
    border: 1px solid var(--border-color);
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: var(--font-weight-normal);
  }
  
  .category-chip:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  .category-chip.selected {
    background-color: var(--primary-color);
    color: white;
    font-weight: var(--font-weight-medium);
  }
</style>

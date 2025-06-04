import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('NoteEase Main Container', () => {
  test('should render the app header', () => {
    render(Page);
    expect(screen.getByText('NoteEase')).toBeInTheDocument();
    expect(screen.getByText('Simple note taking app')).toBeInTheDocument();
  });

  test('should render the search bar', () => {
    render(Page);
    expect(screen.getByPlaceholderText('Search notes...')).toBeInTheDocument();
  });

  test('should render the "All" category filter by default', () => {
    render(Page);
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  test('should render the floating action button', () => {
    render(Page);
    expect(screen.getByLabelText('Add new note')).toBeInTheDocument();
  });
});

# NoteEase

A simple and intuitive notes application built with Svelte that allows users to create, edit, and organize their personal notes.

## Features

- **Create Notes**: Add new notes with a title and content.
- **Edit Notes**: Modify existing notes.
- **Delete Notes**: Remove notes you no longer need.
- **Categorize Notes**: Assign categories to notes for better organization.
- **Search Notes**: Find notes quickly by searching titles and content.
- **Responsive Design**: Works on desktop and mobile devices.
- **Persistent Storage**: Notes are saved to localStorage and persist between sessions.

## Tech Stack

- **Frontend**: Svelte + SvelteKit
- **Language**: JavaScript (ES6+)
- **State Management**: Svelte stores
- **Storage**: Browser localStorage
- **Styling**: CSS custom properties and component-scoped styles

## Color Scheme

- **Primary**: #4A90E2 (Blue)
- **Secondary**: #FFFFFF (White)
- **Accent**: #F5A623 (Orange/Yellow)
- **Theme**: Light

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Development Server

```bash
npm run dev

# Or to open in browser automatically:
npm run dev -- --open
```

### Building for Production

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

## Testing

Run the tests:

```bash
npm run test
```

## Project Structure

- `src/lib/components/` - Reusable UI components
- `src/lib/stores/` - Svelte stores for state management
- `src/routes/` - SvelteKit routes (pages)
- `src/lib/styles.css` - Global styles and CSS variables

## Usage

1. **View Notes**: Notes are displayed in a grid on the main page.
2. **Create Note**: Click the "+" floating action button to create a new note.
3. **Edit Note**: Click the edit icon on a note to modify it.
4. **Delete Note**: Click the delete icon to remove a note.
5. **Categorize**: Assign categories when creating or editing notes.
6. **Filter by Category**: Click on a category chip at the top to filter notes.
7. **Search**: Use the search bar to find notes by title or content.

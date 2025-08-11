# Noty Chrome Extension

A modern, clean Chrome extension for creating and managing sticky notes directly from your browser. Built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ **Clean, Modern UI** - Beautiful interface with smooth animations
- 📝 **Quick Note Creation** - Create notes with a single click
- ✏️ **Inline Editing** - Single-click to edit notes directly
- 🗑️ **Easy Deletion** - Delete notes with the trash icon
- 💾 **Dual Storage Modes** - Choose between persistent and session storage
- 🎨 **Colorful Notes** - Each note gets a random pastel color
- 📱 **Mobile Friendly** - Responsive design for small windows
- ⚡ **Auto-save** - Notes save automatically as you type
- 📅 **Smart Timestamps** - Shows relative time (e.g., "2h ago")
- 🖋️ **Beautiful Quill Pen Icon** - Elegant, professional branding

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Development Setup

1. **Clone or download the project**

   ```bash
   cd noty
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the extension**

   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project

**Quick Installation:**

- **macOS/Linux**: Run `./install.sh` for guided installation
- **Windows**: Run `install.bat` for guided installation

### Development Mode

For development with hot reloading:

```bash
npm run dev
```

## Usage

1. **Create a Note**: Click the "New Note" button at the bottom of the popup
2. **Edit a Note**: Single-click on any note to edit it inline
3. **Delete a Note**: Click the trash icon on any note
4. **Switch Storage Mode**: Use the toggle in the header to switch between:
   - **Persistent Mode**: Notes are saved permanently using Chrome's storage
   - **Session Mode**: Notes are cleared when you close the browser

## Storage Modes

### Persistent Mode (Default)

- Notes are stored using Chrome's `storage.local` API
- Notes persist between browser sessions
- Notes are synced across devices if you're signed into Chrome

### Session Mode

- Notes are stored in `sessionStorage`
- Notes are cleared when the browser is closed
- Perfect for temporary notes or sensitive information

## Technical Details

### Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Webpack** - Bundling
- **Chrome Extension APIs** - Storage and extension functionality

### Project Structure

```
src/
├── components/          # React components
│   ├── NoteItem.tsx    # Individual note component
│   └── StorageToggle.tsx # Storage mode toggle
├── icons/              # Extension icons
│   └── quill-pen.png   # Main extension icon
├── manifest.json       # Chrome extension manifest
├── popup.html         # Popup HTML template
├── popup.tsx          # Main React app
├── popup.css          # Styles with Tailwind
├── storage.ts         # Storage management
├── types.ts           # TypeScript type definitions
├── utils.ts           # Utility functions
└── background.js      # Background script
```

### Key Features Implementation

- **Auto-save**: Uses debounced function to save notes 500ms after typing stops
- **Smooth Animations**: CSS transitions and keyframe animations for adding/removing notes
- **Responsive Design**: Mobile-friendly layout that adapts to small windows
- **Error Handling**: Comprehensive error handling for storage operations
- **Type Safety**: Full TypeScript coverage for better development experience

## Available Scripts

```bash
npm run build    # Build for production
npm run dev      # Development mode with hot reloading
npm run clean    # Clean dist folder
```

## Building for Production

```bash
npm run build
```

This creates a `dist` folder with all the files needed for the Chrome extension.

## Customization

### Colors

Edit `tailwind.config.js` to customize the note colors. The extension comes with 20 beautiful pastel colors:

```javascript
colors: {
  // Warm Colors
  'note-yellow': '#fef3c7',
  'note-orange': '#fed7aa',
  'note-red': '#fecaca',
  'note-amber': '#fbbf24',

  // Cool Colors
  'note-blue': '#dbeafe',
  'note-indigo': '#e0e7ff',
  'note-sky': '#e0f2fe',
  'note-cyan': '#cffafe',

  // Green Tones
  'note-green': '#dcfce7',
  'note-lime': '#ecfccb',
  'note-emerald': '#d1fae5',
  'note-teal': '#ccfbf1',

  // Purple/Pink Tones
  'note-purple': '#f3e8ff',
  'note-violet': '#ede9fe',
  'note-rose': '#ffe4e6',
  'note-pink': '#fce7f3',

  // Neutral Tones
  'note-slate': '#f1f5f9',
  'note-stone': '#f5f5f4',
  'note-zinc': '#f4f4f5',
  'note-neutral': '#fafafa',
}
```

### Animations

Customize animations in `tailwind.config.js`:

```javascript
animation: {
  'slide-in': 'slideIn 0.3s ease-out',
  'slide-out': 'slideOut 0.3s ease-in',
}
```

## Troubleshooting

### Common Issues

1. **Extension not loading**: Make sure you've built the project and selected the `dist` folder
2. **Notes not saving**: Check that the extension has storage permissions
3. **Build errors**: Ensure all dependencies are installed with `npm install`

### Development Tips

- Use `npm run dev` for development with file watching
- Check the browser console for any errors
- Use Chrome DevTools to inspect the popup (right-click extension icon → Inspect)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own extensions!

## Future Enhancements

- [ ] Note categories/tags
- [ ] Search functionality
- [ ] Export/import notes
- [ ] Rich text formatting
- [ ] Keyboard shortcuts
- [ ] Note sharing
- [ ] Cloud sync integration

#!/bin/bash

echo "🚀 Noty Chrome Extension Installer"
echo "=================================="

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist folder not found!"
    echo "Please run 'npm run build' first to build the extension."
    exit 1
fi

echo "✅ Extension built successfully!"
echo ""
echo "📋 Installation Instructions:"
echo "1. Open Chrome and go to chrome://extensions/"
echo "2. Enable 'Developer mode' (toggle in top right)"
echo "3. Click 'Load unpacked'"
echo "4. Select the 'dist' folder from this project"
echo ""
echo "🎉 The Quick Notes extension should now appear in your extensions list!"
echo ""
echo "💡 Tips:"
echo "- Click the extension icon in your toolbar to open Noty"
echo "- Single-click notes to edit them"
echo "- Use the storage toggle to switch between persistent and session modes"
echo "- Notes auto-save as you type"
echo "- Each note gets a random pastel color for easy identification"
echo ""
echo "🔧 For development:"
echo "- Run 'npm run dev' for development mode with file watching"
echo "- Run 'npm run build' to rebuild after changes"

# Simple Image Renamer

**Simple Image Renamer** is a minimal but effective Obsidian plugin that was built to solve a personal need: renaming multiple images linked in a note, all at once, with a single command.

Sometimes when working with pasted or dropped-in images, filenames become messy or inconsistent. This plugin renames all linked images in the active note (e.g. `image.png`, `Screenshot 2023-01-01.png`, etc.) to match the note title, appending a number to avoid conflicts. It also updates the links inside the note accordingly.

---

## ✨ What it does

- Detects all image links (`![[...]]` or `![](...)`) in the current note
- Renames the underlying image files to match the note name (e.g. `NoteName1.png`, `NoteName2.jpg`, etc.)
- Updates the links inside the note to reflect the new names
- Preserves aliases (`![[image.png|caption]]`) if present

---

## 💡 Why it exists

This plugin was created to satisfy a very specific workflow need:
> “I want to clean up all the image filenames in a note without doing it one by one.”

Now that this core functionality works reliably, I may expand the plugin over time to include:
- Optional filename formats
- Rename preview before applying
- Folder-scoped renaming
- Undo history or backup

But for now, it does what it needs to — and does it well.

---

## ▶️ How to use it

Once installed and activated, simply:

1. Open the note with images you want to rename
2. Run the command palette (`Cmd+P` / `Ctrl+P`)
3. Select:  
   **`Simple Image Renamer: Rename`**

That’s it — all linked images will be renamed and the links updated.

---

## 📦 Installation (Manual)

1. Download the latest release from the [Releases](https://github.com/YOUR_USERNAME/obsidian-simple-image-renamer/releases) page
2. Extract the folder and place it in `.obsidian/plugins/` inside your vault
3. Activate it in **Settings → Community Plugins**

---

## 🛠 Requirements

- Obsidian v0.12.0 or higher
- Image files must be inside your vault and linked in the current note

---

## 👤 Author

Made by **Nap**  
---

## 📄 License
MIT


const { Plugin, MarkdownView, Notice } = require("obsidian");

module.exports = class RenameImagesPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: "simple-image-renamer",
      name: "Rename",
      checkCallback: (checking) => {
        const mdView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (mdView) {
          if (!checking) this.renameImages(mdView);
          return true;
        }
        return false;
      }
    });
  }

  async renameImages(mdView) {
    const file = mdView.file;
    const content = mdView.editor.getValue();
    const vault = this.app.vault;
    const baseName = file.basename;

    const supportedExtensions = ["png", "jpg", "jpeg", "webp", "gif"];
    const regex = /!\[\[([^\]|]+\.(?:png|jpg|jpeg|webp|gif))(?:\|[^\]]*)?\]\]|!\[[^\]]*\]\(([^)]+\.(?:png|jpg|jpeg|webp|gif))\)/gi;

    const matches = Array.from(content.matchAll(regex));

    const allFiles = vault.getFiles();
    let updatedContent = content;
    let counter = 1;
    let renamedCount = 0;

    for (const match of matches) {
      const fullMatch = match[0];              // ![[Images/file.png]] or ![](Images/file.png)
      const rawPath = match[1] || match[2];    // Images/file.png
      if (!rawPath) continue;

      const ext = rawPath.split(".").pop()?.toLowerCase();
      if (!supportedExtensions.includes(ext)) continue;

      const rawName = rawPath.split("/").pop()?.trim().toLowerCase();
      const imageFile = allFiles.find(f => f.name.toLowerCase() === rawName);


      if (!imageFile) continue;

      let newName = `${baseName}${counter}.${ext}`;
      while (allFiles.some(f => f.name === newName)) {
        counter++;
        newName = `${baseName}${counter}.${ext}`;
      }

      const newPath = imageFile.path.replace(imageFile.name, newName);
      await vault.rename(imageFile, newPath);
      renamedCount++;

      // Construir nuevo enlace manteniendo alias si lo hay
      let updatedMatch = "";
      if (match[1]) {
        const alias = fullMatch.includes("|") ? fullMatch.split("|")[1].replace("]]", "") : "";
        updatedMatch = alias ? `![[${newName}|${alias}]]` : `![[${newName}]]`;
      } else if (match[2]) {
        updatedMatch = `![](${newName})`;
      }

      updatedContent = updatedContent.replace(fullMatch, updatedMatch);
      counter++;
    }

    if (updatedContent !== content) {
      await vault.modify(file, updatedContent);
      new Notice(`Images and Links Updated (${renamedCount}).`);
    } else {
      new Notice("No changes.");
    }

  }
};

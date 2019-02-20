const fs = require('fs');

class GetDeepEntries {
    constructor(rootFolder, fileExtensions = []) {
        // Dependencies
        this.fs = fs;

        this.rootFolder = rootFolder;
        // convert ["css","scss"] to "\.css|\.scss"
        const fileExtensionsRegexWithDot = fileExtensions.map(fileExtension => `\\.${fileExtension}`).join('|');
        this.fileExtensionRegex = new RegExp(`.*(${fileExtensionsRegexWithDot})\$`);
    }

    /**
     * Takes a root folder to look for files matching the regex by traversing through directories
     *
     * @param {string} rootFolder    - The path to the root directory to look for files matching regex
     * @returns {Object[]}           - Array of all files found
     */
    getRecursiveEntries(rootFolder) {
        const { fs, fileExtensionRegex } = this;

        // Bind functions at the top to make the method chaining easier to read
        const addFileMetaHandler = this.addFileMeta.bind(this, rootFolder);
        const deepFolderHandler = this.handleDeepFolders.bind(this, rootFolder);

        return fs.readdirSync(rootFolder)
            .map(addFileMetaHandler)
            .reduce(deepFolderHandler, [])
            .filter(({ name }) => name.match(fileExtensionRegex));
    }

    /**
     * Adds the following meta on the file/folder:
     * 1. path: Full path to the file/folder
     * 2.type: folder or file
     *
     * @param rootFolder             - Path of the root
     * @param name                   - Name of the file/folder
     * @returns {{type: string, name: string, path: string}}
     */
    addFileMeta(rootFolder, name) {
        const { fs } = this;

        const lstat = fs.lstatSync(`${rootFolder}/${name}`);
        const isFolder = lstat.isDirectory();
        const type = isFolder? 'folder' : 'file';
        const path = `${rootFolder}/${name}`;

        return { name, type, path };
    }

    /**
     * If the type of the item is a file, then return it back,
     * if it's a folder, recurse inside and return existing files with sub-folder files
     *
     * @param {string} rootFolder   - The path to the root directory to determine what the next folder path is
     * @param prev                  - reduce Accumulator
     * @param file                  - The item to traverse through if needed
     * @returns {{type: string, name: string, path: string}[]}
     */
    handleDeepFolders(rootFolder, prev, file) {
        if(file.type === 'folder') {
            const subFolderFiles = this.getRecursiveEntries(`${rootFolder}/${file.name}`);
            return prev.concat(subFolderFiles);
        } else {
            prev.push(file);
            return prev;
        }
    }

    *[Symbol.iterator]() {
        const { rootFolder } = this;

        yield* this.getRecursiveEntries(rootFolder).map(({ path }) => path);
    }
}

module.exports = GetDeepEntries;

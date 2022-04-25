const autoSave = ({ data, fileSystem }) => {
  const pathToFile = 'savedFamilyTrees';
  const fileName = 'autosave';
  const dataString = JSON.stringify(data);
  const textEncoding = 'utf8';
  fileSystem.writeFileSync(`${pathToFile}/${fileName}.json`, dataString, textEncoding);
}
export default autoSave;
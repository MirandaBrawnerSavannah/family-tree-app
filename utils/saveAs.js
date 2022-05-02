import autoSave from './autoSave';

const saveAs = (data) => {
  const fileContent = JSON.stringify(data);
  const blob = new Blob([fileContent], { type: 'text/json' });
  const linkToDownload = document.createElement('a');
  linkToDownload.href = URL.createObjectURL(blob);
  linkToDownload.download = 'familyTreeData.json';
  document.body.append(linkToDownload);
  linkToDownload.click();
  document.body.remove(linkToDownload);
  window.location.reload();
};
export default saveAs;

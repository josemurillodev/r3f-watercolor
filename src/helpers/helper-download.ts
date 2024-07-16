export const downloadFromURL = (url: string, name = 'download') => {
  const throwawayLink = document.createElement('a');
  throwawayLink.setAttribute('href', url);
  throwawayLink.setAttribute('download', name);
  throwawayLink.setAttribute('style', 'visibility: hidden; display:none');

  document.body.appendChild(throwawayLink);
  throwawayLink.click();
  setTimeout(() => {
    throwawayLink.remove();
  }, 3e3);
};

export const downloadJson = (obj: any, name = 'doc') => {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(obj)
  )}`;
  const throwawayLink = document.createElement('a');
  throwawayLink.setAttribute('href', dataStr);
  throwawayLink.setAttribute('download', name);
  throwawayLink.setAttribute('style', 'visibility: hidden; display:none');

  document.body.appendChild(throwawayLink);
  throwawayLink.click();
  setTimeout(() => {
    throwawayLink.remove();
  }, 3e3);
};

export const downloadText = (text: string, name = 'file') => {
  const dataStr = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
  const throwawayLink = document.createElement('a');
  throwawayLink.setAttribute('href', dataStr);
  throwawayLink.setAttribute('download', name);
  throwawayLink.setAttribute('style', 'visibility: hidden; display:none');

  document.body.appendChild(throwawayLink);
  throwawayLink.click();
  setTimeout(() => {
    throwawayLink.remove();
  }, 3e3);
};

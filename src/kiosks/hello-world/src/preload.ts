window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: unknown) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text as string;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

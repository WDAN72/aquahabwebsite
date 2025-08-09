const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('footer year', () => {
  it('sets #year to the current year', () => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    const dom = new JSDOM(html, { runScripts: 'outside-only' });
    const { window } = dom;

    // Mock IntersectionObserver for jsdom environment
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    const testYear = 2000;
    jest.useFakeTimers().setSystemTime(new Date(`${testYear}-01-01`));

    // Execute the footer script from index.html
    const scripts = window.document.querySelectorAll('script');
    const footerScript = scripts[scripts.length - 1].textContent;
    window.eval(footerScript);

    const yearEl = window.document.getElementById('year');
    expect(yearEl.textContent).toBe(String(testYear));

    jest.useRealTimers();
  });
});

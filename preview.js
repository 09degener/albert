(() => {
  function start() {
    const root = document.querySelector('.wp');
    if (!root || root.dataset.ready) return;
    root.dataset.ready = 'true';
    const get = (id) => root.querySelector('#wp-' + id);
    const input = get('copies');
    const modal = root.querySelector('dialog');
    const labels = {
      veneer: 'Veneer supplies the button and icon primitives used in Tangram’s toolbar controls.',
      tangram: 'Tangram composes the preview canvas and toolbar alongside optional panels.',
      product: 'The product owns the print document, the copy count and what saving the job does.'
    };
    let saved = 1;
    let zoom = 100;
    const dirty = () => input.value !== String(saved);
    function mark(key) {
      root.dataset.layer = key;
      for (const tab of root.querySelectorAll('[data-wp-layer]')) tab.setAttribute('aria-pressed', String(tab.dataset.wpLayer === key));
      for (const item of root.querySelectorAll('[data-wp-target]')) item.classList.toggle('is-marked', item.dataset.wpTarget === key);
      get('annotation').textContent = labels[key];
    }
    for (const tab of root.querySelectorAll('[data-wp-layer]')) tab.addEventListener('click', () => mark(tab.dataset.wpLayer));
    function refresh() {
      const value = Number(input.value);
      const valid = Number.isInteger(value) && value >= 1 && value <= 999;
      get('state').textContent = valid ? (dirty() ? 'Unsaved changes' : 'All changes saved') : 'Enter a number from 1 to 999.';
      get('state').dataset.dirty = String(dirty());
      get('save').disabled = !valid || !dirty();
      get('less').disabled = valid && value === 1;
      get('more').disabled = valid && value === 999;
      input.setAttribute('aria-invalid', String(!valid));
    }
    function adjust(step) {
      const v = Math.round(Number(input.value)) || 0;
      input.value = String(Math.max(1, Math.min(999, v + step)));
      refresh();
    }
    function adjustZoom(step) {
      zoom = Math.min(175, Math.max(50, zoom + step));
      get('level').textContent = zoom + '%';
      root.style.setProperty('--wp-zoom', String(zoom / 100));
      get('minus').disabled = zoom === 50;
      get('plus').disabled = zoom === 175;
    }
    function finish(message) {
      get('open').hidden = true;
      get('close').hidden = true;
      get('closed').hidden = false;
      get('result').textContent = message + ' Saved copies: ' + saved + '.';
      get('reopen').focus();
    }
    input.addEventListener('input', refresh);
    get('less').onclick = () => adjust(-1);
    get('more').onclick = () => adjust(1);
    get('minus').onclick = () => adjustZoom(-25);
    get('plus').onclick = () => adjustZoom(25);
    get('save').onclick = () => { saved = Number(input.value); input.value = String(saved); refresh(); };
    get('close').onclick = () => {
      if (!dirty()) { finish('No pending edits.'); return; }
      modal.showModal(); get('cancel').focus();
    };
    get('cancel').onclick = () => modal.close();
    get('discard').onclick = () => { modal.close(); input.value = String(saved); refresh(); finish('Draft discarded.'); };
    get('reopen').onclick = () => {
      get('closed').hidden = true; get('open').hidden = false; get('close').hidden = false;
      input.value = String(saved); refresh(); input.focus();
    };
    mark('tangram'); adjustZoom(0); refresh();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();

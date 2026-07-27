/* Quote form: validation, photo uploads (drag + drop, preview list),
   and submission. Wire ENDPOINT to Formspree/Netlify before launch.
   Until then it runs a safe demo submit so nothing silently fails. */

// TODO(launch): paste your Formspree form ID, e.g. 'https://formspree.io/f/xxxxxx'
const ENDPOINT = '';

export function initForm() {
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;

  const status = form.querySelector('.form-status');
  const dropzone = form.querySelector('.dropzone');
  const fileInput = form.querySelector('input[type="file"]');
  const fileList = form.querySelector('.dropzone__files');
  let files = [];

  /* ---- File uploads ---- */
  function refreshFiles() {
    if (!files.length) { fileList.textContent = ''; return; }
    const names = files.map((f) => f.name).join(', ');
    fileList.textContent = `${files.length} photo${files.length > 1 ? 's' : ''} ready · ${names}`;
  }
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); } });
    fileInput.addEventListener('change', () => { files = [...fileInput.files]; refreshFiles(); });
    ['dragenter', 'dragover'].forEach((ev) => dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.add('is-drag'); }));
    ['dragleave', 'drop'].forEach((ev) => dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.remove('is-drag'); }));
    dropzone.addEventListener('drop', (e) => { files = [...e.dataTransfer.files]; refreshFiles(); });
  }

  function setStatus(type, msg) {
    status.className = `form-status ${type}`;
    status.textContent = msg;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();

    if (!name || (!phone && !email)) {
      setStatus('err', 'Please add your name and a phone number or email so Jared can reach you.');
      return;
    }
    files.forEach((f) => data.append('photos', f));

    const btn = form.querySelector('[type="submit"]');
    const label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Sending…';

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error('Bad response');
      } else {
        await new Promise((r) => setTimeout(r, 700)); // demo path
        console.info('[ATX quote form] Demo submit — wire ENDPOINT in src/js/form.js to deliver for real.', Object.fromEntries(data));
      }
      form.reset(); files = []; refreshFiles();
      setStatus('ok', `Thanks ${name.split(' ')[0]} — your request is in. Jared will come take a look and get back to you personally, usually within a day.`);
    } catch (err) {
      setStatus('err', 'Something went wrong sending that. Please call Jared directly at (512) 902-8877 and he\'ll take care of you.');
    } finally {
      btn.disabled = false; btn.textContent = label;
    }
  });
}

<script>
  import { onMount } from 'svelte';
  import Controls from './components/Controls.svelte';
  import Preview from './components/Preview.svelte';
  import { buildStickerSvg, preloadFonts } from './lib/buildSvg.js';
  import { DEFAULT_CONFIG, sanitizeConfig } from './lib/config.js';
  import { readUrl, writeUrl } from './lib/urlState.js';

  // Restore from the URL if present, else defaults.
  let config = $state(sanitizeConfig(readUrl() ?? DEFAULT_CONFIG));

  let copied = $state(false);
  let urlReady = $state(false);

  onMount(() => {
    preloadFonts();
    urlReady = true;
  });

  // Keep the URL in sync with every parameter change (after initial mount).
  $effect(() => {
    const snap = $state.snapshot(config);
    if (urlReady) writeUrl(snap);
  });

  async function currentSvg() {
    return buildStickerSvg($state.snapshot(config));
  }

  async function copySvg() {
    const svg = await currentSvg();
    try {
      await navigator.clipboard.writeText(svg);
      copied = true;
      setTimeout(() => (copied = false), 1600);
    } catch {
      downloadSvg();
    }
  }

  function fileName() {
    const base = (config.text || 'sticker')
      .replace(/[^a-z0-9-_]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase();
    return (base || 'sticker') + '.svg';
  }

  async function downloadSvg() {
    const svg = await currentSvg();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName();
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(location.href);
      linkCopied = true;
      setTimeout(() => (linkCopied = false), 1600);
    } catch {
      /* ignore */
    }
  }
  let linkCopied = $state(false);
</script>

<main>
  <header>
    <h1>Insta Sticker Generator</h1>
    <p>Logo + Text → einfarbige SVG für den Sticker-Plotter.</p>
  </header>

  <div class="layout">
    <Controls bind:config />

    <section class="right">
      <Preview {config} />
      <div class="exportbar">
        <button class="btn primary" onclick={copySvg}>
          {copied ? 'Kopiert ✓' : 'SVG kopieren'}
        </button>
        <button class="btn" onclick={downloadSvg}>SVG herunterladen</button>
        <button class="btn ghost" onclick={copyLink}>
          {linkCopied ? 'Link kopiert ✓' : 'Link teilen'}
        </button>
      </div>
    </section>
  </div>
</main>

<style>
  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;
  }
  header h1 {
    margin: 0;
    font-size: 1.6rem;
    background: linear-gradient(90deg, #f58529, #dd2a7b, #8134af, #515bd4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  header p {
    margin: 0.35rem 0 1.75rem;
    color: #6b6b74;
    font-size: 0.95rem;
  }
  .layout {
    display: flex;
    gap: 2rem;
    align-items: stretch;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 0;
  }
  .exportbar {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .btn {
    padding: 0.7rem 1.1rem;
    border: 1px solid #dcdce4;
    border-radius: 10px;
    background: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.05s ease;
  }
  .btn:active {
    transform: translateY(1px);
  }
  .btn.primary {
    border: none;
    color: #fff;
    background: linear-gradient(90deg, #dd2a7b, #8134af);
  }
  .btn.ghost {
    color: #8134af;
  }
  @media (max-width: 800px) {
    .layout {
      flex-direction: column;
    }
  }
</style>

<script>
  import { onMount } from 'svelte';
  import Controls from './components/Controls.svelte';
  import Preview from './components/Preview.svelte';
  import { buildStickerSvg, preloadFonts } from './lib/buildSvg.js';

  let config = $state({
    text: 'yourhandle',
    fontId: 'poppins',
    fontSize: 140,
    logoSize: 120,
    gap: 30,
    logoColor: '#111111',
    textColor: '#111111',
    bgOn: false,
    bgColor: '#ffffff',
    margin: 24,
  });

  let copied = $state(false);

  onMount(() => {
    preloadFonts();
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
      // Clipboard blocked → fall back to a download so nothing is lost.
      downloadSvg();
    }
  }

  function fileName() {
    const base = (config.text || 'sticker').replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
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
  @media (max-width: 800px) {
    .layout {
      flex-direction: column;
    }
  }
</style>

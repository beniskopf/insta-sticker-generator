<script>
  import { onMount } from 'svelte';
  import Controls from './components/Controls.svelte';
  import Preview from './components/Preview.svelte';
  import { buildStickerSvg, preloadFonts } from './lib/buildSvg.js';
  import { DEFAULT_CONFIG, sanitizeConfig } from './lib/config.js';
  import { readUrl, writeUrl } from './lib/urlState.js';

  // Restore from the URL if present, else defaults.
  let config = $state(sanitizeConfig(readUrl() ?? DEFAULT_CONFIG));

  let built = $state({ svg: '', heightCm: 0 });
  let shared = $state(false);
  let urlReady = $state(false);

  onMount(() => {
    preloadFonts();
    urlReady = true;
  });

  // Rebuild the sticker whenever any parameter changes.
  $effect(() => {
    const snap = $state.snapshot(config);
    let cancelled = false;
    buildStickerSvg(snap)
      .then((r) => {
        if (!cancelled) built = r;
      })
      .catch((e) => console.error(e));
    return () => {
      cancelled = true;
    };
  });

  // Keep the URL in sync with every parameter change (after initial mount).
  $effect(() => {
    const snap = $state.snapshot(config);
    if (urlReady) writeUrl(snap);
  });

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(location.href);
    } catch {
      /* URL is in the address bar regardless */
    }
    shared = true;
  }
</script>

<main>
  <header>
    <h1>Insta Sticker Generator</h1>
    <p>powered by Folientechnik West</p>
  </header>

  <div class="layout">
    <Controls bind:config heightCm={built.heightCm} />

    <section class="right">
      <Preview svg={built.svg} />
      <div class="exportbar">
        <button class="btn primary" onclick={copyLink}>
          {shared ? 'Link kopiert ✓' : 'Link zum Teilen kopieren'}
        </button>
      </div>
      {#if shared}
        <div class="order-msg">
          Teile diesen Link im Chat und gib deine Bestellung auf. 🎉
        </div>
      {/if}
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
    font-weight: 600;
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
    padding: 0.75rem 1.3rem;
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
  .order-msg {
    padding: 0.85rem 1.1rem;
    border-radius: 10px;
    background: #f6ecf5;
    border: 1px solid #e6c9e2;
    color: #8134af;
    font-weight: 600;
    font-size: 0.95rem;
  }
  @media (max-width: 800px) {
    .layout {
      flex-direction: column;
    }
  }
</style>

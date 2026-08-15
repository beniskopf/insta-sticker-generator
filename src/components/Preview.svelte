<script>
  import { buildStickerSvg } from '../lib/buildSvg.js';

  let { config } = $props();

  let svg = $state('');
  let error = $state('');

  $effect(() => {
    // Snapshot the reactive proxy before it crosses into the async builder.
    const snap = $state.snapshot(config);
    let cancelled = false;
    buildStickerSvg(snap)
      .then((out) => {
        if (!cancelled) {
          svg = out;
          error = '';
        }
      })
      .catch((e) => {
        if (!cancelled) error = String(e?.message ?? e);
      });
    return () => {
      cancelled = true;
    };
  });
</script>

<div class="preview">
  <div class="canvas checker">
    {#if svg}
      <div class="svg-wrap">{@html svg}</div>
    {/if}
  </div>
  {#if error}
    <p class="err">{error}</p>
  {/if}
</div>

<style>
  .preview {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
    min-height: 0;
  }
  .canvas {
    flex: 1;
    display: grid;
    place-items: center;
    padding: 2rem;
    border-radius: 16px;
    min-height: 320px;
    overflow: hidden;
  }
  .checker {
    background-color: #fff;
    background-image:
      linear-gradient(45deg, #e9e9ef 25%, transparent 25%),
      linear-gradient(-45deg, #e9e9ef 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #e9e9ef 75%),
      linear-gradient(-45deg, transparent 75%, #e9e9ef 75%);
    background-size: 22px 22px;
    background-position: 0 0, 0 11px, 11px -11px, -11px 0;
  }
  .svg-wrap :global(svg) {
    max-width: 100%;
    max-height: 60vh;
    height: auto;
    filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.14));
  }
  .err {
    margin: 0;
    color: #c0392b;
    font-size: 0.85rem;
  }
</style>

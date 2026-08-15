<script>
  let { svg } = $props();

  // Resolved against the document up front: a relative url() inside a CSS custom
  // property is resolved against the stylesheet that consumes it (/assets/…),
  // not the page, which pointed the request at a path holding no image.
  const mockupUrl = new URL(`${import.meta.env.BASE_URL}mockup-bg.jpg`, location.href).href;
</script>

<div class="preview">
  <div class="canvas" style="--mockup: url('{mockupUrl}')">
    {#if svg}
      <div class="svg-wrap">{@html svg}</div>
    {/if}
  </div>
  <p class="disclaimer">
    Bitte prüfen Sie die Maße – Hintergrundbild nur zur Illustration und nicht im
    richtigen Maßstab.
  </p>
</div>

<style>
  .preview {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    /* Gray veil over the mockup so both black and white artwork stay visible.
       Mid-gray fallback color shows if public/mockup-bg.jpg is missing. */
    background-color: #8a8b90;
    background-image: linear-gradient(rgba(140, 141, 146, 0.55), rgba(140, 141, 146, 0.55)),
      var(--mockup);
    background-size: cover;
    background-position: center;
  }
  .svg-wrap :global(svg) {
    max-width: 100%;
    max-height: 60vh;
    height: auto;
    filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.35));
  }
  .disclaimer {
    margin: 0;
    font-size: 0.72rem;
    line-height: 1.4;
    color: #9a9aa2;
  }
</style>

<script>
  import { FONTS } from '../lib/fonts.js';
  import { COLORS } from '../lib/palette.js';
  import { MAX_TEXT_LENGTH, RANGES } from '../lib/config.js';

  let { config = $bindable(), heightCm = 0 } = $props();
</script>

<div class="controls">
  <label class="field">
    <span>Text <em>{config.text.length}/{MAX_TEXT_LENGTH}</em></span>
    <input type="text" maxlength={MAX_TEXT_LENGTH} bind:value={config.text} placeholder="deinhandle" />
  </label>

  <label class="field">
    <span>Schriftart</span>
    <select bind:value={config.fontId}>
      {#each FONTS as font (font.id)}
        <option value={font.id}>{font.label}</option>
      {/each}
    </select>
  </label>

  <div class="field">
    <span>Farbe</span>
    <div class="swatches">
      {#each COLORS as c (c.id)}
        <button
          type="button"
          class="swatch"
          class:active={config.color.toLowerCase() === c.value.toLowerCase()}
          style="--sw:{c.value}"
          aria-label={c.label}
          title={c.label}
          onclick={() => (config.color = c.value)}
        ></button>
      {/each}
    </div>
  </div>

  <label class="field">
    <span>Schriftgröße <em>{config.fontSize}</em></span>
    <input type="range" min={RANGES.fontSize.min} max={RANGES.fontSize.max} step="1" bind:value={config.fontSize} />
  </label>

  <label class="field">
    <span>Logo-Größe <em>{config.logoSize}</em></span>
    <input type="range" min={RANGES.logoSize.min} max={RANGES.logoSize.max} step="1" bind:value={config.logoSize} />
  </label>

  <label class="field">
    <span>Abstand Logo ↔ Text <em>{config.gap}</em></span>
    <input type="range" min={RANGES.gap.min} max={RANGES.gap.max} step="1" bind:value={config.gap} />
  </label>

  <div class="size-block">
    <label class="field">
      <span>Gesamtbreite (inkl. Logo) <em>{config.widthCm} cm</em></span>
      <input type="range" min={RANGES.widthCm.min} max={RANGES.widthCm.max} step="1" bind:value={config.widthCm} />
      <div class="range-scale"><span>{RANGES.widthCm.min} cm</span><span>{RANGES.widthCm.max} cm</span></div>
    </label>
    <div class="field readonly">
      <span>Höhe (automatisch)</span>
      <output>{heightCm} cm</output>
    </div>
  </div>
</div>

<style>
  .controls {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    width: 320px;
    flex-shrink: 0;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #3a3a44;
  }
  .field em {
    font-style: normal;
    font-weight: 700;
    color: #c13584;
  }
  input[type='text'],
  select {
    padding: 0.55rem 0.7rem;
    border: 1px solid #dcdce4;
    border-radius: 10px;
    font-size: 0.95rem;
    background: #fff;
  }
  input[type='text']:focus,
  select:focus {
    outline: 2px solid #c13584;
    border-color: transparent;
  }
  input[type='range'] {
    width: 100%;
    accent-color: #c13584;
  }
  .swatches {
    display: flex;
    gap: 0.6rem;
  }
  .swatch {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 2px solid #d0d0da;
    background: var(--sw);
    cursor: pointer;
    padding: 0;
    transition: transform 0.05s ease;
  }
  .swatch:active {
    transform: scale(0.94);
  }
  .swatch.active {
    border-color: #c13584;
    box-shadow: 0 0 0 3px rgba(193, 53, 132, 0.25);
  }
  .size-block {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding: 0.9rem;
    border: 1px solid #e4e4ec;
    border-radius: 12px;
    background: #fafafc;
  }
  .range-scale {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    font-weight: 500;
    color: #9a9aa2;
  }
  .readonly output {
    padding: 0.55rem 0.7rem;
    border: 1px dashed #cfcfd8;
    border-radius: 10px;
    background: #f0f0f4;
    color: #6b6b74;
    font-size: 0.95rem;
    font-weight: 700;
  }
</style>

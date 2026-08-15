<script>
  import { FONTS } from '../lib/fonts.js';

  let { config = $bindable() } = $props();
</script>

<div class="controls">
  <label class="field">
    <span>Text</span>
    <input type="text" bind:value={config.text} placeholder="dein Text" />
  </label>

  <label class="field">
    <span>Schriftart</span>
    <select bind:value={config.fontId}>
      {#each FONTS as font (font.id)}
        <option value={font.id}>{font.label}</option>
      {/each}
    </select>
  </label>

  <label class="field">
    <span>Schriftgröße <em>{config.fontSize}</em></span>
    <input type="range" min="20" max="320" step="1" bind:value={config.fontSize} />
  </label>

  <label class="field">
    <span>Logo-Größe <em>{config.logoSize}</em></span>
    <input type="range" min="20" max="320" step="1" bind:value={config.logoSize} />
  </label>

  <label class="field">
    <span>Abstand Logo ↔ Text <em>{config.gap}</em></span>
    <input type="range" min="0" max="160" step="1" bind:value={config.gap} />
  </label>

  <div class="row">
    <label class="field color">
      <span>Logo-Farbe</span>
      <input type="color" bind:value={config.logoColor} />
    </label>
    <label class="field color">
      <span>Text-Farbe</span>
      <input type="color" bind:value={config.textColor} />
    </label>
  </div>

  <div class="row bg">
    <label class="field check">
      <input type="checkbox" bind:checked={config.bgOn} />
      <span>Hintergrund</span>
    </label>
    <label class="field color" class:disabled={!config.bgOn}>
      <span>Farbe</span>
      <input type="color" bind:value={config.bgColor} disabled={!config.bgOn} />
    </label>
  </div>

  <p class="hint">Beim Export wird der Text in Pfade umgewandelt – einfarbig &amp; plotter-fertig.</p>
</div>

<style>
  .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 320px;
    flex-shrink: 0;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
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
  input[type='color'] {
    width: 100%;
    height: 38px;
    padding: 2px;
    border: 1px solid #dcdce4;
    border-radius: 10px;
    background: #fff;
    cursor: pointer;
  }
  .row {
    display: flex;
    gap: 0.75rem;
  }
  .row .field {
    flex: 1;
  }
  .check {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  .check input {
    width: 18px;
    height: 18px;
    accent-color: #c13584;
  }
  .color.disabled {
    opacity: 0.45;
  }
  .hint {
    margin: 0.25rem 0 0;
    font-size: 0.78rem;
    font-weight: 500;
    color: #86868f;
    line-height: 1.4;
  }
</style>

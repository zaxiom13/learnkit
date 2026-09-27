<script lang="ts">
  let { label, min, max, step = 1, value = $bindable(), fmt = (v: number) => String(v) }: { label: string; min: number; max: number; step?: number; value: number; fmt?: (v: number) => string } = $props();
</script>

<label class="range">
  <span class="l">{label}</span>
  <input type="range" {min} {max} {step} bind:value />
  <span class="v">{fmt(value)}</span>
</label>

<style>
  .range {
    display: grid;
    grid-template-columns: minmax(90px, auto) 1fr 64px;
    align-items: center;
    gap: 10px;
    font-size: 13px;
  }
  .l {
    color: var(--text-2);
  }
  .v {
    font-family: var(--font-code);
    text-align: right;
    font-size: 12px;
  }
  input {
    width: 100%;
    accent-color: var(--accent);
  }
</style>

<script lang="ts">
  let { ok, earned = 0, explain = "", missText = "Not quite — have another look." }: { ok: boolean; earned?: number; explain?: string; missText?: string } = $props();
</script>

<div class="fb" class:ok role="status">
  <div class="head">
    {#if ok}<strong>Correct!</strong>{#if earned}<span class="pts">+{earned}</span>{/if}{:else}<strong>{missText}</strong>{/if}
  </div>
  {#if ok && explain && explain.trim()}<div class="exp">{@html explain}</div>{/if}
</div>

<style>
  .fb {
    margin-top: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    background: var(--bad-soft);
    border: 1px solid color-mix(in srgb, var(--bad) 35%, transparent);
    animation: pop 300ms var(--ease-spring);
  }
  .fb.ok {
    background: var(--good-soft);
    border-color: color-mix(in srgb, var(--good) 40%, transparent);
  }
  .head {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--bad);
  }
  .ok .head {
    color: var(--good);
  }
  .pts {
    font-weight: 700;
    font-size: 12.5px;
    padding: 1px 8px;
    border-radius: 999px;
    background: var(--good);
    color: var(--accent-text);
  }
  .exp {
    margin-top: 6px;
    color: var(--text);
    font-size: 15px;
    line-height: 1.55;
  }
  .exp :global(p) {
    margin: 4px 0;
  }
  @keyframes pop {
    from { transform: scale(0.97); opacity: 0; }
  }
</style>

<script lang="ts">
  let { label, checked = $bindable() }: { label: string; checked: boolean } = $props();
</script>

<label class="tog" class:on={checked}><input type="checkbox" bind:checked />{label}</label>

<style>
  .tog {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid var(--line-strong);
    font-size: 12.5px;
    cursor: pointer;
    user-select: none;
    transition: all var(--dur) var(--ease);
  }
  .tog.on {
    background: var(--accent-soft);
    border-color: var(--accent);
    color: var(--accent);
  }
  input {
    display: none;
  }
</style>

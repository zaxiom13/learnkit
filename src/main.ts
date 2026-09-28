import "./app.css";
import { mount } from "svelte";
import App from "./ui/App.svelte";

mount(App, { target: document.getElementById("app")! });

// Ask the browser not to evict the offline copy when storage is tight.
navigator.storage?.persist?.().catch(() => {});

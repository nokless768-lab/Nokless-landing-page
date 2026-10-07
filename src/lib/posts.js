// Posts are .json files in src/content/blog (made with the /blog/new page).
const mods = import.meta.glob('../content/blog/*.json', { eager: true })
export const posts = Object.values(mods).map((m) => m.default ?? m).sort((a, b) => b.iso.localeCompare(a.iso))

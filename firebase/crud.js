import { database } from "./fbConfig.js";
import { 
    get,
    ref,
    push,
    set,
    remove,
    child,
    update
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

const votesRef = ref(database, "votes");

async function save(name, vote) {
    const newItemRef = await push(votesRef);
    await set(newItemRef, {name, vote});
}

async function edit(id, name, vote) {
    const itemRef = child(votesRef, id);
    await update(itemRef, {name, vote});
}

async function remove(id) {
    const itemRef = child(votesRef, id);
    await remove(itemRef);
}

async function searchAll() {
    const snapshot = await get(votesRef);
    return snapshot.exits() ? snapshot.val() : {};
}

export { save, edit, remove, searchAll };
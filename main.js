import { save, edit, removeData, searchAll } from "./firebase/crud.js";

const form = document.getElementById("form");
const lulaUL = document.getElementById("lula");
const bolsonaroUL = document.getElementById("bolsonaro");

updateVotes();

let editingID = null;

form.addEventListener("submit", async (event) => {

    event.preventDefault()

    const name = document.getElementById("name").value;
    const vote = document.getElementById("vote").value;

    console.log(name);
    console.log(vote);

    if (!editingID) {
        await save(name, vote)
    } else {
        await edit(editingID, name, vote);
    }

    form.reset()

    console.log("Update it's up to go")

    await updateVotes();
})

async function updateVotes() {

    const data = await searchAll();

    const votes = Object.entries(data).map(([id, item]) => {

        return {
            id: id,
            name: item.name,
            vote: item.vote
        }
    })

    lulaUL.innerHTML = "";
    bolsonaroUL.innerHTML = "";

    console.log("innerHTML = null");

    votes.forEach((item) => {

        console.log("if it's up to go");

        if (item.vote === "13") {

            const lulaLI = document.createElement("li");

            const name = document.createElement("span");
            name.textContent = item.name;

            const vote = document.createElement("span");
            vote.textContent = item.vote

            const btnCorrect = document.createElement("button");
            btnCorrect.textContent = "Corrige";

            btnCorrect.addEventListener("click", async (event) => {

                editVote(item);
            })

            const btnRemove = document.createElement("button");
            btnRemove.textContent = "Anula";

            btnRemove.addEventListener("click", async (event) => {

                removeVote(item.id);
            })

            console.log("up to create LI");

            lulaLI.appendChild(name);
            lulaLI.appendChild(vote);
            lulaLI.appendChild(btnCorrect);
            lulaLI.appendChild(btnRemove);

            console.log("LI ok");

            lulaUL.appendChild(lulaLI)
        }

        else {

            const bolsonaroLI = document.createElement("li");

            const name = document.createElement("span");
            name.textContent = item.name;

            const vote = document.createElement("span");
            vote.textContent = item.vote

            const btnCorrect = document.createElement("button");
            btnCorrect.textContent = "Corrige";

            btnCorrect.addEventListener("click", async (event) => {

                editVote(item);
            })

            const btnRemove = document.createElement("button");
            btnRemove.textContent = "Anula";

            btnRemove.addEventListener("click", async (event) => {

                removeVote(item.id);
            })

            bolsonaroLI.appendChild(name);
            bolsonaroLI.appendChild(vote);
            bolsonaroLI.appendChild(btnCorrect);
            bolsonaroLI.appendChild(btnRemove);

            bolsonaroUL.appendChild(bolsonaroLI)
        }
    })

}

function editVote(item) {

    editingID = item.id;

    document.getElementById("name").value = item.name;
    document.getElementById("vote").value = item.vote;
}

async function removeVote(id) {

    const confirmation = confirm("Deseja anular seu voto?");

    if (!confirmation) {
        return;
    }

    await removeData(id);

    updateVotes();
}
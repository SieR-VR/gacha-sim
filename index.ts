const states = {
    "one-star-chance": 0,
    "two-star-chance": 0,
    "three-star-chance": 0,

    "one-star-count": 0,
    "two-star-count": 0,
    "three-star-count": 0,

    collection: {
        "one-star": [] as number[],
        "two-star": [] as number[],
        "three-star": [] as number[],
    }
}

const syncStates = () => {
    states["one-star-chance"] = 
        (document.querySelector("#one-star-chance") as HTMLInputElement).valueAsNumber;
    states["two-star-chance"] =
        (document.querySelector("#two-star-chance") as HTMLInputElement).valueAsNumber;
    states["three-star-chance"] =
        (document.querySelector("#three-star-chance") as HTMLInputElement).valueAsNumber;

    states["one-star-count"] =
        (document.querySelector("#one-star-count") as HTMLInputElement).valueAsNumber;
    states["two-star-count"] =
        (document.querySelector("#two-star-count") as HTMLInputElement).valueAsNumber;
    states["three-star-count"] =
        (document.querySelector("#three-star-count") as HTMLInputElement).valueAsNumber;

    console.log(states);
}

const gachaStar = () => {
    const random = Math.random() * 100;
    if (random < states["one-star-chance"]) {
        return "one-star";
    } else if (random < states["one-star-chance"] + states["two-star-chance"]) {
        return "two-star";
    } else {
        return "three-star";
    }
}

const gachaInner = (star: string) => {
    const random = Math.floor(Math.random() * states[star + "-count"]);
    states.collection[star][random]++;

    return random;
}

const onOneTimeGacha = () => {
    syncStates();
    const star = gachaStar();
    const index = gachaInner(star);

    const result = document.querySelector("#result") as HTMLDivElement;
    result.innerText = `${star} ${index + 1}번째`;

    updateCollection();
}

const onTenTimeGacha = () => {
    syncStates();
    const result = document.querySelector("#result-ten") as HTMLDivElement;
    result.innerText = "";

    for (let i = 0; i < 10; i++) {
        const star = gachaStar();
        const index = gachaInner(star);

        result.innerText += `${star} ${index + 1}번째\n`;
    }

    updateCollection();
}

const updateCollection = () => {
    const collection = document.querySelector("#collection") as HTMLDivElement;
    collection.innerText = "";
    
    collection.innerText += `1성 ${states.collection["one-star"]}\n`;
    collection.innerText += `2성 ${states.collection["two-star"]}\n`;
    collection.innerText += `3성 ${states.collection["three-star"]}\n`;
}

const onCountUpdateButtonClicked = () => {
    syncStates();
    reset();
    
    states.collection["one-star"] = new Array(states["one-star-count"]).fill(0); 
    states.collection["two-star"] = new Array(states["two-star-count"]).fill(0);
    states.collection["three-star"] = new Array(states["three-star-count"]).fill(0);

}

const reset = () => {
    states.collection["one-star"] = [];
    states.collection["two-star"] = [];
    states.collection["three-star"] = [];

    const result = document.querySelector("#result") as HTMLDivElement;
    result.innerText = "";

    const resultTen = document.querySelector("#result-ten") as HTMLDivElement;
    resultTen.innerText = "";

    const collection = document.querySelector("#collection") as HTMLDivElement;
    collection.innerText = "";
}

document.querySelector("#one-time")?.addEventListener("click", onOneTimeGacha);
document.querySelector("#ten-times")?.addEventListener("click", onTenTimeGacha);
document.querySelector("#update-count")?.addEventListener("click", onCountUpdateButtonClicked);
document.querySelector("#reset-button")?.addEventListener("click", reset);

window.onload = () => {
    onCountUpdateButtonClicked();
}
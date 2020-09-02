const STAT_CLASS_NAME = "stat";
const SUB_TEXT_CLASS_NAME = "stat-subtext";

const getAllRunElements = () => {
    const stats = document.getElementsByClassName("stat");
    const distanceElements = [];
    for (stat of stats) {
        const children = stat.children;
        if (children.length < 2) continue;
        const [subText, statText] = stat.children;
        if (subText.innerText === "Distance") distanceElements.push(statText);
    }
    return distanceElements;
}

const getDistanceFromInnerText = (innerText) => {
    // TODO: regex
    return Number.parseFloat(innerText.split(" ")[0]);
}

const getUnitFromInnerText = (innerText) => {
    // TODO: regex
    return innerText.split(" ")[1];
}

const updateText = (distance, element, unit) => {
    const decimal = distance % 1;
    const integer = distance - decimal;
    if (decimal >= .95) {
        const newDistanceText = `${integer + 1}.00 ${unit}`;
        element.innerText = newDistanceText;
    }
}

const updateAllInlineRunElements = () => {
    const inlineElements = document.getElementsByClassName("inline-stats");
    console.log(`Found ${inlineElements.length} inline`)
    for (element of inlineElements) {
        for (child of element.children) {
            if (child.title === "Distance") {
                const distance = getDistanceFromInnerText(child.innerText);
                const unit = getUnitFromInnerText(child.innerText);
                updateText(distance, child, unit);
            }
        }
    }
}

const updateAllDashboardRunElements = () => {
    const elements = getAllRunElements();
    console.log(`Found ${elements.length} elems`)
    for (element of elements) {
        const distance = getDistanceFromInnerText(element.innerText);
        const unit = getUnitFromInnerText(element.innerText);
        updateText(distance, element, unit);
    }
}

const roundUp = () => {
    // TODO: Better way to wait on DOM
    setTimeout(() => {
        updateAllDashboardRunElements();
        updateAllInlineRunElements();
    }, 5000);
}

window.onload = roundUp;
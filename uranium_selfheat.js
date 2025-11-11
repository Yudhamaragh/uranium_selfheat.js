// === Self-Heating Uranium (slow realistic) ===
// Uranium gradually warms on its own, no radiation needed.
// Heats a little faster when grouped together.

elements.uranium = {
    name: "Uranium",
    color: ["#687a3a","#70823d","#7c8f43"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 19050,
    conduct: 0.2,
    temp: 300,
    tempHigh: 2500,
    stateHigh: "molten_uranium",
    hidden: false,

    tick(pixel) {
        if (!pixel.heatLevel) pixel.heatLevel = 0;

        // gentle self-heating
        pixel.heatLevel += 0.02;     // smaller number = slower heat build-up
        pixel.temp += pixel.heatLevel * 0.25;

        // small boost if near other uranium (chain heating)
        let neighbors = 0;
        for (let dx=-1; dx<=1; dx++){
            for (let dy=-1; dy<=1; dy++){
                if (dx===0 && dy===0) continue;
                const n = pixelMap[pixel.x+dx]?.[pixel.y+dy];
                if (n && n.element === "uranium") neighbors++;
            }
        }
        if (neighbors > 0) pixel.temp += neighbors * 0.05;

        // melt when too hot
        if (pixel.temp >= 2500) changePixel(pixel, "molten_uranium");
    }
};

elements.molten_uranium = {
    name: "Molten Uranium",
    color: ["#a0a45d","#b2b86b","#d2d686"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 17000,
    tempLow: 2400,
    stateLow: "uranium",
    hidden: false,
};

(() => {
    // solid uranium
    elements.uranium_solid = {
        name: "Uranium (Solid)",
        color: ["#687a3a","#70823d","#7c8f43"],
        behavior: behaviors.WALL, // solid, won’t fall
        state: "solid",
        category: "solids",
        density: 19050,
        conduct: 0.2,
        temp: 300,
        tempHigh: 2500,
        stateHigh: "molten_uranium_solid",
        hidden: false,
        tick(pixel) {
            if (!pixel.heatLevel) pixel.heatLevel = 0;
            pixel.heatLevel += 0.02; // slow self-heating
            pixel.temp += pixel.heatLevel * 0.25;

            // heat slightly faster when touching other uranium solids
            let neighbors = 0;
            for (let dx=-1; dx<=1; dx++){
                for (let dy=-1; dy<=1; dy++){
                    if (dx===0 && dy===0) continue;
                    const n = pixelMap[pixel.x+dx]?.[pixel.y+dy];
                    if (n && n.element === "uranium_solid") neighbors++;
                }
            }
            if (neighbors > 0) pixel.temp += neighbors * 0.05;

            if (pixel.temp >= 2500) changePixel(pixel, "molten_uranium_solid");
        }
    };

    // molten uranium
    elements.molten_uranium_solid = {
        name: "Molten Uranium (Solid Version)",
        color: ["#a0a45d","#b2b86b","#d2d686"],
        behavior: behaviors.LIQUID,
        state: "liquid",
        category: "liquids",
        density: 17000,
        tempLow: 2400,
        stateLow: "uranium_solid",
        hidden: false
    };
})();

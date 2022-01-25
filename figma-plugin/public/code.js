'use strict';

figma.showUI(__html__, { width: 375, height: 512 });
// // User screen specifications
// let userPPI;
// let userPhysicalWidth;
let userLogicalWidth;
let zoomed;
// // Target screen specifications
// let referenceScreenPpi;
// let referenceScreenX;
// let referencePixelRatio = userPhysicalWidth / userLogicalWidth;
// let zoomLevel = userPPI / referenceScreenPpi / referencePixelRatio;
// figma.viewport.zoom = zoomLevel;
console.log();
figma.ui.onmessage = (msg) => {
    switch (msg.type) {
        case "get-width":
            userLogicalWidth = msg.userLogicalWidth;
            console.log(`User screen width (logical): ${userLogicalWidth}`);
            zoomed = msg.zoom !== 2;
            console.log(`Figma UI zoom active: ${zoomed}`);
            break;
    }
};

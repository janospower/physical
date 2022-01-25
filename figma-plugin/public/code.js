'use strict';

figma.showUI(__html__, { width: 232, height: 208 });
// // User screen specifications
// let userPPI;
// let userPhysicalWidth;
let userLogicalWidth;
// // Target screen specifications
// let referenceScreenPpi;
// let referenceScreenX;
// let referencePixelRatio = userPhysicalWidth / userLogicalWidth;
// let zoomLevel = userPPI / referenceScreenPpi / referencePixelRatio;
// figma.viewport.zoom = zoomLevel;
figma.ui.onmessage = (msg) => {
    if (msg.type === "set-zoom") {
        userLogicalWidth = msg.userLogicalWidth;
        console.log(userLogicalWidth);
    }
};

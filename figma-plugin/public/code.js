'use strict';

figma.showUI(__html__, { width: 375, height: 512 });
// // User screen specifications
let userPPI;
let userPhysicalWidth;
let userLogicalWidth;
let userPixelRatio;
// Target screen specifications
let targetPPI;
let targetPixelRatio;
let zoomLevel;
console.log();
figma.ui.onmessage = (msg) => {
    switch (msg.type) {
        case "get-user-dimensions":
            userLogicalWidth = msg.userLogicalWidth;
            userPPI = msg.userPPI;
            userPhysicalWidth = msg.userPhysicalWidth;
            userPixelRatio = userPhysicalWidth / userLogicalWidth;
            break;
        case "get-target-dimensions":
            targetPPI = msg.targetPPI;
            targetPixelRatio = msg.targetPixelRatio;
            break;
        case "set-zoom":
            zoomLevel = (userPPI / userPixelRatio / targetPPI) * targetPixelRatio;
            figma.viewport.zoom = zoomLevel;
            break;
    }
};
//# sourceMappingURL=code.js.map

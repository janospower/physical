'use strict';

figma.showUI(__html__, { width: 375, height: 512 });
// // User screen specifications
let userDimensions = {
    physicalWidth: 0,
    logicalWidth: 0,
    ppi: 0,
    pixelRatio: 0,
};
// Target screen specifications
let targetDimensions = {
    ppi: 0,
    pixelRatio: 0,
};
let zoomLevel;
console.log();
figma.ui.onmessage = (msg) => {
    switch (msg.type) {
        case "get-user-dimensions":
            userDimensions.logicalWidth = msg.userLogicalWidth;
            userDimensions.ppi = msg.userPPI;
            userDimensions.physicalWidth = msg.userPhysicalWidth;
            userDimensions.pixelRatio =
                userDimensions.physicalWidth / userDimensions.logicalWidth;
            break;
        case "get-target-dimensions":
            targetDimensions.ppi = msg.targetPPI;
            targetDimensions.pixelRatio = msg.targetPixelRatio;
            break;
        case "set-zoom":
            zoomLevel =
                (userDimensions.ppi /
                    userDimensions.pixelRatio /
                    targetDimensions.ppi) *
                    targetDimensions.pixelRatio;
            figma.viewport.zoom = zoomLevel;
            break;
    }
};
//# sourceMappingURL=code.js.map

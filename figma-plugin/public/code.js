'use strict';

figma.showUI(__html__, { width: 375, height: 512 });
// // User screen specifications
let userPPI;
let userPhysicalWidth;
let userLogicalWidth;
console.log();
figma.ui.onmessage = (msg) => {
    switch (msg.type) {
        case "get-width":
            userLogicalWidth = msg.userLogicalWidth;
            console.log(`User screen width (logical): ${userLogicalWidth}`);
            userPPI = msg.userPPI;
            userPhysicalWidth = msg.userPhysicalWidth;
            //   zoomLevel = userPPI / referenceScreenPpi / referencePixelRatio;
            console.log(`userPPI: ${userPPI}`);
            console.log(`userPhysicalWidth: ${userPhysicalWidth}`);
            break;
    }
};

figma.showUI(__html__, { width: 375, height: 512 });

// // User screen specifications
let userPPI;
let userPhysicalWidth;
let userLogicalWidth;
let zoomed;
let userPixelRatio;

// Target screen specifications
let targetPPI;
let targetPixelRatio;

let zoomLevel;

console.log();

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case "get-width":
      userLogicalWidth = msg.userLogicalWidth;
      console.log(`User screen width (logical): ${userLogicalWidth}`);
      userPPI = msg.userPPI;
      userPhysicalWidth = msg.userPhysicalWidth;
      userPixelRatio = userPhysicalWidth / userLogicalWidth;
      //   zoomLevel = userPPI / referenceScreenPpi / referencePixelRatio;
      console.log(`userPPI: ${userPPI}`);
      console.log(`userPhysicalWidth: ${userPhysicalWidth}`);
      break;

    case "set-zoom":
      //   figma.viewport.zoom = zoomLevel;
      break;

    default:
      break;
  }
};

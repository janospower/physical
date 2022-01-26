figma.showUI(__html__, { width: 320, height: 512 });

// Plugin data
const userDimensionsKey = "USER_DIMENSIONS";
const targetDimensionsKey = "TARGET_DIMENSIONS";
const zoomVauleKey = "ZOOM_VALUE";

let storedUserDimensions = figma.root.getPluginData(userDimensionsKey);
let storedTargetDimensions = figma.root.getPluginData(targetDimensionsKey);
let storedZoomValue = figma.root.getPluginData(zoomVauleKey);

// // User screen specifications
let userDimensions = storedUserDimensions
  ? JSON.parse(storedUserDimensions)
  : {
      physicalWidth: 0,
      logicalWidth: 0,
      ppi: 0,
      pixelRatio: 0,
      value: "",
    };

// Target screen specifications
let targetDimensions = storedTargetDimensions
  ? JSON.parse(storedTargetDimensions)
  : {
      ppi: 0,
      pixelRatio: 0,
      value: "",
    };

if (storedUserDimensions && storedTargetDimensions) {
  figma.ui.postMessage({
    userValue: userDimensions.value,
    userPPI: userDimensions.ppi,
    userPhysicalWidth: userDimensions.physicalWidth,
    targetValue: targetDimensions.value,
    targetPPI: targetDimensions.ppi,
    tagetPixelRatio: targetDimensions.pixelRatio,
  });
}

let zoomLevel;

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case "zoom-to-last":
      console.log(storedZoomValue);
      if (storedZoomValue) {
      } else {
        figma.notify("No stored zoom level. Run plugin normally first");
        figma.closePlugin;
        return;
      }
      break;

    case "get-user-dimensions":
      userDimensions.logicalWidth = msg.userLogicalWidth;
      userDimensions.ppi = msg.userPPI;
      userDimensions.physicalWidth = msg.userPhysicalWidth;
      userDimensions.pixelRatio =
        userDimensions.physicalWidth / userDimensions.logicalWidth;
      userDimensions.value = msg.value;
      figma.root.setPluginData(
        userDimensionsKey,
        JSON.stringify(userDimensions)
      );
      break;

    case "get-target-dimensions":
      targetDimensions.ppi = msg.targetPPI;
      targetDimensions.pixelRatio = msg.targetPixelRatio;
      targetDimensions.value = msg.value;
      figma.root.setPluginData(
        targetDimensionsKey,
        JSON.stringify(targetDimensions)
      );
      break;

    case "set-zoom":
      zoomLevel =
        (userDimensions.ppi /
          userDimensions.pixelRatio /
          targetDimensions.ppi) *
        targetDimensions.pixelRatio;

      //   figma.viewport.zoom = zoomLevel;

      function zoomIncrement(to) {
        let increment = figma.viewport.zoom > to ? -1 : 1;
        let distance = (to - figma.viewport.zoom) * increment;
        if (distance > 0.01) {
          figma.viewport.zoom += increment / 100;
          return false;
        } else {
          figma.viewport.zoom = to;
          return true;
        }
      }

      let zoomAnimation = setInterval(() => {
        if (zoomIncrement(zoomLevel)) {
          clearInterval(zoomAnimation);
          figma.notify(
            `Zoomed physical size (${Math.round(zoomLevel * 100)}%)`
          );
          return;
        }
      }, 17);

      break;

    default:
      break;
  }
};

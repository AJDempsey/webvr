AFRAME.registerPrimitive("a-clicker", {
  defaultComponents: {
    cursor: {},
    geometry: {primitive: "ring", radiusInner: 0.01, radiusOuter: 0.015},
    material: {color: "cyan"},
    position: {x: 0, y: 0, z: -0.5},
    animation:
      {
        property: "scale",
        startEvents: "click",
        dur: 150,
        from: "0.1 0.1 0.1",
        to: "1 1 1"
      }
  },
  mappings: {}
});


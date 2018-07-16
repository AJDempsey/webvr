AFRAME.registerComponent("mike-alger-ux-zones",{
  init: function() {
    var sceneEl = this.el;
    this.camera = sceneEl.querySelector("#povCamera");
    var camPos = this.camera.getAttribute("position");
    var camX = camPos['x'];
    this.uxZone = document.createElement("a-entity")
    this.uxZone.setAttribute('position', {x: camX, y: 0.5, z: 0});
    this.uxZone.setAttribute('rotation', {x: -90, y: 0, z: 0});
    this.uxZone.setAttribute('id', 'uxZone');
    this.uxZone.setAttribute('visibility', true);

    // Place a red circle showing where objects should never be placed
    var nonoZone = document.createElement("a-circle");
    nonoZone.setAttribute("color", "red");
    nonoZone.setAttribute("scale", {x: 0.5, y: 0.5, z: 0.5});
    this.uxZone.appendChild(nonoZone);
    // Place rings showing the various bands of where items should be placed
    this.buildRings();
    // Place Lines showing the degrees of comfort for viewing angles
    this.buildLines();

    // Create planes to be used when we approach the bounds of the areas
    // of comfort horizontal and vertical looking. Yellow for the perpheral
    // zone and red for anything past the guidline's maximum
    this.currentYRotation = this.camera.getAttribute("rotation")["y"];
    this.currentXRotation = this.camera.getAttribute("rotation")["x"];

    this.warnVertical = document.createElement("a-plane");
    this.warnVertical.setAttribute("color", "yellow");
    this.warnVertical.setAttribute("opacity", "0.5");
    this.warnVertical.setAttribute("visible", false);
    this.warnVertical.setAttribute("position", {"x": 0, "y": 1.5, "z": -2});
    this.warnVertical.setAttribute("rotation", {"x": 0, "y": 0, "z": 180});
    this.warnVertical.setAttribute("scale", {"x":1, "y":0.3, "z":0.5});
    this.camera.appendChild(this.warnVertical);

    this.warnHorizontal = document.createElement("a-plane");
    this.warnHorizontal.setAttribute("color", "yellow");
    this.warnHorizontal.setAttribute("opacity", "0.5");
    this.warnHorizontal.setAttribute("visible", true);
    this.warnHorizontal.setAttribute("position", {"x": 3.2, "y": 0, "z": -2});
    this.warnHorizontal.setAttribute("rotation", {"x": 0, "y": 0, "z": 90});
    this.warnHorizontal.setAttribute("scale", {"x":1, "y":0.3, "z":0.5});
    this.camera.appendChild(this.warnHorizontal);
    sceneEl.appendChild(this.uxZone);

  },

  tick: function() {
    var camPos = this.camera.getAttribute('position');
    var camRot = this.camera.getAttribute('rotation');
    var camX = camPos['x'];
    var camZ = camPos['z'];
    var position = this.uxZone.getAttribute('position');
    position['x'] = camX;
    position['y'] = 0.1;
    position['z'] = camZ;
    this.uxZone.setAttribute('position', position);

    // Change vertical warning plane to be visible over 20/-12 degrees
    // and switch to red over 60/-20 degress.
    if (camRot["x"] > 60 || camRot["x"] < -20) {
      this.warnVertical.setAttribute("color", "red");
    } else if (camRot["x"] > 20 || camRot["x"] < -12) {
      this.warnVertical.setAttribute("visible", true);
      this.warnVertical.setAttribute("color", "yellow");
    } else {
      this.warnVertical.setAttribute("visible", false);
    }

    // Flip horizontal plane from left to right depending on the direction
    // of rotation and which side of the 0-180 diameter it is on
    var pos = this.warnHorizontal.getAttribute("position");
    var absY = Math.abs(camRot["y"]);
    var sign = camRot["y"] && camRot["y"]/absY;

    if (absY%360 > 180 && sign != 0) {
      sign = sign*-1;
    }

    pos["x"] = 3.2*sign*-1;

    // Change horizontal warning plane to be visible past 33/327 degrees
    // and switch to red past 50/310 degress.
    if (absY % 360 < 33 || absY % 360 > 327) {
      this.warnHorizontal.setAttribute("visible", false);
    } else if (absY % 360 < 50 || absY % 360 > 310) {
      this.warnHorizontal.setAttribute("color", "yellow");
      this.warnHorizontal.setAttribute("visible", true);
    } else {
      this.warnHorizontal.setAttribute("color", "red");
    }
  },

  buildRings: function() {
    var rings = [
      {"color": "yellow", "inner": 0.5, "outer": 1.0},
      {"color": "green", "inner": 1.0, "outer": 10},
      {"color": "blue", "inner": 10, "outer": 20}
    ];
    for ( var i = 0; i < rings.length; i++) {
      var ring = document.createElement("a-ring");
      ring.setAttribute("color", rings[i]["color"]);
      ring.setAttribute("radius-inner", rings[i]["inner"]);
      ring.setAttribute("radius-outer", rings[i]["outer"]);
      this.uxZone.appendChild(ring);
    }
  },

  buildLines: function() {
    var zCoords = [77, 102];
    var rotation = {"x": 0, "y": 0, "z": 0};
    for ( var i = 0; i < zCoords.length; i++) {
      z = zCoords[i];
      var posEntity = document.createElement("a-entity");
      rotation["z"] = -z;
      posEntity.setAttribute("line", "start: 0 0 0; end: 0 100 0; color: black;");
      posEntity.setAttribute("rotation", Object.assign({}, rotation));
      var negEntity = document.createElement("a-entity");
      rotation["z"] = z;
      console.log(rotation);
      negEntity.setAttribute("line", "start: 0 0 0; end: 0 100 0; color: black;");
      negEntity.setAttribute("rotation", Object.assign({}, rotation));
      this.uxZone.appendChild(posEntity);
      this.uxZone.appendChild(negEntity);
    }
  }

});

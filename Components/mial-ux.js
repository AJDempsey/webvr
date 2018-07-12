AFRAME.registerComponent("mike-alger-ux-zones",{
  init: function() {
    var sceneEl = this.el;
    this.camera = sceneEl.querySelector("#povCamera");
    var camX = this.camera.getAttribute("position")['x'];
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
    sceneEl.appendChild(this.uxZone);

  },

  tick: function() {
    var camPos = this.camera.getAttribute('position');
    var camX = camPos['x'];
    var camZ = camPos['z'];
    var position = this.uxZone.getAttribute('position');
    position['x'] = camX;
    position['y'] = 0.1;
    position['z'] = camZ;
    this.uxZone.setAttribute('position', position);
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
    var zCoords = [30, 55, 77, 102];
    var rotation = {"x": 0, "y": 0, "z": 0};
    var color = "white;";
    for ( var i = 0; i < zCoords.length; i++) {
      z = zCoords[i];
      if (i == zCoords.length - 1) {
        color = "black;";
      }
      var posEntity = document.createElement("a-entity");
      rotation["z"] = -z;
      console.log(rotation);
      posEntity.setAttribute("line", "start: 0 0 0; end: 0 100 0; color: "+color);
      posEntity.setAttribute("rotation", Object.assign({}, rotation));
      var negEntity = document.createElement("a-entity");
      rotation["z"] = z;
      console.log(rotation);
      negEntity.setAttribute("line", "start: 0 0 0; end: 0 100 0; color: "+color);
      negEntity.setAttribute("rotation", Object.assign({}, rotation));
      this.uxZone.appendChild(posEntity);
      this.uxZone.appendChild(negEntity);
    }
  }

});

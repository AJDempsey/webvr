AFRAME.registerComponent('scale-on-hover',
    { schema: {to: {default: "2.5 2.5 2.5"}},
      init: function() {
        var data = this.data;
        var el = this.el;
        var cScale = el.getAttribute("scale");
        var strScale = cScale["x"]+" "+cScale["y"]+" "+cScale["z"];
        el.addEventListener('mouseenter', function() {
          el.setAttribute('scale', data.to);
        });
        el.addEventListener('mouseleave', function() {
          el.setAttribute('scale', strScale);
        });
      }
    });

export const generalMixin = {
  methods: {
    toggleValidationElement(id, mode = true){
      
      let element = document.getElementById(id);

      if (mode === false){
        element.style.display = "block";
        element.innerHTML = "field is required";
      } else {
        element.style.display = "none";
        element.innerHTML = "";
      }
    },
    drawSVG(){
      let svgSelectedOption = document.getElementById("svgMode").value;
      let validated = false;

      if (svgSelectedOption === "circle") {
        validated = this.validateCircleSVGOptions();

        if (validated === false)
          return;

        let circleData = {
          cx: this.circleState.circleOptionsComponent.cx,
          cy: this.circleState.circleOptionsComponent.cy,
          r: this.circleState.circleOptionsComponent.r,
          strokeWidth: this.circleState.circleOptionsComponent.strokeWidth,
          stroke: this.circleState.circleOptionsComponent.stroke,
          fill: this.circleState.circleOptionsComponent.fill
        }

        let payload = {
          data : circleData,
          svgSelectedOption
        }

        this.saveSVGValues(payload);

      } else if (svgSelectedOption === "polygon") {
        validated = this.validatePolygonSVGOptions();

        if (validated === false)
          return;

        let polygonData = {
          points: this.polygonState.polygonOptionsComponent.points,
          fillrule: this.polygonState.polygonOptionsComponent.fillrule,
          stroke: this.polygonState.polygonOptionsComponent.stroke,
          strokeWidth: this.polygonState.polygonOptionsComponent.strokeWidth,
          fill: this.polygonState.polygonOptionsComponent.fill
        }

        let payload = {
          data: polygonData,
          svgSelectedOption
        }

        this.saveSVGValues(payload);
      }
    }
  }
}

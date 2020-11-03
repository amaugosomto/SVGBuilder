export const validatorMixin = {
  methods: {
    toggleValidationElement(id, mode){
      
      let element = document.getElementById(id);

      if (mode === false){
        element.style.display = "block";
        element.innerHTML = "field is required";
      } else {
        element.style.display = "none";
        element.innerHTML = "";
      }
    }
  }
}
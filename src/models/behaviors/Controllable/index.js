export default class Controllable {
  constructor(inputController = null) {
    this.inputController = inputController;
  }

  setInputController(controller) {
    this.inputController = controller;
  }
}
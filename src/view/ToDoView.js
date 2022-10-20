class ToDoView {
  static createSimpleViewFromVO(index, input) {
    const checked = input.isCompleted ? 'checked' : '';
    return `
      <li>
        <input type="checkbox" name="" id="${index}" ${checked}>${input.title}
        </li>`;
  }
}
export default ToDoView;

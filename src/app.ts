class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    //data fetched here won't be null and will be type 'HTMLTemplateElement'
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;

    //data fetched here won't be null and will be type 'HTMLDivElement'
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // creates a copy of a node
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
    
  }

  private attach() {
    // inserts a given element node at a given position relative to the element it is invoked upon.
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();

//autobind decorator
const autobind = (
	target: any,
	methodName: string,
	descriptor: PropertyDescriptor,
) => {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};

	return adjDescriptor;
};

//  Class ProjectInput
class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		//data fetched here won't be null and will be type 'HTMLTemplateElement'
		this.templateElement = document.getElementById(
			'project-input',
		)! as HTMLTemplateElement;

		//data fetched here won't be null and will be type 'HTMLDivElement'
		this.hostElement = document.getElementById('app')! as HTMLDivElement;

		// creates a copy of a node
		const importedNode = document.importNode(this.templateElement.content, true);
		this.element = importedNode.firstElementChild as HTMLFormElement;
		this.element.id = 'user-input';

		this.titleInputElement = this.element.querySelector(
			'#title',
		) as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector(
			'#description',
		) as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector(
			'#people',
		) as HTMLInputElement;

		this.configure();
		this.attach();
	}
	@autobind
	private submitHandler(event: Event) {
		event.preventDefault();
		console.log(this.titleInputElement.value);
	}

	private configure() {
		this.element.addEventListener('submit', this.submitHandler);
	}
	private attach() {
		// inserts a given element node at a given position relative to the element it is invoked upon.
		this.hostElement.insertAdjacentElement('afterbegin', this.element);
	}
}

const prjInput = new ProjectInput();

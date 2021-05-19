//Class Component Base && cant instantiate it
	export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
		templateElement: HTMLTemplateElement;
		hostElement: T;
		element: U;

		constructor(
			templateId: string,
			hostElementId: string,
			insertAtStart: boolean,
			newElementId?: string,
		) {
			this.templateElement = document.getElementById(
				templateId,
			)! as HTMLTemplateElement;

			//data fetched here won't be null and will be type 'T'
			this.hostElement = document.getElementById(hostElementId)! as T;

			// creates a copy of a node
			const importedNode = document.importNode(this.templateElement.content, true);
			this.element = importedNode.firstElementChild as U;
			if (newElementId) {
				this.element.id = newElementId;
			}
			this.attach(insertAtStart);
		}
		private attach(insertAtBeginning: boolean) {
			// before or after  the closing tag of the host element
			this.hostElement.insertAdjacentElement(
				insertAtBeginning ? 'afterbegin' : 'beforeend',
				this.element,
			);
		}
		abstract configure(): void;
		abstract renderContent(): void;
	}


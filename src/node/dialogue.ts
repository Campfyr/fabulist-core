import { Choice } from '../linkage/choice';
import { Conversant } from './conversant';
import { Quote } from './quote';
import { StoryNode } from './story-node';

export class Dialogue extends StoryNode {
    private nextLinkageId = 0;

    public constructor(
        protected id: number,
        protected conversant: Conversant,
        protected quote: Quote
    ) {
        super(id);
    }

    public interact(chosenId: number): StoryNode | undefined {
        const linkage = this.getLinkage(chosenId);
        return linkage?.getNextNode();
    }

    public addChoice(content: string, nextNode: StoryNode): void {
        const choice = new Choice(
            this.nextLinkageId++,
            content,
            this,
            nextNode
        );

        this.addLinkage(choice);
    }

    public getChoice(id: number): Choice {
        const choice = this.getLinkage(id) as Choice;

        if (choice == null) {
            throw `Choice with id of ${id} not found`;
        }

        return choice;
    }

    public getChoices(): Choice[] {
        return this.getLinkages().filter(
            (linkage) => linkage instanceof Choice
        ) as Choice[];
    }

    public getConversant(): Conversant {
        return this.conversant;
    }

    public getQuote(): Quote {
        return this.quote;
    }

    public getText(): string {
        return this.quote.getText();
    }

    public toString(): string {
        return `${this.conversant.getName()} says ${this.getText()}`;
    }
}

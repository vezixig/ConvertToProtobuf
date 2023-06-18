import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'ctpb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public handleCodeInputChange() {
        // find classname
        let className = this.getClassName(this.inputCode);
        // find all fields
        let fields = this.getFields(this.inputCode);

        console.log(className);
        console.log(fields);
    }

    private getClassName(input: string): string {
        const classNameRegex = /class\s+(\w+)/;
        const matches = input.match(classNameRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        throw new Error('Failed to parse class name.');
    }

    private getFields(input: string): Property[] {
        const fieldRegex = /public\s(?!class|enum)([\w<>]*)\s([^\s\(\n]*)\s/gm;
        const fields: Property[] = [];
        let matches: RegExpExecArray | null;

        // find all fields
        while ((matches = fieldRegex.exec(input)) !== null) {
            const [, propertyType, name] = matches;
            fields.push({ name, propertyType });
        }

        if (fields.length === 0) {
            throw new Error('Failed to parse fields.');
        }

        return fields;
    }

    public inputCode = '';
}

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ParsingService {
    constructor() {}

    public getClassName(input: string): string {
        const classNameRegex = /class\s+(\w+)/;
        const matches = input.match(classNameRegex);
        if (matches && matches.length > 1) {
            return matches[1];
        }
        throw new Error('Failed to parse class name.');
    }

    public getFields(input: string): Property[] {
        const fieldRegex =
            /public\s(?!class|enum)([\w<>\[\]]*)\s([^\s\(\n]*)\s/gm;
        const fields: Property[] = [];
        let matches: RegExpExecArray | null;

        // find all fields
        while ((matches = fieldRegex.exec(input)) !== null) {
            const [, csharpType, name] = matches;

            fields.push({
                name,
                csharpType,
                protobufType: '',
                isChecked: true,
                isCollection: false,
            });
        }

        if (fields.length === 0) {
            throw new Error('Failed to parse fields.');
        }

        return fields;
    }
}

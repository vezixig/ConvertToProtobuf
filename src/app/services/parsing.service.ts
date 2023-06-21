import { Injectable } from '@angular/core';

const keyCSharpType = 'cSharpType';
const keyName = 'name';
const classNameRegex = /class\s+(?<className>\w+)/;
const fieldRegex = new RegExp(`public\\s(?!class|enum)(?<${keyCSharpType}>[\\w<>\\[\\]]*)\\s(?<${keyName}>[^\\s\\(\\n]*)\\s`, 'gm');

/**
 * The `ParsingService` class provides utility methods for parsing class definitions.
 * It can extract the class name and fields from a given input string.
 */
@Injectable({
    providedIn: 'root',
})
export class ParsingService {
    /**
     * Extracts the class name from the input string.
     * @param input The input string containing the class definition.
     * @returns The class name.
     * @throws Error if the class name cannot be parsed.
     */
    public getClassName(input: string): string {
        const match = input.match(classNameRegex);

        if (match?.groups?.['className']) {
            return match.groups['className'];
        }
        throw new Error('Failed to parse class name.');
    }

    /**
     * Extracts the fields from the input string.
     * @param input The input string containing the class definition.
     * @returns An array of fields, empty of no field was found.
     */
    public getFields(input: string): Property[] {
        const fields: Property[] = [];
        let match: RegExpExecArray | null;

        // find all fields
        while ((match = fieldRegex.exec(input))) {
            if (match.groups?.[keyName] && match.groups?.[keyCSharpType]) {
                fields.push(this.createCSharpProperty(match.groups[keyName], match.groups[keyCSharpType]));
            }
        }

        return fields;
    }

    /**
     * Creates a Property object with the given name and C# type.
     * @param name The name of the property.
     * @param csharpType The C# type of the property.
     * @returns The created Property object.
     */
    private createCSharpProperty(name: string, csharpType: string): Property {
        return {
            name: name,
            csharpType: csharpType,
            protobufType: '',
            isChecked: true,
            isCollection: false,
        };
    }
}

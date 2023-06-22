import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * Represents the code output component.
 * This component generates a protobuf definition based on the provided conversion class.
 */
@Component({
    selector: 'ctpb-code-output',
    templateUrl: './code-output.component.html',
    styleUrls: ['./code-output.component.scss'],
})
export class CodeOutputComponent {
    /**
     * Input property for the conversion class.
     * The conversion class contains the necessary information to generate the protobuf definition.
     */
    @Input() public set conversionClass(value: ConversionClass | undefined) {
        if (value !== undefined) {
            this.protobufDefinition = this.generateProtoBuf(value);
        }
    }

    /** Holds the generated protobuf definition.*/
    public protobufDefinition = '';

    /**
     * Generates the protobuf definition based on the provided conversion class.
     * @param conversionClass - The conversion class used to generate the protobuf definition.
     * @returns The generated protobuf definition as a string.
     */
    private generateProtoBuf(conversionClass: ConversionClass): string {
        // Definition starts
        let protoBuf = 'syntax = "proto3";\n\n';
        let activeProperties = conversionClass.properties.filter((o) => o.isChecked && o.protobufType);

        // Add namespaces for google messages
        let neededNamespaces = activeProperties.filter((property) => property.protobufType.includes('.')).distinct();
        neededNamespaces.forEach((namespace: Property) => (protoBuf += `import "${namespace.protobufType.toLocaleLowerCase().replaceAll('.', '/')}.proto";\n`));

        if (neededNamespaces) {
            protoBuf += '\n';
        }

        // Message start
        protoBuf += `message ${conversionClass.name} \{\n`;

        // Add property definitions
        const propertyDefinitions = activeProperties.map((property, index) => `\t${property.isCollection ? 'repeated ' : ''}${property.protobufType} ${property.name} = ${index + 1};`);
        protoBuf += propertyDefinitions.join('\n');

        // Message end
        protoBuf += '\n}';

        // Replace tabs with spaces
        protoBuf = protoBuf.replaceAll('\t', '   ');

        return protoBuf;
    }
}

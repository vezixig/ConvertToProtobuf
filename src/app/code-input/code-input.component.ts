import { Component } from '@angular/core';

@Component({
    selector: 'ctpb-code-input',
    templateUrl: './code-input.component.html',
    styleUrls: ['./code-input.component.scss'],
})
export class CodeInputComponent {
    public conversionClass?: conversionClass;

    public handleCodeInputChange() {
        this.conversionClass = undefined;

        let className = this.getClassName(this.inputCode);
        let properties = this.getFields(this.inputCode);

        properties.forEach((element) => {
            this.convertCsharpTypeToProtobufType(element);
        });

        console.log(className);
        console.log(properties);

        this.conversionClass = { name: className, properties: properties };
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

    private _conversionMatrix = new Map<string, string>([
        ['double', 'double'],
        ['decimal', 'DecimalValue'],
        ['float', 'float'],
        ['int', 'int32'],
        ['uint', 'uint32'],
        ['long', 'int64'],
        ['ulong', 'uint64'],
        ['string', 'string'],
        ['bool', 'bool'],
        ['datetime', 'google.protobuf.Timestamp'],
        ['datetimeoffset', 'google.protobuf.Timestamp'],
        ['timespan', 'google.protobuf.Duration'],
        ['double?', 'google.protobuf.DoubleValue'],
        ['float?', 'google.protobuf.FloatValue'],
        ['int?', 'google.protobuf.Int32Value'],
        ['uint?', 'google.protobuf.UInt32Value'],
        ['long?', 'google.protobuf.Int64Value'],
        ['ulong?', 'google.protobuf.UInt64Value'],
        ['string', 'google.protobuf.StringValue'],
        ['bool?', 'google.protobuf.BoolValue'],
    ]);

    public protobufTypes = [
        'double',
        'DecimalValue',
        'float',
        'int32',
        'uint32',
        'int64',
        'uint64',
        'string',
        'bool',
        'google.protobuf.Timestamp',
        'google.protobuf.Duration',
        'google.protobuf.DoubleValue',
        'google.protobuf.FloatValue',
        'google.protobuf.Int32Value',
        'google.protobuf.UInt32Value',
        'google.protobuf.Int64Value',
        'google.protobuf.UInt64Value',
        'google.protobuf.StringValue',
        'google.protobuf.BoolValue',
    ];

    private convertCsharpTypeToProtobufType(property: Property) {
        const isCollection = true;
        const csharpType = property.csharpType.toLocaleLowerCase();

        property.protobufType = this._conversionMatrix.has(csharpType)
            ? this._conversionMatrix.get(csharpType)!
            : '';

        property.isCollection = isCollection;
    }

    public inputCode = '';
}

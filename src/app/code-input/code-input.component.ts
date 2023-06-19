import { Component } from '@angular/core';
import { ParsingService } from '../parsing.service';

@Component({
    selector: 'ctpb-code-input',
    templateUrl: './code-input.component.html',
    styleUrls: ['./code-input.component.scss'],
})
export class CodeInputComponent {
    public conversionClass?: conversionClass;

    constructor(private _parsingService: ParsingService) {}

    public handleCodeInputChange() {
        this.conversionClass = undefined;

        let className = this._parsingService.getClassName(this.inputCode);
        let properties = this._parsingService.getFields(this.inputCode);

        properties.forEach((element) => {
            this.convertCsharpTypeToProtobufType(element);
        });

        console.log(className);
        console.log(properties);

        this.conversionClass = { name: className, properties: properties };
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
        ['string?', 'google.protobuf.StringValue'],
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
        const arrayRegEx = /\[\d*\]/gm;
        const collectionRegEx = /list|observablecollection/gm;
        let csharpType = property.csharpType.toLocaleLowerCase();

        let isCollection = false;

        if (arrayRegEx.test(csharpType)) {
            isCollection = true;
            csharpType = csharpType.replace(arrayRegEx, '');
        } else if (collectionRegEx.test(csharpType)) {
            isCollection = true;
            csharpType = csharpType.replace(collectionRegEx, '').slice(1, -1);
            console.log(csharpType);
        }

        property.protobufType = this._conversionMatrix.has(csharpType) ? this._conversionMatrix.get(csharpType)! : '';

        property.isCollection = isCollection;
    }

    public inputCode = '';
}

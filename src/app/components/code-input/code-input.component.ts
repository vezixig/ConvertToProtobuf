import { Component, EventEmitter, Output } from '@angular/core';
import { ParsingService } from '../../services/parsing.service';

const ARRAY_REGEX = /\[\d*\]/gm;
const COLLECTION_REGEX = /list|observablecollection/gm;
const conversionMatrix = new Map<string, string>([
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

/** CodeInputComponent is responsible for handling code input and emitting the converted result. */
@Component({
    selector: 'ctpb-code-input',
    templateUrl: './code-input.component.html',
    styleUrls: ['./code-input.component.scss'],
})
export class CodeInputComponent {
    /** Output event emitter for notifying when the input has changed and providing the conversion result. */
    @Output() InputChanged = new EventEmitter<ConversionClass>();

    /** The ConversionClass object representing the parsed class. */
    public parsedClass?: ConversionClass;
    /** The input code to be converted. */
    public inputCode = '';

    constructor(private _parsingService: ParsingService) {}

    /**
     * Handles the input code change event.
     * Converts the input code to protobuf type and emits the result.
     */
    public handleCodeInputChange() {
        this.parsedClass = undefined;
        this.InputChanged.emit(this.parsedClass);

        let className = this._parsingService.getClassName(this.inputCode);
        let properties = this._parsingService.getFields(this.inputCode);

        properties = properties.map((o) => this.convertToProtobufType(o));

        this.parsedClass = { name: className, properties: properties };
        this.InputChanged.emit(this.parsedClass);
    }

    /**
     * Handles changes on the selection of active properties and protobuf datatypes
     */
    public handleSelectionChange() {
        console.log('changing');
        this.InputChanged.emit(this.parsedClass);
    }

    /**
     * The list of supported protobuf types.
     * This is used in the template.
     */
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

    /**
     * Converts the CSharp type to the corresponding protobuf type.
     * @param property The property to convert.
     * @returns The converted property with protobuf type information.
     */
    private convertToProtobufType(property: Property): Property {
        const result = { ...property };
        let csharpType = result.csharpType.toLocaleLowerCase();
        let isCollection = false;

        if (ARRAY_REGEX.test(csharpType)) {
            isCollection = true;
            csharpType = csharpType.replace(ARRAY_REGEX, '');
        } else if (COLLECTION_REGEX.test(csharpType)) {
            isCollection = true;
            csharpType = csharpType.replace(COLLECTION_REGEX, '').slice(1, -1);
        }

        result.protobufType = conversionMatrix.has(csharpType) ? conversionMatrix.get(csharpType)! : '';
        result.isCollection = isCollection;
        return result;
    }
}

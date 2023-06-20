import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'ctpb-code-output',
    templateUrl: './code-output.component.html',
    styleUrls: ['./code-output.component.scss'],
})
export class CodeOutputComponent implements OnChanges {
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['conversionClass']) {
            this.protobufDefinition = !this.conversionClass
                ? ''
                : `syntax = "proto3";

import "google/protobuf/timestamp.proto";

message ${this.conversionClass.name} {
  int32 CenterId = 1;
  string CenterName = 2;
  google.protobuf.Timestamp DateOfOpening = 3;
  bool IsExternal = 4;
}`;
        }
    }
    @Input() conversionClass?: ConversionClass;
    protobufDefinition = '';
}

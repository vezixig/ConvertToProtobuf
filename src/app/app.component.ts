import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'ctpb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public conversionClass?: ConversionClass;

    public handleInputChanged(conversionClass: ConversionClass) {
        this.conversionClass = conversionClass;
    }
}

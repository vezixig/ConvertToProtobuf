import { ChangeDetectorRef, Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'ctpb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public conversionClass?: ConversionClass;

    constructor(private cdr: ChangeDetectorRef) {}

    /**
     * TODO:
     * 1. Show error on properties
     * 2. Responsive table
     * 3. Handle multidimensional types löik [][] and [1,3] and List<List<object>>
     */

    public handleInputChanged(conversionClass: ConversionClass) {
        // use spread operator to force change detection
        this.conversionClass = { ...conversionClass };
    }
}

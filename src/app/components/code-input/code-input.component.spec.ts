import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeInputComponent } from './code-input.component';
import '../../shared/array.prototype';
import { FormsModule } from '@angular/forms';

describe('CodeInputComponent', () => {
    let component: CodeInputComponent;
    let fixture: ComponentFixture<CodeInputComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CodeInputComponent],
        });
        fixture = TestBed.createComponent(CodeInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

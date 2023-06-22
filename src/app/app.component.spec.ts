import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CodeInputComponent, CodeOutputComponent, NavbarComponent } from './components';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [AppComponent, NavbarComponent, CodeOutputComponent, CodeInputComponent],
        })
    );

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});

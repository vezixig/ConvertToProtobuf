import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CodeInputComponent, NavbarComponent, CodeOutputComponent } from './components';
import { ParsingService } from './services/parsing.service';
import './shared/array.prototype';

@NgModule({
    declarations: [AppComponent, CodeInputComponent, NavbarComponent, CodeOutputComponent],
    imports: [BrowserModule, FormsModule, BrowserAnimationsModule, NgbModule, FontAwesomeModule],
    providers: [ParsingService],
    bootstrap: [AppComponent],
})
export class AppModule {}

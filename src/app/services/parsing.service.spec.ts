import { TestBed } from '@angular/core/testing';

import { ParsingService } from './parsing.service';

describe('ParsingServiceService', () => {
    let service: ParsingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ParsingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getClassName() should parse the class name', () => {
        // Arrange
        const input = 'class Cat';

        // Act
        const result = service.getClassName(input);

        // Assert
        expect(result).toBe('Cat');
    });

    it('getClassName() should parse a single class name', () => {
        // Arrange
        const input = 'class Cat {} class Kitten {}';

        // Act
        const result = service.getClassName(input);

        // Assert
        expect(result).toBe('Cat');
    });

    it('getClassName() should throw an error if no class is found', () => {
        // Arrange
        const input = 'Cat';

        // Act
        const func = () => service.getClassName(input);

        // Assert
        expect(func).toThrowError();
    });

    it('getClassName() should throw an error on an empty input', () => {
        // Arrange
        const input = '';

        // Act
        const func = () => service.getClassName(input);

        // Assert
        expect(func).toThrowError();
    });

    it('getFields() should return an empty array on an empty input', () => {
        // Arrange
        const input = '';

        // Act
        const result = service.getFields(input);

        // Assert
        expect(result).toEqual([]);
    });

    it('getFields() should return empty array if no fields were found', () => {
        // Arrange
        const input = 'abc cat xyz';

        // Act
        const result = service.getFields(input);

        // Assert
        expect(result).toEqual([]);
    });

    it('getFields() should find and parse the property', () => {
        // Arrange
        const input = 'oiwejfho wiehfo wheoiewh fiow public string CatName {get; set;} wqdfq wdwqdqdd qwdq wdqd';

        // Act
        const result = service.getFields(input);

        // Assert
        expect(result).toHaveSize(1);
        expect(result[0].name).toBe('CatName');
        expect(result[0].csharpType).toBe('string');
        expect(result[0].isChecked).toBeTrue();
        expect(result[0].isCollection).toBeFalse();
        expect(result[0].protobufType).toBe('');
    });
});

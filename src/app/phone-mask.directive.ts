import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MaskGenerator } from 'src/models/interfaces/mask-generator';





@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {


  private static readonly ALPHA = 'A';
  private static readonly NUMERIC = '9';
  private static readonly ALPHANUMERIC = '?';
  private static readonly REGEX_MAP = new Map([
      [PhoneMaskDirective.ALPHA, /\w/],
      [PhoneMaskDirective.NUMERIC, /\d/],
      [PhoneMaskDirective.ALPHANUMERIC, /\w|\d/],
  ]);

  private value: string = '';
  private displayValue: string = '';

  @Input('spMask')
  public maskGenerator: MaskGenerator | undefined ;

  @Input('spKeepMask')
  public keepMask: boolean = false;

  @Input('spMaskValue')
  public set maskValue(value: string) {
      if (value !== this.value) {
          this.value = value;
          this.defineValue();
      }
  };

  @Output('spMaskValueChange')
  public changeEmitter = new EventEmitter<string>();

  @HostListener('input', ['$event'])
  public onInput(event: { target: { value?: string }}): void {
      let target = event.target;
      let value = target.value;
      if(value){ this.onValueChange(value); }

  }

  constructor(private ngControl: NgControl) { }

  private updateValue(value: string) {
      this.value = value;
      this.changeEmitter.emit(value);

        PhoneMaskDirective.delay().then(
          () =>  {if(this.ngControl && this.ngControl.control){this.ngControl.control.updateValueAndValidity()}}
      );

  }

  private defineValue() {
      let value: string = this.value;
      let displayValue: string = '';

      if (this.maskGenerator) {
          let mask = this.maskGenerator.generateMask(value);

          if (value != null) {
              displayValue = PhoneMaskDirective.mask(value, mask);
              value = PhoneMaskDirective.processValue(displayValue, mask, this.keepMask);
          }
      } else {
          displayValue = this.value;
      }

      PhoneMaskDirective.delay().then(() => {

          if (this.displayValue !== displayValue && this.ngControl && this.ngControl.control) {
              this.displayValue = displayValue;
              this.ngControl.control.setValue(displayValue);
              return PhoneMaskDirective.delay();
          }
          return PhoneMaskDirective.delay();
      }).then(() => {
          if (value != this.value) {
              return this.updateValue(value);
          }
      });
  }

  private onValueChange(newValue: string) {
      if (newValue !== this.displayValue) {
          let displayValue = newValue;
          let value = newValue;

          if ((newValue == null) || (newValue.trim() === '')) {
              value = '';
          } else if (this.maskGenerator) {
              let mask = this.maskGenerator.generateMask(newValue);
              displayValue = PhoneMaskDirective.mask(newValue, mask);
              value = PhoneMaskDirective.processValue(displayValue, mask, this.keepMask);
          }

          this.displayValue = displayValue;

          if (newValue !== displayValue && (this.ngControl && this.ngControl.control)) {
              this.ngControl.control.setValue(displayValue);
          }

          if (value !== this.value) {
              this.updateValue(value);
          }
      }
  }

  private static processValue(displayValue: string, mask: string, keepMask: boolean) {
      let value = keepMask ? displayValue : PhoneMaskDirective.unmask(displayValue, mask);
      return value
  }

  private static mask(value: string, mask: string): string {
      value = value.toString();

      let len = value.length;
      let maskLen = mask.length;
      let pos = 0;
      let newValue = '';

      for (let i = 0; i < Math.min(len, maskLen); i++) {
          let maskChar = mask.charAt(i);
          let newChar = value.charAt(pos);
          let regex: RegExp = PhoneMaskDirective.REGEX_MAP.get(maskChar) ?? new RegExp('');

          if (regex) {
              pos++;

              if (regex.test(newChar)) {
                  newValue += newChar;
              } else {
                  i--;
                  len--;
              }
          } else {
              if (maskChar === newChar) {
                  pos++;
              } else {
                  len++;
              }

              newValue += maskChar;
          }
      }

      return newValue;
  }

  private static unmask(maskedValue: string, mask: string): string {
      let maskLen = (mask && mask.length) || 0;
      return maskedValue.split('').filter(
          (currChar, idx) => (idx < maskLen) && PhoneMaskDirective.REGEX_MAP.has(mask[idx])
      ).join('');
  }

  private static delay(ms: number = 0): Promise<void> {
      return new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => {});
  }

}

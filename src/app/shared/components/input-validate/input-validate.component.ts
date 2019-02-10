import { Component, OnInit, Input, ContentChild, AfterContentInit  } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input-validate',
  templateUrl: './input-validate.component.html',
  styleUrls: ['./input-validate.component.scss']
})
export class InputValidateComponent implements OnInit, AfterContentInit  {

  @Input() label: string;
  @Input() errorMessage: string;

  public input: any;

  @ContentChild(FormControlName) control: FormControlName


  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.control    
    if(this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva FormControlName')
    }
  }

  
  hasError(): boolean {    
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }
}

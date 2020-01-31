import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl } from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'rich-text',
  templateUrl: 'rich-text.html'
})
export class RichTextComponent {


  constructor(

    private sanitizer: DomSanitizer

  ) {

    // this.updateItem();

  }

  @ViewChild('editor') editor: ElementRef;
  @ViewChild('decorate') decorate: ElementRef;
  @ViewChild('styler') styler: ElementRef;

  @Input() formControlItem: FormControl;
  @Input() originalText: FormControl;
  @Input() placeholderText: string;


  getPlaceholderText() {
    if (this.placeholderText !== undefined) {
      return this.placeholderText
    }
    return '';
  }

  uniqueId = `editor${Math.floor(Math.random() * 1000000)}`;

  private stringTools = {
    isNullOrWhiteSpace: (value: string) => {
      if (value == null || value == undefined) {
        return true;
      }
      value = value.replace(/[\n\r]/g, '');
      value = value.split(' ').join('');

      return value.length === 0;
    }
  };

  private updateItem() {
    const element = this.editor.nativeElement as HTMLDivElement;

    // if (element.innerHTML === null || element.innerHTML === '') {
    //   element.innerHTML = '<div></div>';
    // }

    const reactToChangeEvent = () => {

      if (this.stringTools.isNullOrWhiteSpace(element.innerText)) {
        element.innerHTML = '<div></div>';
        // this.originalText.setValue(element.innerHTML);
        this.formControlItem.setValue(null);
      } else {

        this.originalText.setValue(element.innerHTML);
        this.formControlItem.setValue(this.sanitizer.bypassSecurityTrustHtml(element.innerHTML));

      }
    };

    element.onchange = () => reactToChangeEvent();
    element.onkeyup = () => reactToChangeEvent();
    element.onpaste = () => reactToChangeEvent();
    element.oninput = () => reactToChangeEvent();
  }

  private wireupButtons() {
    console.log('Comando dos botoes');

    const element = this.editor.nativeElement as HTMLDivElement;
    let original = this.formControlItem.value;
    let rootText = this.originalText.value;

    console.log('Dados iniciais: ', rootText);

    element.innerHTML = rootText;
    this.formControlItem.setValue(original);


    let buttons = (this.decorate.nativeElement as HTMLDivElement).getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];

      let command = button.getAttribute('data-command');

      if (command.includes('|')) {
        let parameter = command.split('|')[1];
        command = command.split('|')[0];

        button.addEventListener('click', () => {
          document.execCommand(command, false, parameter);
        });
      } else {
        button.addEventListener('click', () => {
          document.execCommand(command);
        });
      }
    }

  }

  ngAfterContentInit() {

    this.updateItem();
    this.wireupButtons();

  }

}

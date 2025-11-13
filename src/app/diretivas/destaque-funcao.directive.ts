import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDestaqueFuncao]',
  standalone: true
})
export class DestaqueFuncaoDirective implements OnInit {
  @Input() appDestaqueFuncao: string = '';

  private coresFuncao: { [key: string]: string } = {
    'Fighter': '#c41e3a',
    'Tank': '#8b4513',
    'Mage': '#4169e1',
    'Assassin': '#800080',
    'Support': '#32cd32',
    'Marksman': '#ff8c00'
  };

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const cor = this.coresFuncao[this.appDestaqueFuncao] || '#666';
    this.el.nativeElement.style.borderLeft = `4px solid ${cor}`;
    this.el.nativeElement.style.paddingLeft = '8px';
  }
}
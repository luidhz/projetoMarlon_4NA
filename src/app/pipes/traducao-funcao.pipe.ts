import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traducaoFuncao',
  standalone: true
})
export class TraducaoFuncaoPipe implements PipeTransform {
  private traducoes: { [key: string]: string } = {
    'Fighter': 'Lutador',
    'Tank': 'Tanque',
    'Mage': 'Mago',
    'Assassin': 'Assassino',
    'Support': 'Suporte',
    'Marksman': 'Atirador'
  };

  transform(valor: string): string {
    return this.traducoes[valor] || valor;
  }
}
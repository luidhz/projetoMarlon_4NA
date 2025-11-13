import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CampeoesService } from '../servicos/campeoes.service';
import { TraducaoFuncaoPipe } from '../pipes/traducao-funcao.pipe';
import { DestaqueFuncaoDirective } from '../diretivas/destaque-funcao.directive';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TraducaoFuncaoPipe,
    DestaqueFuncaoDirective
  ]
})
export class InicioPage implements OnInit {
  campeoes: any[] = [];
  campeoesFiltrados: any[] = [];
  termoBusca: string = '';
  carregando: boolean = false;

  funcoes = [
    { nome: 'Todos', icone: 'grid-outline' },
    { nome: 'Fighter', icone: 'fitness-outline' },
    { nome: 'Mage', icone: 'flame-outline' },
    { nome: 'Assassin', icone: 'skull-outline' },
    { nome: 'Support', icone: 'heart-outline' },
    { nome: 'Marksman', icone: 'arrow-forward-outline' },
    { nome: 'Tank', icone: 'shield-outline' }
  ];

  funcaoSelecionada: string = 'Todos';

  constructor(
    private servicoCampeoes: CampeoesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarCampeoes();
  }

  carregarCampeoes() {
    this.carregando = true;
    this.servicoCampeoes.obterTodosCampeoes().subscribe({
      next: (dados) => {
        this.campeoes = Object.values(dados.data);
        this.campeoesFiltrados = this.campeoes;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar campeões:', erro);
        this.carregando = false;
      }
    });
  }

  filtrarPorFuncao(funcao: string) {
    this.funcaoSelecionada = funcao;
    if (funcao === 'Todos') {
      this.campeoesFiltrados = this.campeoes;
    } else {
      this.campeoesFiltrados = this.campeoes.filter(campeao =>
        campeao.tags.includes(funcao)
      );
    }
    this.aplicarBusca();
  }

  aplicarBusca() {
    if (this.termoBusca.trim() === '') {
      if (this.funcaoSelecionada === 'Todos') {
        this.campeoesFiltrados = this.campeoes;
      } else {
        this.campeoesFiltrados = this.campeoes.filter(campeao =>
          campeao.tags.includes(this.funcaoSelecionada)
        );
      }
    } else {
      let listaBase = this.funcaoSelecionada === 'Todos'
        ? this.campeoes
        : this.campeoes.filter(campeao => campeao.tags.includes(this.funcaoSelecionada));

      this.campeoesFiltrados = listaBase.filter(campeao =>
        campeao.name.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  }

  verDetalhesCampeao(idCampeao: string) {
    this.router.navigate(['/detalhes-campeao', idCampeao]);
  }

  obterImagemCampeao(idCampeao: string): string {
    return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${idCampeao}.png`;
  }
}
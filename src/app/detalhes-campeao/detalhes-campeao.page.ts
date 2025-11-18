import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CampeoesService } from '../servicos/campeoes.service';
import { TraducaoFuncaoPipe } from '../pipes/traducao-funcao.pipe';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-detalhes-campeao',
  templateUrl: './detalhes-campeao.page.html',
  styleUrls: ['./detalhes-campeao.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TraducaoFuncaoPipe
  ]
})
export class DetalhesCampeaoPage implements OnInit {
  campeao: any = null;
  idCampeao: string = '';
  carregando: boolean = true;

  constructor(
    private rota: ActivatedRoute,
    private router: Router,
    private servicoCampeoes: CampeoesService
  ) {
    addIcons({ arrowBack })
  }

  ngOnInit() {
    // Recebendo parâmetro pela rota (requisito extra - 1 ponto)
    this.rota.params.subscribe(params => {
      this.idCampeao = params['id'];
      this.carregarDetalheCampeao();
    });
  }

  carregarDetalheCampeao() {
    this.carregando = true;
    this.servicoCampeoes.obterDetalheCampeao(this.idCampeao).subscribe({
      next: (dados) => {
        this.campeao = dados.data[this.idCampeao];
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar detalhes:', erro);
        this.carregando = false;
      }
    });
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }

  obterSplashCampeao(): string {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.idCampeao}_0.jpg`;
  }

  obterImagemHabilidade(imagemHabilidade: string): string {
    return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${imagemHabilidade}`;
  }

  obterImagemPassiva(imagemPassiva: string): string {
    return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/passive/${imagemPassiva}`;
  }

  limparHTML(texto: string): string {
    if (!texto) return '';
    
    // Remove tags HTML e mantém apenas o texto
    return texto
      .replace(/<br>/g, ' ')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();
  }
}
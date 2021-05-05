import { Component, Input, OnInit } from '@angular/core';
import { Livro } from './../../models/livro';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() Livro: Livro;

  constructor() {}

  ngOnInit() {
    this.getAlbuns();
  }

  getAlbuns(): any {}

  getSrc(imagem: any) {
    // return imagem.url;
  }
}

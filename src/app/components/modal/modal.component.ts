import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    this.getAlbuns();
  }

  getAlbuns(): any {

  }

  getSrc(imagem: any) {
    // return imagem.url;
  }
}

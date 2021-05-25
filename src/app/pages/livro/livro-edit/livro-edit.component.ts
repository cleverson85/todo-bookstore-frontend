import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Genero } from 'src/app/models/genero';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { LivroService } from 'src/app/providers/livro.service';
import { Livro } from './../../../models/livro';

@Component({
  selector: 'app-livro-edit',
  templateUrl: './livro-edit.component.html',
  styleUrls: ['./livro-edit.component.scss'],
})
export class LivroEditComponent implements OnInit, OnDestroy {
  livro: Livro;
  formGroup: FormGroup;
  subscription = new Subscription();
  titulo: string;
  submitted = false;
  selectedGenero: Genero;
  generos: Genero[] = [];
  url: any;
  file: File;

  get genero() {
    return this.formGroup.get('generoId');
  }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private livroService: LivroService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.livro = this.activatedRoute.snapshot.data['livro'];

    this.formGroup = this.formBuilder.group({
      id: [this.livro?.id || 0],
      titulo: [this.livro?.titulo, Validators.required],
      genero: [this.livro?.genero?.id],
      autor: [this.livro?.autor, Validators.required],
      sinopse: [this.livro?.sinopse],
      generoId: [this.livro?.genero?.id, Validators.required],
    });

    this.configurarGenero();
    this.configurarImagem();
    this.configureTitle(this.livro);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hasError(field: string) {
    return this.formGroup.get(field)?.errors;
  }

  save() {
    this.submitted = true;

    if (this.formGroup.valid) {
      if (!this.file) {
        this.toaster.showToastWarning('Imagem capa não foi informada.');
        return;
      }

      this.livroService.salvar(this.formGroup.value, this.file);
    }
  }

  configurarImagem() {
    if (this.livro && this.livro.imagemCapa) {
      this.url = `data:image/jpeg;base64,${this.livro.imagemCapa}`;

      fetch(this.url)
        .then(res => res.blob())
        .then(res => this.file = new File(new Array(res), ''));
    }
  }

  configurarGenero() {
    this.livroService.getGeneros()
      .subscribe((res: any) => {
        this.generos = res.filter((e: Genero) =>  e.id > 0);

        if (this.livro) {
          this.selectedGenero = this.generos.find((e: Genero) => e.id === this.livro?.genero.id);
          this.genero.setValue(this.selectedGenero.id);
        }
      });
  }

  changeGenero(value: any) {
    this.genero.setValue(value);
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };

      this.file = event.target.files[0];
    }
  }

  configureTitle(livro: Livro) {
    this.titulo = livro?.id > 0 ? 'Editar Livro' : 'Cadastrar Livro';
  }
}

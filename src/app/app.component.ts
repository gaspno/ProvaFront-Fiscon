import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { cadastro } from './model/cadastro';
import { formato } from './model/formato';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('table') dataTable!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('nomeInput') nomeInput!: ElementRef;
  @ViewChild('telefoneInput') telefoneInput!: ElementRef;

  nome: string = '';
  telefone: string = '';
  regex: RegExp =
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

  isTelefoneValid = false;
  isNomeValid = false;

  myDataArray: cadastro[] = [];
  datasoruce = new MatTableDataSource(this.myDataArray);
  displayedColumns: string[] = ['nome', 'telefone'];
  title = 'ProvaFront-Fiscon';

  addCadastro() {
    this.verifyName();
    this.verifyTelefone();

    if (this.isTelefoneValid && this.isNomeValid) {
      this.nome = this.nomeInput.nativeElement.value;
      this.telefone = this.telefoneInput.nativeElement.value;
      this.myDataArray.push({ nome: this.nome, telefone: this.telefone });
      this.datasoruce.data = this.myDataArray;
      this.dataTable.renderRows();
      this.clear();
    } else if (!this.isTelefoneValid && !this.isNomeValid) {
      alert('telefone e nome invalido');
    } else if (!this.isTelefoneValid) {
      alert('telefone invalido');
    } else {
      alert('nome invalido');
    }
  }
  clear() {
    this.telefone = '';
    this.nome = '';
    this.telefoneInput.nativeElement.value = '';
    this.nomeInput.nativeElement.value = '';
    this.isNomeValid = false;
    this.isTelefoneValid = false;
  }

  verifyName() {
    if (this.nomeInput.nativeElement.value.length >= 1) this.isNomeValid = true;
    else this.isNomeValid = false;
  }

  verifyTelefone() {
    this.telefoneInput.nativeElement.value = formato(
      this.telefoneInput.nativeElement.value.replace(' ', '')
    );
    if (this.regex.test(this.telefoneInput.nativeElement.value))
      this.isTelefoneValid = true;
    else this.isTelefoneValid = false;
  }

  ngAfterViewInit() {
    this.datasoruce.sort = this.sort;
    this.datasoruce.sort.disableClear = true;
  }
}

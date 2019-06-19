import { NgModule } from '@angular/core';
import { OnInit, Component } from '@angular/core';
import { Cliente } from './camiseta.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
    selector: 'camiseta',
    templateUrl: './camiseta.component.html',
    styleUrls: ['./camiseta.component.css']
})

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [ClienteComponent]
})

export class ClienteComponent implements OnInit {

    camiseta: camiseta;
    camisetasRef: AngularFireList<any>;
    camisetas: any[];

    constructor(private db: AngularFireDatabase) { }

    ngOnInit(): void {
        this.camiseta = new Cliente();
        this.listar();
    }

    salvar() {
        if (this.camiseta.key == null) {
            this.db.list('clientes').push(this.camiseta)
                .then((result: any) => {
                    console.log(result.key);
                });            
        } else {
            this.db.list('camiseta').update(this.camiseta.key,this.camiseta)
            .then((result: any) => {
                console.log(result.key);
            });  
        }
    }

    carregar(camiseta:camiseta) {
        this.camiseta = new camiseta(camiseta.key,
            camiseta.nome, camiseta.dataNascimento);
    }

    excluir(key:string) {
        if (confirm('Deseja realmente excluir?')) {
            this.db.list('clientes').remove(key)
                .then((result: any) => {
                    console.log(key);
                });  
        }
    }

    listar() {        
        this.getAll().subscribe(
            clientes => this.camiseta = clientes,
            error => alert(error),
            () => console.log("terminou")
          );        
    }

    getAll() : Observable<any[]> {
        return this.db.list('camisetas')
          .snapshotChanges()
          .pipe(
            map(changes => {
              return changes.map(c => (
                  { key: c.payload.key, ...c.payload.val() }));
            })
          );
      }


}
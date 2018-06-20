import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';


@IonicPage()
@Component({
  selector: 'page-add-usuario',
  templateUrl: 'add-usuario.html',
})
export class AddUsuarioPage {
  public form: FormGroup;

  constructor(public navCtrl: NavController, private utilService: UtilServiceProvider, private usuarioService: UsuarioServiceProvider, private fb: FormBuilder) {
    // validações do form
    this.form = this.fb.group({
      primeiroNome: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.required
      ])],
      segundoNome: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(150),
        Validators.required
      ])],
      senha: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(36),
        Validators.required
      ])],
    });

  }

  ionViewDidLoad() {
  }


  salvar() {
    let loading = this.utilService.showLoading();
    loading.present();
    console.log(this.form.value);
    this.usuarioService.adicionar(this.form.value)
      .then((response) => {

        //console.log(response.json());
        loading.dismiss();

        this.utilService.showAlert('Operação realizada com sucesso!');

        localStorage.setItem('usuario.email', this.form.value.email);

        this.navCtrl.pop();
      })
      .catch((response) => {
        loading.dismiss();
        this.utilService.showMessageError(response);
      });
  }

  cancelar() {
    this.navCtrl.pop();
  }

}

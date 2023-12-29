import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   // Assurez-vous que la propriété a une valeur par défaut
  errorMessage: string | undefined;
  loginForm: FormGroup;
  constructor(private loginService: LoginService,private router: Router,private formBuilder: FormBuilder) {}
 

  ngOnInit() {
    // Initialisez le formulaire réactif dans le ngOnInit
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    //console.log(this.email);
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
    this.loginService.login(formData).subscribe(
      (response) => {
        // Authentification réussie, gérer l'état de connexion
        console.log('Connexion réussie', response);
        this.router.navigate(['/tables']);
        // Vous pouvez rediriger l'utilisateur vers une autre page après la connexion réussie
      },
      (error) => {
        // Gérer les erreurs de connexion
        //this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
        console.error('Erreur de connexion', error);
      }
    );
  }
}
}

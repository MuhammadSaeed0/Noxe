import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: string = '';
  constructor(private _AuthService: AuthService, private _Router: Router) 
  {
    
  }
  registerForm = new FormGroup({
    first_name: new FormControl(null, [Validators.pattern('^[A-Za-z]{3,10}'),Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    last_name: new FormControl(null, [Validators.pattern('^[A-Za-z]{3,10}'),Validators.minLength(3),Validators.maxLength(10), Validators.required]),
    age: new FormControl(null, 
      [Validators.required, Validators.min(16), Validators.max(80)]),
    email: new FormControl(null,
      [Validators.required, Validators.email]),
    password: new FormControl(null,
      [Validators.pattern('^[A-Z][a-z0-9]{5,10}$'), Validators.required])
  });
  

submitRegisterFrom(registerForm: FormGroup){
this._AuthService.register(registerForm.value).subscribe((response) => {
if(response.message == 'success')
{
   this._Router.navigate(['/login']);
}
else
{
  this.error = response.errors.email.message;
}
});
}



  ngOnInit(): void {
  }

}
 
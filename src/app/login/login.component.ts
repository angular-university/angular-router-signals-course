import {Component, inject, signal} from '@angular/core';
import {form, FormField, submit, required, email} from '@angular/forms/signals';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.store';
import {firstValueFrom} from 'rxjs';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormField],
})
export class LoginComponent {
    private router = inject(Router);
    private auth = inject(AuthService);

    protected readonly model = signal({
        email: 'test@angular-university.io',
        password: 'test',
    });

    protected readonly loginForm = form(this.model, (s) => {
        required(s.email, {message: 'Email is required'});
        email(s.email, {message: 'Invalid email'});
        required(s.password, {message: 'Password is required'});
    });

    login() {
        submit(this.loginForm, async () => {
            await firstValueFrom(
                this.auth.login(this.model().email, this.model().password),
            );
            this.router.navigateByUrl('/courses');
        });
    }
}

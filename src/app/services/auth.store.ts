import {Service, inject, signal, computed} from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {tap, shareReplay} from 'rxjs';

const AUTH_DATA = 'auth_data';

@Service()
export class AuthService {
    private http = inject(HttpClient);

    private readonly _user = signal<User | null>(null);

    readonly user = this._user.asReadonly();
    readonly isLoggedIn = computed(() => this._user() !== null);
    readonly isLoggedOut = computed(() => this._user() === null);

    constructor() {
        const stored = localStorage.getItem(AUTH_DATA);
        if (stored) {
            this._user.set(JSON.parse(stored));
        }
    }

    login(email: string, password: string) {
        return this.http.post<User>('/api/login', {email, password}).pipe(
            tap(user => {
                this._user.set(user);
                localStorage.setItem(AUTH_DATA, JSON.stringify(user));
            }),
            shareReplay()
        );
    }

    logout() {
        this._user.set(null);
        localStorage.removeItem(AUTH_DATA);
    }
}

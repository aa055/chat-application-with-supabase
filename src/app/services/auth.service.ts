import { Injectable, NgZone, inject } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
// import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase!: SupabaseClient
  private router = inject(Router);
  private _ngZone = inject(NgZone);

  // environment.SUPABASE_URL,
  // environment.SUPABASE_KEY

  constructor() { 
    // console.log("SUPABASE_URL: ", process.env['SUPABASE_URL']);
    // console.log("SUPABASE_KEY: ", process.env['SUPABASE_KEY']);

    // Define the supabase client with the url and key
    this.supabase = createClient(
      process.env['SUPABASE_URL'],
      process.env['SUPABASE_KEY']
    )

    // You should only redirect if the user is currently on the login page. Otherwise, it causes unexpected navigation on app load.
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log("evnt: ", event);
      console.log("session: ", session);
      
      localStorage.setItem('session', JSON.stringify(session?.user));

      const currentUrl = this.router.url;

      if (session?.user && currentUrl === '/login') {
        this._ngZone.run(() => {
          this.router.navigate(['/chat']);
        })
      } else if (!session?.user && currentUrl !== '/login') {
        this._ngZone.run(() => {
          this.router.navigate(['/login']);
        })
      }
    });


  }


  get isLoggedIn(): boolean {
    const user = localStorage.getItem('session')
    try {
      // if the value is null or invalid or undefined then return 
      return !!(user && JSON.parse(user));
    } catch {
      return false;
    }
  }

  async signInWithGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin  // Ensures the current domain is used
      }
    });
  }

  // will clear the entire local storage and the session storage in the browser
  async signOut(){
    await this.supabase.auth.signOut();
  }







}

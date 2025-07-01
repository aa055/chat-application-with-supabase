import { Injectable, inject } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase!: SupabaseClient
  private router = inject(Router);

  constructor() { 
    // Define the supabase client with the url and key
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )

    // You should only redirect if the user is currently on the login page. Otherwise, it causes unexpected navigation on app load.
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log("evnt: ", event);
      console.log("session: ", session);
      
      localStorage.setItem('session', JSON.stringify(session?.user));

      const currentUrl = this.router.url;

      if (session?.user && currentUrl === '/login') {
        this.router.navigate(['/chat']);
      } else if (!session?.user && currentUrl !== '/login') {
        this.router.navigate(['/login']);
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
      provider: 'google'
    });
  }

  // will clear the entire local storage and the session storage in the browser
  async signOut(){
    await this.supabase.auth.signOut();
  }







}

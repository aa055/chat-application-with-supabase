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
    // define the supabase client with the url and key
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )

    // receive a notification whenever a auth event happens
    this.supabase.auth.onAuthStateChange( (event, session) => {
      console.log("evnt: ", event);
      console.log("session: ", session);
      
      localStorage.setItem('session', JSON.stringify(session?.user));
      if(session?.user){
        this.router.navigate(['/chat']);
      }
    });
  }


  get isLoggedIn(): boolean {
    const user = localStorage.getItem('session') as string
    return user === 'undefined' ? false : true
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

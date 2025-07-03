import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private supabase!: SupabaseClient;

  constructor() { 
    // Define the supabase client with the url and key
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  async chatMessage(text: string) {
    try {
      const {data, error} = await this.supabase.from('chat').insert( {text} );
      if (error) {
        alert(error.message);
      }
    } catch(error) {
      alert(error);
    }
  }

}

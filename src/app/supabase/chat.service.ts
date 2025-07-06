import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Ichat } from '../interface/chat-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private supabase!: SupabaseClient;
  public savedChat = signal({})

  constructor() { 
    // Define the supabase client with the url and key
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  async sendChatMessage(text: string) {
    try {
      const {data, error} = await this.supabase.from('chat').insert( {text} );
      if (error) {
        alert(error.message);
      }
    
    } catch(error) {
      throw error;
    }
  }

  async listChatMessages() {
    try {
      const  {data, error} = await this.supabase.from('chat').select('*,users(*)')
      if (error) {
        alert(error.message);
      }

      return data;
    
    } catch(error) {
      throw error;
    }
  }

  async deleteChatMessage(id: string) {
    const data = await this.supabase.from('chat').delete().eq('id', id);
    return data
  }


  selectedChatMessage(msg: Ichat) {
    this.savedChat.set(msg);
  }




}

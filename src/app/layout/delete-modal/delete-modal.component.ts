import { Component, effect, inject } from '@angular/core';
import { ChatService } from '../../supabase/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  private chatService = inject(ChatService)
  private router = inject(Router)

  constructor() {
    effect(() => {
      console.log("Delete component: ", this.chatService.savedChat())
    })
  }

  onDeleteChatMessage(){
    const id = (this.chatService.savedChat() as {id: string}).id
    // console.log("onDeleteChatMessage: ", id)

    this.chatService.deleteChatMessage(id)
      .then(() => {
        // alert('Message deleted.')
        // reroute and refresh the chat without reloading the enitere page
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then( () => {
          this.router.navigate([currentUrl])
        })
      }).catch((err)=>{
        console.log(err)
        alert(err.message);
      })

  
  }



}

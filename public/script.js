let socket = io();

let qs = sel => document.querySelector(sel);

// emit events

qs('#sendButton').onclick = () => {
   socket.emit('chat', {
      name: qs('#name').value,
      message: qs('#message').value
   });

   qs('#message').value = "";
};

socket.on('chat', data=>{
   qs('#chat').insertAdjacentHTML('beforeend', `
      <div>
         <div><b>${data.name}:</b> ${data.message}</div>
         <hr />
      </div>
   `);

   qs('#chat > div:last-of-type').scrollIntoView({
      behavior: 'smooth'
   });
});

document.querySelectorAll('.walkthrough').forEach(section=>{const buttons=[...section.querySelectorAll('[data-step]')], panels=[...section.querySelectorAll('.walk-step')];buttons.forEach((button,index)=>button.addEventListener('click',()=>{buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));panels.forEach((panel,i)=>panel.hidden=i!==index)}))});

const coverTrigger=document.querySelector('.project-cover');
const imageDialog=document.querySelector('.image-dialog');
if(coverTrigger && imageDialog){
  coverTrigger.addEventListener('click',()=>imageDialog.showModal());
  imageDialog.querySelector('.image-dialog-close').addEventListener('click',()=>imageDialog.close());
  imageDialog.addEventListener('click',event=>{if(event.target===imageDialog)imageDialog.close()});
}

'use strict';
const STORAGE_KEY = 'todoTasks';
let tasks = [];              
let currentFilter = 'all';
let currentId = null;

const $ = id => document.getElementById(id);
const input      = $('todoInput');
const addBtn     = $('addBtn');
const listElm    = $('todoList');
const tabs       = document.querySelectorAll('.tab');
const delDoneBtn = $('delDoneBtn');
const delAllBtn  = $('delAllBtn');

const overlay       = $('overlay');
const renameBox     = $('renameBox');
const renameField   = $('renameField');
const saveRenameBtn = $('saveRename');
const cancelRename  = $('cancelRename');
const confirmBox    = $('confirmBox');
const confirmText   = $('confirmText');
const confirmOk     = $('confirmOk');
const confirmCancel = $('confirmCancel');

const uuid  = () => Date.now() + Math.random();
const save  = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
const load  = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  tasks = saved ? JSON.parse(saved) : [
   


  if (!saved) save();
};
const validate = txt => txt.trim() && txt.trim().length >= 5 && !/^\d/.test(txt.trim());

const render = () => {
  listElm.innerHTML = '';

  const show = tasks.filter(t =>
    currentFilter === 'all'  ? true :
    currentFilter === 'done' ? t.done : !t.done
  );

  show.forEach(t => {
    const li = document.createElement('li');
    li.className = 'item' + (t.done ? ' done' : '');

    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.className = 'chk';
    chk.checked = t.done;
    chk.onchange = () => toggleTask(t.id);

    const edit = document.createElement('button');
    edit.className = 'icon-btn edit';
    edit.title = 'Edit';
    edit.onclick = () => openRename(t.id);

    const del = document.createElement('button');
    del.className = 'icon-btn del';
    del.title = 'Delete';
    del.onclick = () => openConfirm(t.id);

    const span = document.createElement('p');
    span.className = 'text';
    span.textContent = t.text;

   
    listElm.append(li); 
    + li.append(span, chk, edit, del);
  }
);

  delDoneBtn.disabled = !tasks.some(t => t.done);
  delAllBtn.disabled  = tasks.length === 0;
}; 
const addTask = () => {
  if (!validate(input.value)) return alert('Task must be at least 5 characters and not start with a number.');
  tasks.push({id:uuid(),text:input.value.trim(),done:false});
  input.value = '';
  save(); render();
};
const toggleTask = id => 
  { 
    tasks = tasks.map(t=>t.id===id?
      {...t,done:!t.done}:t);
       save(); 
       render();
       };
const deleteTask = id =>
   { 
    tasks = tasks.filter(t=>t.id!==id);
     save();
      render();
     }
     ;
const deleteDone = () => { tasks = tasks.filter(t=>!t.done);
   save(); 
   render();
   }
   ;

const showOverlay = () => overlay.style.display = 'block';
const hideOverlay = () => 
  {
  overlay.style.display = 'none';
  renameBox.style.display = 'none';
  confirmBox.style.display = 'none';
};

const openRename = id => 
  {
  currentId = id;
  renameField.value = tasks.find(t=>t.id===id).text;
  renameBox.style.display = 'block';
  showOverlay();
  renameField.focus();
};
const openConfirm = id => 
  {
  currentId = id;
  confirmText.textContent =
    id === 'doneGroup' ? 'Delete all done tasks?'
    : id === 'allGroup' ? 'Delete ALL tasks?'
    : 'Are you sure you want to delete this task?';
  confirmBox.style.display = 'block';
  showOverlay();
};

saveRenameBtn.onclick = () =>
   {
  if (!validate(renameField.value)) return alert('Invalid name');
  tasks = tasks.map(t=>t.id===currentId?{...t,text:renameField.value.trim()}:t);
  save();
   render(); 
   hideOverlay();
};
cancelRename.onclick = hideOverlay;
confirmOk.onclick = () => 
  {
  if (currentId === 'doneGroup') 
    {
    deleteDone();
  } 
  else if (currentId === 'allGroup') 
    {
    tasks = []; save(); render();
  } 
  else
   {
    deleteTask(currentId);
  }
  hideOverlay();
};
confirmCancel.onclick = hideOverlay;
overlay.onclick = hideOverlay;
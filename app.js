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
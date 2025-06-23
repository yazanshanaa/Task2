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
   

  ];
  if (!saved) save();
  
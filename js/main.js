const inputElem = document.getElementById('title');
const creatBtn = document.getElementById('create');
const listElem = document.getElementById('list');

const person = {
  firstName: 'Liza',
  lastName: 'Mikhina',
  getFullName: function () {
    console.log(this.firstName + ' ' + this.lastName)
  }
}

const notes = [
  {
    title: 'Записать блок про массивы',
    completed: false
  },
  {
    title: 'Рассказать теорию объектов',
    completed: true
  }
];

function render() {
  listElem.innerHTML = '';
  if (notes.length === 0) {
    listElem.innerHTML = '<p>Нет заметок</p>'
  }
  for (let i = 0; i < notes.length; i++) {
    listElem.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
  }

  // for (let note of notes) {
  //   listElem.insertAdjacentHTML('beforeend', getNoteTemplate(note));
  // }
}

render();

listElem.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index)
    const type = event.target.dataset.type

    if (type === 'toggle') {
      notes[index].completed = !notes[index].completed
    } else if (type === 'remove') {
      notes.splice(index, 1)
    }

    render();
  }
}

function getNoteTemplate(note, index) {
  return `
  <li class="list-group-item d-flex justify-content-between align-items-center">
      <span class = "${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
      <span>
        <span class="btn btn-small btn-${note.completed ? 'warning' : 'success'}" 
          data-index = "${index}" data-type = "toggle">&check;</span>
        <span class="btn btn-small btn-danger" data-index = "${index}" 
          data-type = "remove">&times;</span>
      </span>
  </li>
  `
}

creatBtn.onclick = function () {
  if (inputElem.value.length === 0) {
    return
  }

  const newNote = {
    title: inputElem.value,
    completed: false,
  }

  notes.push(newNote);
  render();

  inputElem.value = '';
}
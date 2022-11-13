const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    // console.log(notes);

    //add in local storage (in form of string only)
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div> 
    <textarea class="${text ? "hidden" : ""}"></textarea> `; //if there is text then hide the textarea else do not hide

    note.insertAdjacentHTML('afterbegin',htmlData);   // insert this html part in div with class name = note
    // console.log(note);

    //getting the references
    const editButton = note.querySelector('.edit');  // queryselectorbecause they aare inside the note
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //deleting the node
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    //toggle using edit icon
    //if therre is already written somwthing there then if we want to edit that then we should write like this
    textArea.value = text;
    mainDiv.innerHTML = text;
    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');  //here toggle means if it is hidden then unhide it and reverse
        textArea.classList.toggle('hidden');
    })
    textArea.addEventListener('change', (event) => {
        const value = event.target.value;   // value that user has written
        mainDiv.innerHTML=value;  //on saving data it should be visible in textarea
        updateLSData(); //calling function | store data in local storage
    })

    document.body.appendChild(note); //appends a node as the last child of the node (body)
}

//getting data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note) => addNewNote(note))
};

addButton.addEventListener('click', () => addNewNote() );
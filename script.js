//================= Opens Edit Modal =========================
function openEditModal(note, index) {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");

    modal.classList.add("active");
    overlay.classList.add("active");

    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");
    
    modalTitle.value = note.title; 
    modalContent.value = note.note; 

    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        modal.classList.remove("active");
        overlay.classList.remove("active");
    });

    const saveButton = document.querySelector(".save-button");
    saveButton.onclick = () => saveChanges(index); 
}

////================= Saves the edited changes =========================
function saveChanges(index) {
    const noteList = JSON.parse(localStorage.getItem("noteList")) || [];
    const modalTitle = document.getElementById("modal-title").value; 
    const modalContent = document.getElementById("modal-content").value; 

    noteList[index].title = modalTitle; 
    noteList[index].note = modalContent; 

    localStorage.setItem("noteList", JSON.stringify(noteList));

    document.getElementById("modal").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
    
    showNotes(); 
}
//================= Shows Notes =========================
function showNotes() {
    const notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = ""; 

    const noteList = JSON.parse(localStorage.getItem("noteList")) || [];

    noteList.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "individual-note";
        noteDiv.setAttribute("draggable",true);
        noteDiv.setAttribute("data-id", note.id); //change made

        noteDiv.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", index); // Set data to be dragged
        });

        const titleSpan = document.createElement("span");
        titleSpan.className = "note-title";
        titleSpan.innerText = note.title;

        const noteContent = document.createElement("span");
        noteContent.className = "note-content";
        noteContent.innerText = note.note;

        const editIcon = document.createElement("i");
        editIcon.className = "fas fa-edit edit-icon";
        editIcon.style.color = "blue";
        editIcon.style.cursor = "pointer";
        editIcon.addEventListener("click", () => openEditModal(note, index)); 

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash-alt delete-icon";
        deleteIcon.style.color = "red";
        deleteIcon.style.cursor = "pointer";
        deleteIcon.addEventListener("click", () => deletePopUp(note,index)
            // noteList.splice(index, 1);
            // localStorage.setItem("noteList", JSON.stringify(noteList)); 
            // noteDiv.remove(); 
        );

        const viewIcon= document.createElement("i");
        viewIcon.className = "fas fa-book-reader view-icon";
        viewIcon.style.color= "green";
        viewIcon.style.cursor = "pointer";
        viewIcon.addEventListener("click", ()=> openViewModal(note,index));


        noteDiv.appendChild(titleSpan);
        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(editIcon);
        noteDiv.appendChild(deleteIcon);
        noteDiv.appendChild(viewIcon);

        notesContainer.appendChild(noteDiv);

    });
}
//================= Opens View Modal =========================
function openViewModal(note,index){
    const viewModal= document.getElementById("view-modal");
    const overlay = document.getElementById("overlay");

    viewModal.classList.add("active");
    overlay.classList.add("active");

    const viewModalTitle = document.getElementById("view-modal-title");
    const viewModalBody = document.getElementById("view-modal-body");

    viewModalTitle.innerText = note.title;
    console.log(note.title);
    viewModalBody.innerText = note.note;
    console.log(note.note);


    const viewCloseButton = document.querySelector(".view-close-button");
    viewCloseButton.addEventListener("click", () => {
        viewModal.classList.remove("active");
        overlay.classList.remove("active");
    });

    // const viewModalTitle = document
}
//=============== Delete Confirmation popup==================
function deletePopUp(note,index){
    const confirmPopUp = document.getElementById("delete-confirmation");
    const overlay = document.getElementById("overlay");

    confirmPopUp.classList.add("active");
    overlay.classList.add("active");

    const noButton = document.querySelector(".no");
    noButton.addEventListener("click", () => {
        confirmPopUp.classList.remove("active");
        overlay.classList.remove("active");
    })

    const yesButton = document.querySelector(".yes");
    yesButton.addEventListener("click", () => {
        const noteList = JSON.parse(localStorage.getItem("noteList")) || [];
            noteList.splice(index, 1);
            localStorage.setItem("noteList", JSON.stringify(noteList)); 
            
            const noteDiv = document.getElementById("notes");
            noteDiv.removeChild(noteDiv.childNodes[index]);

            confirmPopUp.classList.remove("active");
            overlay.classList.remove("active");
    })

    showNotes();
}



//================= Add Notes =========================
function addNewNote(){
    console.log("Welcome to add new note function")
    const addNewModal = document.getElementById("add-note-modal");
    const overlay = document.getElementById("overlay");

    addNewModal.classList.add("active");
    overlay.classList.add("active");

    const closeButton = document.querySelector(".add-note-close-button");
    closeButton.addEventListener("click", () => {
        addNewModal.classList.remove("active");
        overlay.classList.remove("active");
    });

}

function addNote(){
    console.log("hello world")
    var title = document.getElementById("add-note-modal-title").value;
    var note = document.getElementById("add-note-modal-content").value;
    var noteId = generateUniqueId(); //change made

    var noteList;
    if(localStorage.getItem("noteList")==null){
        noteList = [];

    }else{
        noteList = JSON.parse(localStorage.getItem("noteList"));
    }

    if(title == "" && note == "")
    {
        alert("You cannot add an empty note");
    }
    else{
        noteList.push({
            id: noteId, ///change made
            title : title,
            note: note,
        });
    }
    

    localStorage.setItem("noteList", JSON.stringify(noteList));

    document.getElementById("add-note-modal-title").value = "";
    document.getElementById("add-note-modal-content").value = "";

    document.getElementById("add-note-modal").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");

    showNotes();
}

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

//================Search FUnctionality=======================
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase();
    const notes = document.querySelectorAll(".individual-note");

    notes.forEach(note=>{
        const notesText = note.textContent.toLowerCase();
        const visible = notesText.includes(search);

        if(visible){
           console.log("hell0000000")
            note.style.display = "block";
        }
        else{
            note.style.display = "none";
        }
    });
});
//=================Drag and Drop======================
// const draggables = document.querySelectorAll(".individual-note");
// const containers =  document.querySelectorAll(".notes-list");

// containers.forEach(draggable => {   
//     draggable.addEventListener('dragstart', (e)=>{
//         console.log(e);
//     })
// })

const draggables = document.querySelectorAll(".individual-note");
const containers = document.querySelectorAll(".notes-list");

draggables.forEach(note => {
    note.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("text/plain", e.target.dataset.index); // Set data to be dragged
    })
});

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault(); // Allow drop
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        const fromIndex = e.dataTransfer.getData("text/plain");
        const toIndex = Array.from(container.children).indexOf(e.target.closest('.individual-note'));
        console.log(toIndex);

        const noteList = JSON.parse(localStorage.getItem("noteList")) || [];

        const temp = noteList[fromIndex];
        noteList[fromIndex] = noteList[toIndex];
        noteList[toIndex] = temp;
        // const [draggedNote] = noteList.splice(fromIndex, 1);
        // noteList.splice(toIndex, 0, draggedNote);

        localStorage.setItem("noteList", JSON.stringify(noteList));

        showNotes();
    });
});


// Get all note elements

showNotes();


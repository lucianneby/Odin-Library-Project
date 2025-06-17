//TODO:
//- make checkbox trigger read() method to toggle this book in question's read status in the myLibrary array and not just on page

const myLibrary = [];

document.addEventListener("DOMContentLoaded", function() {

  displayBooks();

  // === ADD BOOK ===
  const addBookForm = document.getElementById('add-book-form');

  if (addBookForm) {
    addBookForm.addEventListener('submit', function(event) {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const year = document.getElementById('year').value;
      const read = document.getElementById('read').checked;

      event.preventDefault();
      addToLibrary(title, author, year, read);
      displayBooks();
      addBookForm.reset();
    });
  } else {
    console.error('No addBookForm found in DOM');
  }

  // === REMOVE BOOK ===
  const libraryTableBody = document.getElementById('my-library-body');

  if (libraryTableBody) {

    libraryTableBody.addEventListener('click', function(event) {

      if (event.target.classList.contains('remove-btn')) {
        const bookIdToRemove = event.target.dataset.id;

        removeFromLibrary(bookIdToRemove);
        displayBooks();

      }
    });

    // === CHANGE CHECKSTATUS ===
    libraryTableBody.addEventListener('change', function(event) {
      if (event.target.classList.contains('book-read-status')) {
        const bookId = event.target.dataset.id;
        const newReadStatus = event.target.checked;

        const bookToUpdate = myLibrary.find(book => book.id === bookId);
        if (bookToUpdate) {
          bookToUpdate.read = newReadStatus;
          console.log(`Book "${bookToUpdate.title}" read status changed to: ${newReadStatus}`);
        }
      }
    });
  } else {
    console.error('your library table could not be found');
  }

});


// === HELPER FUNCTIONS ===

function displayBooks() {
  const libraryTableBody = document.getElementById('my-library-body');

  if (!libraryTableBody) {
    console.error('no libraryTableBody found in DOM');
    return;
  }

  libraryTableBody.innerHTML = '';

  if (myLibrary.length === 0) {
    libraryTableBody.innerHTML = `<tr><td colspan="5">You haven't any books /:</td></tr>`;
    return;
  }

  for (const book of myLibrary) {
    let checkedStatus = '';
 
    if (book.read) {
      checkedStatus = 'checked';
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td><input type="checkbox" class="book-read-status" data-id="${book.id}" ${checkedStatus}></td>
      <td><button class="btn btn-danger remove-btn" data-id="${book.id}">Remove</button></td>
    `;
    libraryTableBody.appendChild(row);
  }
}


function addToLibrary(title, author, year, read) {
  myLibrary.push(new Book(title, author, year, read));
}


function removeFromLibrary(bookIdToRemove) {
  const indexToRemove = myLibrary.findIndex(book => book.id === bookIdToRemove);

  if (indexToRemove !== -1) {
    myLibrary.splice(indexToRemove, 1);
    console.log(`book with id ${bookIdToRemove} was removed.`);
  } else {
    console.log('book with corresponding id could not be found.');
  }
}


function Book(title, author, year, read) {
  if (!new.target) {
    throw Error('books need to be created with new keyword');
  }
  this.title = title;
  this.author = author;
  this.year = parseInt(year);
  this.read = read;
  this.id = '_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
}

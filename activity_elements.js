const btnn = document.getElementsByClassName('btn')[0];
const loading = document.getElementsByClassName('loading')[0];

btnn.addEventListener('mouseover', function() {
    btnn.style.backgroundColor = 'white';
});
  
btnn.addEventListener('mouseout', function() {
    btnn.style.backgroundColor = '#dfeaff';
});

function Loading(){
    loading.style.display = 'block';
  }
  
function StopLoading(){
   loading.style.display = 'none';
}

function SetAnimation(){
    list = Array.from(books_block.children);
    list?.forEach(element => {
        element.addEventListener('mouseover', function() {
          element.style.backgroundColor = '#dfeaff';
        });
      
        element.addEventListener('mouseout', function() {
          element.style.backgroundColor = '#bcdaff';
        });
      });
}
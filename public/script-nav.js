window.addEventListener('resize', function() {
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var myLinksElement = document.getElementById('myLinks');

  if (screenWidth > 767) {
    myLinksElement.style.display = 'none';
  } else {
    myLinksElement.style.display = '';
  }
});

document.getElementById("icon").addEventListener("click", hamburgerButton);

function hamburgerButton() {
    if (myLinks.style.display === 'block'){
        myLinks.style.display = 'none'
    } else {
        myLinks.style.display = 'block'
    }
        
}
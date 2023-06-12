function checkScroll() {
    var imageElements = document.querySelectorAll('.image-container img');
    
    for (var i = 0; i < imageElements.length; i++) {
      var imageElement = imageElements[i];
      var elementTop = imageElement.getBoundingClientRect().top;
      
      if (elementTop < window.innerHeight) {
        imageElement.style.opacity = 1;
        imageElement.style.transform = 'translateX(0)';
      }
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  
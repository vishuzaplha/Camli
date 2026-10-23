function loadComponent(file, containerID, callback){
  fetch(file)
  .then(res =>res.text())
  .then(data =>{
    document.getElementById(containerID).innerHTML = data;

    if(callback){
      callback();
    }
  })
}

loadComponent("navbar.html","navbar",() => {
  
  const menuBtn = document.getElementById("menu-btn");
  const navOptions = document.getElementById("nav-bar-options");
  const pageContent = document.getElementById("page-content") || document.getElementById("tools-main");
  
  // MENU TOGGLE
  menuBtn.addEventListener("click", () => {
      navOptions.classList.toggle("active");
      menuBtn.classList.toggle("active");
      pageContent?.classList.toggle("blur");


     document.addEventListener("pointerdown", (e) => {

    if (
        !navOptions.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        navOptions.classList.remove("active");
        menuBtn.classList.remove("active");
        pageContent?.classList.remove("blur");
    }

    });

   window.addEventListener("scroll", () => {
    navOptions.classList.remove("active");
    menuBtn.classList.remove("active");
    pageContent?.classList.remove("blur");
  });
  });

})






loadComponent("mode-changer.html","mode-changer",() => {
   

  const toggleBtn = document.getElementById("theme-toggle");
  const mobileToggleBtn = document.getElementById("theme-toggle-mobile");
  
  
  // THEME FUNCTION
  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      if (toggleBtn) toggleBtn.textContent = "☀️";
      if (mobileToggleBtn) mobileToggleBtn.textContent = "LIGHT MODE ☀️";
    } else {
      localStorage.setItem("theme", "light");
      if (toggleBtn) toggleBtn.textContent = "🌙";
      if (mobileToggleBtn) mobileToggleBtn.textContent = "DARK MODE 🌙";
    }
  }
  
  // DESKTOP BUTTON
  toggleBtn.addEventListener("click", toggleTheme);
  
  // MOBILE BUTTON
  mobileToggleBtn.addEventListener("click", toggleTheme);
  
  // LOAD SAVED THEME
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️";
    if (mobileToggleBtn) mobileToggleBtn.textContent = "LIGHT MODE ☀️";
  }
})
  




// blog sec js 
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
        const targetLink = card.querySelector('.stretched-link');
        if (targetLink) {
            window.location.href = targetLink.getAttribute('href');
        }
    });
});
 

// tools sec js
document.querySelectorAll('.tool-item').forEach(tool => {
    tool.addEventListener('click', () => {
        const targetTool = tool.querySelector('.main-tools');
        if (targetTool) {
            window.location.href = targetTool.getAttribute('href');
        }
    });
    
});


// faq sec

// 1. Core Toggle
document.querySelectorAll('.faq-question').forEach(questionBlock => {
    questionBlock.addEventListener('click', (event) => {
        
        event.stopPropagation(); 
        
        const accordionItem = questionBlock.parentElement;
        
       
        document.querySelectorAll('.faq-accordian').forEach(item => {
            if (item !== accordionItem) {
                item.classList.remove('active');
            }
        });

        
        accordionItem.classList.toggle('active');
    });
});

// 2. Global Event 
const outsideEvents = ['click', 'touchstart', 'scroll'];

outsideEvents.forEach(eventType => {
    window.addEventListener(eventType, (event) => {
        
        const openAccordion = document.querySelector('.faq-accordian.active');
        
        if (openAccordion) {
            
            if (!openAccordion.contains(event.target)) {
                openAccordion.classList.remove('active');
            }
        }
    }, { passive: true }); 
});



 







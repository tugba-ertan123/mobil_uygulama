document.addEventListener("DOMContentLoaded", function () {
  // Hamburger menü için elemanları seç
  const menuToggle = document.getElementById("hamburger");
  const menu = document.getElementById(".menu");

  // Menü açma/kapama işlevi
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  } else {
    console.error("Hamburger menü bulunamdadı.");
  }
  const blogContainer = document.getElementById("blog-container");
  fetch("data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("JSON verisi yüklenemedi.");
      }
      return response.json();
    })
    .then(data => {
      data.forEach(blog => {
        const blogCard = document.createElement("div");
        blogCard.className = "card";
        blogCard.innerHTML = `
          <img src="${blog.image}" alt="Blog Resmi">
          <h2>${blog.title}</h2>
          <p>${blog.content.substring(0, 100)}...</p>
          <a href="blog.html?post=${blog.id}">Daha Fazla Oku</a>
        `;
        blogContainer.appendChild(blogCard);
      });
    })
    .catch(error => {
      console.error("Hata:", error);
      blogContainer.innerHTML = "<p>Blog yüklenirken bir hata oluştu.</p>";
    });
  // Blog içeriğini yüklemek için
  const blogId = new URLSearchParams(window.location.search).get('post');
   fetch('data.json')
     .then(response => response.json())
     .then(data => {
       const blog = data.find(b => b.id === parseInt(blogId));
       if (blog) {
         document.getElementById('blog-title').innerText = blog.title;
         document.getElementById('blog-image').src = blog.image;
         document.getElementById('blog-content').innerText = blog.content;
      } else {
         document.getElementById('blog-content').innerText = "Blog bulunamadı.";
      }
    })
    .catch(error => console.error("JSON verisi yüklenemedi.", error));

    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
  
    // LocalStorage'dan karanlık mod durumunu al
    const darkMode = localStorage.getItem("darkMode");
  
    if (darkMode === "enabled") {
      body.classList.add("dark-mode");
      darkModeToggle.textContent = "☀️";
    }
  
    // Karanlık mod düğmesine tıklandığında durum değiştir
    darkModeToggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      const isDarkMode = body.classList.contains("dark-mode");
  
      if (isDarkMode) {
        localStorage.setItem("darkMode", "enabled");
        darkModeToggle.textContent = "☀️";
      } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeToggle.textContent = "🌙";
      }
    });
  });
  
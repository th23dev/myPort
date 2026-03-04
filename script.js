document.addEventListener('DOMContentLoaded', (event) => {
   // Detecta se a tela é 4K ou maior
   const is4K = window.innerWidth >= 3840;

   tsParticles.load("particles-container", {
      fpsLimit: 60,
      interactivity: {
         events: {
            onHover: {
               enable: true,
               mode: "repulse",
            },
            onClick: {
               enable: false,
               mode: "push",
            },
            resize: true,
         },
         modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 },
         },
      },
      particles: {
         color: { value: "#ffffff" },
         links: {
            color: "#a1a1a1",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
         },
         collisions: { enable: true },
         move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 1,
            straight: false,
         },
         number: {
            density: { enable: true, area: 800 },
            value: is4K ? 40 : 80, // menos partículas em 4K
         },
         opacity: { value: 0.5 },
         shape: { type: "circle" },
         size: {
            value: is4K ? { min: 1, max: 3 } : { min: 1, max: 5 }, // partículas menores em 4K
         },
      },
      detectRetina: true,
   });
});


//* projects slider

let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let projectsBox = document.getElementById("projects-box");
let pageNumbers = document.getElementById("page-numbers");
let slideIndex = 0;

const projects = [
   [
      { title: 'Starbucks', url: "https://th23dev.github.io/THaua23-Starbucks-landing-page/", tags: ['html', 'css', 'js'] },
      { title: 'FP Sellection', url: "https://th23dev.github.io/car/", tags: ['html', 'css', 'js'] },
      { title: 'CRUD register', thumbnail: 'components/thumbnails/crud.png', url: "https://registrodeempresa.great-site.net/", tags: ['php', 'Sql', 'Bootstrap'] },
      { title: 'SCM', url: "https://th23dev.github.io/SCM/", tags: ['html', 'css', 'js'] },
      { title: 'Starbucks', url: "https://th23dev.github.io/starbucks/", tags: ['html', 'css', 'js'] },
      { title: 'Refri', url: "https://th23dev.github.io/refri/", tags: ['html', 'css', 'js'] }
   ],
   [
      { title: 'Mall System', url: "https://th23dev.github.io/Sistema-Mercado/", tags: ['html', 'css', 'js'] },
      { title: 'NewsLatter', url: "https://th23dev.github.io/THaua23-THaua23-Landing-page-Newslatter/", tags: ['html', 'css', 'js'] },
      { title: 'TaskBoard', url: "https://th23dev.github.io/TaskBoard/", tags: ['html', 'css', 'js'] },
      { title: 'calculator', url: "https://th23dev.github.io/calculator/", tags: ['html', 'css', 'js'] },
      { title: 'CommentVue', url: "https://th23dev.github.io/commentVue/", tags: ['html', 'Vue', 'Bootstrap'] },
      { title: 'form', url: "https://th23dev.github.io/form/", tags: ['html', 'css'] }
   ],
   [
      { title: 'voice', url: "https://th23dev.github.io/voice/", tags: ['html', 'css', 'js'] },
      { title: 'ToDoList', url: "https://th23dev.github.io/todolist/", tags: ['html', 'css', 'js'] },
      { title: 'penJS', url: "https://th23dev.github.io/penJS/", tags: ['html', 'css', 'js'] }
   ]
];

function updateProjects() {
   projectsBox.innerHTML = ""

   projects[slideIndex].forEach(project => {
      const link = document.createElement("a")
      link.href = project.url
      link.target = "_blank"
      link.className = "project-link"
      link.setAttribute("translate", "no")

      if (project.thumbnail) link.style.backgroundImage = `url('${project.thumbnail}')`
      else {
         const iframe = document.createElement("iframe")
         iframe.src = project.url
         link.appendChild(iframe)
      }

      const dataBoard = document.createElement("div")
      dataBoard.classList.add("data-board")

      const title = document.createElement("h4")
      title.innerText = project.title
      dataBoard.appendChild(title)

      const tagBox = document.createElement("div")
      tagBox.classList.add("tag-box")
      project.tags.forEach(item => {
         const tag = document.createElement("span")
         tag.innerText = item

         tagBox.appendChild(tag)
      })
      dataBoard.appendChild(tagBox)

      link.appendChild(dataBoard)
      projectsBox.appendChild(link)

      link.addEventListener('mouseover', () => { dataBoard.classList.add('show-data-board') })
      link.addEventListener('mouseout', () => { dataBoard.classList.remove('show-data-board') })
   });

   updatePageButtons();
}

function updatePageButtons() {
   pageNumbers.innerHTML = ""

   projects.forEach((_, index) => {
      const btn = document.createElement("button")
      btn.textContent = index + 1
      btn.className = index === slideIndex ? "active" : ""
      btn.addEventListener("click", () => {
         slideIndex = index
         updateProjects()
      })
      pageNumbers.appendChild(btn)
   })
}

nextBtn.addEventListener("click", () => {
   slideIndex = (slideIndex + 1) % projects.length;
   updateProjects();
})

prevBtn.addEventListener("click", () => {
   slideIndex = (slideIndex - 1 + projects.length) % projects.length
   updateProjects()
})

// Inicializa
updateProjects()

//* contact

let nome = document.getElementById("name")
let email = document.getElementById("email")
let mensagem = document.getElementById("message")
let botao = document.getElementById("send-button")

function formatarMensagem() {
   return `Nome: ${nome.value}%0AEmail: ${email.value}%0AMensagem: ${mensagem.value}`
}

botao.addEventListener("click", function () {
   let linkEmail = "mailto:th23devsl@gmail.com?subject=Contato%20pelo%20site&body=" + formatarMensagem()

   const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)

   if (nome.value.trim() !== '' && email.value.trim() !== '' && emailValido) {
      window.location.href = linkEmail;
      [nome, email, mensagem].forEach(campo => campo.value = "")
   } else {
      [nome, email, mensagem].forEach(campo => campo.style.boxShadow = "inset 0px 0px 5px rgb(226, 10, 10)")
      setTimeout(() => {
         [nome, email, mensagem].forEach(campo => campo.style.boxShadow = "")
      }, 1000)
   }
});

//* Skills generator

const skillList = document.getElementById('skill-list')

const skills = [
   //title, background, color
   { title: 'JavaScript', bg: '#f7df1e', color: '#111111' },
   { title: 'HTML', bg: '#e34c26', color: '#ffffff' },
   { title: 'CSS', bg: '#9535d4ff', color: '#300949ff' },
   { title: 'PHP', bg: '#777BB3', color: '#393d79' },
   { title: 'SQL', bg: '#336791', color: '#ffffff' },
   { title: 'React.js', bg: '#106aa7', color: '#61dafb' },
   { title: 'Vue.js', bg: '#42b883', color: '#35495e' },
   { title: 'Angular.js', bg: '#dd1b16', color: '#ffffff' },
   { title: 'Node.js', bg: '#68a063', color: '#ffffff' },
   { title: 'Tailwind', bg: '#38bdf8', color: '#0f172a' },
   { title: 'Python', bg: '#3776ab', color: '#ffd43b' },
   { title: 'Git & GitHub', bg: '#e32c26', color: '#ffffff' },
   { title: 'Gsap', bg: '#0ae448', color: '#111111' },
   { title: 'Bootstrap', bg: '#9561fb', color: '#ffffffff' }
]

//mostra duas vezes pro efeito de carrosel infinito
for (let i = 1; i <= 2; i++) {
   skills.forEach(skill => {
      skillList.innerHTML += `<li style="--this-bg-color: ${skill.bg}; --this-text-color: ${skill.color}">${skill.title}</li>`
   })
}

//* gsap scroll animations

const imgProfile = document.getElementById("img-profile")
const aboutContent = document.getElementById("about-content")
const arrow = document.getElementById("arrow")

gsap.registerPlugin(ScrollTrigger)

function animate(local, item, opacity, x, y, start, end, scrub) {
   gsap.from(item, {
      opacity: opacity,
      x: x,
      y: y,
      scrollTrigger: {
         trigger: local,
         start: start,
         end: end,
         scrub: scrub,
         // markers: true
      }
   })
}
animate("#about-section", imgProfile, 0, -50, 0, "top 60%", "top 30%", true)
animate("#about-section", aboutContent, 0, 50, 0, "top 40%", "top 10%", true)
animate("#main-section", arrow, 1, 0, 0, "top 0%", "bottom 90%", false)
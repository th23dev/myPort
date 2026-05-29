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

let nextBtn = document.getElementById("next")
let prevBtn = document.getElementById("prev")
let projectsBox = document.getElementById("projects-box")
let pageNumbers = document.getElementById("page-numbers")
let slideIndex = 0;

const main = document.querySelector("main");

// Modal system
let modal = null;

function initModal() {
   const modalShadow = document.createElement('div');
   modalShadow.classList.add('modal-shadow');

   const modalBox = document.createElement('div');
   modalBox.classList.add('modal-box');

   const siteBox = document.createElement('div');
   siteBox.classList.add('site-box');

   const site = document.createElement('iframe');
   site.classList.add('site');

   siteBox.append(site);
   modalBox.append(siteBox);

   // Info side
   const infoBox = document.createElement('div');
   infoBox.classList.add('modal-info');

   const title = document.createElement('h2');
   title.classList.add('modal-title');
   infoBox.append(title);

   const desc = document.createElement('p');
   desc.classList.add('modal-desc');
   infoBox.append(desc);

   const tagsContainer = document.createElement('div');
   tagsContainer.classList.add('modal-tags');
   infoBox.append(tagsContainer);

   // Buttons container
   const buttonsContainer = document.createElement('div');
   buttonsContainer.classList.add('modal-buttons');

   const closeBtn = document.createElement('button');
   closeBtn.textContent = 'X';
   closeBtn.classList.add('btn-close');
   closeBtn.addEventListener('click', closeModal);

   const viewBtn = document.createElement('button');
   viewBtn.textContent = 'Ver Mais';
   viewBtn.classList.add('btn-view');
   viewBtn.addEventListener('click', () => {
      if (modal.currentUrl) window.open(modal.currentUrl, '_blank');
   });

   buttonsContainer.append(closeBtn, viewBtn);
   infoBox.append(buttonsContainer);

   modalBox.append(infoBox);
   main.append(modalBox);
   main.append(modalShadow);

   modal = { shadow: modalShadow, box: modalBox, iframe: site, title, desc, tagsContainer, currentUrl: null };

   modalShadow.addEventListener('click', closeModal);
   modalBox.addEventListener('click', (e) => {
      if (e.target === modalBox) closeModal();
   });
}

function openModal(projectData) {
   if (!modal) initModal();
   modal.iframe.src = projectData.url;
   modal.currentUrl = projectData.url;
   modal.title.textContent = projectData.title;
   modal.desc.textContent = projectData.desc;

   modal.tagsContainer.innerHTML = '';
   projectData.tags.forEach(tag => {
      const tagEl = document.createElement('span');
      tagEl.className = 'tag';
      tagEl.textContent = tag;
      modal.tagsContainer.appendChild(tagEl);
   });

   modal.box.classList.add('show-modal');
   modal.shadow.classList.add('show-modal');
}

function closeModal() {
   if (!modal) return;
   modal.box.classList.remove('show-modal');
   modal.shadow.classList.remove('show-modal');
}

//modal


const projects = [
   [
      { title: 'Secretaria de Turismo', url: "https://th23dev.github.io/sec-turismo-curuca/", desc: "Uma landing page para a secretaria de turismo de Curuçá.", tags: ['html', 'css', 'js'] },
      { title: 'Starbucks', url: "https://th23dev.github.io/THaua23-Starbucks-landing-page/", desc: "Uma landing page para o café Starbucks.", tags: ['html', 'css', 'js'] },
      { title: 'FP Sellection', url: "https://th23dev.github.io/car/", desc: "Um site para a empresa FP Sellection.", tags: ['html', 'css', 'js'] },
      { title: 'CRUD register', thumbnail: 'components/thumbnails/crud.png', url: "https://registrodeempresa.great-site.net/", desc: "Um sistema de cadastro de empresas.", tags: ['php', 'Sql', 'Bootstrap'] },
      { title: 'Starbucks', url: "https://th23dev.github.io/starbucks/", desc: "Uma landing page para o café Starbucks.", tags: ['html', 'css', 'js'] },
      { title: 'Refri', url: "https://th23dev.github.io/refri/", desc: "Um site para a empresa Refri.", tags: ['html', 'css', 'js'] }
   ],
   [
      { title: 'Mall System', url: "https://th23dev.github.io/Sistema-Mercado/", desc: "Um sistema para o mercado.", tags: ['html', 'css', 'js'] },
      { title: 'NewsLatter', url: "https://th23dev.github.io/THaua23-THaua23-Landing-page-Newslatter/", desc: "Uma landing page para o newsletter.", tags: ['html', 'css', 'js'] },
      { title: 'TaskBoard', url: "https://th23dev.github.io/TaskBoard/", desc: "Um quadro de tarefas.", tags: ['html', 'css', 'js'] },
      { title: 'calculator', url: "https://th23dev.github.io/calculator/", desc: "Uma calculadora.", tags: ['html', 'css', 'js'] },
      { title: 'CommentVue', url: "https://th23dev.github.io/commentVue/", desc: "Um sistema de comentários com Vue.", tags: ['html', 'Vue', 'Bootstrap'] },
      { title: 'form', url: "https://th23dev.github.io/form/", desc: "Um formulário simples.", tags: ['html', 'css'] }
   ],
   [
      { title: 'voice', url: "https://th23dev.github.io/voice/", desc: "Um site para o serviço de voz.", tags: ['html', 'css', 'js'] },
      { title: 'ToDoList', url: "https://th23dev.github.io/todolist/", desc: "Uma lista de tarefas.", tags: ['html', 'css', 'js'] },
      { title: 'SCM', url: "https://th23dev.github.io/SCM/", desc: "Um sistema de gestão de cadeia de suprimentos.", tags: ['html', 'css', 'js'] },
      { title: 'penJS', url: "https://th23dev.github.io/penJS/", desc: "Um quadro de desenhos JavaScript.", tags: ['html', 'css', 'js'] }
   ]
];

function updateProjects() {
   projectsBox.innerHTML = ""

   projects[slideIndex].forEach(projectData => {
      const project = document.createElement("div")
      project.className = "project-card"
      project.setAttribute("translate", "no")

      if (projectData.thumbnail) project.style.backgroundImage = `url('${projectData.thumbnail}')`
      else {
         const iframe = document.createElement("iframe")
         iframe.src = projectData.url
         project.appendChild(iframe)
      }

      project.addEventListener('click', () => openModal(projectData))
      projectsBox.appendChild(project)
   });

   updatePageButtons();
}

function updatePageButtons() {
   pageNumbers.innerHTML = ''

   projects.forEach((_, index) => {
      const btn = document.createElement('button')
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
   { title: 'JAVA', bg: '#df6f13', color: '#814310' },
   { title: 'SQL', bg: '#336791', color: '#ffffff' },
   { title: 'React.js', bg: '#106aa7', color: '#61dafb' },
   { title: 'Vue.js', bg: '#42b883', color: '#35495e' },
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
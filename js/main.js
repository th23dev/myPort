const typingText = document.getElementById('typing-text');
const titles = ['</Raffael | dev>', '{ th23dev }', 'raffael.th'];
let titleIndex = 0;
let fullTitle = titles[titleIndex];
let typedCharacters = 0;
let typingTimer;
let isDeleting = false;

function appendHighlightedBraces(text) {
   let normalText = '';

   for (const character of text) {
      if (character === '{' || character === '}') {
         if (normalText) {
            typingText.append(normalText);
            normalText = '';
         }

         const brace = document.createElement('span');
         brace.textContent = character;
         typingText.append(brace);
      } else {
         normalText += character;
      }
   }

   if (normalText) {
      typingText.append(normalText);
   }
}

function renderTypedTitle() {
   const accentStart = fullTitle.indexOf('|');
   const accentEnd = fullTitle.length - 1;

   typingText.replaceChildren();

   if (accentStart === -1) {
      appendHighlightedBraces(fullTitle.slice(0, typedCharacters));
   } else if (typedCharacters <= accentStart) {
      typingText.textContent = fullTitle.slice(0, typedCharacters);
   } else {
      typingText.append(fullTitle.slice(0, accentStart));
      const accentText = document.createElement('span');
      accentText.textContent = fullTitle.slice(accentStart, Math.min(typedCharacters, accentEnd));
      typingText.append(accentText);

      if (typedCharacters > accentEnd) {
         typingText.append(fullTitle.slice(accentEnd, typedCharacters));
      }
   }

   if (!isDeleting && typedCharacters < fullTitle.length) {
      typedCharacters += 1;
      typingTimer = setTimeout(renderTypedTitle, 140);
   } else if (!isDeleting) {
      isDeleting = true;
      typingTimer = setTimeout(renderTypedTitle, 2900);
   } else if (typedCharacters > 0) {
      typedCharacters -= 1;
      typingTimer = setTimeout(renderTypedTitle, 90);
   } else {
      titleIndex = (titleIndex + 1) % titles.length;
      fullTitle = titles[titleIndex];
      isDeleting = false;
      typingTimer = setTimeout(renderTypedTitle, 400);
   }
}

function startTyping(text) {
   clearTimeout(typingTimer);
   fullTitle = text;
   typedCharacters = 0;
   isDeleting = false;
   renderTypedTitle();
}

startTyping(fullTitle);


//* projects slider

let nextBtn = document.getElementById("next")
let prevBtn = document.getElementById("prev")
let projectsBox = document.getElementById("projects-box")
let pageNumbers = document.getElementById("page-numbers")
let slideIndex = 0


// ─── Modal ────────────────────────────────────────────────────────────────────
const modalShadow = document.getElementById('modal-shadow')
const modalBox = document.getElementById('modal-box')
const modalIframe = document.getElementById('modal-iframe')
const modalThumbnail = document.getElementById('modal-thumbnail')
const modalTitle = document.getElementById('modal-title')
const modalDesc = document.getElementById('modal-desc')
const modalTags = document.getElementById('modal-tags')
const modalViewBtn = document.getElementById('modal-view-btn')
let modalTrigger = null
let modalFallbackTimer = null

function getProjectPreviewUrl(project) {
   return project.thumbnail
      ?? `https://api.microlink.io?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

function showModalThumbnail(project) {
   modalIframe.classList.add('is-hidden');
   modalThumbnail.src = getProjectPreviewUrl(project);
   modalThumbnail.alt = `Thumbnail do projeto ${project.title}`;
   modalThumbnail.classList.add('show-thumbnail');
}

function openModal(project) {
   modalTrigger = document.activeElement;
   clearTimeout(modalFallbackTimer);
   modalIframe.classList.remove('is-hidden');
   modalThumbnail.classList.remove('show-thumbnail');
   modalThumbnail.src = '';

   if (project.embedBlocked) {
      showModalThumbnail(project);
   } else {
      modalIframe.onload = () => clearTimeout(modalFallbackTimer);
      modalIframe.onerror = () => showModalThumbnail(project);
      modalFallbackTimer = setTimeout(() => showModalThumbnail(project), 3500);

      modalIframe.src = project.url;   // carrega o site só aqui
   }

   modalTitle.textContent = project.title;
   modalDesc.textContent = project.desc;
   modalViewBtn.onclick = () => window.open(project.url, '_blank');

   modalTags.innerHTML = project.tags
      .map(tag => {
         const tagClass = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-');
         return `<span class="tag tag-${tagClass}">${tag}</span>`;
      })
      .join('');

   modalBox.classList.add('show-modal');
   modalShadow.classList.add('show-modal');
   modalBox.setAttribute('aria-hidden', 'false');
   modalShadow.setAttribute('aria-hidden', 'false');
   document.body.classList.add('modal-open');
   modalBox.focus();
}

function closeModal() {
   clearTimeout(modalFallbackTimer);
   modalIframe.onload = null;
   modalIframe.onerror = null;
   modalIframe.src = '';
   modalThumbnail.src = '';
   modalThumbnail.classList.remove('show-thumbnail');
   modalIframe.classList.remove('is-hidden');
   modalBox.classList.remove('show-modal');
   modalShadow.classList.remove('show-modal');
   modalBox.setAttribute('aria-hidden', 'true');
   modalShadow.setAttribute('aria-hidden', 'true');
   document.body.classList.remove('modal-open');
   modalTrigger?.focus();
}

document.getElementById('modal-close-btn').addEventListener('click', closeModal);
modalShadow.addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
   if (event.key === 'Escape' && modalBox.classList.contains('show-modal')) {
      closeModal();
   }
});
// ─────────────────────────────────────────────────────────────────────────────


function updateProjects() {
   projectsBox.innerHTML = "";

   projects[slideIndex].forEach(projectData => {
      const project = document.createElement("div");

      (!projectData.emphasis) ? project.className = "project-card" : project.className = "project-card emphasis";
      
      project.setAttribute("translate", "no");
      project.setAttribute("role", "button");
      project.setAttribute("tabindex", "0");
      project.setAttribute("aria-label", `Ver detalhes de ${projectData.title}`);

      const previewUrl = getProjectPreviewUrl(projectData);

      project.style.backgroundImage = `url('${previewUrl}')`;
      project.addEventListener('click', () => openModal(projectData));
      project.addEventListener('keydown', event => {
         if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openModal(projectData);
         }
      });
      projectsBox.appendChild(project);
   });

   updatePageButtons();
}

function updatePageButtons() {
   pageNumbers.innerHTML = '';

   projects.forEach((_, index) => {
      const btn = document.createElement('button');
      btn.textContent = index + 1;
      btn.className = index === slideIndex ? "active" : "";
      btn.addEventListener("click", () => {
         slideIndex = index;
         updateProjects();
      });
      pageNumbers.appendChild(btn);
   });
}

nextBtn.addEventListener("click", () => {
   slideIndex = (slideIndex + 1) % projects.length;
   updateProjects();
});

prevBtn.addEventListener("click", () => {
   slideIndex = (slideIndex - 1 + projects.length) % projects.length;
   updateProjects();
});

updateProjects();


//* Skills generator

const skillList = document.getElementById('skill-list')

const skills = [
   { title: 'JavaScript', bg: '#f7df1e', color: '#111111' },
   { title: 'HTML', bg: '#e34c26', color: '#ffffff' },
   { title: 'CSS', bg: '#9535d4ff', color: '#300949ff' },
   { title: 'React.js', bg: '#106aa7', color: '#61dafb' },
   { title: 'PHP', bg: '#777BB3', color: '#393d79' },
   { title: 'SQL', bg: '#336791', color: '#ffffff' },
   { title: 'JAVA', bg: '#df6f13', color: '#814310' },
   //{ title: 'Vue.js', bg: '#42b883', color: '#35495e' },
   { title: 'Node.js', bg: '#68a063', color: '#ffffff' },
   { title: 'Tailwind', bg: '#38bdf8', color: '#0f172a' },
   { title: 'Python', bg: '#3776ab', color: '#143957' },
   { title: 'Git & GitHub', bg: '#e32c26', color: '#ffffff' },
   { title: 'Gsap', bg: '#0ae448', color: '#111111' },
   { title: 'Bootstrap', bg: '#9561fb', color: '#ffffffff' }
]

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
      opacity, x, y,
      scrollTrigger: { trigger: local, start, end, scrub }
   })
}

animate("#about-section", imgProfile, 0, -50, 0, "top 60%", "top 30%", true)
animate("#about-section", aboutContent, 0, 50, 0, "top 40%", "top 10%", true)
animate("#main-section", arrow, 1, 0, 0, "top 0%", "bottom 90%", false)



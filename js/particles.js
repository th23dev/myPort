document.addEventListener('DOMContentLoaded', () => {
   tsParticles.load("particles-container", {
      fpsLimit: 60,
      interactivity: {
         events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: false, mode: "push" },
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
            limit: 100,
            value: 60,
         },
         opacity: { value: 0.5 },
         shape: { type: "circle" },
         size: {
            value: { min: 1, max: 4 },
         },
      },
      detectRetina: true,
   });
});

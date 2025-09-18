function generateParticles() {
   const particlesContainer = document.querySelector('.particles');
   const particleCount = 50;

   for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particlesContainer.appendChild(particle);
   }
}

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
   mobileMenu.classList.toggle('active');
});

const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
   link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
   });
});

async function loadDiscordStatus() {
   const userId = '1091592149105135686';
   const statusIndicator = document.getElementById('status-indicator');
   const discordName = document.getElementById('discord-name');
   const discordStatus = document.getElementById('discord-status');

   try {
      const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
      const data = await response.json();

      if (data.success) {
         const {
            data: userData
         } = data;

         discordName.textContent = `</> ${userData.discord_user.username}`;

         if (userData.discord_status === 'online') {
            statusIndicator.className = 'status-indicator status-online';
         } else if (userData.discord_status === 'idle') {
            statusIndicator.className = 'status-indicator status-idle';
         } else if (userData.discord_status === 'dnd') {
            statusIndicator.className = 'status-indicator status-dnd';
         } else {
            statusIndicator.className = 'status-indicator status-offline';
         }

         discordStatus.style.cursor = 'pointer';
         discordStatus.addEventListener('click', () => {
            window.open(`https://discord.com/users/${userId}`, '_blank');
         });
      }
   } catch (error) {
      console.error('Error fetching Discord status:', error);
      discordName.textContent = `</> Gravy`;
      statusIndicator.className = 'status-indicator status-offline';
   }
}

window.addEventListener('load', () => {
   generateParticles();
   loadDiscordStatus();

   setInterval(loadDiscordStatus, 30000);

});

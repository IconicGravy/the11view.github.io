// Generate particles
function generateParticles() {
   const particlesContainer = document.querySelector('.particles');
   const particleCount = 50;

   for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 15}s`;

      particlesContainer.appendChild(particle);
   }
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
   mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
   link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
   });
});

// Discord status using Lanyard API
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

         // Set the display name
         discordName.textContent = `</> ${userData.discord_user.username}`;

         // Set the status indicator based on discord_status
         if (userData.discord_status === 'online') {
            statusIndicator.className = 'status-indicator status-online';
         } else if (userData.discord_status === 'idle') {
            statusIndicator.className = 'status-indicator status-idle';
         } else if (userData.discord_status === 'dnd') {
            statusIndicator.className = 'status-indicator status-dnd';
         } else {
            statusIndicator.className = 'status-indicator status-offline';
         }

         // Make the status clickable
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

// Initialize particles and Discord status on load
window.addEventListener('load', () => {
   generateParticles();
   loadDiscordStatus();

   // Refresh Discord status every 60 seconds
   setInterval(loadDiscordStatus, 60000);
});
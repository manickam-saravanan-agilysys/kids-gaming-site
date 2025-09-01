// Fetch data files and populate the site.
// TODO: student exercise - extend the games list or add filters by difficulty.

async function loadJSON(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function createGameCard(game){
  const card = document.createElement('article');
  card.className = 'game-card';
  card.innerHTML = `
    <div class="game-thumb" aria-hidden="true"></div>
    <div class="game-info">
      <h3>${game.title}</h3>
      <p>${game.description}</p>
    </div>
    <button class="play-btn" aria-label="Play ${game.title}">Play</button>
  `;
  return card;
}

async function init(){
  try{
    const [branding, theme, gamesData] = await Promise.all([
      loadJSON('data/branding.json'),
      loadJSON('data/theme.json'),
      loadJSON('data/games.json')
    ]);

    // Apply branding
    document.getElementById('site-title').textContent = gamesData.siteTitle || 'Kids Gaming Site';
    document.getElementById('site-tagline').textContent = gamesData.tagline || '';
    const logo = document.getElementById('logo');
    if(branding.logo && branding.logo.title){
      logo.src = branding.logo.title;
      logo.alt = branding.logo.alt || 'Site logo';
    } else {
      logo.removeAttribute('src');
      logo.setAttribute('aria-hidden','true');
    }

    // Apply theme variables if provided
    if(theme && theme.colors){
      const root = document.documentElement.style;
      if(theme.colors.primary) root.setProperty('--primary', theme.colors.primary);
      if(theme.colors.accent) root.setProperty('--accent', theme.colors.accent);
      if(theme.colors.bg) root.setProperty('--bg', theme.colors.bg);
      if(theme.colors.text) root.setProperty('--text', theme.colors.text);
    }

    // Populate games
    const container = document.getElementById('games');
    container.innerHTML = '';
    (gamesData.games || []).forEach(g => container.appendChild(createGameCard(g)));

    // Countdown (example)
    const countdown = document.getElementById('countdown');
    if(gamesData.countdown){
      const target = new Date(gamesData.countdown).getTime();
      const now = Date.now();
      if(!isNaN(target)){
        const diff = Math.max(0, target - now);
        const days = Math.floor(diff / (1000*60*60*24));
        countdown.textContent = `Event in ${days} day(s)`;
      }
    }

    // Footer contact
    const email = document.getElementById('contact-email');
    if(branding.contact && branding.contact.email) {
      email.href = `mailto:${branding.contact.email}`;
      email.textContent = branding.contact.email;
    }

  }catch(err){
    console.error(err);
    document.getElementById('main').insertAdjacentHTML('afterbegin', `<div class="error">Failed to load site data.</div>`);
  }
}

document.addEventListener('DOMContentLoaded', init);

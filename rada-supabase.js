
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://lsrlagcaavlemuqpgrbi.supabase.co",
  "sb_publishable_2hNV4BUX3SV7xXzY56g12w_gDGyCJ3P"
);

const root = document.getElementById("root");

const style = document.createElement("style");

style.textContent = `
  *{box-sizing:border-box}
  :root{--gold:#d9ad55;--gold2:#f2d58d;--ink:#10100f;--panel:#191916;--line:#343127;--muted:#aaa596}
  html{scroll-behavior:smooth}
  body{margin:0;background:var(--ink);color:#f8f5ed;font-family:Inter,Arial,sans-serif}
  button,input,textarea,select{font:inherit}
  button{cursor:pointer;transition:all .25s ease}
  .rada{max-width:1320px;margin:auto;padding:25px 5.5%}
  header{display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap;padding:15px 0 25px;border-bottom:1px solid var(--line)}
  .logo{font-size:34px;font-weight:950;color:var(--gold);letter-spacing:5px}
  .tag{color:#d4cbb8;font-size:10px;letter-spacing:3px;margin-top:5px}
  #account{padding:10px 15px;border:1px solid var(--line);border-radius:30px}
  nav{display:flex;gap:10px;flex-wrap:wrap;margin:20px 0 30px}
  nav button{background:transparent;color:#ddd5c5;border:1px solid transparent;border-radius:30px;padding:11px 19px;font-size:13px}
  nav button:hover,button.secondary:hover{border-color:var(--gold);color:var(--gold)}
  button{background:var(--gold);color:#17140d;border:1px solid var(--gold);border-radius:30px;padding:13px 22px;font-weight:800}
  button:hover{background:var(--gold2);transform:translateY(-2px);box-shadow:0 8px 25px #d9ad5525}
  button.secondary{background:transparent;color:#f5edda;border:1px solid #65583a}
  .hero{position:relative;overflow:hidden;min-height:440px;display:flex;flex-direction:column;justify-content:center;padding:65px 7%;border:1px solid #55472c;border-radius:22px;margin-bottom:30px;background:linear-gradient(90deg,rgba(10,10,9,.96),rgba(10,10,9,.76),rgba(10,10,9,.22)),url('https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1800&q=85') center/cover}
  .hero:after{content:"";position:absolute;inset:auto 0 0;height:4px;background:linear-gradient(90deg,var(--gold),transparent)}
  .hero h1{position:relative;z-index:1;max-width:750px;font-size:clamp(42px,7vw,78px);line-height:1.03;letter-spacing:-2px;margin:0 0 20px}
  .hero p{position:relative;z-index:1;max-width:620px;font-size:17px;color:#e2dccf;line-height:1.8;margin:0 0 28px}
  .hero button{position:relative;z-index:1;align-self:flex-start;margin:5px 8px 5px 0}
  h1,h2,h3{line-height:1.2}
  h2{color:var(--gold);font-size:clamp(25px,4vw,36px);letter-spacing:-.5px}
  h3{color:#f5edda}
  p{color:#c9c3b7;line-height:1.75}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}
  .panel,.item{background:linear-gradient(145deg,#201f1a,#151512);border:1px solid var(--line);border-radius:17px;padding:24px;margin:15px 0;transition:transform .25s,border-color .25s}
  .panel:hover,.item:hover{transform:translateY(-4px);border-color:#79633a}
  .panel h2{font-size:22px}
  .item h3{color:var(--gold)}
  input,textarea,select{width:100%;padding:14px 15px;margin:8px 0 18px;background:#11110f;border:1px solid #494538;border-radius:10px;color:#fff;outline:none}
  input:focus,textarea:focus,select:focus{border-color:var(--gold);box-shadow:0 0 0 3px #d9ad551c}
  textarea{min-height:110px;resize:vertical}
  label{font-size:12px;color:var(--gold2);letter-spacing:.5px}
  .muted{color:var(--muted);font-size:13px}
  .gold{color:var(--gold)}
  .hidden{display:none}
  .message{padding:15px 18px;background:#29251b;border:1px solid #66532e;border-radius:10px;margin:15px 0;color:#f2d58d;line-height:1.6}
  a{color:var(--gold2);text-decoration:none}
  a:hover{text-decoration:underline}
  footer{border-top:1px solid var(--line);margin-top:55px;padding:25px 0;color:#aaa18d;font-size:12px;letter-spacing:.5px}
  @media(max-width:650px){
    .rada{padding:16px}
    header{align-items:flex-start}
    nav{gap:5px}
    nav button{padding:10px 12px;font-size:12px}
    .hero{min-height:390px;padding:38px 24px;background-position:60% center}
    .hero h1{font-size:43px}
    .hero p{font-size:15px}
    .panel,.item{padding:19px}
  }
`;
document.head.appendChild(style);

root.innerHTML = `
<div class="rada">
  <header>
    <div>
      <div class="logo">RADA</div>
      <div class="tag">THE CREATIVE CONNECT</div>
    </div>
    <div id="account" class="muted">Not signed in</div>
  </header>

  <nav>
    <button class="secondary" data-page="home">Home</button>
    <button class="secondary" data-page="creators">Discover Creators</button>
    <button class="secondary" data-page="opportunities">Opportunities</button>
    <button data-page="account">My Account</button>
  </nav>

  <main id="content"></main>

  <footer>RADA – The Creative Connect · Discover. Connect. Create. Earn.</footer>
</div>
`;

const content = document.getElementById("content");
const accountLabel = document.getElementById("account");
let currentUser = null;

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[char]);
}

function message(text) {
  const box = document.getElementById("message");
  if (box) box.textContent = text;
}

function homePage() {
  content.innerHTML = `
    <section class="hero">
      <h1>Kenyan talent, <span class="gold">connected.</span></h1>
      <p>Discover artists, musicians, photographers, filmmakers, designers,
      performers and creative professionals. Find opportunities and connect
      with the people who bring ideas to life.</p>
      <button data-page="creators">Explore Creators</button>
      <button class="secondary" data-page="opportunities">Find Opportunities</button>
    </section>
    <div class="grid">
      <div class="panel"><h2>Discover</h2><p>Explore creative talent and their work.</p></div>
      <div class="panel"><h2>Connect</h2><p>Build relationships with creators and businesses.</p></div>
      <div class="panel"><h2>Create</h2><p>Showcase your skills and creative portfolio.</p></div>
      <div class="panel"><h2>Earn</h2><p>Find opportunities and connect with potential clients.</p></div>
    </div>
    <div class="panel">
      <h2>Join RADA</h2>
      <p>Create your account and become part of Kenya's creative community.</p>
      <button data-page="account">Register / Sign In</button>
    </div>
  `;
}

function accountPage() {
  content.innerHTML = `
    <h2>My RADA Account</h2>
    <div class="panel">
      <h3>Create an account</h3>
      <label>Display name</label>
      <input id="signup-name" placeholder="Your name">
      <label>Account type</label>
      <select id="signup-type">
        <option value="creator">Creator</option>
        <option value="business">Business</option>
      </select>
      <label>Email address</label>
      <input id="signup-email" type="email" placeholder="you@example.com">
      <label>Password</label>
      <input id="signup-password" type="password" placeholder="At least 6 characters">
      <button id="signup">Create Account</button>
    </div>
    <div class="panel">
      <h3>Already registered? Sign in</h3>
      <label>Email address</label>
      <input id="login-email" type="email" placeholder="you@example.com">
      <label>Password</label>
      <input id="login-password" type="password" placeholder="Your password">
      <button id="login">Sign In</button>
      <button class="secondary" id="reset-password">Forgot Password?</button>
      <button class="secondary" id="logout">Sign Out</button>
    </div>
    <div class="panel">
      <h3>Your profile</h3>
      <label>County</label>
      <input id="profile-county" placeholder="e.g. Nairobi">
      <label>Town</label>
      <input id="profile-town" placeholder="e.g. Westlands">
      <label>About you</label>
      <textarea id="profile-bio" placeholder="Tell people about your creative work"></textarea>
      <label>Skills</label>
      <input id="profile-skills" placeholder="e.g. Photography, music, design">
      <label>Portfolio link</label>
      <input id="profile-portfolio" placeholder="https://...">
      <button id="save-profile">Save Profile</button>
    </div>
    <div id="message" class="message">Sign in or create your account to get started.</div>
  `;

  document.getElementById("signup").onclick = async () => {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const type = document.getElementById("signup-type").value;

    if (!name || !email || password.length < 6) {
      return message("Enter your name, a valid email and a password of at least 6 characters.");
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name, account_type: type } }
    });

    message(error ? error.message : "Registration submitted. Check your email if confirmation is required.");
  };

  document.getElementById("login").onclick = async () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    message(error ? error.message : "You are signed in.");
    await refreshUser();
    if (currentUser) await loadProfile();
  };

  document.getElementById("logout").onclick = async () => {
    const { error } = await supabase.auth.signOut();
    message(error ? error.message : "You have signed out.");
    await refreshUser();
  };

  document.getElementById("reset-password").onclick = async () => {
    const email = document.getElementById("login-email").value.trim();
    if (!email) return message("Enter your email address in the sign-in box first.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.href
    });
    message(error ? error.message : "If the email is registered, a password reset link will be sent.");
  };

  document.getElementById("save-profile").onclick = async () => {
    if (!currentUser) return message("Please sign in first.");
    const updates = {
      county: document.getElementById("profile-county").value.trim(),
      town: document.getElementById("profile-town").value.trim(),
      bio: document.getElementById("profile-bio").value.trim(),
      skills: document.getElementById("profile-skills").value.trim(),
      portfolio_url: document.getElementById("profile-portfolio").value.trim()
    };
    const { error } = await supabase.from("creator_profiles")
      .update(updates).eq("user_id", currentUser.id);
    message(error ? error.message : "Your profile has been saved.");
  };
}

async function loadProfile() {
  if (!currentUser) return;
  const { data, error } = await supabase.from("creator_profiles")
    .select("county,town,bio,skills,portfolio_url")
    .eq("user_id", currentUser.id).maybeSingle();

  if (error || !data) return;
  for (const field of ["county","town","bio","skills","portfolio_url"]) {
    const input = document.getElementById("profile-" + field);
    if (input) input.value = data[field] || "";
  }
}

async function creatorsPage() {
  content.innerHTML = "<h2>Discover Creators</h2><p>Loading creative talent...</p>";
  const { data, error } = await supabase.from("public_creator_profiles")
    .select("*").limit(50);

  if (error) {
    content.innerHTML = `<div class="message">${safe(error.message)}</div>`;
    return;
  }

  content.innerHTML = "<h2>Discover Creators</h2><div class='grid' id='creator-list'></div>";
  const list = document.getElementById("creator-list");

  if (!data?.length) {
    list.innerHTML = "<p>No published creator profiles yet. Be the first to join RADA.</p>";
    return;
  }

  list.innerHTML = data.map(person => `
    <div class="item">
      <h3 class="gold">${safe(person.display_name || "RADA Creator")}</h3>
      <p>${safe(person.account_type || "Creative professional")}</p>
      <p>${safe([person.town,person.county].filter(Boolean).join(", "))}</p>
      <p>${safe(person.bio || "Creative talent on RADA.")}</p>
      <p><b>Skills:</b> ${safe(person.skills || "Not listed")}</p>
      ${person.portfolio_url ? `<a href="${safe(person.portfolio_url)}" target="_blank" rel="noopener">View portfolio</a>` : ""}
    </div>
  `).join("");
}

async function opportunitiesPage() {
  content.innerHTML = "<h2>Creative Opportunities</h2><p>Loading opportunities...</p>";
  const { data, error } = await supabase.from("public_opportunities")
    .select("*").order("created_at", { ascending: false }).limit(50);

  if (error) {
    content.innerHTML = `<div class="message">${safe(error.message)}</div>`;
    return;
  }

  content.innerHTML = `
    <h2>Creative Opportunities</h2>
    <p>Explore creative jobs, collaborations, events and projects.</p>
    <div id="opportunity-list" class="grid"></div>
  `;

  const list = document.getElementById("opportunity-list");
  if (!data?.length) {
    list.innerHTML = "<p>No published opportunities yet. Check back soon.</p>";
    return;
  }

  list.innerHTML = data.map(item => `
    <div class="item">
      <h3 class="gold">${safe(item.title)}</h3>
      <p>${safe(item.opportunity_type || "Opportunity")}</p>
      <p>${safe([item.town,item.county].filter(Boolean).join(", "))}</p>
      <p>${safe(item.description || "")}</p>
      <p><b>Compensation:</b> ${safe(item.compensation_text || "Not specified")}</p>
      ${item.application_url ? `<a href="${safe(item.application_url)}" target="_blank" rel="noopener">Apply / Learn More</a>` : ""}
    </div>
  `).join("");
}

async function refreshUser() {
  const { data } = await supabase.auth.getUser();
  currentUser = data.user || null;
  accountLabel.textContent = currentUser ? currentUser.email : "Not signed in";
}

async function showPage(page) {
  if (page === "home") homePage();
  if (page === "account") {
    accountPage();
    await loadProfile();
  }
  if (page === "creators") await creatorsPage();
  if (page === "opportunities") await opportunitiesPage();
}

root.addEventListener("click", event => {
  const button = event.target.closest("[data-page]");
  if (button) showPage(button.dataset.page);
});

supabase.auth.onAuthStateChange(async () => {
  await refreshUser();
});

await refreshUser();
homePage();

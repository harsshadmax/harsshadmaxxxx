// Birthday Surprise Website - Main Application
// Created by IKER

// Initialize
let surprises = JSON.parse(localStorage.getItem('birthdaySurprises') || '{}');
let currentMediaData = null;
let currentSurpriseId = null;
const ADMIN_PASSWORD = 'king';

// Initialize based on URL parameters
window.addEventListener('load', () => {
    createSparkles();
    createHearts();

    const urlParams = new URLSearchParams(window.location.search);
    const surpriseId = urlParams.get('id');
    const mode = urlParams.get('mode');
    const revealToken = urlParams.get('reveal');
    const adminPass = urlParams.get('admin');

    if (surpriseId && surprises[surpriseId]) {
        // Direct admin access with password in URL
        if (adminPass === ADMIN_PASSWORD) {
            directAdminAccess(surpriseId);
        } else if (mode === 'contribute') {
            showContributeSection(surpriseId);
        } else if (revealToken) {
            // Validate reveal token
            const surprise = surprises[surpriseId];
            if (surprise.revealLinks && surprise.revealLinks.includes(revealToken)) {
                showRevealSection(surpriseId);
            } else {
                alert('Invalid or expired reveal link!');
                window.location.href = window.location.pathname;
            }
        }
    }
});

// Setup form submission
document.getElementById('setupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const surpriseId = 'surprise_' + Date.now();
    const surprise = {
        id: surpriseId,
        birthdayPerson: document.getElementById('birthdayPersonName').value,
        organizer: document.getElementById('organizerName').value,
        contributions: [],
        revealLinks: [],
        createdAt: new Date().toISOString()
    };

    surprises[surpriseId] = surprise;
    localStorage.setItem('birthdaySurprises', JSON.stringify(surprises));

    // Store current surprise ID globally
    currentSurpriseId = surpriseId;

    // Generate initial reveal link
    const initialRevealId = 'reveal_' + Date.now();
    surprise.revealLinks.push(initialRevealId);
    localStorage.setItem('birthdaySurprises', JSON.stringify(surprises));

    // Generate links
    const baseUrl = window.location.origin + window.location.pathname;
    document.getElementById('contributionLink').value = `${baseUrl}?id=${surpriseId}&mode=contribute`;
    document.getElementById('revealLink').value = `${baseUrl}?id=${surpriseId}&reveal=${initialRevealId}`;
    document.getElementById('adminLink').value = `${baseUrl}?id=${surpriseId}&admin=${ADMIN_PASSWORD}`;

    // Populate edit name field
    document.getElementById('editBirthdayName').value = surprise.birthdayPerson;

    document.getElementById('linksDisplay').classList.remove('hidden');
    this.reset();
});

// Direct admin access with password in URL
function directAdminAccess(surpriseId) {
    // Hide all other sections
    document.getElementById('setupSection').classList.add('hidden');
    document.getElementById('contributeSection').classList.remove('active');
    document.getElementById('revealSection').classList.remove('active');
    document.getElementById('messagesContainer').classList.remove('active');
    
    // Show admin section
    document.getElementById('adminSection').classList.remove('hidden');
    
    // Hide login form, show dashboard directly
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    
    // Hide admin login button
    document.getElementById('adminLoginBtn').style.display = 'none';
    
    // Set current admin surprise ID
    window.currentAdminSurpriseId = surpriseId;
    currentSurpriseId = surpriseId;
    
    // Load the dashboard
    loadAdminDashboard();
}

// Show contribute section
function showContributeSection(surpriseId) {
    document.getElementById('setupSection').classList.add('hidden');
    const contributeSection = document.getElementById('contributeSection');
    contributeSection.classList.add('active');
    
    const surprise = surprises[surpriseId];
    document.getElementById('displayBirthdayName').textContent = `🎂 For ${surprise.birthdayPerson} 🎂`;
    
    document.getElementById('contributeForm').onsubmit = function(e) {
        e.preventDefault();
        
        const contribution = {
            id: Date.now(),
            name: document.getElementById('contributorName').value,
            message: document.getElementById('birthdayMessage').value,
            timestamp: new Date().toISOString()
        };

        surprises[surpriseId].contributions.push(contribution);
        localStorage.setItem('birthdaySurprises', JSON.stringify(surprises));

        const successDiv = document.getElementById('contributionSuccess');
        successDiv.className = 'success-msg';
        successDiv.innerHTML = '🎉 Your birthday wish has been added! Thank you! 🎉';

        this.reset();
    };
}

// Show reveal section
function showRevealSection(surpriseId) {
    document.getElementById('setupSection').classList.add('hidden');
    document.getElementById('revealSection').classList.add('active');
    
    window.currentSurpriseId = surpriseId;
}

// Reveal surprise
function revealSurprise(isYes) {
    if (!isYes) {
        alert("Come back on your birthday! 🎂");
        return;
    }

    const surpriseId = window.currentSurpriseId;
    const surprise = surprises[surpriseId];
    
    document.getElementById('revealSection').classList.remove('active');
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.classList.add('active');
    
    document.getElementById('revealBirthdayName').textContent = `Dear ${surprise.birthdayPerson}! 🎉`;
    
    const messagesList = document.getElementById('messagesList');
    
    let content = '';

    // Show video first if it exists - FULLSCREEN AUTOPLAY
    if (surprise.birthdayVideo) {
        content += `
            <div class="video-player-fullscreen" id="videoPlayerFullscreen">
                <div class="video-container-fullscreen">
                    <video id="birthdayVideoPlayer" controls autoplay playsinline style="width: 100%; max-width: 100%; height: auto; border-radius: 20px;">
                        <source src="${surprise.birthdayVideo}" type="video/mp4">
                    </video>
                    <button class="close-video-btn" onclick="closeVideoPlayer()">
                        ✕ Close Video
                    </button>
                </div>
            </div>
        `;
    }

    // Create contributors list
    let contributorsSection = '';
    if (surprise.contributions.length > 0) {
        const contributorNames = surprise.contributions.map(c => c.name);
        contributorsSection = `
            <div class="contributors-showcase" id="contributorsShowcase" style="display: none;">
                <h2 style="text-align: center; color: var(--purple); font-size: 2.5rem; margin-bottom: 20px;">
                    💝 Special Wishes From 💝
                </h2>
                <div class="contributors-grid">
                    ${contributorNames.map((name, index) => `
                        <div class="contributor-name-card" style="animation-delay: ${index * 0.1}s;">
                            <span class="contributor-emoji">🎉</span>
                            <span class="contributor-name">${name}</span>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 40px;">
                    <button class="btn btn-primary" onclick="showMessages()" style="font-size: 1.3rem;">
                        📖 Read All Messages 📖
                    </button>
                </div>
            </div>
        `;
    }

    // Show contributions (hidden initially)
    let messagesSection = '';
    if (surprise.contributions.length === 0) {
        messagesSection = '<p style="text-align: center; color: #666; margin-top: 30px;">No messages yet! Check back later!</p>';
    } else {
        messagesSection = `
            <div id="messagesSection" style="display: none; margin-top: 30px;">
                <h2 style="text-align: center; color: var(--purple); font-size: 2rem; margin-bottom: 30px;">
                    💌 Their Heartfelt Messages 💌
                </h2>
                ${surprise.contributions.map((contribution, index) => `
                    <div class="message-card" style="animation-delay: ${index * 0.1}s;">
                        <h3>💝 From ${contribution.name}</h3>
                        <p>${contribution.message}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    content += contributorsSection + messagesSection;
    messagesList.innerHTML = content;

    // Auto-play video if exists and setup video end listener
    if (surprise.birthdayVideo) {
        setTimeout(() => {
            const videoPlayer = document.getElementById('birthdayVideoPlayer');
            if (videoPlayer) {
                // Listen for video end
                videoPlayer.addEventListener('ended', function() {
                    closeVideoPlayer();
                    showContributors();
                });

                videoPlayer.play().catch(err => {
                    console.log('Autoplay prevented:', err);
                });
            }
        }, 100);
    } else {
        // No video, show contributors immediately
        showContributors();
    }
}

// Show contributors after video ends
function showContributors() {
    const contributorsShowcase = document.getElementById('contributorsShowcase');
    if (contributorsShowcase) {
        contributorsShowcase.style.display = 'block';
    }
}

// Show messages when button clicked
function showMessages() {
    document.getElementById('contributorsShowcase').style.display = 'none';
    document.getElementById('messagesSection').style.display = 'block';
    
    // Smooth scroll to messages
    document.getElementById('messagesSection').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Close video player
function closeVideoPlayer() {
    const videoPlayerFullscreen = document.getElementById('videoPlayerFullscreen');
    if (videoPlayerFullscreen) {
        videoPlayerFullscreen.style.display = 'none';
    }
}

// Admin login
function adminLogin() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById('adminLogin').classList.add('hidden');
        document.getElementById('adminDashboard').classList.remove('hidden');
        loadAdminDashboard();
    } else {
        alert('Incorrect password!');
    }
}

// Load admin dashboard
function loadAdminDashboard() {
    const surpriseId = window.currentAdminSurpriseId;
    const surprise = surprises[surpriseId];
    
    // Stats
    const statsDisplay = document.getElementById('statsDisplay');
    statsDisplay.innerHTML = `
        <div class="stat-box">
            <div class="stat-number">${surprise.contributions.length}</div>
            <div class="stat-label">Total Wishes</div>
        </div>
        <div class="stat-box">
            <div class="stat-number">${surprise.birthdayPerson}</div>
            <div class="stat-label">Birthday Star</div>
        </div>
        <div class="stat-box">
            <div class="stat-number">${surprise.birthdayVideo ? '✅' : '❌'}</div>
            <div class="stat-label">Birthday Video</div>
        </div>
        <div class="stat-box">
            <div class="stat-number">${surprise.revealLinks ? surprise.revealLinks.length : 0}</div>
            <div class="stat-label">Reveal Links</div>
        </div>
    `;

    // Set current surprise for editing
    currentSurpriseId = surpriseId;
    document.getElementById('editBirthdayName').value = surprise.birthdayPerson;

    // Show existing video if available
    if (surprise.birthdayVideo) {
        document.getElementById('adminVideoPreview').innerHTML = `
            <video controls src="${surprise.birthdayVideo}" style="max-width: 500px;"></video>
            <div class="preview-name">✅ Current birthday video</div>
        `;
        document.getElementById('adminUploadText').innerHTML = `
            ✅ Video uploaded<br>
            <small>Click to change video</small>
        `;
    }

    // Messages
    const adminMessagesList = document.getElementById('adminMessagesList');
    if (surprise.contributions.length === 0) {
        adminMessagesList.innerHTML = '<p style="text-align: center; color: #666;">No contributions yet!</p>';
        return;
    }

    adminMessagesList.innerHTML = surprise.contributions.map(contribution => `
        <div class="message-card">
            <h3>💝 From ${contribution.name}</h3>
            <p>${contribution.message}</p>
            <p style="font-size: 0.85rem; color: #999;">Submitted: ${new Date(contribution.timestamp).toLocaleString()}</p>
        </div>
    `).join('');
}

// Admin logout
function adminLogout() {
    document.getElementById('adminLogin').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminLoginBtn').style.display = 'block';
    currentAdminVideo = null;
    
    // Reset video upload display
    document.getElementById('adminVideoPreview').innerHTML = '';
    document.getElementById('adminUploadText').innerHTML = `
        Click to upload birthday video<br>
        <small>(MP4, MOV, AVI - Max 50MB)</small>
    `;
    document.getElementById('saveVideoBtn').style.display = 'none';
}

// Handle admin video upload
let currentAdminVideo = null;

function handleAdminVideoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
        alert('Video file too large! Maximum size is 50MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        currentAdminVideo = e.target.result;
        const preview = document.getElementById('adminVideoPreview');
        preview.innerHTML = `
            <video controls src="${currentAdminVideo}" style="max-width: 500px;"></video>
            <div class="preview-name">✅ ${file.name}</div>
        `;
        document.getElementById('adminUploadText').innerHTML = `
            ✅ ${file.name}<br>
            <small>Click to change video</small>
        `;
        document.getElementById('saveVideoBtn').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Save admin video
function saveAdminVideo() {
    const surpriseId = window.currentAdminSurpriseId;
    if (!surpriseId || !currentAdminVideo) return;

    surprises[surpriseId].birthdayVideo = currentAdminVideo;
    localStorage.setItem('birthdaySurprises', JSON.stringify(surprises));
    
    alert('🎉 Birthday video saved successfully!');
}

// Open admin login
function openAdminLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    const surpriseId = urlParams.get('id');
    
    if (!surpriseId) {
        alert('Please access this page through a surprise link first!');
        return;
    }

    // Prompt for password
    const password = prompt('Enter admin password:');
    
    if (password === ADMIN_PASSWORD) {
        // Redirect to admin panel link
        const baseUrl = window.location.origin + window.location.pathname;
        const adminUrl = `${baseUrl}?id=${surpriseId}&admin=${ADMIN_PASSWORD}`;
        window.location.href = adminUrl;
    } else if (password !== null) {
        // User entered wrong password (not cancelled)
        alert('Incorrect password!');
    }
}

// Copy link function
function copyLink(inputId) {
    const input = document.getElementById(inputId);
    input.select();
    document.execCommand('copy');
    alert('Link copied! 🎉 Share it now!');
}

// Share on WhatsApp
function shareOnWhatsApp(linkInputId) {
    const link = document.getElementById(linkInputId).value;
    const surprise = surprises[currentSurpriseId];
    
    let message = '';
    if (linkInputId === 'contributionLink') {
        message = `🎉 You're invited to contribute to ${surprise.birthdayPerson}'s birthday surprise! Add your birthday wish here: ${link}`;
    } else if (linkInputId === 'revealLink') {
        message = `🎂 Happy Birthday ${surprise.birthdayPerson}! 🎉 Your friends have a special surprise for you! Click here: ${link}`;
    }
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Update birthday person's name
function updateBirthdayName() {
    if (!currentSurpriseId) {
        alert('Please create a surprise first!');
        return;
    }

    const newName = document.getElementById('editBirthdayName').value.trim();
    if (!newName) {
        alert('Please enter a name!');
        return;
    }

    surprises[currentSurpriseId].birthdayPerson = newName;
    localStorage.setItem('birthdaySurprises', JSON.stringify(surprises));
    
    alert('✅ Birthday person\'s name updated to: ' + newName);
}

// Regenerate reveal link
function regenerateRevealLink() {
    if (!currentSurpriseId) {
        alert('Please create a surprise first!');
        return;
    }

    const newRevealId = 'reveal_' + Date.now();
    surprises[currentSurpriseId].revealLinks.push(newRevealId);
    localStorage.setItem('birthdaySurprises', JSON.stringify(surprises));

    const baseUrl = window.location.origin + window.location.pathname;
    const newRevealLink = `${baseUrl}?id=${currentSurpriseId}&reveal=${newRevealId}`;
    
    document.getElementById('revealLink').value = newRevealLink;
    
    alert('🎉 New reveal link generated! Old links are still valid.');
}

// Create sparkles
function createSparkles() {
    const container = document.getElementById('sparkles');
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(sparkle);
    }
}

// Create floating hearts
function createHearts() {
    const container = document.getElementById('sparkles');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }, 2000);
}

// Presentation App Class
class PresentationApp {
    constructor() {
        this.sessionData = null;
        this.timers = new Map();
        this.totalTimer = null;
        this.totalStartTime = 0;
        this.totalElapsedTime = 0;
        this.isTotalRunning = false;
        
        this.init();
    }

    async init() {
        try {
            await this.loadSessionContent();
            this.parseSessionStructure();
            this.renderAccordion();
            this.setupEventListeners();
            this.loadProgress();
            this.updateOverallProgress();
        } catch (error) {
            console.error('Failed to initialize presentation:', error);
            this.showError('Failed to load session content');
        }
    }

    async loadSessionContent() {
        const response = await fetch('/api/session-content');
        if (!response.ok) {
            throw new Error('Failed to load session content');
        }
        const data = await response.json();
        this.sessionData = data;
    }

    parseSessionStructure() {
        const content = this.sessionData.content;
        const sections = [];
        
        // Define all sections - both main agenda items and supplementary sections
        const allSections = [
            { title: "Introduction: The \"Black Box\" Problem", time: 2, section: "1.", type: "agenda" },
            { title: "What is Claude Code? Your Personal Project Translator", time: 3, section: "2.", type: "agenda" },
            { title: "Enterprise Trust & Security", time: 4, section: "3.", type: "agenda" },
            { title: "Project Setup Fundamentals", time: 3, section: "4.", type: "agenda" },
            { title: "Complete Setup Walkthrough", time: 8, section: "5.", type: "agenda" },
            { title: "Claude Code Interface Essentials", time: 3, section: "6.", type: "agenda" },
            { title: "What You Can Ask Claude Code", time: 4, section: "7.", type: "agenda" },
            { title: "Three Things You Can Do Today", time: 3, section: "8.", type: "agenda" },
            { title: "Wrap-up & What's Next", time: 2, section: "9.", type: "agenda" },
            { title: "Role-Specific Quick Wins", time: 5, section: "", type: "supplementary" },
            { title: "Live Demo Setup", time: 10, section: "", type: "supplementary" }
        ];

        // Extract content for each section from the markdown
        const lines = content.split('\n');
        let currentSection = null;
        let sectionContent = '';
        const processedSections = new Set(); // Track which sections we've already processed

        for (const line of lines) {
            // Check for both H2 (##) and H3 (###) headers
            if (line.startsWith('### ') || line.startsWith('## ')) {
                // Start new section
                const isH3 = line.startsWith('### ');
                const headerText = line.substring(isH3 ? 4 : 3).trim();
                
                // Find matching section definition
                const sectionMatch = allSections.find(item => {
                    if (item.type === "agenda") {
                        return headerText.includes(item.section) || 
                               headerText.toLowerCase().includes(item.title.toLowerCase().split(':')[0]);
                    } else {
                        return headerText.toLowerCase() === item.title.toLowerCase();
                    }
                });

                // Only start a new section if we found a match for a main section
                if (sectionMatch && !processedSections.has(sectionMatch.title)) {
                    // Save previous section if exists
                    if (currentSection && !processedSections.has(currentSection.title)) {
                        sections.push({
                            ...currentSection,
                            content: sectionContent.trim(),
                            completed: false // Add completion status
                        });
                        processedSections.add(currentSection.title);
                    }

                    currentSection = {
                        id: sections.length + 1,
                        title: sectionMatch.title,
                        time: sectionMatch.time,
                        type: sectionMatch.type,
                        content: '',
                        completed: false
                    };
                    sectionContent = '';
                } else if (currentSection) {
                    // If we're in a section and this header doesn't match a main section,
                    // treat it as content within the current section
                    sectionContent += line + '\n';
                }
            } else if (currentSection) {
                sectionContent += line + '\n';
            }
        }

        // Don't forget the last section
        if (currentSection && !processedSections.has(currentSection.title)) {
            sections.push({
                ...currentSection,
                content: sectionContent.trim(),
                completed: false
            });
        }

        this.sections = sections;
    }

    extractSubtasks(content) {
        const subtasks = [];
        const lines = content.split('\n');
        
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('#### ') || 
                trimmed.startsWith('- **') || 
                trimmed.startsWith('**') ||
                (trimmed.startsWith('-') && trimmed.includes(':'))) {
                
                let taskText = trimmed;
                // Clean up markdown formatting
                taskText = taskText.replace(/^####\s*/, '');
                taskText = taskText.replace(/^\-\s*\*\*/, '');
                taskText = taskText.replace(/\*\*.*?\*\*:?\s*/, '');
                taskText = taskText.replace(/^\-\s*/, '');
                taskText = taskText.replace(/\*\*(.*?)\*\*/, '$1');
                
                if (taskText.length > 10 && taskText.length < 200) {
                    subtasks.push({
                        id: subtasks.length + 1,
                        text: taskText,
                        completed: false
                    });
                }
            }
        }
        
        return subtasks;
    }

    renderAccordion() {
        const container = document.getElementById('accordion-container');
        container.innerHTML = '';

        this.sections.forEach((section, index) => {
            const accordionItem = this.createAccordionItem(section, index);
            container.appendChild(accordionItem);
        });
    }

    createAccordionItem(section, index) {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        item.dataset.sectionId = section.id;
        
        item.innerHTML = `
            <div class="accordion-header" data-section="${section.id}">
                <div class="accordion-title">${section.type === 'agenda' ? section.id + '. ' : ''}${section.title}</div>
                <div class="accordion-meta">
                    <span class="time-badge">${section.time} min</span>
                    <span class="section-type-badge ${section.type}">${section.type === 'agenda' ? 'Agenda' : 'Supplementary'}</span>
                    <span class="completion-badge ${section.completed ? 'completed' : ''}">${section.completed ? '✓ Complete' : 'Pending'}</span>
                    <span class="accordion-arrow">▼</span>
                </div>
            </div>
            <div class="accordion-content">
                <div class="accordion-body">
                    ${this.createTimerSection(section)}
                    ${this.createContentSection(section)}
                    ${this.createCompletionSection(section)}
                </div>
            </div>
        `;

        return item;
    }

    createTimerSection(section) {
        const timeInSeconds = section.time * 60;
        return `
            <div class="timer-section">
                <div class="timer-display" id="timer-${section.id}">${this.formatTime(timeInSeconds)}</div>
                <div class="timer-controls">
                    <button class="timer-btn start" data-action="start" data-section="${section.id}">Start</button>
                    <button class="timer-btn pause" data-action="pause" data-section="${section.id}">Pause</button>
                    <button class="timer-btn reset" data-action="reset" data-section="${section.id}">Reset</button>
                </div>
            </div>
        `;
    }

    createCompletionSection(section) {
        return `
            <div class="completion-section">
                <button class="section-complete-btn ${section.completed ? 'completed' : ''}" 
                        data-section="${section.id}" 
                        data-action="toggle-complete">
                    ${section.completed ? '✓ Section Completed' : 'Mark Section Complete'}
                </button>
                <p class="completion-help">Click to mark this section as ${section.completed ? 'incomplete' : 'completed'} during your presentation.</p>
            </div>
        `;
    }


    createContentSection(section) {
        // Convert markdown content to HTML using marked.js
        let htmlContent = '';
        
        if (typeof marked !== 'undefined') {
            // Use proper markdown parser
            htmlContent = marked.parse(section.content);
        } else {
            // Fallback to basic conversion with header support
            htmlContent = section.content
                .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/^- (.*$)/gim, '<li>$1</li>')
                .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(?!<[huo])[^<](.*)$/gm, '<p>$1</p>')
                .replace(/<p><\/p>/g, '');
        }

        return `
            <div class="content-section">
                <h3>Content Overview</h3>
                <div class="content-body">
                    ${htmlContent}
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Accordion toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('.accordion-header')) {
                this.toggleAccordion(e.target.closest('.accordion-header'));
            }
        });

        // Timer controls
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action]')) {
                const action = e.target.dataset.action;
                const sectionId = parseInt(e.target.dataset.section);
                this.handleTimerAction(action, sectionId);
            }
        });

        // Section completion toggle
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="toggle-complete"]')) {
                this.handleSectionComplete(e.target);
            }
        });

        // Global controls
        document.getElementById('reset-all-progress').addEventListener('click', () => {
            this.resetAllProgress();
        });

        document.getElementById('export-progress').addEventListener('click', () => {
            this.exportProgress();
        });

        // Total timer controls
        document.getElementById('start-total-timer').addEventListener('click', () => {
            this.startTotalTimer();
        });

        document.getElementById('pause-total-timer').addEventListener('click', () => {
            this.pauseTotalTimer();
        });

        document.getElementById('reset-total-timer').addEventListener('click', () => {
            this.resetTotalTimer();
        });
    }

    toggleAccordion(header) {
        const content = header.nextElementSibling;
        const isActive = header.classList.contains('active');
        const accordionItem = header.closest('.accordion-item');

        // Close all other accordions
        document.querySelectorAll('.accordion-header.active').forEach(h => {
            h.classList.remove('active');
            h.nextElementSibling.classList.remove('active');
        });

        // Toggle current accordion
        if (!isActive) {
            header.classList.add('active');
            content.classList.add('active');
            
            // Auto-scroll to position the accordion just below the sticky header
            // Wait for the accordion expansion animation to complete (300ms CSS transition + buffer)
            setTimeout(() => {
                const headerHeight = document.querySelector('.presentation-header').offsetHeight;
                const accordionTop = accordionItem.getBoundingClientRect().top + window.pageYOffset;
                const targetPosition = accordionTop - headerHeight - 10; // 10px padding below header
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 350); // Wait for 300ms accordion animation + 50ms buffer
        }
    }

    handleTimerAction(action, sectionId) {
        const timerKey = `section-${sectionId}`;
        const timerDisplay = document.getElementById(`timer-${sectionId}`);
        const section = this.sections.find(s => s.id === sectionId);

        switch (action) {
            case 'start':
                this.startTimer(timerKey, section.time * 60, timerDisplay);
                break;
            case 'pause':
                this.pauseTimer(timerKey);
                break;
            case 'reset':
                this.resetTimer(timerKey, section.time * 60, timerDisplay);
                break;
        }
    }

    startTimer(timerKey, duration, display) {
        if (this.timers.has(timerKey) && this.timers.get(timerKey).running) return;

        const timer = this.timers.get(timerKey) || { timeLeft: duration, running: false };
        timer.running = true;
        timer.startTime = Date.now();

        timer.interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - timer.startTime) / 1000);
            timer.timeLeft = Math.max(0, duration - elapsed - (duration - timer.timeLeft));
            
            display.textContent = this.formatTime(timer.timeLeft);
            
            // Update display class based on time remaining
            const percentage = timer.timeLeft / duration;
            display.className = 'timer-display';
            if (percentage <= 0.1) {
                display.classList.add('danger');
            } else if (percentage <= 0.25) {
                display.classList.add('warning');
            }

            if (timer.timeLeft <= 0) {
                this.pauseTimer(timerKey);
                this.showTimeUpNotification();
            }
        }, 1000);

        this.timers.set(timerKey, timer);
    }

    pauseTimer(timerKey) {
        const timer = this.timers.get(timerKey);
        if (timer && timer.running) {
            clearInterval(timer.interval);
            timer.running = false;
        }
    }

    resetTimer(timerKey, duration, display) {
        this.pauseTimer(timerKey);
        this.timers.set(timerKey, { timeLeft: duration, running: false });
        display.textContent = this.formatTime(duration);
        display.className = 'timer-display';
    }

    startTotalTimer() {
        if (this.isTotalRunning) return;

        this.isTotalRunning = true;
        this.totalStartTime = Date.now() - this.totalElapsedTime * 1000;

        this.totalTimer = setInterval(() => {
            this.totalElapsedTime = Math.floor((Date.now() - this.totalStartTime) / 1000);
            document.getElementById('total-time-display').textContent = this.formatTime(this.totalElapsedTime);
        }, 1000);
    }

    pauseTotalTimer() {
        if (this.totalTimer) {
            clearInterval(this.totalTimer);
            this.isTotalRunning = false;
        }
    }

    resetTotalTimer() {
        this.pauseTotalTimer();
        this.totalElapsedTime = 0;
        document.getElementById('total-time-display').textContent = '00:00';
    }

    handleSectionComplete(button) {
        const sectionId = parseInt(button.dataset.section);
        const section = this.sections.find(s => s.id === sectionId);
        
        // Toggle completion status
        section.completed = !section.completed;
        
        // Update button text and style
        button.textContent = section.completed ? '✓ Section Completed' : 'Mark Section Complete';
        button.classList.toggle('completed', section.completed);
        
        // Update completion badge in header
        const completionBadge = document.querySelector(`[data-section-id="${sectionId}"] .completion-badge`);
        if (completionBadge) {
            completionBadge.textContent = section.completed ? '✓ Complete' : 'Pending';
            completionBadge.classList.toggle('completed', section.completed);
        }
        
        // Update overall progress
        this.updateOverallProgress();
        this.saveProgress();
    }



    updateOverallProgress() {
        const totalSections = this.sections.length;
        const completedSections = this.sections.filter(s => s.completed).length;
        
        const progress = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;
        document.getElementById('overall-progress').textContent = `${progress}%`;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    saveProgress() {
        const progress = {
            sections: this.sections.map(section => ({
                id: section.id,
                title: section.title,
                completed: section.completed
            })),
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('claude-presentation-progress', JSON.stringify(progress));
    }

    loadProgress() {
        const saved = localStorage.getItem('claude-presentation-progress');
        if (!saved) return;

        try {
            const progress = JSON.parse(saved);
            
            progress.sections.forEach(savedSection => {
                const section = this.sections.find(s => s.id === savedSection.id && s.title === savedSection.title);
                if (section) {
                    section.completed = savedSection.completed;
                }
            });
        } catch (error) {
            console.error('Failed to load progress:', error);
        }
    }

    resetAllProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            this.sections.forEach(section => {
                section.completed = false;
            });
            
            localStorage.removeItem('claude-presentation-progress');
            this.renderAccordion();
            this.updateOverallProgress();
        }
    }

    exportProgress() {
        const progress = {
            sessionTitle: 'Session 1: What is Claude Code & Getting Started',
            exportDate: new Date().toISOString(),
            overallProgress: document.getElementById('overall-progress').textContent,
            completedSections: this.sections.filter(s => s.completed).length,
            totalSections: this.sections.length,
            sections: this.sections.map(section => ({
                title: section.title,
                timeAllotted: `${section.time} min`,
                completed: section.completed,
                status: section.completed ? 'Completed' : 'Pending'
            }))
        };

        const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `claude-presentation-progress-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    showTimeUpNotification() {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            font-weight: 600;
        `;
        notification.textContent = '⏰ Time\'s up for this section!';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    showError(message) {
        const container = document.getElementById('accordion-container');
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: #f8d7da; color: #721c24; border-radius: 8px;">
                <h3>Error Loading Presentation</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #721c24; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Retry
                </button>
            </div>
        `;
    }
}

// Initialize the presentation app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PresentationApp();
});
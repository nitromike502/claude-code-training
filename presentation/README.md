# Claude Code Presentation Tool

An interactive presentation tool for delivering the Claude Code training sessions. This single-page application dynamically loads content from session markdown files and provides timing, progress tracking, and checklist functionality.

## Features

- **Interactive Accordions**: Each main topic expands to show detailed content and checklists
- **Timer Management**: Individual countdown timers for each section with pause/resume/reset functionality
- **Progress Tracking**: Checkboxes for each subtopic with visual progress indicators
- **Dynamic Content**: Automatically loads and parses markdown content from session files
- **Progress Persistence**: Saves your progress locally and allows export
- **Responsive Design**: Works well on laptops and presentation screens

## Quick Start

1. **Install Dependencies**
   ```bash
   cd presentation
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:3001`
   - The presentation will automatically load Session 1 content

## Usage Guide

### Basic Navigation
- Click any section header to expand/collapse the accordion
- Only one section can be expanded at a time for focused presentation

### Timer Controls
Each section has its own timer with allocated time based on the session plan:
- **Start**: Begin countdown from allocated time (e.g., 8 minutes for Setup Walkthrough)
- **Pause**: Pause the current timer
- **Reset**: Reset timer to original duration

Timer colors indicate urgency:
- **Green**: Normal time remaining
- **Yellow**: ≤25% time remaining (warning)
- **Red**: ≤10% time remaining (danger, pulsing)

### Progress Tracking
- Check off subtopics as you cover them during presentation
- Progress bars update automatically
- Overall progress shown in header
- Progress is automatically saved locally

### Global Controls
- **Reset All Progress**: Clear all checkboxes and start fresh
- **Export Progress**: Download JSON file with completion status
- **Total Session Timer**: Track overall presentation time

## Session Structure

The tool automatically parses Session 1 content into 9 main sections:

1. **Introduction: The "Black Box" Problem** (2 min)
2. **What is Claude Code?** (3 min)
3. **Enterprise Trust & Security** (4 min)
4. **Project Setup Fundamentals** (3 min)
5. **Complete Setup Walkthrough** (8 min)
6. **Claude Code Interface Essentials** (3 min)
7. **What You Can Ask Claude Code** (4 min)
8. **Three Things You Can Do Today** (3 min)
9. **Wrap-up & What's Next** (2 min)

Each section includes:
- Relevant content from the session markdown
- Subtopic checklists for tracking coverage
- Individual timer with appropriate duration
- Progress indication

## Development

### Project Structure
```
presentation/
├── server.js              # Express server
├── package.json          # Dependencies and scripts
├── public/               # Static files
│   ├── index.html       # Main HTML template
│   ├── styles.css       # Professional styling
│   └── script.js        # Presentation functionality
└── README.md            # This file
```

### API Endpoints
- `GET /` - Main presentation page
- `GET /api/session-content` - Returns Session 1 markdown content
- `GET /api/health` - Health check endpoint

### Customization

To adapt for other sessions:
1. Update the `agendaItems` array in `script.js` with new timing and titles
2. Modify the API endpoint in `server.js` to point to different session files
3. Adjust section parsing logic if markdown structure differs

### Local Development
```bash
# Install with dev dependencies
npm install

# Run with auto-restart (requires nodemon)
npm run dev

# Production mode
npm start
```

## Presentation Tips

### Before Your Session
1. Test the tool with your actual session file
2. Verify all timers and content load correctly
3. Have backup slides ready in case of technical issues

### During Presentation
1. Use the accordion structure to maintain focus
2. Start section timers as you begin each topic
3. Check off items as you cover them
4. Monitor the warning colors for time management

### After Session
1. Export progress for session records
2. Review incomplete items for follow-up
3. Note timing for future session planning

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Basic support (responsive design)

## Troubleshooting

### "Command 'node' not found"
- Install Node.js from nodejs.org
- Verify installation with `node --version`

### "Cannot load session content"
- Verify `sessions/session-1.md` exists in parent directory
- Check file permissions
- Restart the server

### Timer not working properly
- Clear browser cache
- Check browser console for JavaScript errors
- Ensure page is fully loaded before starting timers

### Progress not saving
- Check if browser allows localStorage
- Try different browser or disable private/incognito mode

## License

MIT License - feel free to adapt for your training needs.
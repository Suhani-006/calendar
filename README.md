//basically we are going to change this data because its not that much accurate
//aslo styling needs to be changed
//I want to add national holiday calender also in this app so accordingly events.json file will be created
//also want to add time table also in the app but it will be done after this calender will done
//colouring will be changed


# Academic Calendar App

A responsive React.js web application for displaying and managing academic calendar events.

## Features

- Monthly calendar grid view
- Event loading from JSON file
- Interactive event details modal
- Responsive design for all devices
- Academic-focused styling and events

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

\`\`\`bash
npm install
\`\`\`

### Running the Application

\`\`\`bash
npm start
\`\`\`

The application will open in your browser at `http://localhost:3000`.

### Building for Production

\`\`\`bash
npm run build
\`\`\`

This creates a `build` folder with optimized production files.

## Project Structure

\`\`\`
myapp/
├── public/
│   ├── events.json          # Event data file
│   ├── index.html          # Main HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/
│   │   ├── Calendar.js     # Main calendar component
│   │   ├── DayCard.js      # Individual day component
│   │   └── EventModal.js   # Event details modal
│   ├── App.js              # Main app component
│   ├── App.css             # App-specific styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
└── package.json            # Project dependencies
\`\`\`

## Customization

### Adding Events

Edit the `public/events.json` file to add your own events:

\`\`\`json
{
  "events": [
    {
      "date": "2024-01-15",
      "title": "Your Event Title",
      "description": "Optional event description"
    }
  ]
}
\`\`\`

### Styling

The app uses Tailwind CSS via CDN. You can customize colors and styling by modifying the Tailwind config in `public/index.html` or by editing the component CSS classes.

## Browser Support

This app supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

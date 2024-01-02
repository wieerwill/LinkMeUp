# LinkMeUp

Welcome to the LinkMeUp project! This is a sleek, lightweight single-page application designed to consolidate an individual's social media and internet presence into one central location. Built with simplicity and performance in mind, the project uses minimalistic yet powerful web technologies.

## Features

- **Lightweight Design**: Leveraging vanilla HTML and CSS for a fast and responsive user experience.
- **Dynamic Content**: Easy-to-update JSON data file to manage social media links.
- **Handlebars Templating**: Pre-compiled Handlebars templates for a JavaScript-free frontend.
- **Optimized Performance**: Minimized CSS and HTML files, and optimized images for lightning-fast loading.
- **Accessibility and SEO**: Adherence to web accessibility standards and SEO-friendly structure.
- **Development Server**: Develop and view the changes on your page in high speed.

## Organizing the Files
```
LinkMeUp
├── public/                 # Directory for static files
│   ├── images/             # Images and icons
│   ├── styles/             # CSS files
│   └── index.html          # Main HTML file
├── src/                    # Source files
│   ├── templates/          # Handlebars templates
│   └── data.json           # JSON file with social media links
│   └── index.js            # Linking all JS scripts together
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

## Getting Started

To get started with the project:

1. Clone the repository: `git clone [repository-url]`
2. Navigate to the project directory: `cd LinkMeUp`
3. Install dependencies (if any): `pnpm install`

## Building and Deployment
Develope the project using our development script:
```bash
pnpm run dev
```

Build the project using our script:
```bash
pnpm run build
```

Deploy the built files at `/dist` to your preferred static hosting service.

## Contributing

Contributions to improve the application are always welcome. Please feel free to fork the repository, make changes, and submit a pull request.

## License

This project is open-sourced under the [MIT License](LICENSE).

Happy Coding! 🚀